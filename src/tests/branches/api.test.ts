import * as crowdin from '../../index';

describe('Branches API', () => {
    it('List project branches', () => {
        const api = new crowdin.Branches.Api('123', '456');
        const branches = api.listProjectBranches(1);
        expect(branches.data.length).toBe(1);
        expect(branches.data[0].data.name).toBe('test');
    });
});