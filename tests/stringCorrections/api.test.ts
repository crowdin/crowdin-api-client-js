import * as nock from 'nock';
import { Credentials, StringCorrections } from '../../src/index';

describe('String Corrections API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: StringCorrections = new StringCorrections(credentials);
    const projectId = 2;
    const stringId = 3;
    const stringCorrectionId = 4;
    const text = 'test';

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get(`/projects/${projectId}/corrections`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .query({ stringId })
            .reply(200, {
                pagination: {
                    offset: 0,
                    limit,
                },
                data: [
                    {
                        data: {
                            id: stringCorrectionId,
                            text: text,
                            pluralCategoryName: 'few',
                            user: {
                                id: 19,
                                username: 'john_doe',
                                fullName: 'John Smith',
                                avatarUrl: '',
                            },
                            createdAt: '2019-09-23T11:26:54+00:00',
                        },
                    },
                ],
            })
            .post(
                `/projects/${projectId}/corrections`,
                {
                    stringId,
                    text,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: stringCorrectionId,
                },
            })
            .delete(`/projects/${projectId}/corrections`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .query({
                stringId,
            })
            .reply(204)
            .get(`/projects/${projectId}/corrections/${stringCorrectionId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: stringCorrectionId,
                },
            })
            .put(`/projects/${projectId}/corrections/${stringCorrectionId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: stringCorrectionId,
                },
            })
            .delete(`/projects/${projectId}/corrections/${stringCorrectionId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(204);
    });

    afterAll(() => {
        scope.done();
    });

    it('List Corrections', async () => {
        const corrections = await api.listStringCorrections(projectId, { stringId });
        expect(corrections.data.length).toBe(1);
        expect(corrections.data[0].data.id).toBe(stringCorrectionId);
        expect(corrections.pagination.limit).toBe(limit);
    });

    it('Add Correction', async () => {
        const correction = await api.addStringCorrection(projectId, {
            stringId,
            text,
        });
        expect(correction.data.id).toBe(stringCorrectionId);
    });

    it('Delete Corrections', async () => {
        await api.deleteStringCorrections(projectId, stringId);
    });

    it('Get Correction', async () => {
        const correction = await api.getStringCorrection(projectId, stringCorrectionId);
        expect(correction.data.id).toBe(stringCorrectionId);
    });

    it('Restore Correction', async () => {
        const correction = await api.restoreStringCorrection(projectId, stringCorrectionId);
        expect(correction.data.id).toBe(stringCorrectionId);
    });

    it('Delete Correction', async () => {
        await api.deleteStringCorrection(projectId, stringCorrectionId);
    });
});
