import * as nock from 'nock';
import * as crowdin from '../../src/index';

describe('Tasks API', () => {

    let scope: nock.Scope;
    const api: crowdin.Tasks.Api = new crowdin.Tasks.Api('testUser', 'qwerty', 'testOrg');
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
            .get(`/projects/${projectId}/tasks`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
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
            .post(`/projects/${projectId}/tasks`, {
                title: taskTitle,
                languageId: languageId,
                fileIds: [],
                type: type,
                workflowStepId: workflowStepId
            })
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: taskId
                }
            })
            .get(`/projects/${projectId}/tasks/${taskId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: taskId
                }
            })
            .delete(`/projects/${projectId}/tasks/${taskId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200)
            .patch(`/projects/${projectId}/tasks/${taskId}`, [{
                value: taskTitle,
                op: crowdin.PatchOperation.REPLACE,
                path: '/title'
            }])
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: taskId,
                    title: taskTitle
                }
            })
            .get(`/projects/${projectId}/tasks/statistics`)
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

    it('List tasks', async () => {
        const tasks = await api.listTasks(projectId);
        expect(tasks.data.length).toBe(1);
        expect(tasks.data[0].data.id).toBe(taskId);
        expect(tasks.pagination.limit).toBe(limit);
    });

    it('Create task', async () => {
        const task = await api.createTask(projectId, {
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

    it('Update task', async () => {
        const task = await api.updateTask(projectId, taskId, [{
            op: crowdin.PatchOperation.REPLACE,
            path: '/title',
            value: taskTitle
        }]);
        expect(task.data.id).toBe(taskId);
        expect(task.data.title).toBe(taskTitle);
    });

    it('List task statistic', async () => {
        const taskStatistic = await api.listTaskStatistic(projectId);
        expect(taskStatistic.data.length).toBe(1);
        expect(taskStatistic.data[0].data.total).toBe(total);
        expect(taskStatistic.pagination.limit).toBe(limit);
    });
});