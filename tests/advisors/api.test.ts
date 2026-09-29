import nock from 'nock';
import { Advisors, Credentials } from '../../src/index';

describe('Advisors API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: Advisors = new Advisors(credentials);
    const projectId = 2;
    const checkId = '50fb3506-4127-4ba8-8296-f97dc7e3e0c3';
    const insightId = 3;
    const applicationIdentifier = 'example-app';
    const moduleKey = 'inspector';
    const inspectorKey = 'string_context_relevance';

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .post(
                `/projects/${projectId}/advisors/checks`,
                {
                    inspectors: [{ key: inspectorKey }],
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(202, {
                data: {
                    identifier: checkId,
                },
            })
            .get(`/projects/${projectId}/advisors/checks/${checkId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    identifier: checkId,
                },
            })
            .get(`/projects/${projectId}/advisors/insights`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .query({
                isDismissed: 'false',
                status: 'done,outdated',
                outcome: 'flagged',
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: insightId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .patch(
                `/projects/${projectId}/advisors/insights/${insightId}`,
                [
                    {
                        op: 'replace',
                        path: '/isDismissed',
                        value: true,
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
                    id: insightId,
                },
            })
            .put(
                `/projects/${projectId}/applications/${applicationIdentifier}/modules/${moduleKey}/advisors/insights`,
                {
                    outcome: 'flagged',
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(201);
    });

    afterAll(() => {
        scope.done();
    });

    it('Create advisor check', async () => {
        const check = await api.createAdvisorCheck(projectId, { inspectors: [{ key: inspectorKey }] });
        expect(check.data.identifier).toBe(checkId);
    });

    it('Get advisor check status', async () => {
        const check = await api.getAdvisorCheckStatus(projectId, checkId);
        expect(check.data.identifier).toBe(checkId);
    });

    it('List advisor insights', async () => {
        const insights = await api.listAdvisorInsights(projectId, {
            isDismissed: false,
            status: ['done', 'outdated'],
            outcome: ['flagged'],
        });
        expect(insights.data.length).toBe(1);
        expect(insights.data[0].data.id).toBe(insightId);
        expect(insights.pagination.limit).toBe(limit);
    });

    it('Edit advisor insight', async () => {
        const insight = await api.editAdvisorInsight(projectId, insightId, [
            {
                op: 'replace',
                path: '/isDismissed',
                value: true,
            },
        ]);
        expect(insight.data.id).toBe(insightId);
    });

    it('Create or update application advisor insight', async () => {
        await api.createOrUpdateApplicationAdvisorInsight(projectId, applicationIdentifier, moduleKey, {
            outcome: 'flagged',
        });
    });
});
