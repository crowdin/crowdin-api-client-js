import * as nock from 'nock';
import { Ai, AiModel, Credentials } from '../../src';

describe('AI API', () => {
    let scope: nock.Scope;
    const userCredentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: Ai = new Ai(userCredentials);

    const aiPromptId = 3;
    const aiProviderId = 4;
    const aiModelId = 'gpt-4';
    const userId = 2;

    const name = 'name';
    const action = 'promptAction';
    const mode = 'advanced';
    const prompt = 'translate <string>';
    const config: AiModel.AiPromptConfigAdvanced = {
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
            .post(`/ai/providers/${aiProviderId}/chat/completions`, field, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: field,
            })
            .get(`/users/${userId}/ai/prompts`, undefined, {
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
                `/users/${userId}/ai/prompts`,
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
            .get(`/users/${userId}/ai/prompts/${aiPromptId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: aiPromptId,
                },
            })
            .delete(`/users/${userId}/ai/prompts/${aiPromptId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .patch(
                `/users/${userId}/ai/prompts/${aiPromptId}`,
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
            .get(`/users/${userId}/ai/providers`, undefined, {
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
                `/users/${userId}/ai/providers`,
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
            .get(`/users/${userId}/ai/providers/${aiProviderId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: aiProviderId,
                },
            })
            .delete(`/users/${userId}/ai/providers/${aiProviderId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .patch(
                `/users/${userId}/ai/providers/${aiProviderId}`,
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
            .get(`/users/${userId}/ai/providers/${aiProviderId}/models`, undefined, {
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
    it('List AI Organization Prompts', async () => {
        const prompts = await api.listAiOrganizationPrompts();
        expect(prompts.data.length).toBe(1);
        expect(prompts.data[0].data.id).toBe(aiPromptId);
        expect(prompts.pagination.limit).toBe(limit);
    });

    it('Add AI Organization Prompt', async () => {
        const prompt = await api.addAiOrganizationPrompt({
            name,
            action,
            aiProviderId,
            aiModelId,
            config,
        });
        expect(prompt.data.id).toBe(aiPromptId);
    });

    it('Get AI Organization Prompt', async () => {
        const prompt = await api.getAiOrganizationPrompt(aiPromptId);
        expect(prompt.data.id).toBe(aiPromptId);
    });

    it('Delete AI Organization Prompt', async () => {
        await api.deleteAiOrganizationPrompt(aiPromptId);
    });

    it('Edit AI Organization Prompt', async () => {
        const prompt = await api.editAiOrganizationPrompt(aiPromptId, [
            {
                op: 'replace',
                path: '/name',
                value: name,
            },
        ]);
        expect(prompt.data.id).toBe(aiPromptId);
    });

    it('List AI Organization Providers', async () => {
        const providers = await api.listAiOrganizationProviders();
        expect(providers.data.length).toBe(1);
        expect(providers.data[0].data.id).toBe(aiProviderId);
        expect(providers.pagination.limit).toBe(limit);
    });

    it('Add AI Organization Provider', async () => {
        const provider = await api.addAiOrganizationProvider({
            name,
            type,
            credentials,
        });
        expect(provider.data.id).toBe(aiProviderId);
    });

    it('Get AI Organization Provider', async () => {
        const provider = await api.getAiOrganizationProvider(aiProviderId);
        expect(provider.data.id).toBe(aiProviderId);
    });

    it('Delete AI Organization Provider', async () => {
        await api.deleteAiOrganizationProvider(aiProviderId);
    });

    it('Edit AI Organization Provider', async () => {
        const provider = await api.editAiOrganizationProvider(aiProviderId, [
            {
                op: 'replace',
                path: '/name',
                value: name,
            },
        ]);
        expect(provider.data.id).toBe(aiProviderId);
    });

    it('List AI Organization Provider Models', async () => {
        const providers = await api.listAiOrganizationProviderModels(aiProviderId);
        expect(providers.data.length).toBe(1);
        expect(providers.data[0].data.id).toBe(aiModelId);
        expect(providers.pagination.limit).toBe(limit);
    });

    it('Create AI Organization Proxy Chat Completion', async () => {
        const proxy = await api.createAiOrganizationProxyChatCompletion(aiProviderId, field);
        expect(proxy.data).toStrictEqual(field);
    });

    it('List AI User Prompts', async () => {
        const prompts = await api.listAiUserPrompts(userId);
        expect(prompts.data.length).toBe(1);
        expect(prompts.data[0].data.id).toBe(aiPromptId);
        expect(prompts.pagination.limit).toBe(limit);
    });

    it('Add AI User Prompt', async () => {
        const prompt = await api.addAiUserPrompt(userId, {
            name,
            action,
            aiProviderId,
            aiModelId,
            config,
        });
        expect(prompt.data.id).toBe(aiPromptId);
    });

    it('Get AI User Prompt', async () => {
        const prompt = await api.getAiUserPrompt(userId, aiPromptId);
        expect(prompt.data.id).toBe(aiPromptId);
    });

    it('Delete AI User Prompt', async () => {
        await api.deleteAiUserPrompt(userId, aiPromptId);
    });

    it('Edit AI User Prompt', async () => {
        const prompt = await api.editAiUserPrompt(userId, aiPromptId, [
            {
                op: 'replace',
                path: '/name',
                value: name,
            },
        ]);
        expect(prompt.data.id).toBe(aiPromptId);
    });

    it('List AI User Providers', async () => {
        const providers = await api.listAiUserProviders(userId);
        expect(providers.data.length).toBe(1);
        expect(providers.data[0].data.id).toBe(aiProviderId);
        expect(providers.pagination.limit).toBe(limit);
    });

    it('Add AI User Provider', async () => {
        const provider = await api.addAiUserProvider(userId, {
            name,
            type,
            credentials,
        });
        expect(provider.data.id).toBe(aiProviderId);
    });

    it('Get AI User Provider', async () => {
        const provider = await api.getAiUserProvider(userId, aiProviderId);
        expect(provider.data.id).toBe(aiProviderId);
    });

    it('Delete AI User Provider', async () => {
        await api.deleteAiUserProvider(userId, aiProviderId);
    });

    it('Edit AI User Provider', async () => {
        const provider = await api.editAiUserProvider(userId, aiProviderId, [
            {
                op: 'replace',
                path: '/name',
                value: name,
            },
        ]);
        expect(provider.data.id).toBe(aiProviderId);
    });

    it('List AI User Provider Models', async () => {
        const providers = await api.listAiUserProviderModels(userId, aiProviderId);
        expect(providers.data.length).toBe(1);
        expect(providers.data[0].data.id).toBe(aiModelId);
        expect(providers.pagination.limit).toBe(limit);
    });

    it('Create AI User Proxy Chat Completion', async () => {
        const proxy = await api.createAiUserProxyChatCompletion(userId, aiProviderId, field);
        expect(proxy.data).toStrictEqual(field);
    });
});
