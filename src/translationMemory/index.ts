import {
    CrowdinApi,
    DownloadLink,
    isOptionalNumber,
    PaginationOptions,
    PatchRequest,
    ResponseList,
    ResponseObject,
    Status,
} from '../core';

export class TranslationMemory extends CrowdinApi {
    /**
     * @param options optional paramerers for the request
     * @see https://support.crowdin.com/api/v2/#operation/api.tms.getMany
     */
    listTm(
        options?: TranslationMemoryModel.ListTMsOptions,
    ): Promise<ResponseList<TranslationMemoryModel.TranslationMemory>>;
    /**
     * @param groupId group identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @deprecated optional parameters should be passed through an object
     * @see https://support.crowdin.com/api/v2/#operation/api.tms.getMany
     */
    listTm(
        groupId?: number,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<TranslationMemoryModel.TranslationMemory>>;
    listTm(
        options?: number | TranslationMemoryModel.ListTMsOptions,
        deprecatedLimit?: number,
        deprecatedOffset?: number,
    ): Promise<ResponseList<TranslationMemoryModel.TranslationMemory>> {
        if (isOptionalNumber(options)) {
            options = { groupId: options, limit: deprecatedLimit, offset: deprecatedOffset };
        }
        let url = `${this.url}/tms`;
        url = this.addQueryParam(url, 'groupId', options.groupId);
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.tms.post
     */
    addTm(
        request: TranslationMemoryModel.AddTranslationMemoryRequest,
    ): Promise<ResponseObject<TranslationMemoryModel.TranslationMemory>> {
        const url = `${this.url}/tms`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param tmId tm identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.tms.get
     */
    getTm(tmId: number): Promise<ResponseObject<TranslationMemoryModel.TranslationMemory>> {
        const url = `${this.url}/tms/${tmId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param tmId tm identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.tms.delete
     */
    deleteTm(tmId: number): Promise<void> {
        const url = `${this.url}/tms/${tmId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param tmId tm identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.tms.patch
     */
    editTm(tmId: number, request: PatchRequest[]): Promise<ResponseObject<TranslationMemoryModel.TranslationMemory>> {
        const url = `${this.url}/tms/${tmId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param tmId tm identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.tms.segments.clear
     */
    clearTm(tmId: number): Promise<void> {
        const url = `${this.url}/tms/${tmId}/segments`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param tmId tm identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.tms.exports.post
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
     * @see https://support.crowdin.com/api/v2/#operation/api.tms.exports.get
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
     * @param exportId export identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.tms.exports.download.download
     */
    downloadTm(tmId: number, exportId: string): Promise<ResponseObject<DownloadLink>> {
        const url = `${this.url}/tms/${tmId}/exports/${exportId}/download`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param tmId tm identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.tms.imports.post
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
     * @see https://support.crowdin.com/api/v2/#operation/api.tms.imports.get
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
        userId: number;
        name: string;
        languageId: string;
        languageIds: string[];
        segmentsCount: number;
        defaultProjectId: number;
        projectIds: number[];
        createdAt: string;
    }

    export interface AddTranslationMemoryRequest {
        name: string;
        languageId: string;
        groupId?: number;
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
    }

    export interface ImportTranslationMemoryAttribute {
        tmId: number;
        storageId: number;
        firstLineContainsHeader: number;
        scheme: Scheme;
    }

    export type Format = 'tmx' | 'csv' | 'xlsx';

    export interface Scheme {
        [key: string]: number;
    }

    export interface ListTMsOptions extends PaginationOptions {
        groupId?: number;
    }
}
