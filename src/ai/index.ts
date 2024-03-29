import { CrowdinApi, PaginationOptions, PatchRequest, ResponseList, ResponseObject } from '../core';

export class Ai extends CrowdinApi {
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
     * @param aiPromptId ai Prompt identifier.
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.ai.prompts.get
     */
    getAiOrganizationPrompt(aiPromptId: number): Promise<ResponseObject<AiModel.AiPromptResponse>> {
        const url = `${this.url}/ai/prompts/${aiPromptId}`;

        return this.get(url, this.defaultConfig());
    }

    /**
     * @param aiPromptId ai Prompt identifier.
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
}

export namespace AiModel {
    /* ai Prompts Section START*/
    export interface ListAiPromptsOptions extends PaginationOptions {
        projectId?: number;
        action?: string;
    }

    export interface AiPromptResponse {
        id: number;
        name: string;
        action: string;
        aiProviderId: number;
        AiModelId: string;
        isEnabled: boolean;
        enabledProjectIds: number[];
        config: AiModel.AiPromptConfigBasic | AiModel.AiPromptConfigAdvanced;
        createdAt: string;
        updatedAt: string;
    }

    export interface AiPromptConfigBasicOtherLanguageTranslations {
        isEnabled?: boolean;
        languageIds?: string[];
    }

    export interface AiPromptConfigBasic {
        mode: 'basic';
        companyDescription?: string;
        projectDescription?: string;
        audienceDescription?: string;
        otherLanguageTranslations?: AiModel.AiPromptConfigBasicOtherLanguageTranslations;
        glossaryTerms?: boolean;
        tmSuggestions?: boolean;
        fileContent?: boolean;
        fileContext?: boolean;
        publicProjectDescription?: boolean;
    }

    export interface AiPromptConfigAdvanced {
        mode: 'advanced';
        prompt: string;
    }

    export interface AddAiPromptRequest {
        name: string;
        action: string;
        aiProviderId: number;
        aiModelId: string;
        isEnabled?: boolean;
        enabledProjectIds?: number[];
        config: AiModel.AiPromptConfigBasic | AiModel.AiPromptConfigAdvanced;
    }
    /* ai Prompts Section END*/

    /* ai Providers Section START*/
    export interface AiProviderResponse {
        id: number;
        name: string;
        type: string;
        credentials:
            | AiModel.AiProviderCredentialsOpenAi
            | AiModel.AiProviderCredentialsAzureOpenAi
            | AiProviderCredentialsGoogleGemini;
        config: AiModel.AiProviderConfig;
        isEnabled: boolean;
        createdAt: string;
        updatedAt: string;
    }

    export interface AiProviderCredentialsOpenAi {
        apiKey: string;
    }

    export interface AiProviderCredentialsAzureOpenAi {
        resourceName: string;
        apiKey: string;
        deploymentName: string;
        apiVersion: string;
    }

    export interface AiProviderCredentialsGoogleGemini {
        project: string;
        region: string;
        serviceAccountKey: string;
    }

    export interface AiProviderConfig {
        actionRules?: AiModel.AiProviderConfigActionRule[];
    }

    export interface AiProviderConfigActionRule {
        action?: string;
        availableAiModelIds?: string[];
    }

    export interface AddAiProviderRequest {
        name: string;
        type: string;
        credentials:
            | AiModel.AiProviderCredentialsOpenAi
            | AiModel.AiProviderCredentialsAzureOpenAi
            | AiProviderCredentialsGoogleGemini;
        config?: AiModel.AiProviderConfig;
        isEnabled?: boolean;
    }
    /* ai Providers Section END*/

    /* ai Provider Models Section START*/
    export interface AiProviderModelResponse {
        id: string;
    }
    /* ai Provider Models Section END*/

    /* ai Provider Models Section START*/
    export interface AiProviderProxyResponseData {
        data: object;
    }
    /* ai Provider Models Section END*/

    export interface OtherChatCompletionRequest {
        [key: string]: object | string;
    }

    export interface GoogleGeminiChatCompletionRequest extends OtherChatCompletionRequest {
        model: string;
    }
}
