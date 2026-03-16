import * as nock from 'nock';
import { Credentials, StyleGuides } from '../../src';

describe('Style Guides API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: StyleGuides = new StyleGuides(credentials);
    const styleGuideId = 2;
    const storageId = 1;
    const name = "Be My Eyes iOS's Style Guide";

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get('/style-guides', undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: styleGuideId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                '/style-guides',
                {
                    name,
                    storageId,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: styleGuideId,
                },
            })
            .get(`/style-guides/${styleGuideId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: styleGuideId,
                },
            })
            .delete(`/style-guides/${styleGuideId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .patch(
                `/style-guides/${styleGuideId}`,
                [
                    {
                        op: 'replace',
                        path: '/name',
                        value: name,
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
                    id: styleGuideId,
                },
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List style guides', async () => {
        const styleGuides = await api.listStyleGuides();
        expect(styleGuides.data.length).toBe(1);
        expect(styleGuides.data[0].data.id).toBe(styleGuideId);
        expect(styleGuides.pagination.limit).toBe(limit);
    });

    it('Create style guide', async () => {
        const styleGuide = await api.createStyleGuide({ name, storageId });
        expect(styleGuide.data.id).toBe(styleGuideId);
    });

    it('Get style guide', async () => {
        const styleGuide = await api.getStyleGuide(styleGuideId);
        expect(styleGuide.data.id).toBe(styleGuideId);
    });

    it('Delete style guide', async () => {
        await api.deleteStyleGuide(styleGuideId);
    });

    it('Edit style guide', async () => {
        const styleGuide = await api.editStyleGuide(styleGuideId, [
            {
                op: 'replace',
                path: '/name',
                value: name,
            },
        ]);
        expect(styleGuide.data.id).toBe(styleGuideId);
    });
});
