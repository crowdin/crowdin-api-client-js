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

/**
 * Translation Memory (TM) is a vault of translations that were previously made in other projects.
 * Those translations can be reused to speed up the translation process.
 * Every translation made in the project is automatically added to the project Translation Memory.
 *
 * Use API to create, upload, download, or remove specific TM.
 * Translation Memory export and import are asynchronous operations and shall be completed with sequence of API methods.
 */
export class TranslationMemory extends CrowdinApi {
    /**
     * @param options optional paramerers for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.tms.getMany
     */
    listTm(
        options?: TranslationMemoryModel.ListTMsOptions,
    ): Promise<ResponseList<TranslationMemoryModel.TranslationMemory>>;
    /**
     * @param groupId group identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @deprecated optional parameters should be passed through an object
     * @see https://developer.crowdin.com/api/v2/#operation/api.tms.getMany
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
        if (isOptionalNumber(options, '0' in arguments)) {
            options = { groupId: options, limit: deprecatedLimit, offset: deprecatedOffset };
        }
        let url = `${this.url}/tms`;
        url = this.addQueryParam(url, 'groupId', options.groupId);
        url = this.addQueryParam(url, 'userId', options.userId);
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.tms.post
     */
    addTm(
        request: TranslationMemoryModel.AddTranslationMemoryRequest,
    ): Promise<ResponseObject<TranslationMemoryModel.TranslationMemory>> {
        const url = `${this.url}/tms`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param tmId tm identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.tms.get
     */
    getTm(tmId: number): Promise<ResponseObject<TranslationMemoryModel.TranslationMemory>> {
        const url = `${this.url}/tms/${tmId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param tmId tm identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.tms.delete
     */
    deleteTm(tmId: number): Promise<void> {
        const url = `${this.url}/tms/${tmId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param tmId tm identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.tms.patch
     */
    editTm(tmId: number, request: PatchRequest[]): Promise<ResponseObject<TranslationMemoryModel.TranslationMemory>> {
        const url = `${this.url}/tms/${tmId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param tmId tm identifier
     * @param options optional paramerers for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.tms.segments.getMany
     */
    listTmSegments(
        tmId: number,
        options?: TranslationMemoryModel.ListSegmentsOptions,
    ): Promise<ResponseList<TranslationMemoryModel.TMSegment>> {
        let url = `${this.url}/tms/${tmId}/segments`;

        if (options?.croql) {
            url = this.addQueryParam(url, 'croql', options.croql);
        }

        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param tmId tm identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.tms.segments.post
     */
    addTmSegment(
        tmId: number,
        request: TranslationMemoryModel.AddTMSegment,
    ): Promise<ResponseObject<TranslationMemoryModel.TMSegment>> {
        const url = `${this.url}/tms/${tmId}/segments`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param tmId tm identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.tms.segments.clear
     */
    clearTm(tmId: number): Promise<void> {
        const url = `${this.url}/tms/${tmId}/segments`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param tmId tm identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.tms.exports.post
     */
    exportTm(
        tmId: number,
        request: TranslationMemoryModel.ExportTranslationMemoryRequest = {},
    ): Promise<ResponseObject<Status<TranslationMemoryModel.ExportTranslationMemoryAttribute>>> {
        const url = `${this.url}/tms/${tmId}/exports`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param tmId tm identifier
     * @param exportId export identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.tms.exports.get
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
     * @see https://developer.crowdin.com/api/v2/#operation/api.tms.exports.download.download
     */
    downloadTm(tmId: number, exportId: string): Promise<ResponseObject<DownloadLink>> {
        const url = `${this.url}/tms/${tmId}/exports/${exportId}/download`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.tms.concordance.post
     */
    concordanceSearch(
        projectId: number,
        request: TranslationMemoryModel.ConcordanceSearchRequest,
    ): Promise<ResponseList<TranslationMemoryModel.ConcordanceSearchResponse>> {
        const url = `${this.url}/projects/${projectId}/tms/concordance`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param tmId tm identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.tms.imports.post
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
     * @see https://developer.crowdin.com/api/v2/#operation/api.tms.imports.get
     */
    checkImportStatus(
        tmId: number,
        importId: string,
    ): Promise<ResponseObject<Status<TranslationMemoryModel.ImportTranslationMemoryAttribute>>> {
        const url = `${this.url}/tms/${tmId}/imports/${importId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param tmId tm identifier
     * @param segmentId segment identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.tms.segments.get
     */
    getTmSegment(tmId: number, segmentId: number): Promise<ResponseObject<TranslationMemoryModel.TMSegment>> {
        const url = `${this.url}/tms/${tmId}/segments/${segmentId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param tmId tm identifier
     * @param segmentId segment identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.tms.segments.delete
     */
    deleteTmSegment(tmId: number, segmentId: number): Promise<void> {
        const url = `${this.url}/tms/${tmId}/segments/${segmentId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param tmId tm identifier
     * @param segmentId segment identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.tms.segments.patch
     */
    editTmSegment(
        tmId: number,
        segmentId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<TranslationMemoryModel.TMSegment>> {
        const url = `${this.url}/tms/${tmId}/segments/${segmentId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @deprecated
     * @param tmId tm identifier
     * @param segmentId segment identifier
     * @param recordId record identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.tms.segments.records.delete
     */
    deleteTmSegmentRecord(tmId: number, segmentId: number, recordId: number): Promise<void> {
        const url = `${this.url}/tms/${tmId}/segments/${segmentId}/records/${recordId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @deprecated
     * @param tmId tm identifier
     * @param segmentId segment identifier
     * @param recordId record identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.tms.segments.records.patch
     */
    editTmSegmentRecord(
        tmId: number,
        segmentId: number,
        recordId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<TranslationMemoryModel.TMSegment>> {
        const url = `${this.url}/tms/${tmId}/segments/${segmentId}/records/${recordId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @deprecated
     * @param tmId tm identifier
     * @param segmentId segment identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.tms.segments.records.post
     */
    addTmSegmentRecords(
        tmId: number,
        segmentId: number,
        request: TranslationMemoryModel.AddTMSegment,
    ): Promise<ResponseObject<TranslationMemoryModel.TMSegment>> {
        const url = `${this.url}/tms/${tmId}/segments/${segmentId}/records`;
        return this.post(url, request, this.defaultConfig());
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
        defaultProjectIds: number[];
        projectIds: number[];
        createdAt: string;
    }

    export interface AddTranslationMemoryRequest {
        name: string;
        languageId: string;
        groupId?: number;
    }

    export interface ConcordanceSearchRequest {
        sourceLanguageId: string;
        targetLanguageId: string;
        autoSubstitution: boolean;
        minRelevant: number;
        expressions: string[];
        /**
         * @deprecated
         */
        expression?: string;
    }

    export interface ConcordanceSearchResponse {
        tm: TranslationMemory;
        recordId: number;
        source: string;
        target: string;
        relevant: number;
        substituted: string;
        updatedAt: string;
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
        userId?: number;
    }

    export interface ListSegmentsOptions extends PaginationOptions {
        croql?: string;
    }

    export interface TMSegment {
        id: number;
        records: TMSegmentRecord[];
    }

    export interface TMSegmentRecord {
        id: number;
        languageId: string;
        text: string;
        usageCount: number;
        createdBy: number;
        updatedBy: number;
        createdAt: string;
        updatedAt: string;
    }

    export interface AddTMSegment {
        records: AddTMSegmentRecord[];
    }

    export interface AddTMSegmentRecord {
        languageId: string;
        text: string;
    }
}
