import * as nock from 'nock';
import * as crowdin from '../../src/index';

describe('Directories API', () => {

    let scope: nock.Scope;
    const api: crowdin.Directories.Api = new crowdin.Directories.Api('testUser', 'qwerty', 'testOrg');
    const projectId = 2;
    const directoryName = 'folder1';
    const directoryTitle = 'testTitle';

    const directoryId = 444;
    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get(`/projects/${projectId}/directories`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: [{
                    data: {
                        id: directoryId,
                        name: directoryName
                    }
                }],
                pagination: {
                    offset: 0,
                    limit: limit
                }
            })
            .post(`/projects/${projectId}/directories`, {
                name: directoryName
            })
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: directoryId,
                    name: directoryName
                }
            })
            .get(`/projects/${projectId}/directories/${directoryId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: directoryId,
                    name: directoryName
                }
            })
            .delete(`/projects/${projectId}/directories/${directoryId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200)
            .patch(`/projects/${projectId}/directories/${directoryId}`, [{
                value: directoryTitle,
                op: crowdin.PatchOperation.REPLACE,
                path: '/title'
            }])
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: directoryId,
                    name: directoryName,
                    title: directoryTitle
                }
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List project directories', async () => {
        const directories = await api.listProjectDirectories(projectId);
        expect(directories.data.length).toBe(1);
        expect(directories.data[0].data.id).toBe(directoryId);
        expect(directories.data[0].data.name).toBe(directoryName);
        expect(directories.pagination.limit).toBe(limit);
    });

    it('Create directory', async () => {
        const directory = await api.createDirectory(projectId, {
            name: directoryName
        });
        expect(directory.data.id).toBe(directoryId);
        expect(directory.data.name).toBe(directoryName);
    });

    it('Get directory', async () => {
        const directory = await api.getDirectory(projectId, directoryId);
        expect(directory.data.id).toBe(directoryId);
        expect(directory.data.name).toBe(directoryName);
    });

    it('Delete directory', async () => {
        await api.deleteDirectory(projectId, directoryId);
    });

    it('Update directory', async () => {
        const directory = await api.updateDirectory(projectId, directoryId, [{
            op: crowdin.PatchOperation.REPLACE,
            path: '/title',
            value: directoryTitle
        }]);
        expect(directory.data.id).toBe(directoryId);
        expect(directory.data.name).toBe(directoryName);
        expect(directory.data.title).toBe(directoryTitle);
    });
});