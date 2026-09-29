import nock from 'nock';
import { Credentials, Placeholders } from '../../src/index';

describe('Placeholders API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: Placeholders = new Placeholders(credentials);
    const projectId = 2;
    const customPlaceholderId = 3;
    const projectPlaceholderId = 4;
    const definition = 'start, then "http", end';
    const systemPlaceholderId = 'bracesDouble';

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get('/custom-placeholders', undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: customPlaceholderId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                '/custom-placeholders',
                {
                    definition,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(201, {
                data: {
                    id: customPlaceholderId,
                },
            })
            .get(`/custom-placeholders/${customPlaceholderId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: customPlaceholderId,
                },
            })
            .patch(
                `/custom-placeholders/${customPlaceholderId}`,
                [
                    {
                        op: 'replace',
                        path: '/description',
                        value: 'test',
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
                    id: customPlaceholderId,
                },
            })
            .delete(`/custom-placeholders/${customPlaceholderId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(204)
            .get(`/projects/${projectId}/placeholders`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: projectPlaceholderId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                `/projects/${projectId}/placeholders`,
                {
                    customPlaceholderId,
                    type: 'high',
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(201, {
                data: {
                    id: projectPlaceholderId,
                },
            })
            .get(`/projects/${projectId}/placeholders/${projectPlaceholderId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: projectPlaceholderId,
                },
            })
            .patch(
                `/projects/${projectId}/placeholders/${projectPlaceholderId}`,
                [
                    {
                        op: 'replace',
                        path: '/isBlocking',
                        value: true,
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
                    id: projectPlaceholderId,
                },
            })
            .delete(`/projects/${projectId}/placeholders/${projectPlaceholderId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(204)
            .get(`/projects/${projectId}/system-placeholders`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: systemPlaceholderId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .patch(
                `/projects/${projectId}/system-placeholders`,
                [
                    {
                        op: 'replace',
                        path: `/${systemPlaceholderId}/isEnabled`,
                        value: false,
                    },
                ],
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: [
                    {
                        data: {
                            id: systemPlaceholderId,
                        },
                    },
                ],
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List custom placeholders', async () => {
        const placeholders = await api.listCustomPlaceholders();
        expect(placeholders.data.length).toBe(1);
        expect(placeholders.data[0].data.id).toBe(customPlaceholderId);
        expect(placeholders.pagination.limit).toBe(limit);
    });

    it('Add custom placeholder', async () => {
        const placeholder = await api.addCustomPlaceholder({ definition });
        expect(placeholder.data.id).toBe(customPlaceholderId);
    });

    it('Get custom placeholder', async () => {
        const placeholder = await api.getCustomPlaceholder(customPlaceholderId);
        expect(placeholder.data.id).toBe(customPlaceholderId);
    });

    it('Edit custom placeholder', async () => {
        const placeholder = await api.editCustomPlaceholder(customPlaceholderId, [
            {
                op: 'replace',
                path: '/description',
                value: 'test',
            },
        ]);
        expect(placeholder.data.id).toBe(customPlaceholderId);
    });

    it('Delete custom placeholder', async () => {
        await api.deleteCustomPlaceholder(customPlaceholderId);
    });

    it('List project placeholders', async () => {
        const placeholders = await api.listProjectPlaceholders(projectId);
        expect(placeholders.data.length).toBe(1);
        expect(placeholders.data[0].data.id).toBe(projectPlaceholderId);
        expect(placeholders.pagination.limit).toBe(limit);
    });

    it('Add project placeholder', async () => {
        const placeholder = await api.addProjectPlaceholder(projectId, { customPlaceholderId, type: 'high' });
        expect(placeholder.data.id).toBe(projectPlaceholderId);
    });

    it('Get project placeholder', async () => {
        const placeholder = await api.getProjectPlaceholder(projectId, projectPlaceholderId);
        expect(placeholder.data.id).toBe(projectPlaceholderId);
    });

    it('Edit project placeholder', async () => {
        const placeholder = await api.editProjectPlaceholder(projectId, projectPlaceholderId, [
            {
                op: 'replace',
                path: '/isBlocking',
                value: true,
            },
        ]);
        expect(placeholder.data.id).toBe(projectPlaceholderId);
    });

    it('Delete project placeholder', async () => {
        await api.deleteProjectPlaceholder(projectId, projectPlaceholderId);
    });

    it('List system placeholders', async () => {
        const placeholders = await api.listSystemPlaceholders(projectId);
        expect(placeholders.data.length).toBe(1);
        expect(placeholders.data[0].data.id).toBe(systemPlaceholderId);
        expect(placeholders.pagination.limit).toBe(limit);
    });

    it('System placeholders batch operations', async () => {
        const placeholders = await api.systemPlaceholdersBatchOperations(projectId, [
            {
                op: 'replace',
                path: `/${systemPlaceholderId}/isEnabled`,
                value: false,
            },
        ]);
        expect(placeholders.data[0].data.id).toBe(systemPlaceholderId);
    });
});
