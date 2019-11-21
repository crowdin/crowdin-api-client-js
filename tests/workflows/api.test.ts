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

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
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
