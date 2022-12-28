import {
    CrowdinApi,
    DownloadLink,
    isOptionalNumber,
    isOptionalString,
    PaginationOptions,
    PatchRequest,
    ResponseList,
    ResponseObject,
} from '../core';

/**
 * Source files are resources for translation. You can keep files structure using folders or manage different versions of the content via branches.
 *
 * Use API to keep the source files up to date, check on file revisions, and manage project branches.
 * Before adding source files to the project, upload each file to the Storage first.
 */
export class SourceFiles extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.branches.getMany
     */
    listProjectBranches(
        projectId: number,
        options?: SourceFilesModel.ListProjectBranchesOptions,
    ): Promise<ResponseList<SourceFilesModel.Branch>>;
    /**
     * @param projectId project identifier
     * @param name filter branch by name
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @deprecated optional parameters should be passed through an object
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.branches.getMany
     */
    listProjectBranches(
        projectId: number,
        name?: string,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<SourceFilesModel.Branch>>;
    listProjectBranches(
        projectId: number,
        options?: string | SourceFilesModel.ListProjectBranchesOptions,
        deprecatedLimit?: number,
        deprecatedOffset?: number,
    ): Promise<ResponseList<SourceFilesModel.Branch>> {
        if (isOptionalString(options, '1' in arguments)) {
            options = { name: options, limit: deprecatedLimit, offset: deprecatedOffset };
        }
        let url = `${this.url}/projects/${projectId}/branches`;
        url = this.addQueryParam(url, 'name', options.name);
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.branches.post
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
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.branches.get
     */
    getBranch(projectId: number, branchId: number): Promise<ResponseObject<SourceFilesModel.Branch>> {
        const url = `${this.url}/projects/${projectId}/branches/${branchId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param branchId branch identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.branches.delete
     */
    deleteBranch(projectId: number, branchId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/branches/${branchId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param branchId branch identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.branches.patch
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
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.directories.getMany
     */
    listProjectDirectories(
        projectId: number,
        options?: SourceFilesModel.ListProjectDirectoriesOptions,
    ): Promise<ResponseList<SourceFilesModel.Directory>>;
    /**
     * @param projectId project identifier
     * @param branchId filter directories by branchId
     * @param directoryId filter directories by directoryId
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @param filter use to filter directories by name
     * @param recursion use to list directories recursively (works only when directoryId or branchId parameter is specified)
     * @deprecated optional parameters should be passed through an object
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.directories.getMany
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
        options?: number | SourceFilesModel.ListProjectDirectoriesOptions,
        deprecatedDirectoryId?: number,
        deprecatedLimit?: number,
        deprecatedOffset?: number,
        deprecatedFilter?: string,
        deprecatedRecursion?: string,
    ): Promise<ResponseList<SourceFilesModel.Directory>> {
        let url = `${this.url}/projects/${projectId}/directories`;
        if (isOptionalNumber(options, '1' in arguments)) {
            options = {
                branchId: options,
                directoryId: deprecatedDirectoryId,
                limit: deprecatedLimit,
                offset: deprecatedOffset,
                recursion: deprecatedRecursion,
                filter: deprecatedFilter,
            };
        }
        url = this.addQueryParam(url, 'branchId', options.branchId);
        url = this.addQueryParam(url, 'directoryId', options.directoryId);
        url = this.addQueryParam(url, 'filter', options.filter);
        url = this.addQueryParam(url, 'recursion', options.recursion);
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.directories.post
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
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.directories.get
     */
    getDirectory(projectId: number, directoryId: number): Promise<ResponseObject<SourceFilesModel.Directory>> {
        const url = `${this.url}/projects/${projectId}/directories/${directoryId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param directoryId directory identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.directories.delete
     */
    deleteDirectory(projectId: number, directoryId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/directories/${directoryId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param directoryId directory identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.directories.patch
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
     * @param projectId project identifier
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.files.getMany
     */
    listProjectFiles(
        projectId: number,
        options?: SourceFilesModel.ListProjectFilesOptions,
    ): Promise<ResponseList<SourceFilesModel.File>>;
    /**
     * @param projectId project identifier
     * @param branchId list branch files (Note! You can either list files for the specified branch (branchId) in the same request)
     * @param directoryId list directory files (Note! You can either list files for the specified directory (directoryId) in the same request)
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @param recursion use to list files recursively
     * @param filter use to filter files by name
     * @deprecated optional parameters should be passed through an object
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.files.getMany
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
        options?: number | SourceFilesModel.ListProjectFilesOptions,
        deprecatedDirectoryId?: number,
        deprecatedLimit?: number,
        deprecatedOffset?: number,
        deprecatedRecursion?: any,
        deprecatedFilter?: string,
    ): Promise<ResponseList<SourceFilesModel.File>> {
        let url = `${this.url}/projects/${projectId}/files`;
        if (isOptionalNumber(options, '1' in arguments)) {
            options = {
                branchId: options,
                directoryId: deprecatedDirectoryId,
                limit: deprecatedLimit,
                offset: deprecatedOffset,
                recursion: deprecatedRecursion,
                filter: deprecatedFilter,
            };
        }
        url = this.addQueryParam(url, 'branchId', options.branchId);
        url = this.addQueryParam(url, 'directoryId', options.directoryId);
        url = this.addQueryParam(url, 'recursion', options.recursion);
        url = this.addQueryParam(url, 'filter', options.filter);
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.files.post
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
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.files.get
     */
    getFile(projectId: number, fileId: number): Promise<ResponseObject<SourceFilesModel.File>> {
        const url = `${this.url}/projects/${projectId}/files/${fileId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param fileId file identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.files.put
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
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.files.delete
     */
    deleteFile(projectId: number, fileId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/files/${fileId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param fileId file identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.files.patch
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
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.files.download.get
     */
    downloadFile(projectId: number, fileId: number): Promise<ResponseObject<DownloadLink>> {
        const url = `${this.url}/projects/${projectId}/files/${fileId}/download`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param fileId file identifier
     * @param options optional pagination parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.files.revisions.getMany
     */
    listFileRevisions(
        projectId: number,
        fileId: number,
        options?: PaginationOptions,
    ): Promise<ResponseList<SourceFilesModel.FileRevision>>;
    /**
     * @param projectId project identifier
     * @param fileId file identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @deprecated optional parameters should be passed through an object
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.files.revisions.getMany
     */
    listFileRevisions(
        projectId: number,
        fileId: number,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<SourceFilesModel.FileRevision>>;
    listFileRevisions(
        projectId: number,
        fileId: number,
        options?: number | PaginationOptions,
        deprecatedOffset?: number,
    ): Promise<ResponseList<SourceFilesModel.FileRevision>> {
        if (isOptionalNumber(options, '2' in arguments)) {
            options = { limit: options, offset: deprecatedOffset };
        }
        const url = `${this.url}/projects/${projectId}/files/${fileId}/revisions`;
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param projectId project identifier
     * @param fileId file identifier
     * @param revisionId revision identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.files.revisions.get
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
     * @param options optional parameters for the request
     * @see https://support.crowdin.com/enterprise/api/#operation/api.projects.strings.reviewed-builds.getMany
     */
    listReviewedSourceFilesBuild(
        projectId: number,
        options?: SourceFilesModel.ListReviewedSourceFilesBuildOptions,
    ): Promise<ResponseList<SourceFilesModel.ReviewedSourceFilesBuild>>;
    /**
     * @param projectId project identifier
     * @param branchId filter builds by branchId
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @deprecated optional parameters should be passed through an object
     * @see https://support.crowdin.com/enterprise/api/#operation/api.projects.strings.reviewed-builds.getMany
     */
    listReviewedSourceFilesBuild(
        projectId: number,
        branchId?: number,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<SourceFilesModel.ReviewedSourceFilesBuild>>;
    listReviewedSourceFilesBuild(
        projectId: number,
        options?: number | SourceFilesModel.ListReviewedSourceFilesBuildOptions,
        deprecatedLimit?: number,
        deprecatedOffset?: number,
    ): Promise<ResponseList<SourceFilesModel.ReviewedSourceFilesBuild>> {
        if (isOptionalNumber(options, '1' in arguments)) {
            options = { branchId: options, limit: deprecatedLimit, offset: deprecatedOffset };
        }
        let url = `${this.url}/projects/${projectId}/strings/reviewed-builds`;
        url = this.addQueryParam(url, 'branchId', options.branchId);
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/enterprise/api/#operation/api.projects.strings.reviewed-builds.post
     */
    buildReviewedSourceFiles(
        projectId: number,
        request: SourceFilesModel.BuildReviewedSourceFilesRequest = {},
    ): Promise<ResponseObject<SourceFilesModel.ReviewedSourceFilesBuild>> {
        const url = `${this.url}/projects/${projectId}/strings/reviewed-builds`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param buildId build identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.projects.strings.reviewed-builds.get
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
     * @see https://support.crowdin.com/enterprise/api/#operation/api.projects.strings.reviewed-builds.download.download
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

    export type Priority = 'low' | 'normal' | 'high';

    export interface ListProjectDirectoriesOptions extends PaginationOptions {
        branchId?: number;
        directoryId?: number;
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

    export interface ListProjectFilesOptions extends PaginationOptions {
        branchId?: number;
        directoryId?: number;
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
        importOptions: SpreadsheetImportOptions | XmlImportOptions | OtherImportOptions | DocxFileImportOptions;
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
        importOptions?: SpreadsheetImportOptions | XmlImportOptions | OtherImportOptions | DocxFileImportOptions;
        exportOptions?: GeneralExportOptions | PropertyExportOptions;
        attachLabelIds?: number[];
        excludedTargetLanguages?: string[];
    }

    export interface ReplaceFileFromStorageRequest {
        storageId: number;
        updateOption?: UpdateOption;
        importOptions?: SpreadsheetImportOptions | XmlImportOptions | OtherImportOptions | DocxFileImportOptions;
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

    export type FileType =
        | 'auto'
        | 'android'
        | 'macosx'
        | 'resx'
        | 'properties'
        | 'gettext'
        | 'yaml'
        | 'php'
        | 'json'
        | 'xml'
        | 'ini'
        | 'rc'
        | 'resw'
        | 'resjson'
        | 'qtts'
        | 'joomla'
        | 'chrome'
        | 'dtd'
        | 'dklang'
        | 'flex'
        | 'nsh'
        | 'wxl'
        | 'xliff'
        | 'html'
        | 'haml'
        | 'txt'
        | 'csv'
        | 'md'
        | 'flsnp'
        | 'fm_html'
        | 'fm_md'
        | 'mediawiki'
        | 'docx'
        | 'sbv'
        | 'vtt'
        | 'srt'
        | 'arb';

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

    export interface DocxFileImportOptions {
        cleanTagsAggressively: boolean;
        translateHiddenText: boolean;
        translateHyperlinkUrls: boolean;
        translateHiddenRowsAndColumns: boolean;
        importNotes: boolean;
        importHiddenSlides: boolean;
        contentSegmentation: boolean;
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

    export type UpdateOption =
        | 'clear_translations_and_approvals'
        | 'keep_translations'
        | 'keep_translations_and_approvals';

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
        branchId?: number;
    }

    export interface ListProjectBranchesOptions extends PaginationOptions {
        name?: string;
    }

    export interface ListReviewedSourceFilesBuildOptions extends PaginationOptions {
        branchId?: number;
    }
}
