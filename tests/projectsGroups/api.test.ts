import * as nock from 'nock';
import * as crowdin from '../../src/index';

describe('Projects and Groups API', () => {

    let scope: nock.Scope;
    const api: crowdin.ProjectsGroups.Api = new crowdin.ProjectsGroups.Api('testUser', 'qwerty', 'testOrg');
    const projectId = 2;
    const groupId = 1;
    const projectName = 'testProject';
    const groupName = 'testGroup';
    const sourceLanguageId = 1;

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get('/groups')
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: [{
                    data: {
                        id: groupId
                    }
                }],
                pagination: {
                    offset: 0,
                    limit: limit
                }
            })
            .post('/groups', {
                name: groupName
            })
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: groupId
                }
            })
            .get(`/groups/${groupId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: groupId
                }
            })
            .delete(`/groups/${groupId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200)
            .patch(`/groups/${groupId}`, [{
                value: groupName,
                op: crowdin.PatchOperation.REPLACE,
                path: '/name'
            }])
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: groupId,
                    name: groupName
                }
            })
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
                groupId: groupId
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
            })
            .get(`/projects/${projectId}/settings`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    projectId: projectId
                }
            })
            .patch(`/projects/${projectId}/settings`, [{
                value: true,
                op: crowdin.PatchOperation.REPLACE,
                path: '/publicDownloads'
            }])
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    projectId: projectId,
                    publicDownloads: true
                }
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List groups', async () => {
        const groups = await api.listGroups();
        expect(groups.data.length).toBe(1);
        expect(groups.data[0].data.id).toBe(groupId);
        expect(groups.pagination.limit).toBe(limit);
    });

    it('Add group', async () => {
        const group = await api.addGroup({
            name: groupName
        });
        expect(group.data.id).toBe(groupId);
    });

    it('Get group', async () => {
        const group = await api.getGroup(groupId);
        expect(group.data.id).toBe(groupId);
    });

    it('Delete group', async () => {
        await api.deleteGroup(groupId);
    });

    it('Edit group', async () => {
        const group = await api.editGroup(groupId, [{
            op: crowdin.PatchOperation.REPLACE,
            path: '/name',
            value: groupName
        }]);
        expect(group.data.id).toBe(groupId);
        expect(group.data.name).toBe(groupName);
    });

    it('List projects', async () => {
        const projects = await api.listProjects();
        expect(projects.data.length).toBe(1);
        expect(projects.data[0].data.id).toBe(projectId);
        expect(projects.data[0].data.name).toBe(projectName);
        expect(projects.pagination.limit).toBe(limit);
    });

    it('Add project', async () => {
        const project = await api.addProject({
            name: projectName,
            sourceLanguageId: sourceLanguageId,
            groupId: groupId
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

    it('Edit project', async () => {
        const project = await api.editProject(projectId, [{
            op: crowdin.PatchOperation.REPLACE,
            path: '/name',
            value: projectName
        }]);
        expect(project.data.id).toBe(projectId);
        expect(project.data.name).toBe(projectName);
    });

    it('Get project settings', async () => {
        const settings = await api.getProjectSettings(projectId);
        expect(settings.data.projectId).toBe(projectId);
    });

    it('Edit project settings', async () => {
        const settings = await api.editProjectSettings(projectId, [{
            op: crowdin.PatchOperation.REPLACE,
            path: '/publicDownloads',
            value: true
        }]);
        expect(settings.data.projectId).toBe(projectId);
        expect(settings.data.publicDownloads).toBe(true);
    });
});