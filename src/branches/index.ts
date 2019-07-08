import { CrowdinApi, ResponseList, ResponseObject, PatchRequest, Priority } from '../core';
import { AxisProvider } from '../internal/axios/axiosProvider';

const axios = new AxisProvider().axios;

export namespace Branches {

    export class Api extends CrowdinApi {

        listProjectBranches(projectId: number, name?: string, limit?: number, offset?: number): Promise<ResponseList<Model.Branch>> {
            let url = `${this.url}/projects/${projectId}/branches?account-key=${this.accountKey}&login=${this.login}`;
            url = this.addQueryParam(url, 'name', name);
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            return axios.get(url);
        }

        createBranch(projectId: number, request: Model.CreateBranchRequest): Promise<ResponseObject<Model.Branch>> {
            let url = `${this.url}/projects/${projectId}/branches?account-key=${this.accountKey}&login=${this.login}`;
            return axios.post(url, request);
        }

        getBranch(projectId: number, branchId: number): Promise<ResponseObject<Model.Branch>> {
            let url = `${this.url}/projects/${projectId}/branches/${branchId}?account-key=${this.accountKey}&login=${this.login}`;
            return axios.get(url);
        }

        //TODO should be discussed with back end
        deleteBranch(projectId: number, branchId: number): Promise<void> {
            let url = `${this.url}/projects/${projectId}/branches/${branchId}?account-key=${this.accountKey}&login=${this.login}`;
            return axios.delete(url);
        }

        updateBranch(projectId: number, branchId: number, request: PatchRequest[]): Promise<ResponseObject<Model.Branch>> {
            let url = `${this.url}/projects/${projectId}/branches/${branchId}?account-key=${this.accountKey}&login=${this.login}`;
            return axios.patch(url, request);
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