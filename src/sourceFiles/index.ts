import { CrowdinApi, ResponseList, ResponseObject, PatchRequest, DownloadLink } from '../core';

export namespace SourceFiles {

    export class Api extends CrowdinApi {

        /**
         * @param projectId project identifier
         * @param name filter branch by name
         * @param limit maximum number of items to retrieve (default 25)
         * @param offset starting offset in the collection (default 0)
         */
        listProjectBranches(projectId: number, name?: string, limit?: number, offset?: number): Promise<ResponseList<Model.Branch>> {
            let url = `${this.url}/projects/${projectId}/branches?account-key=${this.accountKey}&login=${this.login}`;
            url = this.addQueryParam(url, 'name', name);
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            return this.axios.get(url);
        }

        /**
         * @param projectId project identifier
         * @param request request body
         */
        createBranch(projectId: number, request: Model.CreateBranchRequest): Promise<ResponseObject<Model.Branch>> {
            let url = `${this.url}/projects/${projectId}/branches?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.post(url, request);
        }

        /**
         * @param projectId project identifier
         * @param branchId branch identifier
         */
        getBranch(projectId: number, branchId: number): Promise<ResponseObject<Model.Branch>> {
            let url = `${this.url}/projects/${projectId}/branches/${branchId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

        /**
         * @param projectId project identifier
         * @param branchId branch identifier
         */
        deleteBranch(projectId: number, branchId: number): Promise<void> {
            let url = `${this.url}/projects/${projectId}/branches/${branchId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.delete(url);
        }

        /**
         * @param projectId project identifier
         * @param branchId branch identifier
         * @param request request body
         */
        editBranch(projectId: number, branchId: number, request: PatchRequest[]): Promise<ResponseObject<Model.Branch>> {
            let url = `${this.url}/projects/${projectId}/branches/${branchId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.patch(url, request);
        }

        /**
         * @param projectId project identifier
         * @param branchId filter directories by branchId
         * @param directoryId filter directories by directoryId
         * @param limit maximum number of items to retrieve (default 25)
         * @param offset starting offset in the collection (default 0)
         */
        listProjectDirectories(projectId: number, branchId?: number, directoryId?: number, limit?: number, offset?: number): Promise<ResponseList<Model.Directory>> {
            let url = `${this.url}/projects/${projectId}/directories?account-key=${this.accountKey}&login=${this.login}`;
            url = this.addQueryParam(url, 'branchId', branchId);
            url = this.addQueryParam(url, 'directoryId', directoryId);
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            return this.axios.get(url);
        }

        /**
         * @param projectId project identifier 
         * @param request request body
         */
        createDirectory(projectId: number, request: Model.CreateDirectoryRequest): Promise<ResponseObject<Model.Directory>> {
            let url = `${this.url}/projects/${projectId}/directories?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.post(url, request);
        }

        /**
         * @param projectId project identifier
         * @param directoryId directory identifier
         */
        getDirectory(projectId: number, directoryId: number): Promise<ResponseObject<Model.Directory>> {
            let url = `${this.url}/projects/${projectId}/directories/${directoryId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

        /**
         * @param projectId project identifier
         * @param directoryId directory identifier
         */
        deleteDirectory(projectId: number, directoryId: number): Promise<void> {
            let url = `${this.url}/projects/${projectId}/directories/${directoryId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.delete(url);
        }

        /**
         * @param projectId project identifier
         * @param directoryId directory identifier
         * @param request request body
         */
        editDirectory(projectId: number, directoryId: number, request: PatchRequest[]): Promise<ResponseObject<Model.Directory>> {
            let url = `${this.url}/projects/${projectId}/directories/${directoryId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.patch(url, request);
        }

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
        editFile(projectId: number, fileId: number, request: PatchRequest[]): Promise<ResponseObject<Model.File>> {
            let url = `${this.url}/projects/${projectId}/files/${fileId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.patch(url, request);
        }

        /**
         * @param projectId project identifier
         * @param fileId file identifier
         */
        downloadFile(projectId: number, fileId: number): Promise<ResponseObject<DownloadLink>> {
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
        updateFile(projectId: number, fileId: number, request: Model.CreateFileRevisionRequest): Promise<ResponseList<Model.FileRevision>> {
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
        export interface Branch {
            id: number;
            projectId: number;
            name: string;
            title: string;
            exportPattern: string;
            status: number;
            priority: Priority;
            createdAt: string;
            updatedAt: string;
        }

        export interface CreateBranchRequest {
            name: string;
            title?: string;
            exportPattern?: string;
            priority?: Priority;
        }

        export enum Priority {
            LOW = 0,
            NORMAL = 1,
            HIGH = 2,
        }

        export interface Directory {
            id: number;
            projectId: number;
            branchId: number;
            parentId: number;
            name: string;
            title: string;
            exportPattern: string;
            status: number;
            priority: number;
            createdAt: string;
            updatedAt: string;
        }

        export interface CreateDirectoryRequest {
            branchId?: number;
            parentId?: number;
            name: string;
            title?: string;
            exportPattern?: string;
            priority?: Priority;
        }

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