import * as nock from 'nock';
import { Credentials, SecurityLogs } from '../../src';

describe('SecurityLogs API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: SecurityLogs = new SecurityLogs(credentials);
    const userId = 2;
    const securityLogId = 4;

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get('/security-logs', undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: securityLogId,
                            userId,
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
                    id: securityLogId,
                    userId,
                },
            })
            .get(`/users/${userId}/security-logs`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: securityLogId,
                            userId,
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
                    id: securityLogId,
                    userId,
                },
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List Organization Security Logs', async () => {
        const logs = await api.listOrganizationSecurityLogs();
        expect(logs.data.length).toBe(1);
        expect(logs.data[0].data.id).toBe(securityLogId);
        expect(logs.data[0].data.userId).toBe(userId);
        expect(logs.pagination.limit).toBe(limit);
    });

    it('Get Organization Security Log', async () => {
        const log = await api.getOrganizationSecurityLog(securityLogId);
        expect(log.data.id).toBe(securityLogId);
        expect(log.data.userId).toBe(userId);
    });

    it('List User Security Logs', async () => {
        const logs = await api.listUserSecurityLogs(userId);
        expect(logs.data.length).toBe(1);
        expect(logs.data[0].data.id).toBe(securityLogId);
        expect(logs.data[0].data.userId).toBe(userId);
        expect(logs.pagination.limit).toBe(limit);
    });

    it('Get User Security Log', async () => {
        const log = await api.getUserSecurityLog(userId, securityLogId);
        expect(log.data.id).toBe(securityLogId);
        expect(log.data.userId).toBe(userId);
    });
});
