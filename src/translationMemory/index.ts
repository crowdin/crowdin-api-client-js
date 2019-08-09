import { CrowdinApi, ResponseList, ResponseObject, PatchRequest, DownloadLink } from '../core';

export namespace TranslationMemory {

    export class Api extends CrowdinApi {

        /**
         * @param groupId group identifier
         * @param limit maximum number of items to retrieve (default 25)
         * @param offset starting offset in the collection (default 0)
         */
        listTm(groupId: number, limit?: number, offset?: number): Promise<ResponseList<Model.TranslationMemory>> {
            let url = `${this.url}/tms?account-key=${this.accountKey}&login=${this.login}`;
            url = this.addQueryParam(url, 'groupId', groupId);
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            return this.axios.get(url);
        }

        /**
         * @param request request body
         */
        addTm(request: Model.AddTranslationMemoryRequest): Promise<ResponseObject<Model.TranslationMemory>> {
            let url = `${this.url}/tms?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.post(url, request);
        }

        /**
         * @param tmId tm identifier
         */
        getTm(tmId: number): Promise<ResponseObject<Model.TranslationMemory>> {
            let url = `${this.url}/tms/${tmId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

        /**
         * @param tmId tm identifier
         */
        deleteTm(tmId: number): Promise<void> {
            let url = `${this.url}/tms/${tmId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.delete(url);
        }

        /**
         * @param tmId tm identifier
         * @param request request body
         */
        editTm(tmId: number, request: PatchRequest[]): Promise<ResponseObject<Model.TranslationMemory>> {
            let url = `${this.url}/tms/${tmId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.patch(url, request);
        }

        /**
         * @param tmId tm identifier
         * @param sourceLanguageId defines a source language in the language pair
         * @param targetLanguageId defines a target language in the language pair
         * @param format defines the format of TMs file (default is tmx)
         */
        downloadTm(tmId: number, sourceLanguageId?: number, targetLanguageId?: number, format?: Model.Format): Promise<ResponseObject<DownloadLink>> {
            let url = `${this.url}/tms/${tmId}/exports?account-key=${this.accountKey}&login=${this.login}`;
            url = this.addQueryParam(url, 'sourceLanguageId', sourceLanguageId);
            url = this.addQueryParam(url, 'targetLanguageId', targetLanguageId);
            url = this.addQueryParam(url, 'format', format);
            return this.axios.get(url);
        }

        /**
         * @param tmId tm identifier
         * @param request request body
         */
        exportTm(tmId: number, request: Model.ExportTranslationMemoryRequest): Promise<ResponseObject<Model.Status>> {
            let url = `${this.url}/tms/${tmId}/exports?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.post(url, request);
        }

        /**
         * @param tmId tm identifier
         * @param exportId export identifier
         */
        checkExportStatus(tmId: number, exportId: string): Promise<ResponseObject<Model.Status>> {
            let url = `${this.url}/tms/${tmId}/exports/${exportId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

        /**
         * @param tmId tm identifier
         * @param request request body
         */
        importTm(tmId: number, request: Model.ImportTranslationMemoryRequest): Promise<ResponseObject<Model.Status>> {
            let url = `${this.url}/tms/${tmId}/imports?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.post(url, request);
        }

        /**
         * @param tmId tm identifier
         * @param importId import identifier
         */
        checkImportStatus(tmId: number, importId: string): Promise<ResponseObject<Model.Status>> {
            let url = `${this.url}/tms/${tmId}/imports/${importId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }
    }

    export namespace Model {
        export interface TranslationMemory {
            id: number;
            groupId: number;
            name: string;
            languageIds: number[];
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

        export interface Status {
            identifier: string;
            status: string;
            progress: number;
            attributes: Attribute[];
            createdAt: string;
            updatedAt: string;
            startedAt: string;
            finishedAt: string;
            eta: string;
        }

        export interface ImportTranslationMemoryRequest {
            storageId: number;
            firstLineContainsHeader?: boolean;
            scheme?: Scheme;
        }

        export enum Format {
            TMX = 'tmx',
            CSV = 'csv',
            XLSX = 'xlsx',
        }

        export interface Attribute {
            [key: string]: string;
        }

        export interface Scheme {
            [key: string]: number;
        }
    }
}