import nock from 'nock';
import { Credentials, CustomSpellcheckers } from '../../src/index';

describe('Custom Spellcheckers API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: CustomSpellcheckers = new CustomSpellcheckers(credentials);
    const customSpellcheckerId = 2;

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get('/custom-spellcheckers', undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: customSpellcheckerId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .get(`/custom-spellcheckers/${customSpellcheckerId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: customSpellcheckerId,
                },
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List custom spellcheckers', async () => {
        const spellcheckers = await api.listCustomSpellcheckers();
        expect(spellcheckers.data.length).toBe(1);
        expect(spellcheckers.data[0].data.id).toBe(customSpellcheckerId);
        expect(spellcheckers.pagination.limit).toBe(limit);
    });

    it('Get custom spellchecker', async () => {
        const spellchecker = await api.getCustomSpellchecker(customSpellcheckerId);
        expect(spellchecker.data.id).toBe(customSpellcheckerId);
    });
});
