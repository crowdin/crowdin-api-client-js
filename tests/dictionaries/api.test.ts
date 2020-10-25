import * as nock from 'nock';
import { Credentials, Dictionaries, PatchOperation } from '../../src';

describe('Dictionaries API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: Dictionaries = new Dictionaries(credentials);
    const projectId = 19;
    const languageId = 'es';
    const word1 = 'Hello';
    const word2 = 'World';

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get(`/projects/${projectId}/dictionaries`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            languageId,
                            words: [word1, word2],
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .patch(
                `/projects/${projectId}/dictionaries/${languageId}`,
                [
                    {
                        op: PatchOperation.REMOVE,
                        path: '/words/0',
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
                    languageId,
                    words: [word2],
                },
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List Dictionaries', async () => {
        const dictionaries = await api.listDictionaries(projectId);
        expect(dictionaries.data.length).toBe(1);
        expect(dictionaries.data[0].data.languageId).toBe(languageId);
        expect(dictionaries.data[0].data.words.length).toBe(2);
        expect(dictionaries.data[0].data.words[0]).toBe(word1);
        expect(dictionaries.data[0].data.words[1]).toBe(word2);
        expect(dictionaries.pagination.limit).toBe(limit);
    });

    it('Edit Dictionary', async () => {
        const dictionary = await api.editDictionary(projectId, languageId, [
            {
                op: PatchOperation.REMOVE,
                path: '/words/0',
            },
        ]);
        expect(dictionary.data.languageId).toBe(languageId);
        expect(dictionary.data.words.length).toBe(1);
        expect(dictionary.data.words[0]).toBe(word2);
    });
});
