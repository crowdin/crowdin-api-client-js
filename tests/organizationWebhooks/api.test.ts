import * as nock from 'nock';
import { Credentials, OrganizationWebhooks } from '../../src/index';

describe('Organization Webhooks API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: OrganizationWebhooks = new OrganizationWebhooks(credentials);
    const webhookId = 3;
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
});
