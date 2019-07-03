import * as crowdin from '../../index';

test('Project branches', () => {
    const branches = crowdin.Branches.Api.listProjectBranches(1);
    expect(branches.length).toBe(1);
    expect(branches[0].name).toBe('test');
});