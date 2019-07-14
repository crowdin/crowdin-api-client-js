import * as nock from 'nock';
import * as crowdin from '../../src/index';

describe('Languages API', () => {

    let scope: nock.Scope;
    const api: crowdin.Languages.Api = new crowdin.Languages.Api('testUser', 'qwerty', 'testOrg');
    const languageId = 2;
    const languageName = 'english';
    const userId = 1;
    const code = '12';
    const localeCode = '34';
    const threeLettersCode = 'qwe';
    const textDirection = crowdin.Languages.Model.TextDirection.LTR;

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
            .post('/languages', {
                name: languageName,
                userId: userId,
                code: code,
                localeCode: localeCode,
                threeLettersCode: threeLettersCode,
                textDirection: textDirection,
                pluralCategoryNames: [],
            })
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: languageId
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
            })
            .delete(`/languages/${languageId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200)
            .patch(`/languages/${languageId}`, [{
                value: languageName,
                op: crowdin.PatchOperation.REPLACE,
                path: '/name'
            }])
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: languageId,
                    name: languageName
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

    it('Create language', async () => {
        const language = await api.createLanguage({
            name: languageName,
            userId: userId,
            code: code,
            localeCode: localeCode,
            threeLettersCode: threeLettersCode,
            textDirection: textDirection,
            pluralCategoryNames: []
        });
        expect(language.data.id).toBe(languageId);
    });

    it('Get language', async () => {
        const language = await api.getLanguage(languageId);
        expect(language.data.id).toBe(languageId);
    });

    it('Delete language', async () => {
        await api.deleteLanguage(languageId);
    });

    it('Update language', async () => {
        const language = await api.updateLanguage(languageId, [{
            op: crowdin.PatchOperation.REPLACE,
            path: '/name',
            value: languageName
        }]);
        expect(language.data.id).toBe(languageId);
        expect(language.data.name).toBe(languageName);
    });
});