import * as nock from 'nock';
import * as crowdin from '../../src/index';

describe('Tasks API', () => {

    let scope: nock.Scope;
    const credentials: crowdin.Credentials = {
        token: 'testToken',
        organization: 'testOrg'
    };
    const api: crowdin.Tasks.Api = new crowdin.Tasks.Api(credentials);
    const projectId = 2;
    const taskId = 3;
    const taskTitle = 'Test title';
    const languageId = 8;
    const workflowStepId = 40;
    const type = crowdin.Tasks.Model.Type.TRANSLATE;
    const total = 100;

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get(`/projects/${projectId}/tasks`, undefined,
                {
                    reqheaders: {
                        'Authorization': `Bearer ${api.token}`
                    }
                }
            )
            .reply(200, {
                data: [{
                    data: {
                        id: taskId
                    }
                }],
                pagination: {
                    offset: 0,
                    limit: limit
                }
            })
            .post(`/projects/${projectId}/tasks`,
                {
                    title: taskTitle,
                    languageId: languageId,
                    fileIds: [],
                    type: type,
                    workflowStepId: workflowStepId
                },
                {
                    reqheaders: {
                        'Authorization': `Bearer ${api.token}`
                    }
                }
            )
            .reply(200, {
                data: {
                    id: taskId
                }
            })
            .get(`/projects/${projectId}/tasks/${taskId}`, undefined,
                {
                    reqheaders: {
                        'Authorization': `Bearer ${api.token}`
                    }
                }
            )
            .reply(200, {
                data: {
                    id: taskId
                }
            })
            .delete(`/projects/${projectId}/tasks/${taskId}`, undefined,
                {
                    reqheaders: {
                        'Authorization': `Bearer ${api.token}`
                    }
                }
            )
            .reply(200)
            .patch(`/projects/${projectId}/tasks/${taskId}`,
                [{
                    value: taskTitle,
                    op: crowdin.PatchOperation.REPLACE,
                    path: '/title'
                }],
                {
                    reqheaders: {
                        'Authorization': `Bearer ${api.token}`
                    }
                }
            )
            .reply(200, {
                data: {
                    id: taskId,
                    title: taskTitle
                }
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List tasks', async () => {
        const tasks = await api.listTasks(projectId);
        expect(tasks.data.length).toBe(1);
        expect(tasks.data[0].data.id).toBe(taskId);
        expect(tasks.pagination.limit).toBe(limit);
    });

    it('Add task', async () => {
        const task = await api.addTask(projectId, {
            title: taskTitle,
            languageId: languageId,
            workflowStepId: workflowStepId,
            fileIds: [],
            type: type
        });
        expect(task.data.id).toBe(taskId);
    });

    it('Get task', async () => {
        const task = await api.getTask(projectId, taskId);
        expect(task.data.id).toBe(taskId);
    });

    it('Delete task', async () => {
        await api.deleteTask(projectId, taskId);
    });

    it('Edit task', async () => {
        const task = await api.editTask(projectId, taskId, [{
            op: crowdin.PatchOperation.REPLACE,
            path: '/title',
            value: taskTitle
        }]);
        expect(task.data.id).toBe(taskId);
        expect(task.data.title).toBe(taskTitle);
    });

});