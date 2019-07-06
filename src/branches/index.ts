import { CrowdinApi, ResponseList, ResponseObject } from '../core';
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
    }
}