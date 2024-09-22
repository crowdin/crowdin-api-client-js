import {
    CrowdinApi,
    DownloadLink,
    PaginationOptions,
    PatchRequest,
    PlainObject,
    ResponseList,
    ResponseObject,
    Status,
} from '../core';

export class Ai extends CrowdinApi {
    /**
     * @param aiPromptId ai prompt identifier
     * @param request request body
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/AI/operation/api.ai.prompts.fine-tuning.datasets.post
     */
    generateAiOrganizationPromptFineTuningDataset(
        aiPromptId: number,
        request: AiModel.GenerateFineTuningDataset,
    ): Promise<ResponseObject<Status<AiModel.FineTuningDataset>>> {
        const url = `${this.url}/ai/prompts/${aiPromptId}/fine-tuning/datasets`;

        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param aiPromptId ai prompt identifier
     * @param jobIdentifier job identifier
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/AI/operation/api.ai.prompts.fine-tuning.datasets.get
     */
    getAiOrganizationPromptFineTuningDatasetStatus(
        aiPromptId: number,
        jobIdentifier: string,
    ): Promise<ResponseObject<Status<AiModel.FineTuningDataset>>> {
        const url = `${this.url}/ai/prompts/${aiPromptId}/fine-tuning/datasets/${jobIdentifier}`;

        return this.get(url, this.defaultConfig());
    }

    /**
     * @param aiPromptId ai prompt identifier
     * @param request request body
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/AI/operation/api.ai.prompts.fine-tuning.jobs.post
     */
    generateAiOrganizationPromptFineTuningJob(
        aiPromptId: number,
        request: AiModel.GenerateFineTuningJob,
    ): Promise<ResponseObject<Status<AiModel.FineTuningJob>>> {
        const url = `${this.url}/ai/prompts/${aiPromptId}/fine-tuning/jobs`;

        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param aiPromptId ai prompt identifier
     * @param jobIdentifier job identifier
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/AI/operation/api.ai.prompts.fine-tuning.jobs.get
     */
    getAiOrganizationPromptFineTuningJobStatus(
        aiPromptId: number,
        jobIdentifier: string,
    ): Promise<ResponseObject<Status<AiModel.FineTuningJob>>> {
        const url = `${this.url}/ai/prompts/${aiPromptId}/fine-tuning/jobs/${jobIdentifier}`;

        return this.get(url, this.defaultConfig());
    }

    /**
     * @param aiPromptId ai prompt identifier
     * @param jobIdentifier job identifier
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/AI/operation/api.ai.prompts.fine-tuning.jobs.get
     */
    downloadAiOrganizationPromptFineTuningDataset(
        aiPromptId: number,
        jobIdentifier: string,
    ): Promise<ResponseObject<DownloadLink>> {
        const url = `${this.url}/ai/prompts/${aiPromptId}/fine-tuning/datasets/${jobIdentifier}/download`;

        return this.get(url, this.defaultConfig());
    }

    /**
     * @param aiPromptId ai prompt identifier
     * @param request request body
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.ai.prompts.clones.post
     */
    cloneAiOrganizationPrompt(
        aiPromptId: number,
        request: { name?: string } = {},
    ): Promise<ResponseObject<AiModel.AiPromptResponse>> {
        const url = `${this.url}/ai/prompts/${aiPromptId}/clones`;

        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.ai.prompts.getMany
     */
    listAiOrganizationPrompts(options?: AiModel.ListAiPromptsOptions): Promise<ResponseList<AiModel.AiPromptResponse>> {
        let url = `${this.url}/ai/prompts`;
        url = this.addQueryParam(url, 'projectId', options?.projectId);
        url = this.addQueryParam(url, 'action', options?.action);

        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param request request body
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.ai.prompts.post
     */
    addAiOrganizationPrompt(request: AiModel.AddAiPromptRequest): Promise<ResponseObject<AiModel.AiPromptResponse>> {
        const url = `${this.url}/ai/prompts`;

        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param aiPromptId ai Prompt identifier
     * @param request request body
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/AI/operation/api.ai.prompts.completions.post
     */
    generateAiOrganizationPromptCompletion(
        aiPromptId: number,
        request: AiModel.GenerateAiPromptCompletionRequest,
    ): Promise<ResponseObject<Status<AiModel.AiPromptCompletionAttribute>>> {
        const url = `${this.url}/ai/prompts/${aiPromptId}/completions`;

        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param aiPromptId ai Prompt identifier
     * @param completionId completion identifier
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/AI/operation/api.ai.prompts.completions.get
     */
    getAiOrganizationPromptCompletionStatus(
        aiPromptId: number,
        completionId: string,
    ): Promise<ResponseObject<Status<AiModel.AiPromptCompletionAttribute>>> {
        const url = `${this.url}/ai/prompts/${aiPromptId}/completions/${completionId}`;

        return this.get(url, this.defaultConfig());
    }

    /**
     * @param aiPromptId ai Prompt identifier
     * @param completionId completion identifier
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/AI/operation/api.ai.prompts.completions.delete
     */
    cancelAiOrganizationPromptCompletion(aiPromptId: number, completionId: string): Promise<void> {
        const url = `${this.url}/ai/prompts/${aiPromptId}/completions/${completionId}`;

        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param aiPromptId ai Prompt identifier
     * @param completionId completion identifier
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/AI/operation/api.ai.prompts.completions.download.download
     */
    downloadAiOrganizationPromptCompletion(
        aiPromptId: number,
        completionId: string,
    ): Promise<ResponseObject<DownloadLink>> {
        const url = `${this.url}/ai/prompts/${aiPromptId}/completions/${completionId}/download`;

        return this.get(url, this.defaultConfig());
    }

    /**
     * @param aiPromptId ai Prompt identifier.
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.ai.prompts.get
     */
    getAiOrganizationPrompt(aiPromptId: number): Promise<ResponseObject<AiModel.AiPromptResponse>> {
        const url = `${this.url}/ai/prompts/${aiPromptId}`;

        return this.get(url, this.defaultConfig());
    }

    /**
     * @param aiPromptId ai Prompt identifier
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.ai.prompts.delete
     */
    deleteAiOrganizationPrompt(aiPromptId: number): Promise<void> {
        const url = `${this.url}/ai/prompts/${aiPromptId}`;

        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param aiPromptId ai Prompt identifier
     * @param request request body
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.ai.prompts.patch
     */
    editAiOrganizationPrompt(
        aiPromptId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<AiModel.AiPromptResponse>> {
        const url = `${this.url}/ai/prompts/${aiPromptId}`;

        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.ai.providers.getMany
     */
    listAiOrganizationProviders(options?: PaginationOptions): Promise<ResponseList<AiModel.AiProviderResponse>> {
        const url = `${this.url}/ai/providers`;

        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param request request body
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.ai.providers.post
     */
    addAiOrganizationProvider(
        request: AiModel.AddAiProviderRequest,
    ): Promise<ResponseObject<AiModel.AiProviderResponse>> {
        const url = `${this.url}/ai/providers`;

        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param aiProviderId ai Provider identifier.
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.ai.providers.get
     */
    getAiOrganizationProvider(aiProviderId: number): Promise<ResponseObject<AiModel.AiProviderResponse>> {
        const url = `${this.url}/ai/providers/${aiProviderId}`;

        return this.get(url, this.defaultConfig());
    }

    /**
     * @param aiProviderId ai Provider identifier.
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.ai.providers.delete
     */
    deleteAiOrganizationProvider(aiProviderId: number): Promise<void> {
        const url = `${this.url}/ai/providers/${aiProviderId}`;

        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param aiProviderId ai Provider identifier
     * @param request request body
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.ai.providers.patch
     */
    editAiOrganizationProvider(
        aiProviderId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<AiModel.AiProviderResponse>> {
        const url = `${this.url}/ai/providers/${aiProviderId}`;

        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param aiProviderId ai Provider identifier
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.ai.providers.models.getMany
     */
    listAiOrganizationProviderModels(
        aiProviderId: number,
        options?: PaginationOptions,
    ): Promise<ResponseList<AiModel.AiProviderModelResponse>> {
        let url = `${this.url}/ai/providers/${aiProviderId}/models`;
        url = this.addQueryParam(url, 'limit', options?.limit);
        url = this.addQueryParam(url, 'offset', options?.offset);

        return this.getList(url);
    }

    /**
     * @param aiProviderId ai Provider identifier
     * @param request request body
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.ai.providers.chat.completions.post
     */
    createAiOrganizationProxyChatCompletion(
        aiProviderId: number,
        request?: AiModel.OtherChatCompletionRequest | AiModel.GoogleGeminiChatCompletionRequest,
    ): Promise<ResponseObject<AiModel.AiProviderProxyResponseData>> {
        const url = `${this.url}/ai/providers/${aiProviderId}/chat/completions`;

        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param request request body
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/AI/operation/api.ai.reports.post
     */
    generateAiOrganizationReport(request: AiModel.AiReport): Promise<ResponseObject<Status<AiModel.AiReport>>> {
        const url = `${this.url}/ai/reports`;

        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param aiReportId report identifier
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/AI/operation/api.ai.reports.get
     */
    checkAiOrganizationReportStatus(aiReportId: string): Promise<ResponseObject<Status<AiModel.AiReport>>> {
        const url = `${this.url}/ai/reports/${aiReportId}`;

        return this.get(url, this.defaultConfig());
    }

    /**
     * @param aiReportId report identifier
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/AI/operation/api.ai.reports.download.download
     */
    downloadAiOrganizationReport(aiReportId: string): Promise<ResponseObject<DownloadLink>> {
        const url = `${this.url}/ai/reports/${aiReportId}/download`;

        return this.get(url, this.defaultConfig());
    }

    /**
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.ai.settings.get
     */
    getAiOrganizationSettings(): Promise<ResponseObject<AiModel.AiSettings>> {
        const url = `${this.url}/ai/settings`;
        return this.get(url);
    }

    /**
     * @param request request body
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.ai.settings.patch
     */
    editAiOrganizationSettings(request: PatchRequest[]): Promise<ResponseObject<AiModel.AiSettings>> {
        const url = `${this.url}/ai/settings`;

        return this.patch(url, request, this.defaultConfig());
    }

    // Community

    /**
     * @param userId user identifier
     * @param aiPromptId ai prompt identifier
     * @param request request body
     * @see https://support.crowdin.com/developer/api/v2/#tag/AI/operation/api.ai.prompts.fine-tuning.datasets.post
     */
    generateAiUserPromptFineTuningDataset(
        userId: number,
        aiPromptId: number,
        request: AiModel.GenerateFineTuningDataset,
    ): Promise<ResponseObject<Status<AiModel.FineTuningDataset>>> {
        const url = `${this.url}/users/${userId}/ai/prompts/${aiPromptId}/fine-tuning/datasets`;

        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param aiPromptId ai prompt identifier
     * @param jobIdentifier job identifier
     * @see https://support.crowdin.com/developer/api/v2/#tag/AI/operation/api.users.ai.prompts.fine-tuning.datasets.get
     */
    getAiUserPromptFineTuningDatasetStatus(
        userId: number,
        aiPromptId: number,
        jobIdentifier: string,
    ): Promise<ResponseObject<Status<AiModel.FineTuningDataset>>> {
        const url = `${this.url}/users/${userId}/ai/prompts/${aiPromptId}/fine-tuning/datasets/${jobIdentifier}`;

        return this.get(url, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param aiPromptId ai prompt identifier
     * @param request request body
     * @see https://support.crowdin.com/developer/api/v2/#tag/AI/operation/api.ai.prompts.fine-tuning.jobs.post
     */
    generateAiUserPromptFineTuningJob(
        userId: number,
        aiPromptId: number,
        request: AiModel.GenerateFineTuningJob,
    ): Promise<ResponseObject<Status<AiModel.FineTuningJob>>> {
        const url = `${this.url}/users/${userId}/ai/prompts/${aiPromptId}/fine-tuning/jobs`;

        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param aiPromptId ai prompt identifier
     * @param jobIdentifier job identifier
     * @see https://support.crowdin.com/developer/api/v2/#tag/AI/operation/api.users.ai.prompts.fine-tuning.jobs.get
     */
    getAiUserPromptFineTuningJobStatus(
        userId: number,
        aiPromptId: number,
        jobIdentifier: string,
    ): Promise<ResponseObject<Status<AiModel.FineTuningJob>>> {
        const url = `${this.url}/users/${userId}/ai/prompts/${aiPromptId}/fine-tuning/jobs/${jobIdentifier}`;

        return this.get(url, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param aiPromptId ai prompt identifier
     * @param jobIdentifier job identifier
     * @see https://support.crowdin.com/developer/api/v2/#tag/AI/operation/api.users.ai.prompts.fine-tuning.datasets.download.get
     */
    downloadAiUserPromptFineTuningDataset(
        userId: number,
        aiPromptId: number,
        jobIdentifier: string,
    ): Promise<ResponseObject<DownloadLink>> {
        const url = `${this.url}/users/${userId}/ai/prompts/${aiPromptId}/fine-tuning/datasets/${jobIdentifier}/download`;

        return this.get(url, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param aiPromptId ai prompt identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.users.ai.prompts.clones.post
     */
    cloneAiUserPrompt(
        userId: number,
        aiPromptId: number,
        request: { name?: string } = {},
    ): Promise<ResponseObject<AiModel.AiPromptResponse>> {
        const url = `${this.url}/users/${userId}/ai/prompts/${aiPromptId}/clones`;

        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.users.ai.prompts.post
     */
    listAiUserPrompts(
        userId: number,
        options?: AiModel.ListAiPromptsOptions,
    ): Promise<ResponseList<AiModel.AiPromptResponse>> {
        let url = `${this.url}/users/${userId}/ai/prompts`;

        url = this.addQueryParam(url, 'projectId', options?.projectId);
        url = this.addQueryParam(url, 'action', options?.action);

        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param userId user identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.users.ai.prompts.post
     */
    addAiUserPrompt(
        userId: number,
        request: AiModel.AddAiPromptRequest,
    ): Promise<ResponseObject<AiModel.AiPromptResponse>> {
        const url = `${this.url}/users/${userId}/ai/prompts`;

        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param aiPromptId ai Prompt identifier
     * @param request request body
     * @see https://support.crowdin.com/developer/api/v2/#tag/AI/operation/api.ai.prompts.completions.post
     */
    generateAiUserPromptCompletion(
        userId: number,
        aiPromptId: number,
        request: AiModel.GenerateAiPromptCompletionRequest,
    ): Promise<ResponseObject<Status<AiModel.AiPromptCompletionAttribute>>> {
        const url = `${this.url}/users/${userId}/ai/prompts/${aiPromptId}/completions`;

        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param aiPromptId ai Prompt identifier
     * @param completionId completion identifier
     * @see https://support.crowdin.com/developer/api/v2/#tag/AI/operation/api.users.ai.prompts.completions.get
     */
    getAiUserPromptCompletionStatus(
        userId: number,
        aiPromptId: number,
        completionId: string,
    ): Promise<ResponseObject<Status<AiModel.AiPromptCompletionAttribute>>> {
        const url = `${this.url}/users/${userId}/ai/prompts/${aiPromptId}/completions/${completionId}`;

        return this.get(url, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param aiPromptId ai Prompt identifier
     * @param completionId completion identifier
     * @see https://support.crowdin.com/developer/api/v2/#tag/AI/operation/api.users.ai.prompts.completions.delete
     */
    cancelAiUserPromptCompletion(userId: number, aiPromptId: number, completionId: string): Promise<void> {
        const url = `${this.url}/users/${userId}/ai/prompts/${aiPromptId}/completions/${completionId}`;

        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param aiPromptId ai Prompt identifier
     * @param completionId completion identifier
     * @see https://support.crowdin.com/developer/api/v2/#tag/AI/operation/api.users.ai.prompts.completions.download.download
     */
    downloadAiUserPromptCompletion(
        userId: number,
        aiPromptId: number,
        completionId: string,
    ): Promise<ResponseObject<DownloadLink>> {
        const url = `${this.url}/users/${userId}/ai/prompts/${aiPromptId}/completions/${completionId}/download`;

        return this.get(url, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param aiPromptId ai Prompt identifier.
     * @see https://developer.crowdin.com/api/v2/#operation/api.users.ai.prompts.get
     */
    getAiUserPrompt(userId: number, aiPromptId: number): Promise<ResponseObject<AiModel.AiPromptResponse>> {
        const url = `${this.url}/users/${userId}/ai/prompts/${aiPromptId}`;

        return this.get(url, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param aiPromptId ai Prompt identifier.
     * @see https://developer.crowdin.com/api/v2/#operation/api.users.ai.prompts.delete
     */
    deleteAiUserPrompt(userId: number, aiPromptId: number): Promise<void> {
        const url = `${this.url}/users/${userId}/ai/prompts/${aiPromptId}`;

        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param aiPromptId ai Prompt identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.users.ai.prompts.patch
     */
    editAiUserPrompt(
        userId: number,
        aiPromptId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<AiModel.AiPromptResponse>> {
        const url = `${this.url}/users/${userId}/ai/prompts/${aiPromptId}`;

        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.ai.providers.getMany
     */
    listAiUserProviders(
        userId: number,
        options?: PaginationOptions,
    ): Promise<ResponseList<AiModel.AiProviderResponse>> {
        const url = `${this.url}/users/${userId}/ai/providers`;

        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param userId user identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.users.ai.providers.post
     */
    addAiUserProvider(
        userId: number,
        request: AiModel.AddAiProviderRequest,
    ): Promise<ResponseObject<AiModel.AiProviderResponse>> {
        const url = `${this.url}/users/${userId}/ai/providers`;

        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param aiProviderId ai Provider identifier.
     * @see https://developer.crowdin.com/api/v2/#operation/api.users.ai.providers.get
     */
    getAiUserProvider(userId: number, aiProviderId: number): Promise<ResponseObject<AiModel.AiProviderResponse>> {
        const url = `${this.url}/users/${userId}/ai/providers/${aiProviderId}`;

        return this.get(url, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param aiProviderId ai Provider identifier.
     * @see https://developer.crowdin.com/api/v2/#operation/api.users.ai.providers.delete
     */
    deleteAiUserProvider(userId: number, aiProviderId: number): Promise<void> {
        const url = `${this.url}/users/${userId}/ai/providers/${aiProviderId}`;

        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param aiProviderId ai Provider identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.users.ai.providers.patch
     */
    editAiUserProvider(
        userId: number,
        aiProviderId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<AiModel.AiProviderResponse>> {
        const url = `${this.url}/users/${userId}/ai/providers/${aiProviderId}`;

        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param aiProviderId ai Provider identifier
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.ai.providers.models.getMany
     */
    listAiUserProviderModels(
        userId: number,
        aiProviderId: number,
        options?: PaginationOptions,
    ): Promise<ResponseList<AiModel.AiProviderModelResponse>> {
        let url = `${this.url}/users/${userId}/ai/providers/${aiProviderId}/models`;
        url = this.addQueryParam(url, 'limit', options?.limit);
        url = this.addQueryParam(url, 'offset', options?.offset);

        return this.getList(url);
    }

    /**
     * @param userId user Identifier
     * @param aiProviderId ai Provider identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.users.ai.providers.chat.completions.post
     */
    createAiUserProxyChatCompletion(
        userId: number,
        aiProviderId: number,
        request?: AiModel.OtherChatCompletionRequest | AiModel.GoogleGeminiChatCompletionRequest,
    ): Promise<ResponseObject<AiModel.AiProviderProxyResponseData>> {
        const url = `${this.url}/users/${userId}/ai/providers/${aiProviderId}/chat/completions`;

        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param request request body
     * @see https://support.crowdin.com/developer/api/v2/#tag/AI/operation/api.users.ai.reports.post
     */
    generateAiUserReport(userId: number, request: AiModel.AiReport): Promise<ResponseObject<Status<AiModel.AiReport>>> {
        const url = `${this.url}/users/${userId}/ai/reports`;

        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param aiReportId report identifier
     * @see https://support.crowdin.com/developer/api/v2/#tag/AI/operation/api.users.ai.reports.get
     */
    checkAiUserReportStatus(userId: number, aiReportId: string): Promise<ResponseObject<Status<AiModel.AiReport>>> {
        const url = `${this.url}/users/${userId}/ai/reports/${aiReportId}`;

        return this.get(url, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param aiReportId report identifier
     * @see https://support.crowdin.com/developer/api/v2/#tag/AI/operation/api.users.ai.reports.download.download
     */
    downloadAiUserReport(userId: number, aiReportId: string): Promise<ResponseObject<DownloadLink>> {
        const url = `${this.url}/users/${userId}/ai/reports/${aiReportId}/download`;

        return this.get(url, this.defaultConfig());
    }

    /**
     * @param userId user Identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.users.ai.settings.get
     */
    getAiUsertSettings(userId: number): Promise<ResponseObject<AiModel.AiSettings>> {
        const url = `${this.url}/users/${userId}/ai/settings`;
        return this.get(url);
    }

    /**
     * @param userId user Identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.users.ai.settings.patch
     */
    editAiUserSettings(userId: number, request: PatchRequest[]): Promise<ResponseObject<AiModel.AiSettings>> {
        const url = `${this.url}/users/${userId}/ai/settings`;

        return this.patch(url, request, this.defaultConfig());
    }
}

export namespace AiModel {
    /* ai Fine-Tuning Section START*/
    export interface FineTuningDataset {
        projectIds: number[];
        purpose: 'training' | 'validation';
        dateFrom: string;
        dateTo: string;
        maxFileSize: number;
        minExamplesCount: number;
        maxExamplesCount: number;
    }

    export interface GenerateFineTuningDataset {
        projectIds: number[];
        purpose?: 'training' | 'validation';
        dateFrom?: string;
        dateTo?: string;
        maxFileSize?: number;
        minExamplesCount?: number;
        maxExamplesCount?: number;
    }

    export interface GenerateFineTuningJob {
        dryRun?: boolean;
        hyperparameters?: {
            batchSize: number;
            learningRateMultiplier: number;
            nEpochs: number;
        };
        trainingOptions: Omit<GenerateFineTuningDataset, 'purpose'>;
        validationOptions?: Omit<GenerateFineTuningDataset, 'purpose'>;
    }

    export interface FineTuningJob {
        dryRun: boolean;
        hyperparameters: {
            batchSize: number;
            learningRateMultiplier: number;
            nEpochs: number;
        };
        trainingOptions: Omit<GenerateFineTuningDataset, 'purpose'>;
        validationOptions: Omit<GenerateFineTuningDataset, 'purpose'>;
        fineTunedModel: string;
        trainedTokensCount: number;
        metadata: PlainObject;
    }
    /* ai Fine-Tuning Section END*/

    /* ai Prompts Section START*/
    export interface ListAiPromptsOptions extends PaginationOptions {
        projectId?: number;
        action?: Action;
    }

    export interface AiPromptResponse {
        id: number;
        name: string;
        action: Action;
        aiProviderId: number;
        aiModelId: string;
        isEnabled: boolean;
        enabledProjectIds: number[];
        config:
            | AiModel.AiPromptConfigBasicPreTranslate
            | AiModel.AiPromptConfigBasicAssistAction
            | AiModel.AiPromptConfigAdvanced
            | AiModel.AiPromptConfigExternal;
        promptPreview: string;
        isFineTuningAvailable: boolean;
        createdAt: string;
        updatedAt: string;
    }

    export interface AiPromptConfigBasicOtherLanguageTranslations {
        isEnabled?: boolean;
        languageIds?: string[];
    }

    export interface AiPromptConfigBasicPreTranslate {
        mode: 'basic';
        companyDescription?: string;
        projectDescription?: string;
        audienceDescription?: string;
        otherLanguageTranslations?: AiModel.AiPromptConfigBasicOtherLanguageTranslations;
        glossaryTerms?: boolean;
        tmSuggestions?: boolean;
        fileContent?: boolean;
        fileContext?: boolean;
        screenshots?: boolean;
        publicProjectDescription?: boolean;
    }

    export interface AiPromptConfigBasicAssistAction {
        mode: 'basic';
        companyDescription?: string;
        projectDescription?: string;
        audienceDescription?: string;
        otherLanguageTranslations?: AiModel.AiPromptConfigBasicOtherLanguageTranslations;
        glossaryTerms?: boolean;
        tmSuggestions?: boolean;
        fileContext?: boolean;
        screenshots?: boolean;
        publicProjectDescription?: boolean;
        siblingsStrings?: boolean;
        filteredStrings?: boolean;
    }

    export interface AiPromptConfigAdvanced {
        mode: 'advanced';
        screenshots?: boolean;
        prompt: string;
        otherLanguageTranslations?: AiModel.AiPromptConfigBasicOtherLanguageTranslations;
    }

    export interface AiPromptConfigExternal {
        mode: 'external';
        identifier: string;
        key: string;
        options?: any;
    }

    export interface AddAiPromptRequest {
        name: string;
        action: Action;
        aiProviderId?: number;
        aiModelId?: string;
        isEnabled?: boolean;
        enabledProjectIds?: number[];
        config:
            | AiModel.AiPromptConfigBasicPreTranslate
            | AiModel.AiPromptConfigBasicAssistAction
            | AiModel.AiPromptConfigAdvanced
            | AiPromptConfigExternal;
    }

    export interface GenerateAiPromptCompletionRequest {
        resources:
            | AiModel.AiPromptResourceWithPreTranslate
            | AiModel.AiPromptResourceWithPreTranslate
            | AiModel.AiPromptResourceWithCustom;
        tools?: {
            tool: {
                type: 'function';
                function: {
                    description?: string;
                    name: string;
                    parameters?: PlainObject;
                };
            };
        }[];
        tool_choice?: string | PlainObject;
    }

    export interface AiPromptCompletionAttribute {
        aiPromptId: number;
    }

    export interface AiPromptResourceWithPreTranslate {
        projectId: number;
        targetLanguageId: string;
        stringIds: number[];
    }

    export interface AiPromptResourceWithAssist {
        projectId: number;
        targetLanguageId: string;
        stringIds: number[];
        filteredStringsIds?: number[];
    }

    export interface AiPromptResourceWithCustom {
        projectId: number;
        targetLanguageId: string;
        stringIds: number[];
    }
    /* ai Prompts Section END*/

    /* ai Providers Section START*/
    export interface AiProviderResponse {
        id: number;
        name: string;
        type: ProviderType;
        credentials:
            | AiModel.AiProviderCredentialsBasic
            | AiModel.AiProviderCredentialsAzureOpenAi
            | AiProviderCredentialsGoogleGemini
            | AiProviderCredentialsCustom;
        config: AiModel.AiProviderConfig;
        isEnabled: boolean;
        useSystemCredentials: boolean;
        createdAt: string;
        updatedAt: string;
        promptsCount: string;
    }

    export interface AiProviderCredentialsBasic {
        apiKey: string;
    }

    export interface AiProviderCredentialsAzureOpenAi extends AiProviderCredentialsBasic {
        resourceName: string;
        deploymentName: string;
        apiVersion: string;
    }

    export interface AiProviderCredentialsGoogleGemini {
        project: string;
        region: string;
        serviceAccountKey: string;
    }

    export interface AiProviderCredentialsCustom {
        identifier: string;
        key: string;
    }

    export interface AiProviderConfig {
        actionRules?: AiModel.AiProviderConfigActionRule[];
    }

    export interface AiProviderConfigActionRule {
        action?: 'pre_translate' | 'assist';
        availableAiModelIds?: string[];
    }

    export interface AddAiProviderRequest {
        name: string;
        type: ProviderType;
        credentials?:
            | AiModel.AiProviderCredentialsBasic
            | AiModel.AiProviderCredentialsAzureOpenAi
            | AiProviderCredentialsGoogleGemini
            | AiProviderCredentialsCustom;
        config?: AiModel.AiProviderConfig;
        isEnabled?: boolean;
        useSystemCredentials?: boolean;
    }
    /* ai Providers Section END*/

    /* ai Provider Models Section START*/
    export interface AiProviderModelResponse {
        id: string;
    }
    /* ai Provider Models Section END*/

    /* ai Proxy Chat Section START*/
    export interface AiProviderProxyResponseData {
        data: object;
    }

    export interface OtherChatCompletionRequest {
        stream?: boolean;
        [key: string]: any;
    }

    export interface GoogleGeminiChatCompletionRequest extends OtherChatCompletionRequest {
        model: string;
    }
    /* ai Proxy Chat Section END*/

    /* ai Report Section START*/
    export type AiReport = AiReportTokenUsage;

    export interface AiReportTokenUsage {
        type: 'tokens-usage-raw-data';
        schema: AiReportGeneralSchema;
    }

    export interface AiReportGeneralSchema {
        dateFrom: string;
        dateTo: string;
        format?: 'json' | 'csv';
        projectIds?: number[];
        promptIds?: number[];
        userIds?: number[];
    }

    /* ai Report Section END*/

    /* ai Settings Section START*/
    export interface AiSettings {
        assistActionAiPromptId: number;
        showSuggestion: boolean;
        shortcuts: {
            name: string;
            prompt: string;
            enabled: boolean;
        }[];
    }
    /* ai Settings Section END*/

    export type Action = 'pre_translate' | 'assist';
    export type ProviderType = 'open_ai' | 'azure_open_ai' | 'google_gemini' | 'mistral_ai' | 'anthropic' | 'custom_ai';
}
