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

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get('/users', undefined, {
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
            .get('/user', undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: id,
                },
            })
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
            .get(`/projects/${projectId}/members/${id}`, undefined, {
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

    it('List Users', async () => {
        const users = await api.listUsers();
        expect(users.data.length).toBe(1);
        expect(users.data[0].data.id).toBe(id);
        expect(users.pagination.limit).toBe(limit);
    });

    it('Get User Info', async () => {
        const user = await api.getUserInfo(id);
        expect(user.data.id).toBe(id);
    });

    it('Get Authenticated User', async () => {
        const user = await api.getAuthenticatedUser();
        expect(user.data.id).toBe(id);
    });

    it('List Project Members', async () => {
        const members = await api.listProjectMembers(projectId);
        expect(members.data.length).toBe(1);
        expect(members.data[0].data.id).toBe(id);
    });

    it('Get Member Info', async () => {
        const user = await api.getMemberInfo(projectId, id);
        expect(user.data.id).toBe(id);
    });
});
