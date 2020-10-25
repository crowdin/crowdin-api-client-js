import * as nock from 'nock';
import { Credentials, Labels, PatchOperation } from '../../src/index';

describe('Labels API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: Labels = new Labels(credentials);
    const projectId = 2;
    const labelId = 3;
    const stringId = 4;
    const title = 'test';

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get(`/projects/${projectId}/labels`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: labelId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                `/projects/${projectId}/labels`,
                {
                    title,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: labelId,
                },
            })
            .get(`/projects/${projectId}/labels/${labelId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: labelId,
                },
            })
            .delete(`/projects/${projectId}/labels/${labelId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .patch(
                `/projects/${projectId}/labels/${labelId}`,
                [
                    {
                        value: title,
                        op: PatchOperation.REPLACE,
                        path: '/title',
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
                    id: labelId,
                    title,
                },
            })
            .post(
                `/projects/${projectId}/labels/${labelId}/strings`,
                {
                    stringIds: [stringId],
                },
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
                            id: stringId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .delete(`/projects/${projectId}/labels/${labelId}/strings`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .query({
                stringIds: stringId,
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: stringId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List labels', async () => {
        const labels = await api.listLabels(projectId);
        expect(labels.data.length).toBe(1);
        expect(labels.data[0].data.id).toBe(labelId);
        expect(labels.pagination.limit).toBe(limit);
    });

    it('Add label', async () => {
        const label = await api.addLabel(projectId, {
            title,
        });
        expect(label.data.id).toBe(labelId);
    });

    it('Get label', async () => {
        const label = await api.getLabel(projectId, labelId);
        expect(label.data.id).toBe(labelId);
    });

    it('Delete label', async () => {
        await api.deleteLabel(projectId, labelId);
    });

    it('Edit label', async () => {
        const label = await api.editLabel(projectId, labelId, [
            {
                op: PatchOperation.REPLACE,
                path: '/title',
                value: title,
            },
        ]);
        expect(label.data.id).toBe(labelId);
        expect(label.data.title).toBe(title);
    });

    it('Assign Label to Strings', async () => {
        const strings = await api.assignLabelToString(projectId, labelId, {
            stringIds: [stringId],
        });
        expect(strings.pagination.limit).toBe(limit);
        expect(strings.data.length).toBe(1);
        expect(strings.data[0].data.id).toBe(stringId);
    });

    it('Unassign Label to Strings', async () => {
        const strings = await api.unassignLabelFromString(projectId, labelId, `${stringId}`);
        expect(strings.pagination.limit).toBe(limit);
        expect(strings.data.length).toBe(1);
        expect(strings.data[0].data.id).toBe(stringId);
    });
});
