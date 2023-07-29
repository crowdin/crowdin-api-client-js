import * as nock from 'nock';
import { Credentials, Notifications } from '../../src';

describe('Notifications API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: Notifications = new Notifications(credentials);
    const projectId = 2;
    const message = 'Hello';
    const role = 'admin';
    const userId = 123;

    beforeAll(() => {
        scope = nock(api.url)
            .post(
                '/notify',
                {
                    message,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200)
            .post(
                `/projects/${projectId}/notify`,
                {
                    message,
                    role,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200)
            .post(
                '/notify',
                {
                    message,
                    userIds: [userId],
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200);
    });

    afterAll(() => {
        scope.done();
    });

    it('Send Notification to Authenticated User', async () => {
        await api.sendNotificationToAuthenticatedUser({ message });
    });

    it('Send Notification To Project Members', async () => {
        await api.sendNotificationToProjectMembers(projectId, { message, role });
    });

    it('Send Notification To Organization Members', async () => {
        await api.sendNotificationToOrganizationMembers({ message, userIds: [userId] });
    });
});
