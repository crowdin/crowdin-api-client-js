import { CrowdinApi, ResponseList, ResponseObject, PatchRequest, DownloadLink, Status } from '../core';

export class TranslationMemory extends CrowdinApi {
    /**
     * @param groupId group identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     */
    listTm(
        groupId: number,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<TranslationMemoryModel.TranslationMemory>> {
        let url = `${this.url}/tms`;
        url = this.addQueryParam(url, 'groupId', groupId);
        url = this.addQueryParam(url, 'limit', limit);
        url = this.addQueryParam(url, 'offset', offset);
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param request request body
     */
    addTm(
        request: TranslationMemoryModel.AddTranslationMemoryRequest,
    ): Promise<ResponseObject<TranslationMemoryModel.TranslationMemory>> {
        const url = `${this.url}/tms`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param tmId tm identifier
     */
    getTm(tmId: number): Promise<ResponseObject<TranslationMemoryModel.TranslationMemory>> {
        const url = `${this.url}/tms/${tmId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param tmId tm identifier
     */
    deleteTm(tmId: number): Promise<void> {
        const url = `${this.url}/tms/${tmId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param tmId tm identifier
     * @param request request body
     */
    editTm(tmId: number, request: PatchRequest[]): Promise<ResponseObject<TranslationMemoryModel.TranslationMemory>> {
        const url = `${this.url}/tms/${tmId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param tmId tm identifier
     * @param sourceLanguageId defines a source language in the language pair
     * @param targetLanguageId defines a target language in the language pair
     * @param format defines the format of TMs file (default is tmx)
     */
    downloadTm(
        tmId: number,
        sourceLanguageId?: number,
        targetLanguageId?: number,
        format?: TranslationMemoryModel.Format,
    ): Promise<ResponseObject<DownloadLink>> {
        let url = `${this.url}/tms/${tmId}/exports`;
        url = this.addQueryParam(url, 'sourceLanguageId', sourceLanguageId);
        url = this.addQueryParam(url, 'targetLanguageId', targetLanguageId);
        url = this.addQueryParam(url, 'format', format);
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param tmId tm identifier
     * @param request request body
     */
    exportTm(
        tmId: number,
        request: TranslationMemoryModel.ExportTranslationMemoryRequest,
    ): Promise<ResponseObject<Status<TranslationMemoryModel.ExportTranslationMemoryAttribute>>> {
        const url = `${this.url}/tms/${tmId}/exports`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param tmId tm identifier
     * @param exportId export identifier
     */
    checkExportStatus(
        tmId: number,
        exportId: string,
    ): Promise<ResponseObject<Status<TranslationMemoryModel.ExportTranslationMemoryAttribute>>> {
        const url = `${this.url}/tms/${tmId}/exports/${exportId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param tmId tm identifier
     * @param request request body
     */
    importTm(
        tmId: number,
        request: TranslationMemoryModel.ImportTranslationMemoryRequest,
    ): Promise<ResponseObject<Status<TranslationMemoryModel.ImportTranslationMemoryAttribute>>> {
        const url = `${this.url}/tms/${tmId}/imports`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param tmId tm identifier
     * @param importId import identifier
     */
    checkImportStatus(
        tmId: number,
        importId: string,
    ): Promise<ResponseObject<Status<TranslationMemoryModel.ImportTranslationMemoryAttribute>>> {
        const url = `${this.url}/tms/${tmId}/imports/${importId}`;
        return this.get(url, this.defaultConfig());
    }
}

export namespace TranslationMemoryModel {
    export interface TranslationMemory {
        id: number;
        groupId: number;
        name: string;
        languageIds: string[];
        segmentsCount: number;
        defaultProjectId: number;
        projectIds: number[];
    }

    export interface AddTranslationMemoryRequest {
        name: string;
        groupId: number;
    }

    export interface ExportTranslationMemoryRequest {
        sourceLanguageId?: number;
        targetLanguageId?: number;
        format?: Format;
    }

    export interface ImportTranslationMemoryRequest {
        storageId: number;
        firstLineContainsHeader?: boolean;
        scheme?: Scheme;
    }

    export interface ExportTranslationMemoryAttribute {
        sourceLanguageId: string;
        targetLanguageId: string;
        format: string;
        tmId: number;
        userId: number;
    }

    export interface ImportTranslationMemoryAttribute {
        tmId: number;
        storageId: number;
        firstLineContainsHeader: number;
        scheme: Scheme;
        organizationId: number;
        progressKey: string;
        userId: number;
    }

    export enum Format {
        TMX = 'tmx',
        CSV = 'csv',
        XLSX = 'xlsx',
    }

    export interface Scheme {
        [key: string]: number;
    }
}
