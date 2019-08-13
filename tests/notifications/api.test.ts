import * as nock from 'nock';
import * as crowdin from '../../src/index';

describe('Notifications API', () => {

    let scope: nock.Scope;
    const credentials: crowdin.Credentials = {
        login: 'testUser',
        accountKey: 'qwerty',
        organization: 'testOrg'
    };
    const api: crowdin.Notifications.Api = new crowdin.Notifications.Api(credentials);
    const subscriptionId = 'test';

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get('/notification-channels/subscriptions')
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
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
            .post('/notification-channels/subscriptions', {
                subscriptionId: subscriptionId
            })
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    subscriptionId: subscriptionId
                }
            })
            .get(`/notification-channels/subscriptions/${subscriptionId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    subscriptionId: subscriptionId
                }
            })
            .delete(`/notification-channels/subscriptions/${subscriptionId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
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