import { CrowdinApi, PaginationOptions, PatchRequest, ResponseList, ResponseObject } from '../core';
import { WebhooksModel } from '../webhooks';

/**
 * Webhooks allow you to collect information about events that happen in your Crowdin account.
 *
 * You can select the request type, content type, and add a custom payload, which allows you to create integrations with other systems on your own.
 */
export class OrganizationWebhooks extends CrowdinApi {
    /**
     * @requiredScope webhook:read
     * @param options optional pagination parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.webhooks.getMany
     */
    listWebhooks(options?: PaginationOptions): Promise<ResponseList<OrganizationWebhooksModel.OrganizationWebhook>> {
        const url = `${this.url}/webhooks`;
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @requiredScope webhook:write
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.webhooks.post
     */
    addWebhook(
        request: OrganizationWebhooksModel.AddOrganizationWebhookRequest,
    ): Promise<ResponseObject<OrganizationWebhooksModel.OrganizationWebhook>> {
        const url = `${this.url}/webhooks`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @requiredScope webhook:read
     * @param webhookId webhook identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.webhooks.get
     */
    getWebhook(webhookId: number): Promise<ResponseObject<OrganizationWebhooksModel.OrganizationWebhook>> {
        const url = `${this.url}/webhooks/${webhookId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @requiredScope webhook:write
     * @param webhookId webhook identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.webhooks.delete
     */
    deleteWebhook(webhookId: number): Promise<void> {
        const url = `${this.url}/webhooks/${webhookId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @requiredScope webhook:write
     * @param webhookId webhook identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.webhooks.patch
     */
    editWebhook(
        webhookId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<OrganizationWebhooksModel.OrganizationWebhook>> {
        const url = `${this.url}/webhooks/${webhookId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @requiredScope webhook:read
     * @param options optional parameters for the request
     * @see https://support.crowdin.com/developer/api/v2/#tag/Organization-Webhooks/operation/api.webhooks.deliveries.getAll
     */
    listAllWebhookDeliveries(
        options?: WebhooksModel.ListAllWebhookDeliveriesOptions,
    ): Promise<ResponseList<WebhooksModel.WebhookDelivery>> {
        let url = `${this.url}/webhooks/deliveries`;
        url = this.addQueryParam(url, 'webhookIds', options?.webhookIds);
        url = this.addQueryParam(url, 'status', options?.status);
        url = this.addQueryParam(url, 'events', options?.events);
        url = this.addQueryParam(url, 'createdAfter', options?.createdAfter);
        url = this.addQueryParam(url, 'createdBefore', options?.createdBefore);
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @requiredScope webhook:read
     * @param webhookId webhook identifier
     * @param options optional parameters for the request
     * @see https://support.crowdin.com/developer/api/v2/#tag/Organization-Webhooks/operation/api.webhooks.deliveries.getMany
     */
    listWebhookDeliveries(
        webhookId: number,
        options?: WebhooksModel.ListWebhookDeliveriesOptions,
    ): Promise<ResponseList<WebhooksModel.WebhookDelivery>> {
        let url = `${this.url}/webhooks/${webhookId}/deliveries`;
        url = this.addQueryParam(url, 'status', options?.status);
        url = this.addQueryParam(url, 'events', options?.events);
        url = this.addQueryParam(url, 'createdAfter', options?.createdAfter);
        url = this.addQueryParam(url, 'createdBefore', options?.createdBefore);
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @requiredScope webhook:read
     * @param webhookId webhook identifier
     * @param deliveryId delivery identifier
     * @see https://support.crowdin.com/developer/api/v2/#tag/Organization-Webhooks/operation/api.webhooks.deliveries.get
     */
    getWebhookDelivery(
        webhookId: number,
        deliveryId: number,
    ): Promise<ResponseObject<WebhooksModel.WebhookDeliveryDetails>> {
        const url = `${this.url}/webhooks/${webhookId}/deliveries/${deliveryId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @requiredScope webhook:write
     * @param webhookId webhook identifier
     * @param deliveryId delivery identifier
     * @see https://support.crowdin.com/developer/api/v2/#tag/Organization-Webhooks/operation/api.webhooks.deliveries.resend.post
     */
    resendWebhookDelivery(
        webhookId: number,
        deliveryId: number,
    ): Promise<ResponseObject<WebhooksModel.WebhookDelivery>> {
        const url = `${this.url}/webhooks/${webhookId}/deliveries/${deliveryId}/resend`;
        return this.post(url, {}, this.defaultConfig());
    }

    /**
     * @requiredScope webhook:write
     * @param webhookId webhook identifier
     * @param request request body
     * @see https://support.crowdin.com/developer/api/v2/#tag/Organization-Webhooks/operation/api.webhooks.tests.post
     */
    testWebhook(
        webhookId: number,
        request: WebhooksModel.TestWebhookRequest = {},
    ): Promise<ResponseObject<WebhooksModel.WebhookTestResult>> {
        const url = `${this.url}/webhooks/${webhookId}/tests`;
        return this.post(url, request, this.defaultConfig());
    }
}

export namespace OrganizationWebhooksModel {
    export type OrganizationWebhook = Omit<WebhooksModel.Webhook, 'projectId' | 'events'> & {
        events: Event[];
    };

    export type AddOrganizationWebhookRequest = Omit<WebhooksModel.AddWebhookRequest, 'events'> & {
        events: Event[];
    };

    export type Event = 'group.created' | 'group.deleted' | 'project.created' | 'project.deleted';
}
