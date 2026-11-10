import nock from 'nock';
import { Credentials, Webhooks } from '../../src/index';

describe('Web-hooks API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: Webhooks = new Webhooks(credentials);
    const projectId = 2;
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
            .get(`/projects/${projectId}/webhooks`, undefined, {
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
                `/projects/${projectId}/webhooks`,
                {
                    name: name,
                    url: url,
                    events: ['file.added'],
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
            .get(`/projects/${projectId}/webhooks/${webhookId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: webhookId,
                },
            })
            .delete(`/projects/${projectId}/webhooks/${webhookId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .patch(
                `/projects/${projectId}/webhooks/${webhookId}`,
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
            .get(`/projects/${projectId}/webhooks/deliveries`, undefined, {
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
            .get(`/projects/${projectId}/webhooks/${webhookId}/deliveries`, undefined, {
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
            .get(`/projects/${projectId}/webhooks/${webhookId}/deliveries/${deliveryId}`, undefined, {
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
                `/projects/${projectId}/webhooks/${webhookId}/deliveries/${deliveryId}/resend`,
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
                `/projects/${projectId}/webhooks/${webhookId}/tests`,
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
            })
            .get(`/projects/${projectId}/webhooks/deliveries`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
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
            .get(`/projects/${projectId}/webhooks/${webhookId}/deliveries`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
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
            .post(
                `/projects/${projectId}/webhooks/${webhookId}/tests`,
                {},
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    status: 'failed',
                    error: 'timeout',
                },
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List webhooks', async () => {
        const webhooks = await api.listWebhooks(projectId);
        expect(webhooks.data.length).toBe(1);
        expect(webhooks.data[0].data.id).toBe(webhookId);
        expect(webhooks.pagination.limit).toBe(limit);
    });

    it('Add webhook', async () => {
        const webhook = await api.addWebhook(projectId, {
            name: name,
            url: url,
            events: ['file.added'],
            requestType: requestType,
        });
        expect(webhook.data.id).toBe(webhookId);
    });

    it('Get webhook', async () => {
        const webhook = await api.getWebhook(projectId, webhookId);
        expect(webhook.data.id).toBe(webhookId);
    });

    it('Delete webhook', async () => {
        await api.deleteWebhook(projectId, webhookId);
    });

    it('Edit webhook', async () => {
        const webhook = await api.editWebhook(projectId, webhookId, [
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
        const deliveries = await api.listAllWebhookDeliveries(projectId, {
            webhookIds: `${webhookId}`,
            status: 'failed',
            events: 'file.added,file.updated',
        });
        expect(deliveries.data.length).toBe(1);
        expect(deliveries.data[0].data.id).toBe(deliveryId);
        expect(deliveries.pagination.limit).toBe(limit);
    });

    it('List webhook deliveries', async () => {
        const deliveries = await api.listWebhookDeliveries(projectId, webhookId, { createdAfter });
        expect(deliveries.data.length).toBe(1);
        expect(deliveries.data[0].data.id).toBe(deliveryId);
        expect(deliveries.pagination.limit).toBe(limit);
    });

    it('Get webhook delivery', async () => {
        const delivery = await api.getWebhookDelivery(projectId, webhookId, deliveryId);
        expect(delivery.data.id).toBe(deliveryId);
    });

    it('Resend webhook delivery', async () => {
        const delivery = await api.resendWebhookDelivery(projectId, webhookId, deliveryId);
        expect(delivery.data.id).toBe(newDeliveryId);
    });

    it('Test webhook', async () => {
        const result = await api.testWebhook(projectId, webhookId, { event: 'file.added' });
        expect(result.data.event).toBe('file.added');
        expect(result.data.status).toBe('success');
    });

    it('List all webhook deliveries without filters', async () => {
        const deliveries = await api.listAllWebhookDeliveries(projectId);
        expect(deliveries.data[0].data.id).toBe(deliveryId);
    });

    it('List webhook deliveries without filters', async () => {
        const deliveries = await api.listWebhookDeliveries(projectId, webhookId);
        expect(deliveries.data[0].data.id).toBe(deliveryId);
    });

    it('Test webhook with default event', async () => {
        const result = await api.testWebhook(projectId, webhookId);
        expect(result.data.status).toBe('failed');
        expect(result.data.error).toBe('timeout');
    });
});
