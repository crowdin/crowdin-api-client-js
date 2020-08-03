import * as nock from 'nock';
import { Credentials, PatchOperation, Tasks, TasksModel } from '../../src';

describe('Tasks API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: Tasks = new Tasks(credentials);
    const projectId = 2;
    const taskId = 3;
    const taskTitle = 'Test title';
    const languageId = 'fr';
    const workflowStepId = 40;
    const type = TasksModel.Type.TRANSLATE;

    const link = 'test.com';

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get(`/projects/${projectId}/tasks`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: taskId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                `/projects/${projectId}/tasks`,
                {
                    title: taskTitle,
                    languageId: languageId,
                    fileIds: [],
                    type: type,
                    workflowStepId: workflowStepId,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: taskId,
                },
            })
            .post(`/projects/${projectId}/tasks/${taskId}/exports`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    url: link,
                },
            })
            .get(`/projects/${projectId}/tasks/${taskId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: taskId,
                },
            })
            .delete(`/projects/${projectId}/tasks/${taskId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .patch(
                `/projects/${projectId}/tasks/${taskId}`,
                [
                    {
                        value: taskTitle,
                        op: PatchOperation.REPLACE,
                        path: '/title',
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
                    id: taskId,
                    title: taskTitle,
                },
            })
            .get('/user/tasks', undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: taskId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .patch(
                `/user/tasks/${taskId}?projectId=${projectId}`,
                [
                    {
                        value: taskTitle,
                        op: PatchOperation.REPLACE,
                        path: '/title',
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
                    id: taskId,
                    title: taskTitle,
                },
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
            type: type,
        });
        expect(task.data.id).toBe(taskId);
    });

    it('Export task strings', async () => {
        const res = await api.exportTaskStrings(projectId, taskId);
        expect(res.data.url).toBe(link);
    });

    it('Get task', async () => {
        const task = await api.getTask(projectId, taskId);
        expect(task.data.id).toBe(taskId);
    });

    it('Delete task', async () => {
        await api.deleteTask(projectId, taskId);
    });

    it('Edit task', async () => {
        const task = await api.editTask(projectId, taskId, [
            {
                op: PatchOperation.REPLACE,
                path: '/title',
                value: taskTitle,
            },
        ]);
        expect(task.data.id).toBe(taskId);
        expect(task.data.title).toBe(taskTitle);
    });

    it('List User Tasks', async () => {
        const tasks = await api.listUserTasks();
        expect(tasks.data.length).toBe(1);
        expect(tasks.data[0].data.id).toBe(taskId);
        expect(tasks.pagination.limit).toBe(limit);
    });

    it('Edit Task Archived Status', async () => {
        const task = await api.editTaskArchivedStatus(projectId, taskId, [
            {
                op: PatchOperation.REPLACE,
                path: '/title',
                value: taskTitle,
            },
        ]);
        expect(task.data.id).toBe(taskId);
        expect(task.data.title).toBe(taskTitle);
    });
});
