import { CrowdinApi, PaginationOptions, PatchRequest, ResponseList, ResponseObject } from '../core';

export class Ai extends CrowdinApi {
    //TODO new methods

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

    //TODO new methods

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

    //TODO AI Report

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

    //TODO new methods

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

    //TODO new methods

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

    //TODO AI Report

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

    /* ai Provider Models Section START*/
    export interface AiProviderProxyResponseData {
        data: object;
    }
    /* ai Provider Models Section END*/

    export interface AiSettings {
        assistActionAiPromptId: number;
        showSuggestion: boolean;
        shortcuts: {
            name: string;
            prompt: string;
            enabled: boolean;
        }[];
    }

    export interface OtherChatCompletionRequest {
        stream?: boolean;
        [key: string]: any;
    }

    export interface GoogleGeminiChatCompletionRequest extends OtherChatCompletionRequest {
        model: string;
    }

    export type Action = 'pre_translate' | 'assist';
    export type ProviderType = 'open_ai' | 'azure_open_ai' | 'google_gemini' | 'mistral_ai' | 'anthropic' | 'custom_ai';
}
