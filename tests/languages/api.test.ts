import * as nock from 'nock';
import * as crowdin from '../../src/index';

describe('Languages API', () => {

    let scope: nock.Scope;
    const api: crowdin.Languages.Api = new crowdin.Languages.Api('testUser', 'qwerty', 'testOrg');
    const languageId = 2;

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get('/languages')
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: [{
                    data: {
                        id: languageId
                    }
                }],
                pagination: {
                    offset: 0,
                    limit: limit
                }
            })
            .get(`/languages/${languageId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: languageId
                }
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List supported languages', async () => {
        const languages = await api.listSupportedLanguages();
        expect(languages.data.length).toBe(1);
        expect(languages.data[0].data.id).toBe(languageId);
        expect(languages.pagination.limit).toBe(limit);
    });

    it('Get language', async () => {
        const language = await api.getLanguage(languageId);
        expect(language.data.id).toBe(languageId);
    });

});