import * as nock from 'nock';
import * as crowdin from '../../src/index';

describe('Translation Quality Assurance API', () => {

    let scope: nock.Scope;
    const api: crowdin.TranslationQualityAssurance.Api = new crowdin.TranslationQualityAssurance.Api('testUser', 'qwerty', 'testOrg');
    const projectId = 2;
    const total = 33;

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get(`/projects/${projectId}/qa-check`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: [{
                    data: {
                        total: total
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

    it('List QA check statistics', async () => {
        const statistics = await api.listQaCheckStatistics(projectId);
        expect(statistics.data.length).toBe(1);
        expect(statistics.data[0].data.total).toBe(total);
        expect(statistics.pagination.limit).toBe(limit);
    });
});