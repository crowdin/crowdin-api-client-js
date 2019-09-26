import * as nock from 'nock';
import { Credentials, Notifications } from '../../src';

describe('Notifications API', () => {

    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg'
    };
    const api: Notifications = new Notifications(credentials);
    const subscriptionId = 'test';

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get('/notification-channels/subscriptions', undefined,
                {
                    reqheaders: {
                        'Authorization': `Bearer ${api.token}`
                    }
                }
            )
            .reply(200, {
                data: [{
                    data: {
                        subscriptionId: subscriptionId
                    }
                }],
                pagination: {
                    offset: 0,
                    limit: limit
                }
            })
            .post('/notification-channels/subscriptions',
                {
                    subscriptionId: subscriptionId
                },
                {
                    reqheaders: {
                        'Authorization': `Bearer ${api.token}`
                    }
                }
            )
            .reply(200, {
                data: {
                    subscriptionId: subscriptionId
                }
            })
            .get(`/notification-channels/subscriptions/${subscriptionId}`, undefined,
                {
                    reqheaders: {
                        'Authorization': `Bearer ${api.token}`
                    }
                }
            )
            .reply(200, {
                data: {
                    subscriptionId: subscriptionId
                }
            })
            .delete(`/notification-channels/subscriptions/${subscriptionId}`, undefined,
                {
                    reqheaders: {
                        'Authorization': `Bearer ${api.token}`
                    }
                }
            )
            .reply(200);
    });

    afterAll(() => {
        scope.done();
    });

    it('List subscriptions', async () => {
        const subscriptions = await api.listSubscriptions();
        expect(subscriptions.data.length).toBe(1);
        expect(subscriptions.data[0].data.subscriptionId).toBe(subscriptionId);
        expect(subscriptions.pagination.limit).toBe(limit);
    });

    it('Subscribe to channel', async () => {
        const subscription = await api.subscribeToChannel({
            subscriptionId: subscriptionId
        });
        expect(subscription.data.subscriptionId).toBe(subscriptionId);
    });

    it('Get subscripton data', async () => {
        const subscription = await api.getSubscription(subscriptionId);
        expect(subscription.data.subscriptionId).toBe(subscriptionId);
    });

    it('Remove channel subscription', async () => {
        await api.removeChannelSubscription(subscriptionId);
    });

});