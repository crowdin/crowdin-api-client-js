import * as nock from 'nock';
import { Credentials, Languages, PatchOperation, LanguagesModel } from '../../src';

describe('Languages API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: Languages = new Languages(credentials);
    const languageId = 2;
    const name = 'Test';
    const code = '12';
    const localeCode = 't';
    const threeLettersCode = 'tst';
    const textDirection = LanguagesModel.TextDirection.LTR;

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get('/languages', undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: languageId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .get(`/languages/${languageId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: languageId,
                },
            })
            .post(
                '/languages',
                {
                    name: name,
                    code: code,
                    localeCode: localeCode,
                    threeLettersCode: threeLettersCode,
                    textDirection: textDirection,
                    pluralCategoryNames: []
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: languageId
                },
            })
            .delete(`/languages/${languageId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .patch(
                `/languages/${languageId}`,
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
                    id: languageId,
                    name: name
                },
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

    it('Add custom language', async () => {
        const language = await api.addCustomLanguage({
            name: name,
            code: code,
            localeCode: localeCode,
            pluralCategoryNames: [],
            textDirection: textDirection,
            threeLettersCode: threeLettersCode
        });
        expect(language.data.id).toBe(languageId);
    });

    it('Delete custom language', async () => {
        await api.deleteCustomLanguage(languageId);
    });

    it('Edit custom language', async () => {
        const language = await api.editCustomLanguage(languageId, [{
            value: name,
            op: PatchOperation.REPLACE,
            path: '/name'
        }]);
        expect(language.data.id).toBe(languageId);
        expect(language.data.name).toBe(name);
    });
});
