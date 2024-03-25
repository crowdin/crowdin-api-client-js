import * as nock from 'nock';
import { Credentials, Fields } from '../../src/';

describe('Fields API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: Fields = new Fields(credentials);
    const fieldId = 2;
    const fieldMock = {
        id: fieldId,
        name: 'Field 2',
        slug: 'field-2',
        type: 'text',
        entities: ['project', 'user'],
        config: {
            locations: [
                {
                    place: 'projectHeader',
                },
            ],
        },
    };

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get('/fields', undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            ...fieldMock,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                '/fields',
                {
                    name: fieldMock.name,
                    slug: fieldMock.slug,
                    type: fieldMock.type,
                    entities: fieldMock.entities,
                    config: fieldMock.config,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    ...fieldMock,
                },
            })
            .get(`/fields/${fieldId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    ...fieldMock,
                },
            })
            .delete(`/fields/${fieldId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(204)
            .patch(
                `/fields/${fieldId}`,
                [
                    {
                        op: 'replace',
                        path: '/name',
                        value: fieldMock.name,
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
                    ...fieldMock,
                },
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List fields', async () => {
        const fields = await api.listFields();
        expect(fields.data.length).toBe(1);
        expect(fields.data[0].data.id).toBe(fieldId);
        expect(fields.pagination.limit).toBe(limit);
    });

    it('Add field', async () => {
        const field = await api.addField({
            name: fieldMock.name,
            slug: fieldMock.slug,
            type: 'text',
            entities: ['project', 'user'],
            config: {
                locations: [
                    {
                        place: 'projectHeader',
                    },
                ],
            },
        });
        expect(field.data.id).toBe(fieldId);
    });

    it('Get field', async () => {
        const field = await api.getField(fieldId);
        expect(field.data.id).toBe(fieldId);
    });

    it('Delete field', async () => {
        await api.deleteField(fieldId);
    });

    it('Edit field', async () => {
        const field = await api.editField(fieldId, [
            {
                op: 'replace',
                path: '/name',
                value: fieldMock.name,
            },
        ]);
        expect(field.data.id).toBe(fieldId);
        expect(field.data.name).toBe(fieldMock.name);
        expect(field.data.slug).toBe(fieldMock.slug);
        expect(field.data.type).toBe(fieldMock.type);
        expect(field.data.entities).toEqual(fieldMock.entities);
        expect(field.data.config).toEqual(fieldMock.config);
    });
});
