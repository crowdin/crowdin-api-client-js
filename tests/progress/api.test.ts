import * as nock from 'nock';
import * as crowdin from '../../src/index';

describe('Progress API', () => {

    let scope: nock.Scope;
    const api: crowdin.Progress.Api = new crowdin.Progress.Api('testUser', 'qwerty', 'testOrg');
    const projectId = 2;
    const branchId = 3;
    const directoryId = 4;
    const fileId = 5;
    const phrasesCount = 10;

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get(`/projects/${projectId}/branches/${branchId}/languages/progress`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: [{
                    data: {
                        phrasesCount: phrasesCount
                    }
                }],
                pagination: {
                    offset: 0,
                    limit: limit
                }
            })
            .get(`/projects/${projectId}/directories/${directoryId}/languages/progress`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: [{
                    data: {
                        phrasesCount: phrasesCount
                    }
                }],
                pagination: {
                    offset: 0,
                    limit: limit
                }
            })
            .get(`/projects/${projectId}/files/${fileId}/languages/progress`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: [{
                    data: {
                        phrasesCount: phrasesCount
                    }
                }],
                pagination: {
                    offset: 0,
                    limit: limit
                }
            })
            .get(`/projects/${projectId}/languages/progress`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: [{
                    data: {
                        phrasesCount: phrasesCount
                    }
                }],
                pagination: {
                    offset: 0,
                    limit: limit
                }
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('Get branch translation progress', async () => {
        const progress = await api.getBranchTranslationProgress(projectId, branchId);
        expect(progress.data.length).toBe(1);
        expect(progress.data[0].data.phrasesCount).toBe(phrasesCount);
        expect(progress.pagination.limit).toBe(limit);
    });

    it('Get directory translation progress', async () => {
        const progress = await api.getDirectoryTranslationProgress(projectId, directoryId);
        expect(progress.data.length).toBe(1);
        expect(progress.data[0].data.phrasesCount).toBe(phrasesCount);
        expect(progress.pagination.limit).toBe(limit);
    });

    it('Get file translation progress', async () => {
        const progress = await api.getFileTranslationProgress(projectId, fileId);
        expect(progress.data.length).toBe(1);
        expect(progress.data[0].data.phrasesCount).toBe(phrasesCount);
        expect(progress.pagination.limit).toBe(limit);
    });

    it('Get project translation progress', async () => {
        const progress = await api.getProjectTranslationProgress(projectId);
        expect(progress.data.length).toBe(1);
        expect(progress.data[0].data.phrasesCount).toBe(phrasesCount);
        expect(progress.pagination.limit).toBe(limit);
    });
});