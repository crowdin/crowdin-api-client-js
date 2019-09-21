import { CrowdinApi, ResponseList, ResponseObject, PatchRequest } from '../core';

export namespace Webhooks {

    export class Api extends CrowdinApi {

        /**
         * @param projectId project identifier
         * @param limit maximum number of items to retrieve (default 25)
         * @param offset starting offset in the collection (default 0)
         */
        listWebhooks(projectId: number, limit?: number, offset?: number): Promise<ResponseList<Model.Webhook>> {
            let url = `${this.url}/projects/${projectId}/webhooks`;
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            return this.get(url, this.defaultConfig());
        }

        /**
         * @param projectId project identifier
         * @param request request body
         */
        addWebhook(projectId: number, request: Model.AddWebhookRequest): Promise<ResponseObject<Model.Webhook>> {
            let url = `${this.url}/projects/${projectId}/webhooks`;
            return this.post(url, request, this.defaultConfig());
        }

        /**
         * @param projectId project identifier
         * @param webhookId webhook identifier
         */
        getWebhook(projectId: number, webhookId: number): Promise<ResponseObject<Model.Webhook>> {
            let url = `${this.url}/projects/${projectId}/webhooks/${webhookId}`;
            return this.get(url, this.defaultConfig());
        }

        /**
         * @param projectId project identifier
         * @param webhookId webhook identifier
         */
        deleteWebhook(projectId: number, webhookId: number): Promise<void> {
            let url = `${this.url}/projects/${projectId}/webhooks/${webhookId}`;
            return this.delete(url, this.defaultConfig());
        }

        /**
         * @param projectId project identifier
         * @param webhookId webhook identifier
         * @param request request body
         */
        editWebhook(projectId: number, webhookId: number, request: PatchRequest[]): Promise<ResponseObject<Model.Webhook>> {
            let url = `${this.url}/projects/${projectId}/webhooks/${webhookId}`;
            return this.patch(url, request, this.defaultConfig());
        }

    }

    export namespace Model {

        export interface Webhook {
            id: number;
            projectId: number;
            name: string;
            url: string;
            events: Event[];
            headers: any;
            payload: any;
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
            events?: Event[];
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
}