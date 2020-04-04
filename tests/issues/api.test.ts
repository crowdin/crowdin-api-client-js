import * as nock from 'nock';
import { Credentials, Issues, PatchOperation, IssuesModel } from '../../src';

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
            .persist()
            .intercept(/.*/, 'OPTIONS')
            .reply(200, (undefined as unknown) as string, {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application:json',
                'Access-Control-Allow-Headers': 'Authorization',
            })
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
                        value: IssuesModel.Status.UNRESOLVED,
                        op: PatchOperation.REPLACE,
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
                    status: IssuesModel.Status.UNRESOLVED,
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
                value: IssuesModel.Status.UNRESOLVED,
                op: PatchOperation.REPLACE,
                path: '/status',
            },
        ]);
        expect(issue.data.id).toBe(issueId);
        expect(issue.data.status).toBe(IssuesModel.Status.UNRESOLVED);
    });
});
