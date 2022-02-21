import { CrowdinApi, PaginationOptions, PatchRequest, ResponseList, ResponseObject } from '../core';

export class Webhooks extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @deprecated Optional parameters should be passed through an object
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.webhooks.getMany
     */
    listWebhooks(projectId: number, limit?: number, offset?: number): Promise<ResponseList<WebhooksModel.Webhook>>;
    /**
     * @param projectId project identifier
     * @param options optional pagination options
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.webhooks.getMany
     */
    listWebhooks(projectId: number, options?: PaginationOptions): Promise<ResponseList<WebhooksModel.Webhook>>;
    listWebhooks(
        projectId: number,
        options?: number | PaginationOptions,
        deprecatedOffset?: number,
    ): Promise<ResponseList<WebhooksModel.Webhook>> {
        if (typeof options === 'number' || typeof options === 'undefined') {
            options = { limit: options, offset: deprecatedOffset };
            this.emitDeprecationWarning();
        }
        const url = `${this.url}/projects/${projectId}/webhooks`;
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.webhooks.post
     */
    addWebhook(
        projectId: number,
        request: WebhooksModel.AddWebhookRequest,
    ): Promise<ResponseObject<WebhooksModel.Webhook>> {
        const url = `${this.url}/projects/${projectId}/webhooks`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param webhookId webhook identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.webhooks.get
     */
    getWebhook(projectId: number, webhookId: number): Promise<ResponseObject<WebhooksModel.Webhook>> {
        const url = `${this.url}/projects/${projectId}/webhooks/${webhookId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param webhookId webhook identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.webhooks.delete
     */
    deleteWebhook(projectId: number, webhookId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/webhooks/${webhookId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param webhookId webhook identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.webhooks.patch
     */
    editWebhook(
        projectId: number,
        webhookId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<WebhooksModel.Webhook>> {
        const url = `${this.url}/projects/${projectId}/webhooks/${webhookId}`;
        return this.patch(url, request, this.defaultConfig());
    }
}

export namespace WebhooksModel {
    export interface Webhook {
        id: number;
        projectId: number;
        name: string;
        url: string;
        events: Event[];
        headers: string[];
        payload: string[];
        isActive: boolean;
        batchingEnabled: boolean;
        requestType: RequestType;
        contentType: ContentType;
        createdAt: string;
        updatedAt: string;
    }

    export interface AddWebhookRequest {
        name: string;
        url: string;
        isActive?: boolean;
        batchingEnabled?: boolean;
        contentType?: ContentType;
        events: Event[];
        headers?: Record<string, string>;
        requestType: RequestType;
        //TODO improve this type, needs better documentation
        payload?: any;
    }

    export enum ContentType {
        MULTIPART_FORM_DATA = 'multipart/form-data',
        APPLICATION_JSON = 'application/json',
        APPLICATION_X_WWW_FORM_URLENCODED = 'application/x-www-form-urlencoded',
    }

    export enum Event {
        FILE_TRANSLATED = 'file.translated',
        FILE_APPROVED = 'file.approved',
        PROJECT_TRANSLATED = 'project.translated',
        PROJECT_APPROVED = 'project.approved',
        TRANSLATION_UPDATED = 'translation.updated',
        SUGGESTION_ADDED = 'suggestion.added',
        SUGGESTION_UPDATED = 'suggestion.updated',
        SUGGESTION_DELETED = 'suggestion.deleted',
        SUGGESTION_APPROVED = 'suggestion.approved',
        SUGGESTION_DISAPPROVED = 'suggestion.disapproved',
    }

    export enum RequestType {
        POST = 'POST',
        GET = 'GET',
    }
}
