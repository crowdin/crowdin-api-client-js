import { CrowdinApi, PatchRequest, ResponseList, ResponseObject } from '../core';

export class Webhooks extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @param fetchAll fetch all without pagination
     */
    listWebhooks(
        projectId: number,
        limit?: number,
        offset?: number,
        fetchAll?: boolean,
    ): Promise<ResponseList<WebhooksModel.Webhook>> {
        const url = `${this.url}/projects/${projectId}/webhooks`;
        return this.getList(url, limit, offset, fetchAll);
    }

    /**
     * @param projectId project identifier
     * @param request request body
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
     */
    getWebhook(projectId: number, webhookId: number): Promise<ResponseObject<WebhooksModel.Webhook>> {
        const url = `${this.url}/projects/${projectId}/webhooks/${webhookId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param webhookId webhook identifier
     */
    deleteWebhook(projectId: number, webhookId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/webhooks/${webhookId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param webhookId webhook identifier
     * @param request request body
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
        requestType: RequestType;
        contentType: ContentType;
        createdAt: string;
        updatedAt: string;
    }

    export interface AddWebhookRequest {
        name: string;
        url: string;
        isActive?: boolean;
        contentType?: ContentType;
        events: Event[];
        headers?: any;
        requestType: RequestType;
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
