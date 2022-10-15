import * as nock from 'nock';
import { Credentials, CrowdinApi, UploadStorage } from '../../src';

class TestCrowdinApi extends CrowdinApi {
    public encodeUrlParam(param: string | number | boolean): string {
        return super.encodeUrlParam(param);
    }
}

describe('Upload Storage API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: UploadStorage = new UploadStorage(credentials);
    const testApi: TestCrowdinApi = new TestCrowdinApi(credentials);
    const storageId = 2;
    const fileName = 'words.txt';
    const urlEncodedFileName = encodeURIComponent(fileName);
    const fileContent = 'test text.';

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get('/storages', undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: storageId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post('/storages', fileContent, {
                reqheaders: {
                    'Crowdin-API-FileName': urlEncodedFileName,
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: storageId,
                },
            })
            .get(`/storages/${storageId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: storageId,
                },
            })
            .delete(`/storages/${storageId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
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
        const storage = await api.addStorage(fileName, fileContent);
        expect(storage.data.id).toBe(storageId);
    });

    it('Get storage', async () => {
        const storage = await api.getStorage(storageId);
        expect(storage.data.id).toBe(storageId);
    });

    it('Delete storage', async () => {
        await api.deleteStorage(storageId);
    });

    it('URL encodes a Cyrillic filename', async () => {
        const fileName = 'абвгд';
        const urlEncodeFileName = testApi.encodeUrlParam(fileName);
        expect(urlEncodeFileName).toBe('%D0%B0%D0%B1%D0%B2%D0%B3%D0%B4');
    });

    it('URL encodes a non-Cyrillic filename', async () => {
        const fileName = 'filename';
        const urlEncodeFileName = testApi.encodeUrlParam(fileName);
        expect(urlEncodeFileName).toBe('filename');
    });
});
