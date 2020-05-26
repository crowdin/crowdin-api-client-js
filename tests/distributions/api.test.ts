import * as nock from 'nock';
import { Credentials, Distributions, PatchOperation } from '../../src';

describe('Distributions API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: Distributions = new Distributions(credentials);
    const projectId = 2;
    const hash = 'qweqweqweq';
    const name = 'test';
    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get(`/projects/${projectId}/distributions`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            hash,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                `/projects/${projectId}/distributions`,
                {
                    name,
                    fileIds: [],
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    hash,
                },
            })
            .get(`/projects/${projectId}/distributions/${hash}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    hash,
                },
            })
            .delete(`/projects/${projectId}/distributions/${hash}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .patch(
                `/projects/${projectId}/distributions/${hash}`,
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
                    hash,
                    name,
                },
            })
            .get(`/projects/${projectId}/distributions/${hash}/release`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    progress: 0,
                },
            })
            .post(`/projects/${projectId}/distributions/${hash}/release`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    progress: 0,
                },
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List distributions', async () => {
        const distributions = await api.listDistributions(projectId);
        expect(distributions.data.length).toBe(1);
        expect(distributions.data[0].data.hash).toBe(hash);
        expect(distributions.pagination.limit).toBe(limit);
    });

    it('Create distribution', async () => {
        const distribution = await api.createDistribution(projectId, {
            fileIds: [],
            name,
        });
        expect(distribution.data.hash).toBe(hash);
    });

    it('Get distribution', async () => {
        const distribution = await api.getDistribution(projectId, hash);
        expect(distribution.data.hash).toBe(hash);
    });

    it('Delete distribution', async () => {
        await api.deleteDistribution(projectId, hash);
    });

    it('Edit distribution', async () => {
        const distribution = await api.editDistribution(projectId, hash, [
            {
                op: PatchOperation.REPLACE,
                path: '/name',
                value: name,
            },
        ]);
        expect(distribution.data.hash).toBe(hash);
        expect(distribution.data.name).toBe(name);
    });

    it('Get distribution release', async () => {
        const distributionRelease = await api.getDistributionRelease(projectId, hash);
        expect(distributionRelease.data.progress).toBe(0);
    });

    it('Create distribution release', async () => {
        const distributionRelease = await api.createDistributionRelease(projectId, hash);
        expect(distributionRelease.data.progress).toBe(0);
    });
});
