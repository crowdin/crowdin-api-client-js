import { CrowdinApi, ResponseList, ResponseObject, PatchRequest } from '../core';

export namespace Files {

    export class Api extends CrowdinApi {

        /**
         * 
         * @param projectId project identifier
         * @param branchId list branch files (Note! You can either list files for the specified branch (branchId) in the same request)
         * @param directoryId list directory files (Note! You can either list files for the specified directory (directoryId) in the same request)
         * @param limit maximum number of items to retrieve (default 25)
         * @param offset starting offset in the collection (default 0)
         */
        listProjectFiles(projectId: number, branchId?: number, directoryId?: number, limit?: number, offset?: number): Promise<ResponseList<Model.File>> {
            let url = `${this.url}/projects/${projectId}/files?account-key=${this.accountKey}&login=${this.login}`;
            url = this.addQueryParam(url, 'branchId', branchId);
            url = this.addQueryParam(url, 'directoryId', directoryId);
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            return this.axios.get(url);
        }

        /**
         * @param projectId project identifier
         * @param request request body
         * @param branchId get files of branch. You can set branchId or directoryId, not both
         * @param directoryId get files of directory. You can set branchId or directoryId, not both
         */
        createFile(projectId: number, request: Model.CreateFileRequest, branchId?: number, directoryId?: number): Promise<ResponseObject<Model.File>> {
            let url = `${this.url}/projects/${projectId}/files?account-key=${this.accountKey}&login=${this.login}`;
            url = this.addQueryParam(url, 'branchId', branchId);
            url = this.addQueryParam(url, 'directoryId', directoryId);
            return this.axios.post(url, request);
        }

        /**
         * @param projectId project identifier
         * @param fileId file identifier
         */
        getFile(projectId: number, fileId: number): Promise<ResponseObject<Model.File>> {
            let url = `${this.url}/projects/${projectId}/files/${fileId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

        /**
         * @param projectId project identifier
         * @param fileId file identifier
         */
        deleteFile(projectId: number, fileId: number): Promise<void> {
            let url = `${this.url}/projects/${projectId}/files/${fileId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.delete(url);
        }

        /**
         * @param projectId project identifier
         * @param fileId file identifier
         * @param request request body
         */
        updateFile(projectId: number, fileId: number, request: PatchRequest[]): Promise<ResponseObject<Model.File>> {
            let url = `${this.url}/projects/${projectId}/files/${fileId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.patch(url, request);
        }

        /**
         * @param projectId project identifier
         * @param fileId file identifier
         */
        exportFileRaw(projectId: number, fileId: number): Promise<ResponseObject<Model.FileRaw>> {
            let url = `${this.url}/projects/${projectId}/files/${fileId}/download?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

        /**
         * @param projectId project identifier
         * @param fileId file identifier
         * @param limit maximum number of items to retrieve (default 25)
         * @param offset starting offset in the collection (default 0)
         */
        listFileRevisions(projectId: number, fileId: number, limit?: number, offset?: number): Promise<ResponseList<Model.FileRevision>> {
            let url = `${this.url}/projects/${projectId}/files/${fileId}/revisions?account-key=${this.accountKey}&login=${this.login}`;
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            return this.axios.get(url);
        }

        /**
         * @param projectId project identifier
         * @param fileId file identifier
         * @param request request body
         */
        createFileRevision(projectId: number, fileId: number, request: Model.CreateFileRevisionRequest): Promise<ResponseList<Model.FileRevision>> {
            let url = `${this.url}/projects/${projectId}/files/${fileId}/revisions?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.post(url, request);
        }

        /**
         * @param projectId project identifier
         * @param fileId file identifier
         * @param revision revision number
         */
        getFileRevision(projectId: number, fileId: number, revision: number): Promise<ResponseObject<Model.FileRevision>> {
            let url = `${this.url}/projects/${projectId}/files/${fileId}/revisions/${revision}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }
    }

    export namespace Model {
        export interface File {
            id: number;
            projectId: number;
            branchId: number;
            directoryId: number;
            languageId: number;
            name: string;
            title: string;
            type: string;
            revision: number;
            status: number;
            priority: number;
            attributes: FileAttributes;
            exportPattern: string;
            createdAt: string;
            updatedAt: string;
        }

        export interface CreateFileRequest {
            branchId?: number;
            directoryId?: number;
            storageId: number;
            name: string;
            title?: string;
            type?: FileType;
            importOptions?: SpreadsheetImportOptions | XmlImportOptions;
            exportOptions?: GeneralExportOptions | PropertyExportOptions;
        }

        export interface FileRaw {
            url: string;
            expireIn: string;
        }

        export interface FileRevision {
            id: number;
            projectId: number;
            revision: number;
            revertTo: number;
            translationChunks: number;
            info: any;
            date: string;
        }

        export interface CreateFileRevisionRequest {
            storageId: number;
            scheme?: Scheme;
            firstLineContainsHeader?: boolean;
            updateOption?: UpdateOption;
            escapeQuotes?: EscapeQuotes;
        }

        export interface FileAttributes {
            mimeType: string;
            fileSize: 0;
        }

        export enum FileType {
            AUTO = 'auto',
            ANDROID = 'android',
            MACOSX = 'macosx',
            RESX = 'resx',
            PROPERTIES = 'properties',
            GETTEXT = 'gettext',
            YAML = 'yaml',
            PHP = 'php',
            JSON = 'json',
            XML = 'xml',
            INI = 'ini',
            RC = 'rc',
            RESW = 'resw',
            RESJSON = 'resjson',
            QTTS = 'qtts',
            JOOMLA = 'joomla',
            CHROME = 'chrome',
            DTD = 'dtd',
            DKLANG = 'dklang',
            FLEX = 'flex',
            NSH = 'nsh',
            WXL = 'wxl',
            XLIFF = 'xliff',
            HTML = 'html',
            HAML = 'haml',
            TXT = 'txt',
            CSV = 'csv',
            MD = 'md',
            FLSNP = 'flsnp',
            FM_HTML = 'fm_html',
            FM_MD = 'fm_md',
            MEDIAWIKI = 'mediawiki',
            DOCX = 'docx',
            SBV = 'sbv',
            VTT = 'vtt',
            SRT = 'srt',
        }

        export interface SpreadsheetImportOptions {
            firstLineContainsHeader: boolean;
            importTranslations: boolean;
            scheme: Scheme;
        }

        export interface Scheme {
            identifier: number;
            sourcePhrase: number;
            [key: string]: number;
        }

        export interface XmlImportOptions {
            translateContent: boolean;
            translateAttributes: boolean;
            contentSegmentation: boolean;
            translatableElements: string[];
        }

        export interface GeneralExportOptions {
            exportPattern: string;
        }

        export interface PropertyExportOptions {
            escapeQuotes: EscapeQuotes;
            exportPattern: string;
        }

        export enum EscapeQuotes {
            ZERO = 0,
            ONE = 1,
            TWO = 2,
            THREE = 3,
        }

        export enum UpdateOption {
            UPDATE_ONLY = 1,
            UPDATE_AS_UNAPPROVED = 2,
            UPDATE_AS_UNTRANSLATED = 3,
        }
    }
}