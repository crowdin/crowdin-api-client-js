import * as nock from 'nock';
import { Credentials, PatchOperation, Teams } from '../../src';

describe('Tasks API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: Teams = new Teams(credentials);
    const projectId = 2;
    const teamId = 3;
    const userId = 4;
    const name = 'Test team';

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .post(
                `/projects/${projectId}/teams`,
                {
                    teamId: teamId,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                added: {
                    id: teamId,
                },
            })
            .get('/teams', undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: teamId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                '/teams',
                {
                    name: name,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: teamId,
                },
            })
            .get(`/teams/${teamId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: teamId,
                },
            })
            .delete(`/teams/${teamId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .patch(
                `/teams/${teamId}`,
                [
                    {
                        value: name,
                        op: PatchOperation.REPLACE,
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
                    id: teamId,
                },
            })
            .get(`/teams/${teamId}/members`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: userId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                `/teams/${teamId}/members`,
                {
                    userIds: [userId],
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                added: [
                    {
                        data: {
                            id: userId,
                        },
                    },
                ],
            })
            .delete(`/teams/${teamId}/members`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .delete(`/teams/${teamId}/members/${userId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200);
    });

    afterAll(() => {
        scope.done();
    });

    it('Add team to project', async () => {
        const teams = await api.addTeamToProject(projectId, {
            teamId: teamId,
        });
        expect(teams.added.id).toBe(teamId);
    });

    it('List teams', async () => {
        const teams = await api.listTeams();
        expect(teams.data.length).toBe(1);
        expect(teams.data[0].data.id).toBe(teamId);
    });

    it('Add team', async () => {
        const team = await api.addTeam({
            name: name,
        });
        expect(team.data.id).toBe(teamId);
    });

    it('Get team', async () => {
        const team = await api.getTeam(teamId);
        expect(team.data.id).toBe(teamId);
    });

    it('Delete team', async () => {
        await api.deleteTeam(teamId);
    });

    it('Edit team', async () => {
        const team = await api.editTeam(teamId, [
            {
                op: PatchOperation.REPLACE,
                path: '/name',
                value: name,
            },
        ]);
        expect(team.data.id).toBe(teamId);
    });

    it('Team members list', async () => {
        const members = await api.teamMembersList(teamId);
        expect(members.data.length).toBe(1);
        expect(members.data[0].data.id).toBe(userId);
    });

    it('Add team members', async () => {
        const members = await api.addTeamMembers(teamId, {
            userIds: [userId],
        });
        expect(members.added.length).toBe(1);
        expect(members.added[0].data.id).toBe(userId);
    });

    it('Delete all team members', async () => {
        await api.deleteAllTeamMembers(teamId);
    });

    it('Delete team member', async () => {
        await api.deleteTeamMember(teamId, userId);
    });
});
