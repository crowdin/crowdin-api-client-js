import { CrowdinApi, PaginationOptions, PatchRequest, ResponseList, ResponseObject } from '../core';

/**
 * Webhooks allow you to collect information about events that happen in your Crowdin account.
 *
 * You can select the request type, content type, and add a custom payload, which allows you to create integrations with other systems on your own.
 */
export class OrganizationWebhooks extends CrowdinApi {
    /**
     * @param options optional pagination parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.webhooks.getMany
     */
    listWebhooks(options?: PaginationOptions): Promise<ResponseList<OrganizationWebhooksModel.Webhook>> {
        const url = `${this.url}/webhooks`;
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.webhooks.post
     */
    addWebhook(
        request: OrganizationWebhooksModel.AddWebhookRequest,
    ): Promise<ResponseObject<OrganizationWebhooksModel.Webhook>> {
        const url = `${this.url}/webhooks`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param webhookId webhook identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.webhooks.get
     */
    getWebhook(webhookId: number): Promise<ResponseObject<OrganizationWebhooksModel.Webhook>> {
        const url = `${this.url}/webhooks/${webhookId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param webhookId webhook identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.webhooks.delete
     */
    deleteWebhook(webhookId: number): Promise<void> {
        const url = `${this.url}/webhooks/${webhookId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param webhookId webhook identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.webhooks.patch
     */
    editWebhook(
        webhookId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<OrganizationWebhooksModel.Webhook>> {
        const url = `${this.url}/webhooks/${webhookId}`;
        return this.patch(url, request, this.defaultConfig());
    }
}

export namespace OrganizationWebhooksModel {
    export interface Webhook {
        id: number;
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
        payload?: any;
    }

    export type ContentType = 'multipart/form-data' | 'application/json' | 'application/x-www-form-urlencoded';

    export type Event = 'project.created' | 'project.deleted' | 'group.created' | 'group.deleted';

    export type RequestType = 'POST' | 'GET';
}
