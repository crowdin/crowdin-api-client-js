import * as nock from 'nock';
import * as crowdin from '../../src/index';

describe('Pre-Translation API', () => {

    let scope: nock.Scope;
    const api: crowdin.PreTranslation.Api = new crowdin.PreTranslation.Api('testUser', 'qwerty', 'testOrg');
    const projectId = 2;
    const preTranslationId = '21';

    beforeAll(() => {
        scope = nock(api.url)
            .post(`/projects/${projectId}/pre-translations`, {
                languageIds: [],
                fileIds: []
            })
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    identifier: preTranslationId
                }
            })
            .get(`/projects/${projectId}/pre-translations/${preTranslationId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    identifier: preTranslationId
                }
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('Pre-translate project files', async () => {
        const preTranslation = await api.preTranslateProjectFiles(projectId, {
            fileIds: [],
            languageIds: []
        });
        expect(preTranslation.data.identifier).toBe(preTranslationId);
    });

    it('Get status of pre-translation', async () => {
        const preTranslation = await api.getStatusOfPreTranslation(projectId, preTranslationId);
        expect(preTranslation.data.identifier).toBe(preTranslationId);
    });
});