import * as nock from 'nock';
import { Credentials, TranslationMemory } from '../../src';

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
    const projectId = 77;
    const exportId = '3';
    const importId = '4';
    const name = 'test';
    const url = 'test.com';
    const languageId = 'fr';
    const segmentId = 123;
    const segmentRecordId = 456;
    const segmentRecordText = 'test';

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
                    name,
                    groupId,
                    languageId,
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
                        op: 'replace',
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
            .get(`/tms/${tmId}/segments`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: segmentId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                `/tms/${tmId}/segments`,
                {
                    records: [
                        {
                            languageId,
                            text: segmentRecordText,
                        },
                    ],
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: segmentId,
                },
            })
            .delete(`/tms/${tmId}/segments`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
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
                `/projects/${projectId}/tms/concordance`,
                {
                    sourceLanguageId: languageId,
                    targetLanguageId: languageId,
                    autoSubstitution: true,
                    minRelevant: 60,
                    expressions: ['Welcome!'],
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: [
                    {
                        data: {
                            tm: {
                                id: tmId,
                            },
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
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
            })
            .get(`/tms/${tmId}/segments/${segmentId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: segmentId,
                },
            })
            .delete(`/tms/${tmId}/segments/${segmentId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .patch(
                `/tms/${tmId}/segments/${segmentId}`,
                [
                    {
                        value: segmentRecordText,
                        op: 'replace',
                        path: `/records/${segmentRecordId}/text`,
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
                    id: segmentId,
                },
            })
            .delete(`/tms/${tmId}/segments/${segmentId}/records/${segmentRecordId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .patch(
                `/tms/${tmId}/segments/${segmentId}/records/${segmentRecordId}`,
                [
                    {
                        value: segmentRecordText,
                        op: 'replace',
                        path: '/text',
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
                    id: segmentId,
                },
            })
            .post(
                `/tms/${tmId}/segments/${segmentId}/records`,
                {
                    records: [
                        {
                            languageId,
                            text: segmentRecordText,
                        },
                    ],
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: segmentId,
                },
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List TM', async () => {
        const tms = await api.listTm({ groupId });
        expect(tms.data.length).toBe(1);
        expect(tms.data[0].data.id).toBe(tmId);
        expect(tms.pagination.limit).toBe(limit);
    });

    it('Add TM', async () => {
        const tm = await api.addTm({
            name,
            groupId,
            languageId,
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
                op: 'replace',
                path: '/name',
                value: name,
            },
        ]);
        expect(tm.data.id).toBe(tmId);
        expect(tm.data.name).toBe(name);
    });

    it('List TM Segments', async () => {
        const segments = await api.listTmSegments(tmId);
        expect(segments.data.length).toBe(1);
        expect(segments.data[0].data.id).toBe(segmentId);
    });

    it('Create TM Segment', async () => {
        const segment = await api.addTmSegment(tmId, {
            records: [
                {
                    languageId,
                    text: segmentRecordText,
                },
            ],
        });
        expect(segment.data.id).toBe(segmentId);
    });

    it('Clear TM', async () => {
        await api.clearTm(tmId);
    });

    it('Download TM', async () => {
        const link = await api.downloadTm(tmId, exportId);
        expect(link.data.url).toBe(url);
    });

    it('Concordance search in TMs', async () => {
        const res = await api.concordanceSearch(projectId, {
            autoSubstitution: true,
            expressions: ['Welcome!'],
            minRelevant: 60,
            sourceLanguageId: languageId,
            targetLanguageId: languageId,
        });
        expect(res.data.length).toBe(1);
        expect(res.data[0].data.tm.id).toBe(tmId);
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
            storageId,
        });
        expect(status.data.identifier).toBe(importId);
    });

    it('Check import status', async () => {
        const status = await api.checkImportStatus(tmId, importId);
        expect(status.data.identifier).toBe(importId);
    });

    it('Get TM Segment', async () => {
        const segment = await api.getTmSegment(tmId, segmentId);
        expect(segment.data.id).toBe(segmentId);
    });

    it('Delete TM Segment', async () => {
        await api.deleteTmSegment(tmId, segmentId);
    });

    it('Edit TM Segment', async () => {
        const segment = await api.editTmSegment(tmId, segmentId, [
            {
                value: segmentRecordText,
                op: 'replace',
                path: `/records/${segmentRecordId}/text`,
            },
        ]);
        expect(segment.data.id).toBe(segmentId);
    });

    it('Delete TM Segment Record', async () => {
        await api.deleteTmSegmentRecord(tmId, segmentId, segmentRecordId);
    });

    it('Edit TM Segment Record', async () => {
        const segment = await api.editTmSegmentRecord(tmId, segmentId, segmentRecordId, [
            {
                op: 'replace',
                path: '/text',
                value: segmentRecordText,
            },
        ]);
        expect(segment.data.id).toBe(segmentId);
    });

    it('Create TM Segment Records', async () => {
        const segment = await api.addTmSegmentRecords(tmId, segmentId, {
            records: [
                {
                    languageId,
                    text: segmentRecordText,
                },
            ],
        });
        expect(segment.data.id).toBe(segmentId);
    });
});
