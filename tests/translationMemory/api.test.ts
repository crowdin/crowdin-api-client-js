import * as nock from 'nock';
import * as crowdin from '../../src/index';

describe('Translation Memory API', () => {

    let scope: nock.Scope;
    const api: crowdin.TranslationMemory.Api = new crowdin.TranslationMemory.Api('testUser', 'qwerty', 'testOrg');
    const tmId = 2;
    const groupId = 44;
    const storageId = 55;
    const exportId = '3';
    const importId = '4';
    const name = 'test';
    const url = 'test.com';

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get('/tms')
            .query({
                'account-key': api.accountKey,
                login: api.login,
                groupId: groupId
            })
            .reply(200, {
                data: [{
                    data: {
                        id: tmId
                    }
                }],
                pagination: {
                    offset: 0,
                    limit: limit
                }
            })
            .post('/tms', {
                name: name,
                groupId: groupId
            })
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: tmId
                }
            })
            .get(`/tms/${tmId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: tmId
                }
            })
            .delete(`/tms/${tmId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200)
            .patch(`/tms/${tmId}`, [{
                value: name,
                op: crowdin.PatchOperation.REPLACE,
                path: '/name'
            }])
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: tmId,
                    name: name
                }
            })
            .get(`/tms/${tmId}/exports`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    url: url
                }
            })
            .post(`/tms/${tmId}/exports`, {})
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    identifier: exportId
                }
            })
            .get(`/tms/${tmId}/exports/${exportId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    identifier: exportId
                }
            })
            .post(`/tms/${tmId}/imports`, {
                storageId: storageId
            })
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    identifier: importId
                }
            })
            .get(`/tms/${tmId}/imports/${importId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    identifier: importId
                }
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List TM', async () => {
        const tms = await api.listTm(groupId);
        expect(tms.data.length).toBe(1);
        expect(tms.data[0].data.id).toBe(tmId);
        expect(tms.pagination.limit).toBe(limit);
    });

    it('Add TM', async () => {
        const tm = await api.addTm({
            name: name,
            groupId: groupId
        });
        expect(tm.data.id).toBe(tmId);
    });

    it('Get TM', async () => {
        const tm = await api.getTm(tmId);
        expect(tm.data.id).toBe(tmId);
    });

    it('Delete TM', async () => {
        await api.deleteTm(tmId);
    });

    it('Update TM', async () => {
        const tm = await api.editTm(tmId, [{
            op: crowdin.PatchOperation.REPLACE,
            path: '/name',
            value: name
        }]);
        expect(tm.data.id).toBe(tmId);
        expect(tm.data.name).toBe(name);
    });

    it('Download TM', async () => {
        const link = await api.downloadTm(tmId);
        expect(link.data.url).toBe(url);
    });

    it('Export TM', async () => {
        const status = await api.exportTm(tmId, {});
        expect(status.data.identifier).toBe(exportId);
    });

    it('Check export status', async () => {
        const status = await api.checkExportStatus(tmId, exportId);
        expect(status.data.identifier).toBe(exportId);
    });

    it('Import TM', async () => {
        const status = await api.importTm(tmId, {
            storageId: storageId
        });
        expect(status.data.identifier).toBe(importId);
    });

    it('Check import status', async () => {
        const status = await api.checkImportStatus(tmId, importId);
        expect(status.data.identifier).toBe(importId);
    });
});