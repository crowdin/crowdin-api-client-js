import * as nock from 'nock';
import { Credentials, TranslationStatus } from '../../src';

describe('Translation Status API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: TranslationStatus = new TranslationStatus(credentials);
    const projectId = 2;
    const branchId = 3;
    const directoryId = 4;
    const fileId = 5;
    const phrasesCount = 10;
    const languageId = 'uk';

    const limit = 25;
    const revalidationId = 'b5215a34-1305-4b21-8054-fc2eb252842f';

    beforeAll(() => {
        scope = nock(api.url)
            .get(`/projects/${projectId}/branches/${branchId}/languages/progress`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            phrases: {
                                total: phrasesCount,
                            },
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .get(`/projects/${projectId}/directories/${directoryId}/languages/progress`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            phrases: {
                                total: phrasesCount,
                            },
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .get(`/projects/${projectId}/languages/${languageId}/progress`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            phrases: {
                                total: phrasesCount,
                            },
                            fileId: fileId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .get(`/projects/${projectId}/languages/progress`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            phrases: {
                                total: phrasesCount,
                            },
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .get(`/projects/${projectId}/files/${fileId}/languages/progress`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            phrases: {
                                total: phrasesCount,
                            },
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .get(`/projects/${projectId}/qa-checks`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            languageId: languageId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(`/projects/${projectId}/qa-checks/revalidate`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(202, {
                data: {
                    identifier: revalidationId,
                    status: 'created',
                    progress: 0,
                    attributes: {
                        languageIds: [languageId],
                        qaCheckCategories: ['ai'],
                        failedOnly: false,
                    },
                    createdAt: '2025-09-23T11:51:08+00:00',
                    updatedAt: '2025-09-23T11:51:08+00:00',
                    startedAt: null,
                    finishedAt: null,
                },
            })
            .get(`/projects/${projectId}/qa-checks/revalidate/${revalidationId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    identifier: revalidationId,
                    status: 'finished',
                    progress: 100,
                    attributes: {
                        languageIds: [languageId],
                        qaCheckCategories: ['ai'],
                        failedOnly: false,
                    },
                    createdAt: '2025-09-23T11:51:08+00:00',
                    updatedAt: '2025-09-23T11:51:08+00:00',
                    startedAt: '2025-09-23T11:51:10+00:00',
                    finishedAt: '2025-09-23T11:51:20+00:00',
                },
            })
            .delete(`/projects/${projectId}/qa-checks/revalidate/${revalidationId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(204);
    });

    afterAll(() => {
        scope.done();
    });

    it('Get branch progress', async () => {
        const progress = await api.getBranchProgress(projectId, branchId);
        expect(progress.data.length).toBe(1);
        expect(progress.data[0].data.phrases.total).toBe(phrasesCount);
        expect(progress.pagination.limit).toBe(limit);
    });

    it('Get directory progress', async () => {
        const progress = await api.getDirectoryProgress(projectId, directoryId);
        expect(progress.data.length).toBe(1);
        expect(progress.data[0].data.phrases.total).toBe(phrasesCount);
        expect(progress.pagination.limit).toBe(limit);
    });

    it('Get language progress', async () => {
        const progress = await api.getLanguageProgress(projectId, languageId);
        expect(progress.data.length).toBe(1);
        expect(progress.data[0].data.phrases.total).toBe(phrasesCount);
        expect(progress.data[0].data.fileId).toBe(fileId);
        expect(progress.pagination.limit).toBe(limit);
    });

    it('Get project progress', async () => {
        const progress = await api.getProjectProgress(projectId);
        expect(progress.data.length).toBe(1);
        expect(progress.data[0].data.phrases.total).toBe(phrasesCount);
        expect(progress.pagination.limit).toBe(limit);
    });

    it('Get file progress', async () => {
        const progress = await api.getFileProgress(projectId, fileId);
        expect(progress.data.length).toBe(1);
        expect(progress.data[0].data.phrases.total).toBe(phrasesCount);
        expect(progress.pagination.limit).toBe(limit);
    });

    it('List QA Check Issues', async () => {
        const qaChecks = await api.listQaCheckIssues(projectId);
        expect(qaChecks.data.length).toBe(1);
        expect(qaChecks.data[0].data.languageId).toBe(languageId);
        expect(qaChecks.pagination.limit).toBe(limit);
    });

    it('Revalidate QA Checks', async () => {
        const revalidation = await api.revalidateQaChecks(projectId);
        expect(revalidation.data.identifier).toBe(revalidationId);
        expect(revalidation.data.status).toBe('created');
        expect(revalidation.data.progress).toBe(0);
    });

    it('Get QA Checks Revalidation Status', async () => {
        const revalidation = await api.getQaChecksRevalidationStatus(projectId, revalidationId);
        expect(revalidation.data.identifier).toBe(revalidationId);
        expect(revalidation.data.status).toBe('finished');
        expect(revalidation.data.progress).toBe(100);
    });

    it('Cancel QA Checks Revalidation', async () => {
        await api.cancelQaChecksRevalidation(projectId, revalidationId);
    });
});
