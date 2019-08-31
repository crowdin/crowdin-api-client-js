import { CrowdinApi, ResponseList, ResponseObject, PatchRequest } from '../core';

export namespace SourceStrings {

    export class Api extends CrowdinApi {

        /**
         * @param projectId project identifier
         * @param fileId file identifier
         * @param limit maximum number of items to retrieve (default 25)
         * @param offset starting offset in the collection (default 0)
         */
        listProjectStrings(projectId: number, fileId?: number, limit?: number, offset?: number): Promise<ResponseList<Model.String>> {
            let url = `${this.url}/projects/${projectId}/strings`;
            url = this.addQueryParam(url, 'fileId', fileId);
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            return this.axios.get(url, this.defaultConfig());
        }

        /**
         * @param projectId project identifier
         * @param request request body
         */
        addString(projectId: number, request: Model.CreateStringRequest): Promise<ResponseObject<Model.String>> {
            let url = `${this.url}/projects/${projectId}/strings`;
            return this.axios.post(url, request, this.defaultConfig());
        }

        /**
         * @param projectId project identifier
         * @param stringId string identifier
         */
        getString(projectId: number, stringId: number): Promise<ResponseObject<Model.String>> {
            let url = `${this.url}/projects/${projectId}/strings/${stringId}`;
            return this.axios.get(url, this.defaultConfig());
        }

        /**
         * @param projectId project identifier
         * @param stringId string identifier
         */
        deleteString(projectId: number, stringId: number): Promise<void> {
            let url = `${this.url}/projects/${projectId}/strings/${stringId}`;
            return this.axios.delete(url, this.defaultConfig());
        }

        /**
         * @param projectId project identifier
         * @param stringId string identifier
         * @param request request body
         */
        editString(projectId: number, stringId: number, request: PatchRequest[]): Promise<ResponseObject<Model.String>> {
            let url = `${this.url}/projects/${projectId}/strings/${stringId}`;
            return this.axios.patch(url, request, this.defaultConfig());
        }
    }

    export namespace Model {
        export interface String {
            id: number;
            projectId: number;
            fileId: number;
            identifier: string;
            text: string;
            type: Type;
            context: string;
            maxLength: number;
            isHidden: boolean;
            revision: number;
            hasPlurals: boolean;
            plurals: any;
            isIcu: boolean;
            createdAt: string;
            updatedAt: string;
        }

        export interface CreateStringRequest {
            identifier: string;
            fileId?: number;
            text: string;
            context?: string;
            isHidden?: boolean;
            type?: Type;
            maxLength?: number;
        }

        export enum Type {
            TEXT = 0,
            ASSET = 1,
            ICU = 2,
        }
    }
}