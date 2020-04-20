import * as nock from 'nock';
import { Credentials, Webhooks, WebhooksModel, PatchOperation } from '../../src/index';

describe('Web-hooks API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: Webhooks = new Webhooks(credentials);
    const projectId = 2;
    const webhookId = 3;
    const name = 'test';
    const url = 'test.com';
    const requestType = WebhooksModel.RequestType.GET;

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
                    events: [],
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
                    id: webhookId,
                    name: name,
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
            events: [],
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
                op: PatchOperation.REPLACE,
                path: '/name',
                value: name,
            },
        ]);
        expect(webhook.data.id).toBe(webhookId);
        expect(webhook.data.name).toBe(name);
    });
});
