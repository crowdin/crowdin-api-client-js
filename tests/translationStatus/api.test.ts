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
    const issueId = 21;
    const languageId = 'uk';

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .persist()
            .intercept(/.*/, 'OPTIONS')
            .reply(200, (undefined as unknown) as string, {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application:json',
                'Access-Control-Allow-Headers': 'Authorization',
            })
            .get(`/projects/${projectId}/issues`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: issueId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
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
            .get(`/projects/${projectId}/qa-check`, undefined, {
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
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List reported issues', async () => {
        const issues = await api.listReportedIssues(projectId);
        expect(issues.data.length).toBe(1);
        expect(issues.data[0].data.id).toBe(issueId);
        expect(issues.pagination.limit).toBe(limit);
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
});
