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
    const branchId = 41;
    const exportId = '123';
    const exportUrl = 'test.com';
    const name = 'test';
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
                    name,
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
            .get(`/projects/${projectId}/bundles/${bundleId}/exports/${exportId}/download`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    url: exportUrl,
                },
            })
            .post(`/projects/${projectId}/bundles/${bundleId}/exports`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    identifier: exportId,
                },
            })
            .get(`/projects/${projectId}/bundles/${bundleId}/exports/${exportId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    identifier: exportId,
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
            })
            .get(`/projects/${projectId}/bundles/${bundleId}/branches`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: branchId,
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
            name,
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

    it('Download bundle', async () => {
        const download = await api.downloadBundle(projectId, bundleId, exportId);
        expect(download.data.url).toBe(exportUrl);
    });

    it('Export bundle', async () => {
        const resp = await api.exportBundle(projectId, bundleId);
        expect(resp.data.identifier).toBe(exportId);
    });

    it('Check bundle export status', async () => {
        const resp = await api.checkBundleExportStatus(projectId, bundleId, exportId);
        expect(resp.data.identifier).toBe(exportId);
    });

    it('Bundle list files', async () => {
        const files = await api.listBundleFiles(projectId, bundleId);
        expect(files.data.length).toBe(1);
        expect(files.data[0].data.id).toBe(fileId);
        expect(files.pagination.limit).toBe(limit);
    });

    it('Bundle list branches', async () => {
        const branches = await api.listBundleBranches(projectId, bundleId);
        expect(branches.data.length).toBe(1);
        expect(branches.data[0].data.id).toBe(branchId);
        expect(branches.pagination.limit).toBe(limit);
    });
});
