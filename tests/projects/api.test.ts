import * as nock from 'nock';
import * as crowdin from '../../src/index';

describe('Projects API', () => {

    let scope: nock.Scope;
    const api: crowdin.Projects.Api = new crowdin.Projects.Api('testUser', 'qwerty', 'testOrg');
    const projectId = 2;
    const projectName = 'testProject';
    const sourceLanguageId = 1;

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get('/projects')
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: [{
                    data: {
                        id: projectId,
                        name: projectName
                    }
                }],
                pagination: {
                    offset: 0,
                    limit: limit
                }
            })
            .post('/projects', {
                name: projectName,
                sourceLanguageId: sourceLanguageId,
                targetLanguageIds: []
            })
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: projectId,
                    name: projectName
                }
            })
            .get(`/projects/${projectId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: projectId,
                    name: projectName
                }
            })
            .delete(`/projects/${projectId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200)
            .patch(`/projects/${projectId}`, [{
                value: projectName,
                op: crowdin.PatchOperation.REPLACE,
                path: '/name'
            }])
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: projectId,
                    name: projectName
                }
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List projects', async () => {
        const projects = await api.listProjects();
        expect(projects.data.length).toBe(1);
        expect(projects.data[0].data.id).toBe(projectId);
        expect(projects.data[0].data.name).toBe(projectName);
        expect(projects.pagination.limit).toBe(limit);
    });

    it('Create project', async () => {
        const project = await api.createProject({
            name: projectName,
            sourceLanguageId: sourceLanguageId,
            targetLanguageIds: []
        });
        expect(project.data.id).toBe(projectId);
        expect(project.data.name).toBe(projectName);
    });

    it('Get project', async () => {
        const project = await api.getProject(projectId);
        expect(project.data.id).toBe(projectId);
        expect(project.data.name).toBe(projectName);
    });

    it('Delete project', async () => {
        await api.deleteProject(projectId);
    });

    it('Update project', async () => {
        const project = await api.updateProject(projectId, [{
            op: crowdin.PatchOperation.REPLACE,
            path: '/name',
            value: projectName
        }]);
        expect(project.data.id).toBe(projectId);
        expect(project.data.name).toBe(projectName);
    });
});