import * as nock from 'nock';
import { Credentials, PatchOperation, TranslationMemory } from '../../src';

describe('Translation Memory API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: TranslationMemory = new TranslationMemory(credentials);
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
            .get('/tms', undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .query({
                groupId: groupId,
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: tmId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                '/tms',
                {
                    name: name,
                    groupId: groupId,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: tmId,
                },
            })
            .get(`/tms/${tmId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: tmId,
                },
            })
            .delete(`/tms/${tmId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .patch(
                `/tms/${tmId}`,
                [
                    {
                        value: name,
                        op: PatchOperation.REPLACE,
                        path: '/name',
                    },
                ],
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: tmId,
                    name: name,
                },
            })
            .get(`/tms/${tmId}/exports/${exportId}/download`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    url: url,
                },
            })
            .post(
                `/tms/${tmId}/exports`,
                {},
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    identifier: exportId,
                },
            })
            .get(`/tms/${tmId}/exports/${exportId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    identifier: exportId,
                },
            })
            .post(
                `/tms/${tmId}/imports`,
                {
                    storageId: storageId,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    identifier: importId,
                },
            })
            .get(`/tms/${tmId}/imports/${importId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    identifier: importId,
                },
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
            groupId: groupId,
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
        const tm = await api.editTm(tmId, [
            {
                op: PatchOperation.REPLACE,
                path: '/name',
                value: name,
            },
        ]);
        expect(tm.data.id).toBe(tmId);
        expect(tm.data.name).toBe(name);
    });

    it('Download TM', async () => {
        const link = await api.downloadTm(tmId, exportId);
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
            storageId: storageId,
        });
        expect(status.data.identifier).toBe(importId);
    });

    it('Check import status', async () => {
        const status = await api.checkImportStatus(tmId, importId);
        expect(status.data.identifier).toBe(importId);
    });
});
