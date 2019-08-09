import * as nock from 'nock';
import * as crowdin from '../../src/index';

describe('Translations API', () => {

    let scope: nock.Scope;
    const api: crowdin.Translations.Api = new crowdin.Translations.Api('testUser', 'qwerty', 'testOrg');
    const projectId = 2;
    const preTranslationId = '21';
    const pseudoTranslationBuildId = '21';
    const downloadLink = 'test.com';

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
            })
            .post(`/projects/${projectId}/pseudo-translations/builds`, {})
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    identifier: pseudoTranslationBuildId
                }
            })
            .get(`/projects/${projectId}/pseudo-translations/builds/${pseudoTranslationBuildId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    identifier: pseudoTranslationBuildId
                }
            })
            .get(`/projects/${projectId}/pseudo-translations/builds/download`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    url: downloadLink
                }
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('Pre-translate', async () => {
        const preTranslation = await api.preTranslate(projectId, {
            fileIds: [],
            languageIds: []
        });
        expect(preTranslation.data.identifier).toBe(preTranslationId);
    });

    it('Pre-translation status', async () => {
        const preTranslation = await api.preTranslationStatus(projectId, preTranslationId);
        expect(preTranslation.data.identifier).toBe(preTranslationId);
    });

    it('Build pseudo-translation', async () => {
        const pseudoTranslation = await api.buildPseudoTranslation(projectId, {});
        expect(pseudoTranslation.data.identifier).toBe(pseudoTranslationBuildId);
    });

    it('Check pseudo-translation build status', async () => {
        const pseudoTranslation = await api.checkPseudoTranslationBuildStatus(projectId, pseudoTranslationBuildId);
        expect(pseudoTranslation.data.identifier).toBe(pseudoTranslationBuildId);
    });

    it('Download pseudo-translation', async () => {
        const downloadLinkResp = await api.downloadPseudoTranslation(projectId);
        expect(downloadLinkResp.data.url).toBe(downloadLink);
    });
});