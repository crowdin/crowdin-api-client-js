import * as nock from 'nock';
import { Ai, AiModel, Credentials } from '../../src';

describe('AI API', () => {
    let scope: nock.Scope;
    const userCredentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: Ai = new Ai(userCredentials);

    const aiPlaceholderId = 12356;
    const aiPlaceholderDescription = 'Product description';
    const aiPlaceholderPlaceholder = '%custom:productDescription%';
    const aiPlaceholderValue =
        'The product is the professional consulting service that transform challenges into opportunities.';
    const aiPromptId = 3;
    const aiProviderId = 4;
    const aiModelId = 'gpt-4';
    const userId = 2;
    const reportId = 'test-id';
    const completionId = 'test-id2';
    const link = 'crowdin.com/test.pdf';
    const projectId = 123;
    const jobId = 'test-job';
    const eventId = '12312event';

    const name = 'name';
    const action = 'pre_translate';
    const mode = 'advanced';
    const prompt = 'translate <string>';
    const config: AiModel.AiPromptConfigAdvanced = {
        mode,
        prompt,
    };
    const generateAiCompletion: AiModel.GenerateAiPromptCompletionRequest = {
        resources: {
            projectId,
            targetLanguageId: 'uk',
            stringIds: [1],
            filteredStringsIds: [1],
            overridePromptValues: {
                sourceLanguage: 'English',
                targetLanguage: 'Ukrainian',
                fileContext: 'N/A',
                siblingsStrings: 'N/A',
            },
        },
    };
    const type = 'open_ai';
    const apiKey = 'aainriualusefiueriub3ljhdbfalkjdf';
    const credentials = {
        apiKey,
    };
    const field = { send: 'to AI' };
    const assistActionAiPromptId = 2;

    const limit = 25;
    const generateReportReq: AiModel.AiReport = {
        type: 'tokens-usage-raw-data',
        schema: {
            dateFrom: new Date().toISOString(),
            dateTo: new Date().toISOString(),
        },
    };

    beforeAll(() => {
        scope = nock(api.url)
            .get('/ai/settings/custom-placeholders', undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: aiPlaceholderId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                '/ai/settings/custom-placeholders',
                {
                    description: aiPlaceholderDescription,
                    placeholder: aiPlaceholderPlaceholder,
                    value: aiPlaceholderValue,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: aiPlaceholderId,
                },
            })
            .get(`/ai/settings/custom-placeholders/${aiPlaceholderId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: aiPlaceholderId,
                },
            })
            .delete(`/ai/settings/custom-placeholders/${aiPlaceholderId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .patch(
                `/ai/settings/custom-placeholders/${aiPlaceholderId}`,
                [
                    {
                        value: aiPlaceholderValue,
                        op: 'replace',
                        path: '/value',
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
                    id: aiPlaceholderId,
                },
            })
            .post(
                `/ai/prompts/${aiPromptId}/fine-tuning/datasets`,
                {
                    projectIds: [projectId],
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    identifier: jobId,
                },
            })
            .get(`/ai/prompts/${aiPromptId}/fine-tuning/datasets/${jobId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    identifier: jobId,
                },
            })
            .get(`/ai/prompts/${aiPromptId}/fine-tuning/jobs/${jobId}/events`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: eventId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .get('/ai/prompts/fine-tuning/jobs', undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            identifier: jobId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                `/ai/prompts/${aiPromptId}/fine-tuning/jobs`,
                {
                    trainingOptions: { projectIds: [projectId] },
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    identifier: jobId,
                },
            })
            .get(`/ai/prompts/${aiPromptId}/fine-tuning/jobs/${jobId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    identifier: jobId,
                },
            })
            .get(`/ai/prompts/${aiPromptId}/fine-tuning/datasets/${jobId}/download`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    url: link,
                },
            })
            .post(
                `/ai/prompts/${aiPromptId}/clones`,
                {},
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
            .post(`/ai/prompts/${aiPromptId}/completions`, generateAiCompletion, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    identifier: completionId,
                },
            })
            .get(`/ai/prompts/${aiPromptId}/completions/${completionId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    identifier: completionId,
                },
            })
            .delete(`/ai/prompts/${aiPromptId}/completions/${completionId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .get(`/ai/prompts/${aiPromptId}/completions/${completionId}/download`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    url: link,
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
            .get('/ai/providers/models', undefined, {
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
            .post('/ai/reports', generateReportReq, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    identifier: reportId,
                },
            })
            .get(`/ai/reports/${reportId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    identifier: reportId,
                },
            })
            .get(`/ai/reports/${reportId}/download`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    url: link,
                },
            })
            .get('/ai/settings', undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    assistActionAiPromptId,
                },
            })
            .patch(
                '/ai/settings',
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
                    assistActionAiPromptId,
                },
            })
            .get(`/users/${userId}/ai/settings/custom-placeholders`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: aiPlaceholderId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                `/users/${userId}/ai/settings/custom-placeholders`,
                {
                    description: aiPlaceholderDescription,
                    placeholder: aiPlaceholderPlaceholder,
                    value: aiPlaceholderValue,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: aiPlaceholderId,
                },
            })
            .get(`/users/${userId}/ai/settings/custom-placeholders/${aiPlaceholderId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: aiPlaceholderId,
                },
            })
            .delete(`/users/${userId}/ai/settings/custom-placeholders/${aiPlaceholderId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .patch(
                `/users/${userId}/ai/settings/custom-placeholders/${aiPlaceholderId}`,
                [
                    {
                        value: aiPlaceholderValue,
                        op: 'replace',
                        path: '/value',
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
                    id: aiPlaceholderId,
                },
            })
            .post(
                `/users/${userId}/ai/prompts/${aiPromptId}/fine-tuning/datasets`,
                {
                    projectIds: [projectId],
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    identifier: jobId,
                },
            })
            .get(`/users/${userId}/ai/prompts/${aiPromptId}/fine-tuning/datasets/${jobId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    identifier: jobId,
                },
            })
            .get(`/users/${userId}/ai/prompts/${aiPromptId}/fine-tuning/jobs/${jobId}/events`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: eventId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .get(`/users/${userId}/ai/prompts/fine-tuning/jobs`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            identifier: jobId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                `/users/${userId}/ai/prompts/${aiPromptId}/fine-tuning/jobs`,
                {
                    trainingOptions: { projectIds: [projectId] },
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    identifier: jobId,
                },
            })
            .get(`/users/${userId}/ai/prompts/${aiPromptId}/fine-tuning/jobs/${jobId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    identifier: jobId,
                },
            })
            .get(`/users/${userId}/ai/prompts/${aiPromptId}/fine-tuning/datasets/${jobId}/download`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    url: link,
                },
            })
            .post(
                `/users/${userId}/ai/prompts/${aiPromptId}/clones`,
                {},
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
            .post(`/users/${userId}/ai/prompts/${aiPromptId}/completions`, generateAiCompletion, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    identifier: completionId,
                },
            })
            .get(`/users/${userId}/ai/prompts/${aiPromptId}/completions/${completionId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    identifier: completionId,
                },
            })
            .delete(`/users/${userId}/ai/prompts/${aiPromptId}/completions/${completionId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .get(`/users/${userId}/ai/prompts/${aiPromptId}/completions/${completionId}/download`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    url: link,
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
            .get(`/users/${userId}/ai/providers/models`, undefined, {
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
            })
            .post(`/users/${userId}/ai/reports`, generateReportReq, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    identifier: reportId,
                },
            })
            .get(`/users/${userId}/ai/reports/${reportId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    identifier: reportId,
                },
            })
            .get(`/users/${userId}/ai/reports/${reportId}/download`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    url: link,
                },
            })
            .get(`/users/${userId}/ai/settings`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    assistActionAiPromptId,
                },
            })
            .patch(
                `/users/${userId}/ai/settings`,
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
                    assistActionAiPromptId,
                },
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List AI Organization Custom Placeholders', async () => {
        const placeholders = await api.listAiOrganizationCustomPlaceholders();
        expect(placeholders.data.length).toBe(1);
        expect(placeholders.data[0].data.id).toBe(aiPlaceholderId);
        expect(placeholders.pagination.limit).toBe(limit);
    });

    it('Add AI Organization Custom Placeholders', async () => {
        const placeholder = await api.addAiOrganizationCustomPlaceholder({
            description: aiPlaceholderDescription,
            placeholder: aiPlaceholderPlaceholder,
            value: aiPlaceholderValue,
        });
        expect(placeholder.data.id).toBe(aiPlaceholderId);
    });

    it('Get AI Organization Custom Placeholders', async () => {
        const placeholder = await api.getAiOrganizationCustomPlaceholder(aiPlaceholderId);
        expect(placeholder.data.id).toBe(aiPlaceholderId);
    });

    it('Delete AI Organization Custom Placeholders', async () => {
        await api.deleteAiOrganizationCustomPlaceholder(aiPlaceholderId);
    });

    it('Edit AI Organization Custom Placeholders', async () => {
        const placeholder = await api.editAiOrganizationCustomPlaceholder(aiPlaceholderId, [
            {
                op: 'replace',
                path: '/value',
                value: aiPlaceholderValue,
            },
        ]);
        expect(placeholder.data.id).toBe(aiPlaceholderId);
    });

    it('Generate AI Organization Prompt Fine-Tuning Dataset', async () => {
        const res = await api.generateAiOrganizationPromptFineTuningDataset(aiPromptId, { projectIds: [projectId] });
        expect(res.data.identifier).toBe(jobId);
    });

    it('Get AI Organization Prompt Fine-Tuning Dataset Status', async () => {
        const res = await api.getAiOrganizationPromptFineTuningDatasetStatus(aiPromptId, jobId);
        expect(res.data.identifier).toBe(jobId);
    });

    it('List AI Organization Prompt Fine-Tuning Events', async () => {
        const res = await api.listAiOrganizationPromptFineTuningEvents(aiPromptId, jobId);
        expect(res.data.length).toBe(1);
        expect(res.data[0].data.id).toBe(eventId);
        expect(res.pagination.limit).toBe(limit);
    });

    it('List AI Organization Prompt Fine-Tuning Jobs', async () => {
        const res = await api.listAiOrganizationPromptFineTuningJobs();
        expect(res.data.length).toBe(1);
        expect(res.data[0].data.identifier).toBe(jobId);
        expect(res.pagination.limit).toBe(limit);
    });

    it('Create AI Organization Prompt Fine-Tuning Job', async () => {
        const res = await api.createAiOrganizationPromptFineTuningJob(aiPromptId, {
            trainingOptions: { projectIds: [projectId] },
        });
        expect(res.data.identifier).toBe(jobId);
    });

    it('Get AI Organization Prompt Fine-Tuning Job Status', async () => {
        const res = await api.getAiOrganizationPromptFineTuningJobStatus(aiPromptId, jobId);
        expect(res.data.identifier).toBe(jobId);
    });

    it('Download AI Organization Prompt Fine-Tuning Dataset', async () => {
        const res = await api.downloadAiOrganizationPromptFineTuningDataset(aiPromptId, jobId);
        expect(res.data.url).toBe(link);
    });

    it('Clone AI Organization Prompt', async () => {
        const prompt = await api.cloneAiOrganizationPrompt(aiPromptId);
        expect(prompt.data.id).toBe(aiPromptId);
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

    it('Generate AI Organization Prompt Completion', async () => {
        const res = await api.generateAiOrganizationPromptCompletion(aiPromptId, generateAiCompletion);
        expect(res.data.identifier).toBe(completionId);
    });

    it('Get AI Prompt Organization Completion Status', async () => {
        const res = await api.getAiOrganizationPromptCompletionStatus(aiPromptId, completionId);
        expect(res.data.identifier).toBe(completionId);
    });

    it('Cancel AI Prompt Organization Completion', async () => {
        await api.cancelAiOrganizationPromptCompletion(aiPromptId, completionId);
    });

    it('Download AI Prompt Organization Completion', async () => {
        const res = await api.downloadAiOrganizationPromptCompletion(aiPromptId, completionId);
        expect(res.data.url).toBe(link);
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

    it('List AI Organization All Provider Models', async () => {
        const providers = await api.listAiOrganizationAllProviderModels();
        expect(providers.data.length).toBe(1);
        expect(providers.data[0].data.id).toBe(aiModelId);
        expect(providers.pagination.limit).toBe(limit);
    });

    it('Create AI Organization Proxy Chat Completion', async () => {
        const proxy = await api.createAiOrganizationProxyChatCompletion(aiProviderId, field);
        expect(proxy.data).toStrictEqual(field);
    });

    it('Generate AI Organization Report', async () => {
        const report = await api.generateAiOrganizationReport(generateReportReq);
        expect(report.data.identifier).toStrictEqual(reportId);
    });

    it('Get AI Organization Report', async () => {
        const report = await api.checkAiOrganizationReportStatus(reportId);
        expect(report.data.identifier).toStrictEqual(reportId);
    });

    it('Download AI Organization Report', async () => {
        const resp = await api.downloadAiOrganizationReport(reportId);
        expect(resp.data.url).toStrictEqual(link);
    });

    it('Get AI Organization Settings', async () => {
        const settings = await api.getAiOrganizationSettings();
        expect(settings.data.assistActionAiPromptId).toBe(assistActionAiPromptId);
    });

    it('Edit AI Organization Settings', async () => {
        const settings = await api.editAiOrganizationSettings([
            {
                op: 'replace',
                path: '/name',
                value: name,
            },
        ]);
        expect(settings.data.assistActionAiPromptId).toBe(assistActionAiPromptId);
    });

    it('List AI User Custom Placeholders', async () => {
        const placeholders = await api.listAiUserCustomPlaceholders(userId);
        expect(placeholders.data.length).toBe(1);
        expect(placeholders.data[0].data.id).toBe(aiPlaceholderId);
        expect(placeholders.pagination.limit).toBe(limit);
    });

    it('Add AI User Custom Placeholders', async () => {
        const placeholder = await api.addAiUserCustomPlaceholder(userId, {
            description: aiPlaceholderDescription,
            placeholder: aiPlaceholderPlaceholder,
            value: aiPlaceholderValue,
        });
        expect(placeholder.data.id).toBe(aiPlaceholderId);
    });

    it('Get AI User Custom Placeholders', async () => {
        const placeholder = await api.getAiUserCustomPlaceholder(userId, aiPlaceholderId);
        expect(placeholder.data.id).toBe(aiPlaceholderId);
    });

    it('Delete AI User Custom Placeholders', async () => {
        await api.deleteAiUserCustomPlaceholder(userId, aiPlaceholderId);
    });

    it('Edit AI User Custom Placeholders', async () => {
        const placeholder = await api.editAiUserCustomPlaceholder(userId, aiPlaceholderId, [
            {
                op: 'replace',
                path: '/value',
                value: aiPlaceholderValue,
            },
        ]);
        expect(placeholder.data.id).toBe(aiPlaceholderId);
    });

    it('Generate AI User Prompt Fine-Tuning Dataset', async () => {
        const res = await api.generateAiUserPromptFineTuningDataset(userId, aiPromptId, { projectIds: [projectId] });
        expect(res.data.identifier).toBe(jobId);
    });

    it('Get AI User Prompt Fine-Tuning Dataset Status', async () => {
        const res = await api.getAiUserPromptFineTuningDatasetStatus(userId, aiPromptId, jobId);
        expect(res.data.identifier).toBe(jobId);
    });

    it('List AI User Prompt Fine-Tuning Events', async () => {
        const res = await api.listAiUserPromptFineTuningEvents(userId, aiPromptId, jobId);
        expect(res.data.length).toBe(1);
        expect(res.data[0].data.id).toBe(eventId);
        expect(res.pagination.limit).toBe(limit);
    });

    it('List AI User Prompt Fine-Tuning Jobs', async () => {
        const res = await api.listAiUserPromptFineTuningJobs(userId);
        expect(res.data.length).toBe(1);
        expect(res.data[0].data.identifier).toBe(jobId);
        expect(res.pagination.limit).toBe(limit);
    });

    it('Create AI User Prompt Fine-Tuning Job', async () => {
        const res = await api.createAiUserPromptFineTuningJob(userId, aiPromptId, {
            trainingOptions: { projectIds: [projectId] },
        });
        expect(res.data.identifier).toBe(jobId);
    });

    it('Get AI User Prompt Fine-Tuning Job Status', async () => {
        const res = await api.getAiUserPromptFineTuningJobStatus(userId, aiPromptId, jobId);
        expect(res.data.identifier).toBe(jobId);
    });

    it('Download AI User Prompt Fine-Tuning Dataset', async () => {
        const res = await api.downloadAiUserPromptFineTuningDataset(userId, aiPromptId, jobId);
        expect(res.data.url).toBe(link);
    });

    it('Clone AI User Prompt', async () => {
        const prompt = await api.cloneAiUserPrompt(userId, aiPromptId);
        expect(prompt.data.id).toBe(aiPromptId);
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

    it('Generate AI User Prompt Completion', async () => {
        const res = await api.generateAiUserPromptCompletion(userId, aiPromptId, generateAiCompletion);
        expect(res.data.identifier).toBe(completionId);
    });

    it('Get AI Prompt User Completion Status', async () => {
        const res = await api.getAiUserPromptCompletionStatus(userId, aiPromptId, completionId);
        expect(res.data.identifier).toBe(completionId);
    });

    it('Cancel AI Prompt User Completion', async () => {
        await api.cancelAiUserPromptCompletion(userId, aiPromptId, completionId);
    });

    it('Download AI Prompt User Completion', async () => {
        const res = await api.downloadAiUserPromptCompletion(userId, aiPromptId, completionId);
        expect(res.data.url).toBe(link);
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

    it('List AI User All Provider Models', async () => {
        const providers = await api.listAiUserAllProviderModels(userId);
        expect(providers.data.length).toBe(1);
        expect(providers.data[0].data.id).toBe(aiModelId);
        expect(providers.pagination.limit).toBe(limit);
    });

    it('Create AI User Proxy Chat Completion', async () => {
        const proxy = await api.createAiUserProxyChatCompletion(userId, aiProviderId, field);
        expect(proxy.data).toStrictEqual(field);
    });

    it('Generate AI User Report', async () => {
        const report = await api.generateAiUserReport(userId, generateReportReq);
        expect(report.data.identifier).toStrictEqual(reportId);
    });

    it('Get AI User Report', async () => {
        const report = await api.checkAiUserReportStatus(userId, reportId);
        expect(report.data.identifier).toStrictEqual(reportId);
    });

    it('Download AI User Report', async () => {
        const resp = await api.downloadAiUserReport(userId, reportId);
        expect(resp.data.url).toStrictEqual(link);
    });

    it('Get AI User Settings', async () => {
        const settings = await api.getAiUsertSettings(userId);
        expect(settings.data.assistActionAiPromptId).toBe(assistActionAiPromptId);
    });

    it('Edit AI User Settings', async () => {
        const settings = await api.editAiUserSettings(userId, [
            {
                op: 'replace',
                path: '/name',
                value: name,
            },
        ]);
        expect(settings.data.assistActionAiPromptId).toBe(assistActionAiPromptId);
    });
});
