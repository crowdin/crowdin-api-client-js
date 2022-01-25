import { CrowdinApi, DownloadLink, PatchRequest, ResponseList, ResponseObject } from '../core';

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
        return this.getList(url, limit, offset);
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
     * @param filter use to filter directories by name
     * @param recursion use to list directories recursively (works only when directoryId or branchId parameter is specified)
     */
    listProjectDirectories(
        projectId: number,
        branchId?: number,
        directoryId?: number,
        limit?: number,
        offset?: number,
        filter?: string,
        recursion?: string,
    ): Promise<ResponseList<SourceFilesModel.Directory>>;

    listProjectDirectories(
        projectId: number,
        branchIdOrRequest?: number | SourceFilesModel.ListProjectDirectoriesRequest,
        directoryId?: number,
        limit?: number,
        offset?: number,
        filter?: string,
        recursion?: string,
    ): Promise<ResponseList<SourceFilesModel.Directory>> {
        let url = `${this.url}/projects/${projectId}/directories`;
        let request: SourceFilesModel.ListProjectDirectoriesRequest;
        if (branchIdOrRequest && typeof branchIdOrRequest === 'object') {
            request = branchIdOrRequest;
        } else {
            request = { branchId: branchIdOrRequest, directoryId, limit, offset, recursion, filter };
        }
        url = this.addQueryParam(url, 'branchId', request.branchId);
        url = this.addQueryParam(url, 'directoryId', request.directoryId);
        url = this.addQueryParam(url, 'filter', request.filter);
        url = this.addQueryParam(url, 'recursion', request.recursion);
        return this.getList(url, request.limit, request.offset);
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

    listProjectFiles(
        projectId: number,
        request: SourceFilesModel.ListProjectFilesRequest,
    ): Promise<ResponseList<SourceFilesModel.File>>;

    /**
     *
     * @param projectId project identifier
     * @param branchId list branch files (Note! You can either list files for the specified branch (branchId) in the same request)
     * @param directoryId list directory files (Note! You can either list files for the specified directory (directoryId) in the same request)
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @param recursion use to list files recursively
     * @param filter use to filter files by name
     */
    listProjectFiles(
        projectId: number,
        branchId?: number,
        directoryId?: number,
        limit?: number,
        offset?: number,
        recursion?: any,
        filter?: string,
    ): Promise<ResponseList<SourceFilesModel.File>>;

    listProjectFiles(
        projectId: number,
        branchIdOrRequest?: number | SourceFilesModel.ListProjectFilesRequest,
        directoryId?: number,
        limit?: number,
        offset?: number,
        recursion?: any,
        filter?: string,
    ): Promise<ResponseList<SourceFilesModel.File>> {
        let url = `${this.url}/projects/${projectId}/files`;
        let request: SourceFilesModel.ListProjectFilesRequest;
        if (branchIdOrRequest && typeof branchIdOrRequest === 'object') {
            request = branchIdOrRequest;
        } else {
            request = { branchId: branchIdOrRequest, directoryId, limit, offset, recursion, filter };
        }
        url = this.addQueryParam(url, 'branchId', request.branchId);
        url = this.addQueryParam(url, 'directoryId', request.directoryId);
        url = this.addQueryParam(url, 'recursion', request.recursion);
        url = this.addQueryParam(url, 'filter', request.filter);
        return this.getList(url, request.limit, request.offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     */
    createFile(
        projectId: number,
        request: SourceFilesModel.CreateFileRequest,
    ): Promise<ResponseObject<SourceFilesModel.File>> {
        const url = `${this.url}/projects/${projectId}/files`;
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
     * @param request request body
     */
    updateOrRestoreFile(
        projectId: number,
        fileId: number,
        request: SourceFilesModel.ReplaceFileFromStorageRequest | SourceFilesModel.RestoreFile,
    ): Promise<ResponseObject<SourceFilesModel.File>> {
        const url = `${this.url}/projects/${projectId}/files/${fileId}`;
        return this.put(url, request, this.defaultConfig());
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
        const url = `${this.url}/projects/${projectId}/files/${fileId}/revisions`;
        return this.getList(url, limit, offset);
    }

    /**
     * @param projectId project identifier
     * @param fileId file identifier
     * @param revisionId revision identifier
     */
    getFileRevision(
        projectId: number,
        fileId: number,
        revisionId: number,
    ): Promise<ResponseObject<SourceFilesModel.FileRevision>> {
        const url = `${this.url}/projects/${projectId}/files/${fileId}/revisions/${revisionId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param branchId filter builds by branchId
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     */
    listReviewedSourceFilesBuild(
        projectId: number,
        branchId?: number,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<SourceFilesModel.ReviewedSourceFilesBuild>> {
        let url = `${this.url}/projects/${projectId}/strings/reviewed-builds`;
        url = this.addQueryParam(url, 'branchId', branchId);
        return this.getList(url, limit, offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     */
    buildReviewedSourceFiles(
        projectId: number,
        request: SourceFilesModel.BuildReviewedSourceFilesRequest,
    ): Promise<ResponseObject<SourceFilesModel.ReviewedSourceFilesBuild>> {
        const url = `${this.url}/projects/${projectId}/strings/reviewed-builds`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param buildId build identifier
     */
    checkReviewedSourceFilesBuildStatus(
        projectId: number,
        buildId: number,
    ): Promise<ResponseObject<SourceFilesModel.ReviewedSourceFilesBuild>> {
        const url = `${this.url}/projects/${projectId}/strings/reviewed-builds/${buildId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param buildId build identifier
     */
    downloadReviewedSourceFiles(projectId: number, buildId: number): Promise<ResponseObject<DownloadLink>> {
        const url = `${this.url}/projects/${projectId}/strings/reviewed-builds/${buildId}/download`;
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
        LOW = 'low',
        NORMAL = 'normal',
        HIGH = 'high',
    }

    export interface ListProjectDirectoriesRequest {
        branchId?: number;
        directoryId?: number;
        limit?: number;
        offset?: number;
        filter?: string;
        recursion?: string;
    }

    export interface Directory {
        id: number;
        projectId: number;
        branchId: number;
        directoryId: number;
        name: string;
        title: string;
        exportPattern: string;
        priority: Priority;
        createdAt: string;
        updatedAt: string;
    }

    export interface CreateDirectoryRequest {
        branchId?: number;
        directoryId?: number;
        name: string;
        title?: string;
        exportPattern?: string;
        priority?: Priority;
    }

    export interface ListProjectFilesRequest {
        branchId?: number;
        directoryId?: number;
        limit?: number;
        offset?: number;
        recursion?: any;
        filter?: string;
    }

    export interface File {
        id: number;
        projectId: number;
        branchId: number;
        directoryId: number;
        name: string;
        title: string;
        type: string;
        revisionId: number;
        status: string;
        priority: Priority;
        path: string;
        importOptions: SpreadsheetImportOptions | XmlImportOptions | OtherImportOptions;
        exportOptions: GeneralExportOptions | PropertyExportOptions;
        createdAt: string;
        updatedAt: string;
        excludedTargetLanguages: string[];
    }

    export interface CreateFileRequest {
        storageId: number;
        name: string;
        branchId?: number;
        directoryId?: number;
        title?: string;
        type?: FileType;
        importOptions?: SpreadsheetImportOptions | XmlImportOptions | OtherImportOptions;
        exportOptions?: GeneralExportOptions | PropertyExportOptions;
        attachLabelIds?: number[];
        excludedTargetLanguages?: string[];
    }

    export interface ReplaceFileFromStorageRequest {
        storageId: number;
        updateOption?: UpdateOption;
        importOptions?: SpreadsheetImportOptions | XmlImportOptions | OtherImportOptions;
        exportOptions?: GeneralExportOptions | PropertyExportOptions;
        attachLabelIds?: number[];
        detachLabelIds?: number[];
    }

    export interface RestoreFile {
        revisionId: number;
    }

    export interface FileRevision {
        id: number;
        projectId: number;
        fileId: number;
        restoreToRevision: number;
        info: FileRevisionInfo;
        date: string;
    }

    export interface FileRevisionInfo {
        added: FileRevisionInfoAttribute;
        deleted: FileRevisionInfoAttribute;
        updated: FileRevisionInfoAttribute;
    }

    export interface FileRevisionInfoAttribute {
        strings: number;
        words: number;
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
        ARB = 'arb',
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
        srxStorageId: number;
    }

    export interface OtherImportOptions {
        contentSegmentation: boolean;
        srxStorageId: number;
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
        CLEAR_TRANSLATIONS_AND_APPROVALS = 'clear_translations_and_approvals',
        KEEP_TRANSLATIONS = 'keep_translations',
        KEEP_TRANSLATIONS_AND_APPROVALS = 'keep_translations_and_approvals',
    }

    export interface ReviewedSourceFilesBuild {
        id: number;
        projectId: number;
        status: string;
        progress: number;
        attributes: ReviewedSourceFilesBuildAttributes;
    }

    export interface ReviewedSourceFilesBuildAttributes {
        branchId: number;
        targetLanguageId: string;
    }

    export interface BuildReviewedSourceFilesRequest {
        branchId: number;
    }
}
