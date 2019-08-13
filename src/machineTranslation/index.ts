import { CrowdinApi, ResponseList, ResponseObject, PatchRequest } from '../core';

export namespace MachineTranslation {

    export class Api extends CrowdinApi {

        /**
         * @param groupId group identifier
         * @param limit maximum number of items to retrieve (default 25)
         * @param offset starting offset in the collection (default 0)
         */
        listMts(groupId: number, limit?: number, offset?: number): Promise<ResponseList<Model.MachineTranslation>> {
            let url = `${this.url}/mts?account-key=${this.accountKey}&login=${this.login}`;
            url = this.addQueryParam(url, 'groupId', groupId);
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            return this.axios.get(url);
        }

        /**
         * @param request request body
         */
        createMt(request: Model.CreateMachineTranslationRequest): Promise<ResponseObject<Model.MachineTranslation>> {
            let url = `${this.url}/mts?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.post(url, request);
        }

        /**
         * @param mtId mt identifier
         */
        getMt(mtId: number): Promise<ResponseObject<Model.MachineTranslation>> {
            let url = `${this.url}/mts/${mtId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

        /**
         * @param mtId mt identifier
         */
        deleteMt(mtId: number): Promise<void> {
            let url = `${this.url}/mts/${mtId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.delete(url);
        }

        /**
         * @param mtId mt identifier
         * @param request request body
         */
        updateMt(mtId: number, request: PatchRequest[]): Promise<ResponseObject<Model.MachineTranslation>> {
            let url = `${this.url}/mts/${mtId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.patch(url, request);
        }

    }

    export namespace Model {

        export interface MachineTranslation {
            id: number;
            groupId: number;
            name: string;
            type: number;
            credentials: string[];
            projectIds: number[];
        }

        export interface CreateMachineTranslationRequest {
            name: string;
            groupId?: number;
        }
    }
}