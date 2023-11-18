import * as nock from 'nock';
import { Credentials, Users } from '../../src';

describe('Users API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: Users = new Users(credentials);
    const id = 2;
    const projectId = 24;
    const memberId = 78;
    const email = 'test@test.com';

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get(`/projects/${projectId}/members`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: id,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                `/projects/${projectId}/members`,
                {
                    userIds: [id],
                    emails: [],
                    usernames: [],
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
                            id: memberId,
                        },
                    },
                ],
            })
            .get(`/projects/${projectId}/members/${memberId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: memberId,
                },
            })
            .put(
                `/projects/${projectId}/members/${memberId}`,
                {},
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: memberId,
                },
            })
            .delete(`/projects/${projectId}/members/${memberId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .get('/users', undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                '/users',
                {
                    email,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id,
                },
            })
            .get(`/users/${id}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: id,
                },
            })
            .delete(`/users/${id}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .patch(
                `/users/${id}`,
                [
                    {
                        value: email,
                        op: 'replace',
                        path: '/email',
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
                    id: id,
                },
            })
            .get('/user', undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: id,
                },
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List Project Members', async () => {
        const members = await api.listProjectMembers(projectId);
        expect(members.data.length).toBe(1);
        expect(members.data[0].data.id).toBe(id);
    });

    it('Add Project Member', async () => {
        const resp = await api.addProjectMember(projectId, {
            userIds: [id],
            emails: [],
            usernames: [],
        });
        expect(resp.added.length).toBe(1);
        expect(resp.added[0].data.id).toBe(memberId);
    });

    it('Get Project Member Permissions', async () => {
        const resp = await api.getProjectMemberPermissions(projectId, memberId);
        expect(resp.data.id).toBe(memberId);
    });

    it('Replace Project Member Permissions', async () => {
        const resp = await api.replaceProjectMemberPermissions(projectId, memberId, {});
        expect(resp.data.id).toBe(memberId);
    });

    it('Delete Member From Project', async () => {
        await api.deleteMemberFromProject(projectId, memberId);
    });

    it('List Users', async () => {
        const users = await api.listUsers();
        expect(users.data.length).toBe(1);
        expect(users.data[0].data.id).toBe(id);
        expect(users.pagination.limit).toBe(limit);
    });

    it('Invite User', async () => {
        const user = await api.inviteUser({
            email,
        });
        expect(user.data.id).toBe(id);
    });

    it('Get User Info', async () => {
        const user = await api.getUserInfo(id);
        expect(user.data.id).toBe(id);
    });

    it('Delete User', async () => {
        await api.deleteUser(id);
    });

    it('Edit User', async () => {
        const user = await api.editUser(id, [
            {
                op: 'replace',
                path: '/email',
                value: email,
            },
        ]);
        expect(user.data.id).toBe(id);
    });

    it('Get Authenticated User', async () => {
        const user = await api.getAuthenticatedUser();
        expect(user.data.id).toBe(id);
    });
});
