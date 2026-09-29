import nock from 'nock';
import { Credentials, ExternalQaChecks } from '../../src/index';

describe('External QA Checks API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: ExternalQaChecks = new ExternalQaChecks(credentials);
    const externalQaCheckId = 2;
    const projectId = 3;

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get('/external-qa-checks', undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .query({
                projectId,
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: externalQaCheckId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .get(`/external-qa-checks/${externalQaCheckId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: externalQaCheckId,
                },
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List external QA checks', async () => {
        const checks = await api.listExternalQaChecks({ projectId });
        expect(checks.data.length).toBe(1);
        expect(checks.data[0].data.id).toBe(externalQaCheckId);
        expect(checks.pagination.limit).toBe(limit);
    });

    it('Get external QA check', async () => {
        const check = await api.getExternalQaCheck(externalQaCheckId);
        expect(check.data.id).toBe(externalQaCheckId);
    });
});
