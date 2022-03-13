import * as nock from 'nock';
import { Credentials, Issues } from '../../src';

describe('Issues API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: Issues = new Issues(credentials);
    const projectId = 2;
    const issueId = 21;

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get(`/projects/${projectId}/issues`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: issueId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .patch(
                `/projects/${projectId}/issues/${issueId}`,
                [
                    {
                        value: 'unresolved',
                        op: 'replace',
                        path: '/status',
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
                    id: issueId,
                    status: 'unresolved',
                },
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List reported issues', async () => {
        const issues = await api.listReportedIssues(projectId);
        expect(issues.data.length).toBe(1);
        expect(issues.data[0].data.id).toBe(issueId);
        expect(issues.pagination.limit).toBe(limit);
    });

    it('Edit issue', async () => {
        const issue = await api.editIssue(projectId, issueId, [
            {
                value: 'unresolved',
                op: 'replace',
                path: '/status',
            },
        ]);
        expect(issue.data.id).toBe(issueId);
        expect(issue.data.status).toBe('unresolved');
    });
});
