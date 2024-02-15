import * as nock from 'nock';
import { Credentials, SecurityLogs } from '../../src';

describe('SecurityLog API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: SecurityLogs = new SecurityLogs(credentials);
    const userId = 2;

    const limit = 25;

    const securityLogId = 1;

    beforeAll(() => {
        scope = nock(api.url)
            .get(`/users/${userId}/security-logs`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            userId: userId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .get(`/users/${userId}/security-logs/${securityLogId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    userId: userId,
                },
            })
            .get('/security-logs', undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            userId: userId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .get(`/security-logs/${securityLogId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    userId: userId,
                },
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List Security Logs', async () => {
        const securityLogs = await api.listUserSecurityLogs(userId);
        expect(securityLogs.data.length).toBe(1);
        expect(securityLogs.pagination?.limit).toBe(limit);
    });

    it('Get security log', async () => {
        const securityLogs = await api.getUserSecurityLog(userId, securityLogId);
        expect(securityLogs.data.userId).toBe(2);
    });

    it('List Organization Security Logs', async () => {
        const securityLogs = await api.listOrganizationSecurityLogs();
        expect(securityLogs.data.length).toBe(1);
        // expect(securityLogs.pagination?.limit).toBe(limit);
    });

    it('Get Organization security log', async () => {
        const securityLogs = await api.getOrganizationSecurityLog(securityLogId);
        expect(securityLogs.data.userId).toBe(2);
    });
});
