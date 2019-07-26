import * as nock from 'nock';
import * as crowdin from '../../src/index';

describe('Pseudo-translations API', () => {

    let scope: nock.Scope;
    const api: crowdin.PseudoTranslations.Api = new crowdin.PseudoTranslations.Api('testUser', 'qwerty', 'testOrg');
    const projectId = 2;
    const pseudoTranslationBuildId = '21';
    const downloadLink = 'test.com';

    beforeAll(() => {
        scope = nock(api.url)
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

    it('Build pseudo-translation files', async () => {
        const pseudoTranslation = await api.buildPseudoTranslationFiles(projectId, {});
        expect(pseudoTranslation.data.identifier).toBe(pseudoTranslationBuildId);
    });

    it('View pseudo-translation build status', async () => {
        const pseudoTranslation = await api.viewPseudoTranslationBuildStatus(projectId, pseudoTranslationBuildId);
        expect(pseudoTranslation.data.identifier).toBe(pseudoTranslationBuildId);
    });

    it('Get pseudo-translation last build download link', async () => {
        const downloadLinkResp = await api.getPseudoTranslationLastBuildDownloadLink(projectId);
        expect(downloadLinkResp.data.url).toBe(downloadLink);
    });
});