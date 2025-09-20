import * as nock from 'nock';
import { Credentials, Tasks } from '../../src';

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
    const link = 'test.com';
    const assigneeId = 1212;
    const commentId = 55;
    const commentText = 'This is a comment';

    const taskSettingsId = 222;
    const taskSettingsName = 'Test';
    const taskSettingsConfig = {
        languages: [
            {
                languageId,
                userIds: [1],
            },
        ],
    };

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
                    workflowStepId: workflowStepId,
                    assignees: [
                        {
                            id: assigneeId,
                        },
                    ],
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
            .post(
                `/projects/${projectId}/tasks/${taskId}/exports`,
                {},
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
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
                        op: 'replace',
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
            .get(`/projects/${projectId}/tasks/${taskId}/comments`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: commentId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                `/projects/${projectId}/tasks/${taskId}/comments`,
                {
                    text: commentText,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: commentId,
                },
            })
            .get(`/projects/${projectId}/tasks/${taskId}/comments/${commentId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: commentId,
                },
            })
            .delete(`/projects/${projectId}/tasks/${taskId}/comments/${commentId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .patch(
                `/projects/${projectId}/tasks/${taskId}/comments/${commentId}`,
                [
                    {
                        value: commentText,
                        op: 'replace',
                        path: '/text',
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
                    id: commentId,
                    text: commentText,
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
                        op: 'replace',
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
            .get(`/projects/${projectId}/tasks/settings-templates`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: taskSettingsId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                `/projects/${projectId}/tasks/settings-templates`,
                {
                    name: taskSettingsName,
                    config: taskSettingsConfig,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: taskSettingsId,
                },
            })
            .get(`/projects/${projectId}/tasks/settings-templates/${taskSettingsId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: taskSettingsId,
                },
            })
            .delete(`/projects/${projectId}/tasks/settings-templates/${taskSettingsId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .patch(
                `/projects/${projectId}/tasks/settings-templates/${taskSettingsId}`,
                [
                    {
                        value: taskSettingsName,
                        op: 'replace',
                        path: '/name',
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
                    id: taskSettingsId,
                    name: taskSettingsName,
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
            assignees: [
                {
                    id: assigneeId,
                },
            ],
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
                op: 'replace',
                path: '/title',
                value: taskTitle,
            },
        ]);
        expect(task.data.id).toBe(taskId);
        expect(task.data.title).toBe(taskTitle);
    });

    it('List tasks coments', async () => {
        const tasksComments = await api.listTasksComments(projectId, taskId);
        expect(tasksComments.data.length).toBe(1);
        expect(tasksComments.data[0].data.id).toBe(commentId);
        expect(tasksComments.pagination.limit).toBe(limit);
    });

    it('Add task comment', async () => {
        const taskComment = await api.addTaskComment(projectId, taskId, {
            text: commentText,
        });
        expect(taskComment.data.id).toBe(commentId);
    });

    it('Get task comment', async () => {
        const taskComment = await api.getTaskComment(projectId, taskId, commentId);
        expect(taskComment.data.id).toBe(commentId);
    });

    it('Delete task comment', async () => {
        await api.deleteTaskComment(projectId, taskId, commentId);
    });

    it('Edit task comment', async () => {
        const taskComment = await api.editTaskComment(projectId, taskId, commentId, [
            {
                op: 'replace',
                path: '/text',
                value: commentText,
            },
        ]);
        expect(taskComment.data.id).toBe(commentId);
        expect(taskComment.data.text).toBe(commentText);
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
                op: 'replace',
                path: '/title',
                value: taskTitle,
            },
        ]);
        expect(task.data.id).toBe(taskId);
        expect(task.data.title).toBe(taskTitle);
    });

    it('List task settings templates', async () => {
        const templates = await api.listTaskSettingsTemplates(projectId);
        expect(templates.data.length).toBe(1);
        expect(templates.data[0].data.id).toBe(taskSettingsId);
        expect(templates.pagination.limit).toBe(limit);
    });

    it('Add task settings template', async () => {
        const template = await api.addTaskSettingsTemplate(projectId, {
            name: taskSettingsName,
            config: taskSettingsConfig,
        });
        expect(template.data.id).toBe(taskSettingsId);
    });

    it('Get task settings template', async () => {
        const template = await api.getTaskSettingsTemplate(projectId, taskSettingsId);
        expect(template.data.id).toBe(taskSettingsId);
    });

    it('Delete task settings template', async () => {
        await api.deleteTaskSettingsTemplate(projectId, taskSettingsId);
    });

    it('Edit task settings template', async () => {
        const template = await api.editTaskSettingsTemplate(projectId, taskSettingsId, [
            {
                op: 'replace',
                path: '/name',
                value: taskSettingsName,
            },
        ]);
        expect(template.data.id).toBe(taskSettingsId);
        expect(template.data.name).toBe(taskSettingsName);
    });
});
