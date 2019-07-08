import { CrowdinApi, ResponseList, ResponseObject, PatchRequest, Priority } from '../core';

export namespace Branches {

    export class Api extends CrowdinApi {

        /**
         * @param projectId project identifier
         * @param name filter branch by name
         * @param limit maximum number of items to retrieve (default 25)
         * @param offset starting offset in the collection (default 0)
         */
        listProjectBranches(projectId: number, name?: string, limit?: number, offset?: number): Promise<ResponseList<Model.Branch>> {
            let url = `${this.url}/projects/${projectId}/branches?account-key=${this.accountKey}&login=${this.login}`;
            url = this.addQueryParam(url, 'name', name);
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            return this.axios.get(url);
        }

        /**
         * @param projectId project identifier
         * @param request request body
         */
        createBranch(projectId: number, request: Model.CreateBranchRequest): Promise<ResponseObject<Model.Branch>> {
            let url = `${this.url}/projects/${projectId}/branches?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.post(url, request);
        }

        /**
         * @param projectId project identifier
         * @param branchId branch identifier
         */
        getBranch(projectId: number, branchId: number): Promise<ResponseObject<Model.Branch>> {
            let url = `${this.url}/projects/${projectId}/branches/${branchId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

        /**
         * @param projectId project identifier
         * @param branchId branch identifier
         */
        deleteBranch(projectId: number, branchId: number): Promise<void> {
            let url = `${this.url}/projects/${projectId}/branches/${branchId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.delete(url);
        }

        /**
         * @param projectId project identifier
         * @param branchId branch identifier
         * @param request request body
         */
        updateBranch(projectId: number, branchId: number, request: PatchRequest[]): Promise<ResponseObject<Model.Branch>> {
            let url = `${this.url}/projects/${projectId}/branches/${branchId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.patch(url, request);
        }
    }

    export namespace Model {
        export interface Branch {
            id: number;
            projectId: number;
            name: string;
            title: string;
            exportPattern: string;
            status: number;
            priority: number;
            createdAt: string;
            updatedAt: string;
        }

        export interface CreateBranchRequest {
            name: string;
            title?: string;
            exportPattern?: string;
            priority?: Priority;
        }
    }
}