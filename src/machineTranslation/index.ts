import { CrowdinApi, PatchRequest, ResponseList, ResponseObject } from '../core';

export class MachineTranslation extends CrowdinApi {
    /**
     * @param groupId group identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @see https://support.crowdin.com/api/v2/#operation/api.mts.getMany
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
     * @see https://support.crowdin.com/enterprise/api/#operation/api.mts.post
     */
    createMt(
        request: MachineTranslationModel.CreateMachineTranslationRequest,
    ): Promise<ResponseObject<MachineTranslationModel.MachineTranslation>> {
        const url = `${this.url}/mts`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param mtId mt identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.mts.getMany
     */
    getMt(mtId: number): Promise<ResponseObject<MachineTranslationModel.MachineTranslation>> {
        const url = `${this.url}/mts/${mtId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param mtId mt identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.mts.delete
     */
    deleteMt(mtId: number): Promise<void> {
        const url = `${this.url}/mts/${mtId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param mtId mt identifier
     * @param request request body
     * @see https://support.crowdin.com/enterprise/api/#operation/api.mts.patch
     */
    updateMt(
        mtId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<MachineTranslationModel.MachineTranslation>> {
        const url = `${this.url}/mts/${mtId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     *
     * @param mtId mt identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.mts.translations.post
     */
    translate(
        mtId: number,
        request: MachineTranslationModel.TranslateRequest,
    ): Promise<ResponseObject<MachineTranslationModel.TranslateResponse>> {
        const url = `${this.url}/mts/${mtId}/translations`;
        return this.post(url, request, this.defaultConfig());
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

    export interface TranslateRequest {
        languageRecognitionProvider?: LanguageRecognitionProvider;
        sourceLanguageId?: string;
        targetLanguageId: string;
        strings?: string[];
    }

    export interface TranslateResponse {
        sourceLanguageId: string;
        targetLanguageId: string;
        strings: string[];
        translations: string[];
    }

    export enum LanguageRecognitionProvider {
        CROWDIN = 'crowdin',
        ENGINE = 'engine',
    }
}
