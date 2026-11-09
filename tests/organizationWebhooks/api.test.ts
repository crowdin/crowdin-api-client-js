import nock from 'nock';
import { Credentials, OrganizationWebhooks } from '../../src/index';

describe('Organization Webhooks API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: OrganizationWebhooks = new OrganizationWebhooks(credentials);
    const webhookId = 3;
    const deliveryId = 4;
    const newDeliveryId = 5;
    const createdAfter = '2026-11-01T00:00:00+00:00';
    const name = 'test';
    const url = 'test.com';
    const requestType = 'GET';

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get('/webhooks', undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: webhookId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                '/webhooks',
                {
                    name: name,
                    url: url,
                    events: ['project.created'],
                    requestType: requestType,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: webhookId,
                },
            })
            .get(`/webhooks/${webhookId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: webhookId,
                },
            })
            .delete(`/webhooks/${webhookId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .patch(
                `/webhooks/${webhookId}`,
                [
                    {
                        value: name,
                        op: 'replace',
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
                    id: webhookId,
                    name: name,
                },
            })
            .get('/webhooks/deliveries', undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .query({
                webhookIds: `${webhookId}`,
                status: 'failed',
                events: 'file.added,file.updated',
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: deliveryId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .get(`/webhooks/${webhookId}/deliveries`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .query({
                createdAfter,
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: deliveryId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .get(`/webhooks/${webhookId}/deliveries/${deliveryId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: deliveryId,
                    payload: {},
                },
            })
            .post(
                `/webhooks/${webhookId}/deliveries/${deliveryId}/resend`,
                {},
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(201, {
                data: {
                    id: newDeliveryId,
                },
            })
            .post(
                `/webhooks/${webhookId}/tests`,
                {
                    event: 'file.added',
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    event: 'file.added',
                    status: 'success',
                },
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List webhooks', async () => {
        const webhooks = await api.listWebhooks();
        expect(webhooks.data.length).toBe(1);
        expect(webhooks.data[0].data.id).toBe(webhookId);
        expect(webhooks.pagination.limit).toBe(limit);
    });

    it('Add webhook', async () => {
        const webhook = await api.addWebhook({
            name: name,
            url: url,
            events: ['project.created'],
            requestType: requestType,
        });
        expect(webhook.data.id).toBe(webhookId);
    });

    it('Get webhook', async () => {
        const webhook = await api.getWebhook(webhookId);
        expect(webhook.data.id).toBe(webhookId);
    });

    it('Delete webhook', async () => {
        await api.deleteWebhook(webhookId);
    });

    it('Edit webhook', async () => {
        const webhook = await api.editWebhook(webhookId, [
            {
                op: 'replace',
                path: '/name',
                value: name,
            },
        ]);
        expect(webhook.data.id).toBe(webhookId);
        expect(webhook.data.name).toBe(name);
    });

    it('List all webhook deliveries', async () => {
        const deliveries = await api.listAllWebhookDeliveries({
            webhookIds: `${webhookId}`,
            status: 'failed',
            events: 'file.added,file.updated',
        });
        expect(deliveries.data.length).toBe(1);
        expect(deliveries.data[0].data.id).toBe(deliveryId);
        expect(deliveries.pagination.limit).toBe(limit);
    });

    it('List webhook deliveries', async () => {
        const deliveries = await api.listWebhookDeliveries(webhookId, { createdAfter });
        expect(deliveries.data.length).toBe(1);
        expect(deliveries.data[0].data.id).toBe(deliveryId);
        expect(deliveries.pagination.limit).toBe(limit);
    });

    it('Get webhook delivery', async () => {
        const delivery = await api.getWebhookDelivery(webhookId, deliveryId);
        expect(delivery.data.id).toBe(deliveryId);
    });

    it('Resend webhook delivery', async () => {
        const delivery = await api.resendWebhookDelivery(webhookId, deliveryId);
        expect(delivery.data.id).toBe(newDeliveryId);
    });

    it('Test webhook', async () => {
        const result = await api.testWebhook(webhookId, { event: 'file.added' });
        expect(result.data.event).toBe('file.added');
        expect(result.data.status).toBe('success');
    });
});
