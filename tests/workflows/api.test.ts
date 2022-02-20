import * as nock from 'nock';
import { Credentials, Workflows } from '../../src';

describe('Workflows API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: Workflows = new Workflows(credentials);
    const id = 2;
    const projectId = 4;

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get(`/projects/${projectId}/workflow-steps`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: id,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .get(`/projects/${projectId}/workflow-steps/${id}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: id,
                },
            })
            .get('/workflow-templates', undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: id,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .get(`/workflow-templates/${id}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: id,
                },
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List Workflow steps', async () => {
        const workflowSteps = await api.listWorkflowSteps(projectId);
        expect(workflowSteps.data.length).toBe(1);
        expect(workflowSteps.data[0].data.id).toBe(id);
        expect(workflowSteps.pagination.limit).toBe(limit);
    });

    it('Get Workflow step info', async () => {
        const workflowStep = await api.getWorkflowStep(projectId, id);
        expect(workflowStep.data.id).toBe(id);
    });

    it('List Workflow Templates', async () => {
        const workflows = await api.listWorkflowTemplates();
        expect(workflows.data.length).toBe(1);
        expect(workflows.data[0].data.id).toBe(id);
        expect(workflows.pagination.limit).toBe(limit);
    });

    it('Get Workflow Template Info', async () => {
        const workflow = await api.getWorkflowTemplateInfo(id);
        expect(workflow.data.id).toBe(id);
    });
});
