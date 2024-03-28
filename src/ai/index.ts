import { CrowdinApi, PaginationOptions, PatchRequest, ResponseList, ResponseObject } from '../core';

export class AI extends CrowdinApi {
    /**
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.ai.prompts.getMany
     */
    listAIPrompts(options?: AIModel.ListAIPromptsOptions): Promise<ResponseList<AIModel.AIPromptResponse>> {
        let url = `${this.url}/ai/prompts`;
        url = this.addQueryParam(url, 'projectId', options?.projectId);
        url = this.addQueryParam(url, 'action', options?.action);

        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param request request body
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.ai.prompts.post
     */
    addAIPrompt(request: AIModel.AddAIPromptRequest): Promise<ResponseObject<AIModel.AIPromptResponse>> {
        const url = `${this.url}/ai/prompts`;

        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param aiPromptId ai Prompt identifier.
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.ai.prompts.get
     */
    getAIPrompt(aiPromptId: number): Promise<ResponseObject<AIModel.AIPromptResponse>> {
        const url = `${this.url}/ai/prompts/${aiPromptId}`;

        return this.get(url, this.defaultConfig());
    }

    /**
     * @param aiPromptId ai Prompt identifier.
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.ai.prompts.delete
     */
    deleteAIPrompt(aiPromptId: number): Promise<void> {
        const url = `${this.url}/ai/prompts/${aiPromptId}`;

        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param aiPromptId ai Prompt identifier
     * @param request request body
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.ai.prompts.patch
     */
    editAIPrompt(aiPromptId: number, request: PatchRequest[]): Promise<ResponseObject<AIModel.AIPromptResponse>> {
        const url = `${this.url}/ai/prompts/${aiPromptId}`;

        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.ai.providers.getMany
     */
    listAIProviders(options?: PaginationOptions): Promise<ResponseList<AIModel.AIProviderResponse>> {
        const url = `${this.url}/ai/providers`;

        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param request request body
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.ai.providers.post
     */
    addAIProvider(request: AIModel.AddAIProviderRequest): Promise<ResponseObject<AIModel.AIProviderResponse>> {
        const url = `${this.url}/ai/providers`;

        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param aiProviderId ai Provider identifier.
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.ai.providers.get
     */
    getAIProvider(aiProviderId: number): Promise<ResponseObject<AIModel.AIProviderResponse>> {
        const url = `${this.url}/ai/providers/${aiProviderId}`;

        return this.get(url, this.defaultConfig());
    }

    /**
     * @param aiProviderId ai Provider identifier.
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.ai.providers.delete
     */
    deleteAIProvider(aiProviderId: number): Promise<void> {
        const url = `${this.url}/ai/providers/${aiProviderId}`;

        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param aiProviderId ai Provider identifier
     * @param request request body
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.ai.providers.patch
     */
    editAIProvider(aiProviderId: number, request: PatchRequest[]): Promise<ResponseObject<AIModel.AIProviderResponse>> {
        const url = `${this.url}/ai/providers/${aiProviderId}`;

        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param aiProviderId ai Provider identifier
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.ai.providers.models.getMany
     */
    listAIProviderModels(
        aiProviderId: number,
        options?: PaginationOptions,
    ): Promise<ResponseList<AIModel.AIProviderModelResponse>> {
        let url = `${this.url}/ai/providers/${aiProviderId}/models`;
        url = this.addQueryParam(url, 'limit', options?.limit);
        url = this.addQueryParam(url, 'offset', options?.offset);

        return this.getList(url);
    }

    /**
     * @param userId User Identifier
     * @param aiProviderId ai Provider identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.users.ai.providers.chat.completions.post
     */
    createAIProxyChatCompletion(
        userId: number,
        aiProviderId: number,
        request?: object,
    ): Promise<ResponseObject<AIModel.AIProviderProxyResponseData>> {
        const url = `${this.url}/users/${userId}/ai/providers/${aiProviderId}/chat/completions`;

        return this.post(url, request, this.defaultConfig());
    }
}

export namespace AIModel {
    /* ai Prompts Section START*/
    export interface ListAIPromptsOptions extends PaginationOptions {
        projectId?: number;
        action?: string;
    }

    export interface AIPromptResponse {
        id: number;
        name: string;
        action: string;
        aiProviderId: number;
        aiModelId: string;
        isEnabled: boolean;
        enabledProjectIds: number[];
        config: AIModel.AIPromptConfigBasic | AIModel.AIPromptConfigAdvanced;
        createdAt: string;
        updatedAt: string;
    }

    export interface AIPromptConfigBasicOtherLanguageTranslations {
        isEnabled?: boolean;
        languageIds?: string[];
    }

    export interface AIPromptConfigBasic {
        mode: 'basic';
        companyDescription?: string;
        projectDescription?: string;
        audienceDescription?: string;
        otherLanguageTranslations?: AIModel.AIPromptConfigBasicOtherLanguageTranslations;
        glossaryTerms?: boolean;
        tmSuggestions?: boolean;
        fileContent?: boolean;
        fileContext?: boolean;
        publicProjectDescription?: boolean;
    }

    export interface AIPromptConfigAdvanced {
        mode: 'advanced';
        prompt: string;
    }

    export interface AddAIPromptRequest {
        name: string;
        action: string;
        aiProviderId: number;
        aiModelId: string;
        isEnabled?: boolean;
        enabledProjectIds?: number[];
        config: AIModel.AIPromptConfigBasic | AIModel.AIPromptConfigAdvanced;
    }
    /* ai Prompts Section END*/

    /* ai Providers Section START*/
    export interface AIProviderResponse {
        id: number;
        name: string;
        type: string;
        credentials:
            | AIModel.AIProviderCredentialsOpenAI
            | AIModel.AIProviderCredentialsAzureOpenAI
            | AIProviderCredentialsGoogleGemini;
        config: AIModel.AIProviderConfig;
        isEnabled: boolean;
        createdAt: string;
        updatedAt: string;
    }

    export interface AIProviderCredentialsOpenAI {
        apiKey: string;
    }

    export interface AIProviderCredentialsAzureOpenAI {
        resourceName: string;
        apiKey: string;
        deploymentName: string;
        apiVersion: string;
    }

    export interface AIProviderCredentialsGoogleGemini {
        project: string;
        region: string;
        serviceAccountKey: string;
    }

    export interface AIProviderConfig {
        actionRules?: AIModel.AIProviderConfigActionRule[];
    }

    export interface AIProviderConfigActionRule {
        action?: string;
        availableAiModelIds?: string[];
    }

    export interface AddAIProviderRequest {
        name: string;
        type: string;
        credentials:
            | AIModel.AIProviderCredentialsOpenAI
            | AIModel.AIProviderCredentialsAzureOpenAI
            | AIProviderCredentialsGoogleGemini;
        config?: AIModel.AIProviderConfig;
        isEnabled?: boolean;
    }
    /* ai Providers Section END*/

    /* ai Provider Models Section START*/
    export interface AIProviderModelResponse {
        id: string;
    }
    /* ai Provider Models Section END*/

    /* ai Provider Models Section START*/
    export interface AIProviderProxyResponseData {
        data: object;
    }
    /* ai Provider Models Section END*/
}
