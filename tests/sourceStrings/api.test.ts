import * as nock from 'nock';
import { Credentials, SourceStrings } from '../../src';

describe('Source Strings API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: SourceStrings = new SourceStrings(credentials);
    const projectId = 2;
    const stringIdentifier = '222';
    const stringId = 123;
    const stringText = 'text. Sample text';

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get(`/projects/${projectId}/strings`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: stringId,
                            text: stringText,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                `/projects/${projectId}/strings`,
                {
                    identifier: stringIdentifier,
                    text: stringText,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: stringId,
                    text: stringText,
                },
            })
            .patch(
                `/projects/${projectId}/strings`,
                [
                    {
                        value: stringText,
                        op: 'replace',
                        path: `/${stringId}/text`,
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
                            id: stringId,
                            text: stringText,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .get(`/projects/${projectId}/strings/${stringId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: stringId,
                    text: stringText,
                },
            })
            .delete(`/projects/${projectId}/strings/${stringId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .patch(
                `/projects/${projectId}/strings/${stringId}`,
                [
                    {
                        value: stringText,
                        op: 'replace',
                        path: '/text',
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
                    id: stringId,
                    text: stringText,
                },
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List project strings', async () => {
        const strings = await api.listProjectStrings(projectId);
        expect(strings.data.length).toBe(1);
        expect(strings.data[0].data.id).toBe(stringId);
        expect(strings.data[0].data.text).toBe(stringText);
        expect(strings.pagination.limit).toBe(limit);
    });

    it('Add string', async () => {
        const string = await api.addString(projectId, {
            identifier: stringIdentifier,
            text: stringText,
        });
        expect(string.data.id).toBe(stringId);
        expect(string.data.text).toBe(stringText);
    });

    it('String batch operations', async () => {
        const strings = await api.stringBatchOperations(projectId, [
            {
                op: 'replace',
                path: `/${stringId}/text`,
                value: stringText,
            },
        ]);
        expect(strings.data.length).toBe(1);
        const string = strings.data[0];
        expect(string.data.id).toBe(stringId);
        expect(string.data.text).toBe(stringText);
    });

    it('Get string', async () => {
        const string = await api.getString(projectId, stringId);
        expect(string.data.id).toBe(stringId);
        expect(string.data.text).toBe(stringText);
    });

    it('Delete string', async () => {
        await api.deleteString(projectId, stringId);
    });

    it('Edit string', async () => {
        const string = await api.editString(projectId, stringId, [
            {
                op: 'replace',
                path: '/text',
                value: stringText,
            },
        ]);
        expect(string.data.id).toBe(stringId);
        expect(string.data.text).toBe(stringText);
    });
});
