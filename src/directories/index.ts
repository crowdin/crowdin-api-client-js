import { CrowdinApi, ResponseList, ResponseObject, PatchRequest } from '../core';

export namespace Directories {

    export class Api extends CrowdinApi {

        /**
         * @param projectId project identifier
         * @param branchId filter directories by branchId
         * @param directoryId filter directories by directoryId
         * @param limit maximum number of items to retrieve (default 25)
         * @param offset starting offset in the collection (default 0)
         */
        listProjectDirectories(projectId: number, branchId?: number, directoryId?: number, limit?: number, offset?: number): Promise<ResponseList<Model.Directory>> {
            let url = `${this.url}/projects/${projectId}/directories?account-key=${this.accountKey}&login=${this.login}`;
            url = this.addQueryParam(url, 'branchId', branchId);
            url = this.addQueryParam(url, 'directoryId', directoryId);
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            return this.axios.get(url);
        }

        /**
         * @param projectId project identifier 
         * @param request request body
         */
        createDirectory(projectId: number, request: Model.CreateDirectoryRequest): Promise<ResponseObject<Model.Directory>> {
            let url = `${this.url}/projects/${projectId}/directories?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.post(url, request);
        }

        /**
         * @param projectId project identifier
         * @param directoryId directory identifier
         */
        getDirectory(projectId: number, directoryId: number): Promise<ResponseObject<Model.Directory>> {
            let url = `${this.url}/projects/${projectId}/directories/${directoryId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

        /**
         * @param projectId project identifier
         * @param directoryId directory identifier
         */
        deleteDirectory(projectId: number, directoryId: number): Promise<void> {
            let url = `${this.url}/projects/${projectId}/directories/${directoryId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.delete(url);
        }

        /**
         * @param projectId project identifier
         * @param directoryId directory identifier
         * @param request request body
         */
        updateDirectory(projectId: number, directoryId: number, request: PatchRequest[]): Promise<ResponseObject<Model.Directory>> {
            let url = `${this.url}/projects/${projectId}/directories/${directoryId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.patch(url, request);
        }
    }

    export namespace Model {
        export interface Directory {
            id: number;
            projectId: number;
            branchId: number;
            parentId: number;
            name: string;
            title: string;
            exportPattern: string;
            status: number;
            priority: number;
            createdAt: string;
            updatedAt: string;
        }

        export interface CreateDirectoryRequest {
            branchId?: number;
            parentId?: number;
            name: string;
            title?: string;
            exportPattern?: string;
            priority?: number;
        }
    }
}