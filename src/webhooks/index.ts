import { CrowdinApi, isOptionalNumber, PaginationOptions, PatchRequest, ResponseList, ResponseObject } from '../core';

/**
 * Webhooks allow you to collect information about events that happen in your Crowdin projects.
 *
 * You can select the request type, content type, and add a custom payload, which allows you to create integrations with other systems on your own.
 */
export class Webhooks extends CrowdinApi {
    /**
     * @requiredScope project.webhook:read
     * @param projectId project identifier
     * @param options optional pagination parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.webhooks.getMany
     */
    listWebhooks(projectId: number, options?: PaginationOptions): Promise<ResponseList<WebhooksModel.Webhook>>;
    /**
     * @requiredScope project.webhook:read
     * @param projectId project identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @deprecated optional parameters should be passed through an object
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.webhooks.getMany
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
     * @requiredScope project.webhook:write
     * @param projectId project identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.webhooks.post
     */
    addWebhook(
        projectId: number,
        request: WebhooksModel.AddWebhookRequest,
    ): Promise<ResponseObject<WebhooksModel.Webhook>> {
        const url = `${this.url}/projects/${projectId}/webhooks`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @requiredScope project.webhook:read
     * @param projectId project identifier
     * @param webhookId webhook identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.webhooks.get
     */
    getWebhook(projectId: number, webhookId: number): Promise<ResponseObject<WebhooksModel.Webhook>> {
        const url = `${this.url}/projects/${projectId}/webhooks/${webhookId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @requiredScope project.webhook:write
     * @param projectId project identifier
     * @param webhookId webhook identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.webhooks.delete
     */
    deleteWebhook(projectId: number, webhookId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/webhooks/${webhookId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @requiredScope project.webhook:write
     * @param projectId project identifier
     * @param webhookId webhook identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.webhooks.patch
     */
    editWebhook(
        projectId: number,
        webhookId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<WebhooksModel.Webhook>> {
        const url = `${this.url}/projects/${projectId}/webhooks/${webhookId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @requiredScope project.webhook:read
     * @param projectId project identifier
     * @param options optional parameters for the request
     * @see https://support.crowdin.com/developer/api/v2/#tag/Webhooks/operation/api.projects.webhooks.deliveries.getAll
     */
    listAllWebhookDeliveries(
        projectId: number,
        options?: WebhooksModel.ListAllWebhookDeliveriesOptions,
    ): Promise<ResponseList<WebhooksModel.WebhookDelivery>> {
        let url = `${this.url}/projects/${projectId}/webhooks/deliveries`;
        url = this.addQueryParam(url, 'webhookIds', options?.webhookIds);
        url = this.addQueryParam(url, 'status', options?.status);
        url = this.addQueryParam(url, 'events', options?.events);
        url = this.addQueryParam(url, 'createdAfter', options?.createdAfter);
        url = this.addQueryParam(url, 'createdBefore', options?.createdBefore);
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @requiredScope project.webhook:read
     * @param projectId project identifier
     * @param webhookId webhook identifier
     * @param options optional parameters for the request
     * @see https://support.crowdin.com/developer/api/v2/#tag/Webhooks/operation/api.projects.webhooks.deliveries.getMany
     */
    listWebhookDeliveries(
        projectId: number,
        webhookId: number,
        options?: WebhooksModel.ListWebhookDeliveriesOptions,
    ): Promise<ResponseList<WebhooksModel.WebhookDelivery>> {
        let url = `${this.url}/projects/${projectId}/webhooks/${webhookId}/deliveries`;
        url = this.addQueryParam(url, 'status', options?.status);
        url = this.addQueryParam(url, 'events', options?.events);
        url = this.addQueryParam(url, 'createdAfter', options?.createdAfter);
        url = this.addQueryParam(url, 'createdBefore', options?.createdBefore);
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @requiredScope project.webhook:read
     * @param projectId project identifier
     * @param webhookId webhook identifier
     * @param deliveryId delivery identifier
     * @see https://support.crowdin.com/developer/api/v2/#tag/Webhooks/operation/api.projects.webhooks.deliveries.get
     */
    getWebhookDelivery(
        projectId: number,
        webhookId: number,
        deliveryId: number,
    ): Promise<ResponseObject<WebhooksModel.WebhookDeliveryDetails>> {
        const url = `${this.url}/projects/${projectId}/webhooks/${webhookId}/deliveries/${deliveryId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @requiredScope project.webhook:write
     * @param projectId project identifier
     * @param webhookId webhook identifier
     * @param deliveryId delivery identifier
     * @see https://support.crowdin.com/developer/api/v2/#tag/Webhooks/operation/api.projects.webhooks.deliveries.resend.post
     */
    resendWebhookDelivery(
        projectId: number,
        webhookId: number,
        deliveryId: number,
    ): Promise<ResponseObject<WebhooksModel.WebhookDelivery>> {
        const url = `${this.url}/projects/${projectId}/webhooks/${webhookId}/deliveries/${deliveryId}/resend`;
        return this.post(url, {}, this.defaultConfig());
    }

    /**
     * @requiredScope project.webhook:write
     * @param projectId project identifier
     * @param webhookId webhook identifier
     * @param request request body
     * @see https://support.crowdin.com/developer/api/v2/#tag/Webhooks/operation/api.projects.webhooks.tests.post
     */
    testWebhook(
        projectId: number,
        webhookId: number,
        request: WebhooksModel.TestWebhookRequest = {},
    ): Promise<ResponseObject<WebhooksModel.WebhookTestResult>> {
        const url = `${this.url}/projects/${projectId}/webhooks/${webhookId}/tests`;
        return this.post(url, request, this.defaultConfig());
    }
}

export namespace WebhooksModel {
    export interface Webhook {
        id: number;
        projectId: number;
        name: string;
        url: string | null;
        events: Event[];
        headers: Record<string, string>;
        payload: Record<string, any>;
        isActive: boolean;
        batchingEnabled: boolean;
        requestType: RequestType;
        contentType: ContentType | null;
        createdAt: string;
        updatedAt: string;
    }

    export interface AddWebhookRequest {
        name: string;
        url: string;
        events: Event[];
        requestType: RequestType;
        isActive?: boolean;
        batchingEnabled?: boolean;
        contentType?: ContentType;
        headers?: Record<string, string>;
        payload?: Record<string, any>;
    }

    export type ContentType = 'multipart/form-data' | 'application/json' | 'application/x-www-form-urlencoded';

    export type Event =
        | 'file.added'
        | 'file.updated'
        | 'file.reverted'
        | 'file.deleted'
        | 'file.translated'
        | 'file.approved'
        | 'file.qa.finished'
        | 'project.translated'
        | 'project.approved'
        | 'project.qa.finished'
        | 'project.built'
        | 'preTranslation.completed'
        | 'translation.updated'
        | 'string.added'
        | 'string.updated'
        | 'string.deleted'
        | 'string.labelsAssigned'
        | 'string.labelsUnassigned'
        | 'label.created'
        | 'label.updated'
        | 'label.deleted'
        | 'stringComment.created'
        | 'stringComment.updated'
        | 'stringComment.deleted'
        | 'stringComment.restored'
        | 'suggestion.added'
        | 'suggestion.updated'
        | 'suggestion.deleted'
        | 'suggestion.approved'
        | 'suggestion.disapproved'
        | 'task.added'
        | 'task.statusChanged'
        | 'task.updated'
        | 'task.deleted';

    export type RequestType = 'POST' | 'GET';

    export interface ListWebhookDeliveriesOptions extends PaginationOptions {
        status?: DeliveryStatus;
        /**
         * One event or a comma-separated list
         */
        events?: string;
        /**
         * ISO 8601 date-time
         */
        createdAfter?: string;
        /**
         * ISO 8601 date-time
         */
        createdBefore?: string;
    }

    export interface ListAllWebhookDeliveriesOptions extends ListWebhookDeliveriesOptions {
        /**
         * One webhook ID or a comma-separated list
         */
        webhookIds?: string;
    }

    export type DeliveryStatus = 'success' | 'failed';

    export interface WebhookDelivery {
        id: number;
        webhookId: number;
        event: string;
        url: string;
        status: DeliveryStatus;
        responseStatusCode: number | null;
        responseBody: string | null;
        fileId: number | null;
        languageId: string | null;
        createdAt: string;
    }

    export interface WebhookDeliveryDetails extends WebhookDelivery {
        requestType: RequestType;
        contentType: ContentType | null;
        headers: Record<string, string>;
        payload: Record<string, any>;
    }

    export interface TestWebhookRequest {
        event?: string;
    }

    export interface WebhookTestResult {
        event: string;
        url: string;
        payload: Record<string, any> | any[];
        status: DeliveryStatus;
        responseStatusCode: number | null;
        responseBody: string | null;
        error: 'couldNotConnect' | 'timeout' | 'forbiddenHost' | null;
    }
}
