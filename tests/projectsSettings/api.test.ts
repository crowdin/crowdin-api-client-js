import * as nock from 'nock';
import * as crowdin from '../../src/index';

describe('Projects Settings API', () => {

    let scope: nock.Scope;
    const api: crowdin.ProjectsSettings.Api = new crowdin.ProjectsSettings.Api('testUser', 'qwerty', 'testOrg');
    const projectId = 2;
    const storageId = 21;
    const backgroundId = 12;
    const logoId = 55;

    beforeAll(() => {
        scope = nock(api.url)
            .put(`/projects/${projectId}/background`, {
                storageId: storageId
            })
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: backgroundId
                }
            })
            .delete(`/projects/${projectId}/background`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200)
            .put(`/projects/${projectId}/logo`, {
                storageId: storageId
            })
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: logoId
                }
            })
            .delete(`/projects/${projectId}/logo`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200)
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

    it('Upload project background', async () => {
        const response = await api.uploadProjectBackground(projectId, {
            storageId: storageId
        });
        expect(response.data.id).toBe(backgroundId);
    });

    it('Delete project background', async () => {
        await api.deleteProjectBackground(projectId);
    });

    it('Upload project logo', async () => {
        const response = await api.updateProjectLogo(projectId, {
            storageId: storageId
        });
        expect(response.data.id).toBe(logoId);
    });

    it('Delete project logo', async () => {
        await api.deleteProjectLogo(projectId);
    });

    it('Get project settings', async () => {
        const settings = await api.getProjectSettings(projectId);
        expect(settings.data.projectId).toBe(projectId);
    });

    it('Update project settings', async () => {
        const settings = await api.updateProjectSettings(projectId, [{
            op: crowdin.PatchOperation.REPLACE,
            path: '/publicDownloads',
            value: true
        }]);
        expect(settings.data.projectId).toBe(projectId);
        expect(settings.data.publicDownloads).toBe(true);
    });
});