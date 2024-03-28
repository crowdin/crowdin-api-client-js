import * as nock from 'nock';
import { AI, AIModel, Credentials } from '../../src';

describe('AI API', () => {
    let scope: nock.Scope;
    const userCredentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: AI = new AI(userCredentials);

    const aiPromptId = 3;
    const aiProviderId = 4;
    const aiModelId = 'gpt-4';
    const userId = 2;

    const name = 'name';
    const action = 'promptAction';
    const mode = 'advanced';
    const prompt = 'translate <string>';
    const config: AIModel.AIPromptConfigAdvanced = {
        mode,
        prompt,
    };
    const type = 'type';
    const apiKey = 'aainriualusefiueriub3ljhdbfalkjdf';
    const credentials = {
        apiKey,
    };
    const field = { send: 'to AI' };

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get('/ai/prompts', undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: aiPromptId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                '/ai/prompts',
                {
                    name,
                    action,
                    aiProviderId,
                    aiModelId,
                    config,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: aiPromptId,
                },
            })
            .get(`/ai/prompts/${aiPromptId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: aiPromptId,
                },
            })
            .delete(`/ai/prompts/${aiPromptId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .patch(
                `/ai/prompts/${aiPromptId}`,
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
                    id: aiPromptId,
                },
            })
            .get('/ai/providers', undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: aiProviderId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                '/ai/providers',
                {
                    name,
                    type,
                    credentials,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: aiProviderId,
                },
            })
            .get(`/ai/providers/${aiProviderId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: aiProviderId,
                },
            })
            .delete(`/ai/providers/${aiProviderId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .patch(
                `/ai/providers/${aiProviderId}`,
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
                    id: aiProviderId,
                },
            })
            .get(`/ai/providers/${aiProviderId}/models`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: aiModelId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(`/users/${userId}/ai/providers/${aiProviderId}/chat/completions`, field, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: field,
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List AI Prompts', async () => {
        const prompts = await api.listAIPrompts();
        expect(prompts.data.length).toBe(1);
        expect(prompts.data[0].data.id).toBe(aiPromptId);
        expect(prompts.pagination.limit).toBe(limit);
    });

    it('Add AI Prompt', async () => {
        const prompt = await api.addAIPrompt({
            name,
            action,
            aiProviderId,
            aiModelId,
            config,
        });
        expect(prompt.data.id).toBe(aiPromptId);
    });

    it('Get AI Prompt', async () => {
        const prompt = await api.getAIPrompt(aiPromptId);
        expect(prompt.data.id).toBe(aiPromptId);
    });

    it('Delete AI Prompt', async () => {
        await api.deleteAIPrompt(aiPromptId);
    });

    it('Edit AI Prompt', async () => {
        const prompt = await api.editAIPrompt(aiPromptId, [
            {
                op: 'replace',
                path: '/name',
                value: name,
            },
        ]);
        expect(prompt.data.id).toBe(aiPromptId);
    });

    it('List AI Providers', async () => {
        const providers = await api.listAIProviders();
        expect(providers.data.length).toBe(1);
        expect(providers.data[0].data.id).toBe(aiProviderId);
        expect(providers.pagination.limit).toBe(limit);
    });

    it('Add AI Provider', async () => {
        const provider = await api.addAIProvider({
            name,
            type,
            credentials,
        });
        expect(provider.data.id).toBe(aiProviderId);
    });

    it('Get AI Provider', async () => {
        const provider = await api.getAIProvider(aiProviderId);
        expect(provider.data.id).toBe(aiProviderId);
    });

    it('Delete AI Provider', async () => {
        await api.deleteAIProvider(aiProviderId);
    });

    it('Edit AI Provider', async () => {
        const provider = await api.editAIProvider(aiProviderId, [
            {
                op: 'replace',
                path: '/name',
                value: name,
            },
        ]);
        expect(provider.data.id).toBe(aiProviderId);
    });

    it('List AI Provider Models', async () => {
        const providers = await api.listAIProviderModels(aiProviderId);
        expect(providers.data.length).toBe(1);
        expect(providers.data[0].data.id).toBe(aiModelId);
        expect(providers.pagination.limit).toBe(limit);
    });

    it('Create AI Proxy Chat Completion', async () => {
        const proxy = await api.proxyAIProvider(userId, aiProviderId, field);
        expect(proxy.data).toStrictEqual(field);
    });
});
