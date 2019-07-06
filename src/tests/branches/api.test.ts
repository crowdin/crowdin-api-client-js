import * as nock from 'nock';
import * as crowdin from '../../index';

describe('Branches API', () => {

    let scope: nock.Scope;
    const api: crowdin.Branches.Api = new crowdin.Branches.Api('testUser', 'qwerty', 'testOrg');
    const projectId = 2;
    const branchName = 'master';

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
                    limit: 25
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
});