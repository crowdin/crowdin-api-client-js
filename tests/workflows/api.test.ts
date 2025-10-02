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
    const stringId = 123;
    const languageId = 'uk';

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
            .get(`/projects/${projectId}/workflow-steps/${id}/strings`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: stringId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
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
            })
            .get(`/projects/${projectId}/workflow-steps/${id}/languages/${languageId}/status`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            stringId: stringId,
                            languageId: languageId,
                            stepId: id,
                            status: 'DONE',
                            output: 'translated',
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .patch(`/projects/${projectId}/workflow-steps/${id}/languages/${languageId}/status`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            stringId: stringId,
                            languageId: languageId,
                            stepId: id,
                            status: 'DONE',
                            output: 'approved',
                        },
                    },
                ],
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

    it('List Strings on the Workflow Step', async () => {
        const strings = await api.listStringsOnTheWorkflowStep(projectId, id);
        expect(strings.data.length).toBe(1);
        expect(strings.data[0].data.id).toBe(stringId);
        expect(strings.pagination.limit).toBe(limit);
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

    it('Get Workflow Step String Status', async () => {
        const stringStatuses = await api.getWorkflowStepStringStatus(projectId, id, languageId);
        expect(stringStatuses.data.length).toBe(1);
        expect(stringStatuses.data[0].data.stringId).toBe(stringId);
        expect(stringStatuses.data[0].data.languageId).toBe(languageId);
        expect(stringStatuses.data[0].data.stepId).toBe(id);
        expect(stringStatuses.data[0].data.status).toBe('DONE');
        expect(stringStatuses.data[0].data.output).toBe('translated');
        expect(stringStatuses.pagination.limit).toBe(limit);
    });

    it('Update Workflow Step String Status', async () => {
        const request = [
            {
                op: 'replace' as const,
                path: `/${stringId}/output`,
                value: 'approved',
            },
        ];
        const result = await api.updateWorkflowStepStringStatus(projectId, id, languageId, request);
        expect(result.data.length).toBe(1);
        expect(result.data[0].data.stringId).toBe(stringId);
        expect(result.data[0].data.languageId).toBe(languageId);
        expect(result.data[0].data.stepId).toBe(id);
        expect(result.data[0].data.status).toBe('DONE');
        expect(result.data[0].data.output).toBe('approved');
    });
});
