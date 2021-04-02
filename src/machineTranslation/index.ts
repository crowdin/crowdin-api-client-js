import { CrowdinApi, PatchRequest, ResponseList, ResponseObject } from '../core';

export class MachineTranslation extends CrowdinApi {
    /**
     * @param groupId group identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     */
    listMts(
        groupId?: number,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<MachineTranslationModel.MachineTranslation>> {
        let url = `${this.url}/mts`;
        url = this.addQueryParam(url, 'groupId', groupId);
        return this.getList(url, limit, offset);
    }

    /**
     * @param request request body
     */
    createMt(
        request: MachineTranslationModel.CreateMachineTranslationRequest,
    ): Promise<ResponseObject<MachineTranslationModel.MachineTranslation>> {
        const url = `${this.url}/mts`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param mtId mt identifier
     */
    getMt(mtId: number): Promise<ResponseObject<MachineTranslationModel.MachineTranslation>> {
        const url = `${this.url}/mts/${mtId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param mtId mt identifier
     */
    deleteMt(mtId: number): Promise<void> {
        const url = `${this.url}/mts/${mtId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param mtId mt identifier
     * @param request request body
     */
    updateMt(
        mtId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<MachineTranslationModel.MachineTranslation>> {
        const url = `${this.url}/mts/${mtId}`;
        return this.patch(url, request, this.defaultConfig());
    }
}

export namespace MachineTranslationModel {
    export interface MachineTranslation {
        id: number;
        groupId: number;
        name: string;
        type: number;
        credentials: Credentials;
        projectIds: number[];
    }

    export interface Credentials {
        [key: string]: number;
    }

    export interface CreateMachineTranslationRequest {
        name: string;
        groupId?: number;
        type: string;
        credentials: string[];
    }
}
