import { CrowdinApi, ResponseList, ResponseObject, PatchRequest } from '../core';

export namespace MachineTranslation {

    export class Api extends CrowdinApi {

        /**
         * @param groupId group identifier
         * @param limit maximum number of items to retrieve (default 25)
         * @param offset starting offset in the collection (default 0)
         */
        listMts(groupId: number, limit?: number, offset?: number): Promise<ResponseList<Model.MachineTranslation>> {
            let url = `${this.url}/mts`;
            url = this.addQueryParam(url, 'groupId', groupId);
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            return this.get(url, this.defaultConfig());
        }

        /**
         * @param request request body
         */
        createMt(request: Model.CreateMachineTranslationRequest): Promise<ResponseObject<Model.MachineTranslation>> {
            let url = `${this.url}/mts`;
            return this.post(url, request, this.defaultConfig());
        }

        /**
         * @param mtId mt identifier
         */
        getMt(mtId: number): Promise<ResponseObject<Model.MachineTranslation>> {
            let url = `${this.url}/mts/${mtId}`;
            return this.get(url, this.defaultConfig());
        }

        /**
         * @param mtId mt identifier
         */
        deleteMt(mtId: number): Promise<void> {
            let url = `${this.url}/mts/${mtId}`;
            return this.delete(url, this.defaultConfig());
        }

        /**
         * @param mtId mt identifier
         * @param request request body
         */
        updateMt(mtId: number, request: PatchRequest[]): Promise<ResponseObject<Model.MachineTranslation>> {
            let url = `${this.url}/mts/${mtId}`;
            return this.patch(url, request, this.defaultConfig());
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