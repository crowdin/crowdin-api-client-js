import * as nock from 'nock';
import * as crowdin from '../../src/index';

describe('Issues API', () => {

    let scope: nock.Scope;
    const api: crowdin.Issues.Api = new crowdin.Issues.Api('testUser', 'qwerty', 'testOrg');
    const projectId = 2;
    const issueId = 21;
    const total = 1;

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get(`/projects/${projectId}/issues`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: [{
                    data: {
                        id: issueId
                    }
                }],
                pagination: {
                    offset: 0,
                    limit: limit
                }
            })
            .get(`/projects/${projectId}/issues/statistics`)
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

    it('List issues', async () => {
        const issues = await api.listIssues(projectId);
        expect(issues.data.length).toBe(1);
        expect(issues.data[0].data.id).toBe(issueId);
        expect(issues.pagination.limit).toBe(limit);
    });

    it('List issue statistics', async () => {
        const issues = await api.listIssueStatistics(projectId);
        expect(issues.data.length).toBe(1);
        expect(issues.data[0].data.total).toBe(total);
        expect(issues.pagination.limit).toBe(limit);
    });
});