import * as nock from 'nock';
import * as crowdin from '../../src/index';

describe('Upload Storage API', () => {

    let scope: nock.Scope;
    const credentials: crowdin.Credentials = {
        login: 'testUser',
        accountKey: 'qwerty',
        organization: 'testOrg'
    };
    const api: crowdin.UploadStorage.Api = new crowdin.UploadStorage.Api(credentials);
    const storageId = 2;
    const contentType = 'text/plain';
    const fileContent = 'test text.';

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get('/storages')
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: [{
                    data: {
                        id: storageId
                    }
                }],
                pagination: {
                    offset: 0,
                    limit: limit
                }
            })
            .post('/storages', fileContent, {
                reqheaders: {
                    'Content-Type': contentType
                }
            })
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: storageId
                }
            })
            .get(`/storages/${storageId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: storageId
                }
            })
            .delete(`/storages/${storageId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200);
    });

    afterAll(() => {
        scope.done();
    });

    it('List storages', async () => {
        const storages = await api.listStorages();
        expect(storages.data.length).toBe(1);
        expect(storages.data[0].data.id).toBe(storageId);
        expect(storages.pagination.limit).toBe(limit);
    });

    it('Add storage', async () => {
        const storage = await api.addStorage(contentType, fileContent);
        expect(storage.data.id).toBe(storageId);
    });

    it('Get storage', async () => {
        const storage = await api.getStorage(storageId);
        expect(storage.data.id).toBe(storageId);
    });

    it('Delete storage', async () => {
        await api.deleteStorage(storageId);
    });
});