import { CrowdinApi, ResponseList, ResponseObject, PatchRequest, DownloadLink } from '../core';

export class SourceFiles extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param name filter branch by name
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     */
    listProjectBranches(
        projectId: number,
        name?: string,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<SourceFilesModel.Branch>> {
        let url = `${this.url}/projects/${projectId}/branches`;
        url = this.addQueryParam(url, 'name', name);
        url = this.addQueryParam(url, 'limit', limit);
        url = this.addQueryParam(url, 'offset', offset);
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param request request body
     */
    createBranch(
        projectId: number,
        request: SourceFilesModel.CreateBranchRequest,
    ): Promise<ResponseObject<SourceFilesModel.Branch>> {
        const url = `${this.url}/projects/${projectId}/branches`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param branchId branch identifier
     */
    getBranch(projectId: number, branchId: number): Promise<ResponseObject<SourceFilesModel.Branch>> {
        const url = `${this.url}/projects/${projectId}/branches/${branchId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param branchId branch identifier
     */
    deleteBranch(projectId: number, branchId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/branches/${branchId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param branchId branch identifier
     * @param request request body
     */
    editBranch(
        projectId: number,
        branchId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<SourceFilesModel.Branch>> {
        const url = `${this.url}/projects/${projectId}/branches/${branchId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param branchId filter directories by branchId
     * @param directoryId filter directories by directoryId
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     */
    listProjectDirectories(
        projectId: number,
        branchId?: number,
        directoryId?: number,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<SourceFilesModel.Directory>> {
        let url = `${this.url}/projects/${projectId}/directories`;
        url = this.addQueryParam(url, 'branchId', branchId);
        url = this.addQueryParam(url, 'directoryId', directoryId);
        url = this.addQueryParam(url, 'limit', limit);
        url = this.addQueryParam(url, 'offset', offset);
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param request request body
     */
    createDirectory(
        projectId: number,
        request: SourceFilesModel.CreateDirectoryRequest,
    ): Promise<ResponseObject<SourceFilesModel.Directory>> {
        const url = `${this.url}/projects/${projectId}/directories`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param directoryId directory identifier
     */
    getDirectory(projectId: number, directoryId: number): Promise<ResponseObject<SourceFilesModel.Directory>> {
        const url = `${this.url}/projects/${projectId}/directories/${directoryId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param directoryId directory identifier
     */
    deleteDirectory(projectId: number, directoryId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/directories/${directoryId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param directoryId directory identifier
     * @param request request body
     */
    editDirectory(
        projectId: number,
        directoryId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<SourceFilesModel.Directory>> {
        const url = `${this.url}/projects/${projectId}/directories/${directoryId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     *
     * @param projectId project identifier
     * @param branchId list branch files (Note! You can either list files for the specified branch (branchId) in the same request)
     * @param directoryId list directory files (Note! You can either list files for the specified directory (directoryId) in the same request)
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     */
    listProjectFiles(
        projectId: number,
        branchId?: number,
        directoryId?: number,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<SourceFilesModel.File>> {
        let url = `${this.url}/projects/${projectId}/files`;
        url = this.addQueryParam(url, 'branchId', branchId);
        url = this.addQueryParam(url, 'directoryId', directoryId);
        url = this.addQueryParam(url, 'limit', limit);
        url = this.addQueryParam(url, 'offset', offset);
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @param branchId get files of branch. You can set branchId or directoryId, not both
     * @param directoryId get files of directory. You can set branchId or directoryId, not both
     */
    createFile(
        projectId: number,
        request: SourceFilesModel.CreateFileRequest,
        branchId?: number,
        directoryId?: number,
    ): Promise<ResponseObject<SourceFilesModel.File>> {
        let url = `${this.url}/projects/${projectId}/files`;
        url = this.addQueryParam(url, 'branchId', branchId);
        url = this.addQueryParam(url, 'directoryId', directoryId);
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param fileId file identifier
     */
    getFile(projectId: number, fileId: number): Promise<ResponseObject<SourceFilesModel.File>> {
        const url = `${this.url}/projects/${projectId}/files/${fileId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param fileId file identifier
     */
    deleteFile(projectId: number, fileId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/files/${fileId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param fileId file identifier
     * @param request request body
     */
    editFile(
        projectId: number,
        fileId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<SourceFilesModel.File>> {
        const url = `${this.url}/projects/${projectId}/files/${fileId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param fileId file identifier
     */
    downloadFile(projectId: number, fileId: number): Promise<ResponseObject<DownloadLink>> {
        const url = `${this.url}/projects/${projectId}/files/${fileId}/download`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param fileId file identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     */
    listFileRevisions(
        projectId: number,
        fileId: number,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<SourceFilesModel.FileRevision>> {
        let url = `${this.url}/projects/${projectId}/files/${fileId}/revisions`;
        url = this.addQueryParam(url, 'limit', limit);
        url = this.addQueryParam(url, 'offset', offset);
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param fileId file identifier
     * @param request request body
     */
    restoreFileToRevision(
        projectId: number,
        fileId: number,
        request: SourceFilesModel.RestoreFileRevisionRequest,
    ): Promise<ResponseObject<SourceFilesModel.FileRevision>> {
        const url = `${this.url}/projects/${projectId}/files/${fileId}/revisions`;
        return this.put(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param fileId file identifier
     * @param request request body
     */
    updateFile(
        projectId: number,
        fileId: number,
        request: SourceFilesModel.CreateFileRevisionRequest,
    ): Promise<ResponseObject<SourceFilesModel.FileRevision>> {
        const url = `${this.url}/projects/${projectId}/files/${fileId}/revisions`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param fileId file identifier
     * @param revision revision number
     */
    getFileRevision(
        projectId: number,
        fileId: number,
        revision: number,
    ): Promise<ResponseObject<SourceFilesModel.FileRevision>> {
        const url = `${this.url}/projects/${projectId}/files/${fileId}/revisions/${revision}`;
        return this.get(url, this.defaultConfig());
    }
}

export namespace SourceFilesModel {
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

    export interface RestoreFileRevisionRequest {
        revision: number;
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
