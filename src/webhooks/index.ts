import { CrowdinApi, isOptionalNumber, PaginationOptions, PatchRequest, ResponseList, ResponseObject } from '../core';

export class Webhooks extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param options optional pagination parameters for the request
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.webhooks.getMany
     */
    listWebhooks(projectId: number, options?: PaginationOptions): Promise<ResponseList<WebhooksModel.Webhook>>;
    /**
     * @param projectId project identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @deprecated optional parameters should be passed through an object
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.webhooks.getMany
     */
    listWebhooks(projectId: number, limit?: number, offset?: number): Promise<ResponseList<WebhooksModel.Webhook>>;
    listWebhooks(
        projectId: number,
        options?: number | PaginationOptions,
        deprecatedOffset?: number,
    ): Promise<ResponseList<WebhooksModel.Webhook>> {
        if (isOptionalNumber(options, '1' in arguments)) {
            options = { limit: options, offset: deprecatedOffset };
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

    export type ContentType = 'multipart/form-data' | 'application/json' | 'application/x-www-form-urlencoded';

    export type Event =
        | 'file.translated'
        | 'file.approved'
        | 'project.translated'
        | 'project.approved'
        | 'translation.updated'
        | 'suggestion.added'
        | 'suggestion.updated'
        | 'suggestion.deleted'
        | 'suggestion.approved'
        | 'suggestion.disapproved';

    export type RequestType = 'POST' | 'GET';
}
