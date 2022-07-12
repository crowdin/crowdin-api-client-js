import * as nock from 'nock';
import { Bundles, Credentials } from '../../src';

describe('Bundles API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: Bundles = new Bundles(credentials);
    const projectId = 2;
    const bundleId = 3;
    const fileId = 4;
    const format = 'crowdin-resx';
    const exportPattern = 'strings-%two_letter_code%.resx';

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get(`/projects/${projectId}/bundles`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: bundleId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                `/projects/${projectId}/bundles`,
                {
                    format,
                    sourcePatterns: [],
                    exportPattern,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: bundleId,
                },
            })
            .get(`/projects/${projectId}/bundles/${bundleId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: bundleId,
                },
            })
            .delete(`/projects/${projectId}/bundles/${bundleId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .patch(
                `/projects/${projectId}/bundles/${bundleId}`,
                [
                    {
                        value: format,
                        op: 'replace',
                        path: '/format',
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
                    id: bundleId,
                },
            })
            .get(`/projects/${projectId}/bundles/${bundleId}/files`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: fileId,
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

    it('List bundles', async () => {
        const bundles = await api.listBundles(projectId);
        expect(bundles.data.length).toBe(1);
        expect(bundles.data[0].data.id).toBe(bundleId);
        expect(bundles.pagination.limit).toBe(limit);
    });

    it('Add bundle', async () => {
        const bundle = await api.addBundle(projectId, {
            exportPattern,
            format,
            sourcePatterns: [],
        });
        expect(bundle.data.id).toBe(bundleId);
    });

    it('Get bundle', async () => {
        const bundle = await api.getBundle(projectId, bundleId);
        expect(bundle.data.id).toBe(bundleId);
    });

    it('Delete bundle', async () => {
        await api.deleteBundle(projectId, bundleId);
    });

    it('Edit bundle', async () => {
        const bundle = await api.editBundle(projectId, bundleId, [
            {
                op: 'replace',
                path: '/format',
                value: format,
            },
        ]);
        expect(bundle.data.id).toBe(bundleId);
    });

    it('Bundle list files', async () => {
        const files = await api.listBundleFiles(projectId, bundleId);
        expect(files.data.length).toBe(1);
        expect(files.data[0].data.id).toBe(fileId);
        expect(files.pagination.limit).toBe(limit);
    });
});
