import * as nock from 'nock';
import * as crowdin from '../../src/index';

describe('Branches API', () => {

    let scope: nock.Scope;
    const api: crowdin.Branches.Api = new crowdin.Branches.Api('testUser', 'qwerty', 'testOrg');
    const projectId = 2;
    const branchName = 'master';
    const branchTitle = 'testTitle';

    const branchId = 123;
    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get(`/projects/${projectId}/branches`)
            .query({
                'account-key': api.accountKey,
                login: api.login,
                name: branchName
            })
            .reply(200, {
                data: [{
                    data: {
                        id: branchId
                    }
                }],
                pagination: {
                    offset: 0,
                    limit: limit
                }
            })
            .post(`/projects/${projectId}/branches`, {
                name: branchName
            })
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: branchId,
                    name: branchName
                }
            })
            .get(`/projects/${projectId}/branches/${branchId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: branchId,
                    name: branchName
                }
            })
            .delete(`/projects/${projectId}/branches/${branchId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200)
            .patch(`/projects/${projectId}/branches/${branchId}`, [{
                value: branchTitle,
                op: crowdin.PatchOperation.REPLACE,
                path: '/title'
            }])
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: branchId,
                    name: branchName,
                    title: branchTitle
                }
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List project branches', async () => {
        const branches = await api.listProjectBranches(projectId, branchName);
        expect(branches.data.length).toBe(1);
        expect(branches.data[0].data.id).toBe(branchId);
        expect(branches.pagination.limit).toBe(limit);
    });

    it('Create branch', async () => {
        const branch = await api.createBranch(projectId, {
            name: branchName
        });
        expect(branch.data.id).toBe(branchId);
        expect(branch.data.name).toBe(branchName);
    });

    it('Get branch', async () => {
        const branch = await api.getBranch(projectId, branchId);
        expect(branch.data.id).toBe(branchId);
        expect(branch.data.name).toBe(branchName);
    });

    it('Delete branch', async () => {
        await api.deleteBranch(projectId, branchId);
    });

    it('Update branch', async () => {
        const branch = await api.updateBranch(projectId, branchId, [{
            op: crowdin.PatchOperation.REPLACE,
            path: '/title',
            value: branchTitle
        }]);
        expect(branch.data.id).toBe(branchId);
        expect(branch.data.name).toBe(branchName);
        expect(branch.data.title).toBe(branchTitle);
    });
});