import * as nock from 'nock';
import * as crowdin from '../../src/index';

describe('Source Strings API', () => {

    let scope: nock.Scope;
    const api: crowdin.Strings.Api = new crowdin.Strings.Api('testUser', 'qwerty', 'testOrg');
    const projectId = 2;
    const stringIdentifier = '222';
    const stringId = 123;
    const stringText = 'text. Sample text';

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get(`/projects/${projectId}/strings`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: [{
                    data: {
                        id: stringId,
                        text: stringText
                    }
                }],
                pagination: {
                    offset: 0,
                    limit: limit
                }
            })
            .post(`/projects/${projectId}/strings`, {
                identifier: stringIdentifier,
                text: stringText
            })
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: stringId,
                    text: stringText
                }
            })
            .get(`/projects/${projectId}/strings/${stringId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: stringId,
                    text: stringText
                }
            })
            .delete(`/projects/${projectId}/strings/${stringId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200)
            .patch(`/projects/${projectId}/strings/${stringId}`, [{
                value: stringText,
                op: crowdin.PatchOperation.REPLACE,
                path: '/text'
            }])
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: stringId,
                    text: stringText
                }
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List project strings', async () => {
        const strings = await api.listProjectStrings(projectId);
        expect(strings.data.length).toBe(1);
        expect(strings.data[0].data.id).toBe(stringId);
        expect(strings.data[0].data.text).toBe(stringText);
        expect(strings.pagination.limit).toBe(limit);
    });

    it('Add string', async () => {
        const string = await api.addString(projectId, {
            identifier: stringIdentifier,
            text: stringText
        });
        expect(string.data.id).toBe(stringId);
        expect(string.data.text).toBe(stringText);
    });

    it('Get string', async () => {
        const string = await api.getString(projectId, stringId);
        expect(string.data.id).toBe(stringId);
        expect(string.data.text).toBe(stringText);
    });

    it('Delete string', async () => {
        await api.deleteString(projectId, stringId);
    });

    it('Edit string', async () => {
        const string = await api.editString(projectId, stringId, [{
            op: crowdin.PatchOperation.REPLACE,
            path: '/text',
            value: stringText
        }]);
        expect(string.data.id).toBe(stringId);
        expect(string.data.text).toBe(stringText);
    });
});