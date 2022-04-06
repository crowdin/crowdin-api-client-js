import {
    CrowdinApi,
    DownloadLink,
    isOptionalNumber,
    PaginationOptions,
    ResponseList,
    ResponseObject,
    Status,
} from '../core';

export class Translations extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param preTranslationId pre translation identifier
     * @see https://support.crowdin.com/api/v2/#tag/Translations/paths/~1projects~1{projectId}~1pre-translations~1{preTranslationId}/get
     */
    preTranslationStatus(
        projectId: number,
        preTranslationId: string,
    ): Promise<ResponseObject<Status<TranslationsModel.PreTranslationStatusAttributes>>> {
        const url = `${this.url}/projects/${projectId}/pre-translations/${preTranslationId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.pre-translations.post
     */
    applyPreTranslation(
        projectId: number,
        request: TranslationsModel.PreTranslateRequest,
    ): Promise<ResponseObject<Status<TranslationsModel.PreTranslationStatusAttributes>>> {
        const url = `${this.url}/projects/${projectId}/pre-translations`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param directoryId directory identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.translations.builds.directories.post
     */
    buildProjectDirectoryTranslation(
        projectId: number,
        directoryId: number,
        request: TranslationsModel.BuildProjectDirectoryTranslationRequest,
    ): Promise<ResponseObject<TranslationsModel.BuildProjectDirectoryTranslationResponse>> {
        const url = `${this.url}/projects/${projectId}/translations/builds/directories/${directoryId}`;
        const config = this.defaultConfig();
        return this.post(url, request, config);
    }

    /**
     * @param projectId project identifier
     * @param fileId file identifier
     * @param request request body
     * @param eTag 'If-None-Match' header
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.translations.builds.files.post
     */
    buildProjectFileTranslation(
        projectId: number,
        fileId: number,
        request: TranslationsModel.BuildProjectFileTranslationRequest,
        eTag?: string,
    ): Promise<ResponseObject<TranslationsModel.BuildProjectFileTranslationResponse>> {
        const url = `${this.url}/projects/${projectId}/translations/builds/files/${fileId}`;
        const config = this.defaultConfig();
        if (eTag) {
            config.headers['If-None-Match'] = eTag;
        }
        return this.post(url, request, config);
    }

    /**
     * @param projectId project identifier
     * @param options optional parameters for the request
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.translations.builds.getMany
     */
    listProjectBuilds(
        projectId: number,
        options?: TranslationsModel.ListProjectBuildsOptions,
    ): Promise<ResponseList<TranslationsModel.Build>>;
    /**
     * @param projectId project identifier
     * @param branchId branch identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @deprecated optional parameters should be passed through an object
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.translations.builds.getMany
     */
    listProjectBuilds(
        projectId: number,
        branchId?: number,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<TranslationsModel.Build>>;
    listProjectBuilds(
        projectId: number,
        options?: number | TranslationsModel.ListProjectBuildsOptions,
        deprecatedLimit?: number,
        deprecatedOffset?: number,
    ): Promise<ResponseList<TranslationsModel.Build>> {
        if (isOptionalNumber(options, '1' in arguments)) {
            options = { branchId: options, limit: deprecatedLimit, offset: deprecatedOffset };
        }
        let url = `${this.url}/projects/${projectId}/translations/builds`;
        url = this.addQueryParam(url, 'branchId', options.branchId);
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.translations.builds.post
     */
    buildProject(
        projectId: number,
        request: TranslationsModel.BuildRequest | TranslationsModel.PseudoBuildRequest = {},
    ): Promise<ResponseObject<TranslationsModel.Build>> {
        const url = `${this.url}/projects/${projectId}/translations/builds`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param languageId language identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.translations.postOnLanguage
     */
    uploadTranslation(
        projectId: number,
        languageId: string,
        request: TranslationsModel.UploadTranslationRequest,
    ): Promise<ResponseObject<TranslationsModel.UploadTranslationResponse>> {
        const url = `${this.url}/projects/${projectId}/translations/${languageId}`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param buildId build identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.translations.builds.download.download
     */
    downloadTranslations(projectId: number, buildId: number): Promise<ResponseObject<DownloadLink>> {
        const url = `${this.url}/projects/${projectId}/translations/builds/${buildId}/download`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param buildId build identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.translations.builds.get
     */
    checkBuildStatus(projectId: number, buildId: number): Promise<ResponseObject<TranslationsModel.Build>> {
        const url = `${this.url}/projects/${projectId}/translations/builds/${buildId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param buildId build identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.translations.builds.delete
     */
    cancelBuild(projectId: number, buildId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/translations/builds/${buildId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.translations.exports.post
     */
    exportProjectTranslation(
        projectId: number,
        request: TranslationsModel.ExportProjectTranslationRequest,
    ): Promise<ResponseObject<DownloadLink>> {
        const url = `${this.url}/projects/${projectId}/translations/exports`;
        return this.post(url, request, this.defaultConfig());
    }
}

export namespace TranslationsModel {
    export interface PreTranslateRequest {
        languageIds: string[];
        fileIds: number[];
        method?: Method;
        engineId?: number;
        autoApproveOption?: AutoApproveOption;
        duplicateTranslations?: boolean;
        translateUntranslatedOnly?: boolean;
        translateWithPerfectMatchOnly?: boolean;
        markAddedTranslationsAsDone?: boolean;
    }

    export interface BuildProjectDirectoryTranslationRequest {
        targetLanguageIds?: string[];
        skipUntranslatedStrings?: boolean;
        skipUntranslatedFiles?: boolean;
        exportApprovedOnly?: boolean;
        exportWithMinApprovalsCount?: number;
    }

    export interface BuildProjectDirectoryTranslationResponse {
        id: number;
        projectId: number;
        status: BuildStatus;
        progress: number;
    }

    export type BuildStatus = 'created' | 'inProgress' | 'canceled' | 'failed' | 'finished';

    export interface BuildProjectFileTranslationRequest {
        targetLanguageId: string;
        /**
         * @deprecated Use {@link Translations.exportProjectTranslation} instead
         */
        exportAsXliff?: boolean;
        skipUntranslatedStrings?: boolean;
        skipUntranslatedFiles?: boolean;
        exportApprovedOnly?: boolean;
        exportWithMinApprovalsCount?: number;
    }

    export interface BuildProjectFileTranslationResponse extends DownloadLink {
        etag: string;
    }

    export interface PreTranslationStatusAttributes {
        languageIds: string[];
        fileIds: number[];
        method: Method;
        autoApproveOption: AutoApproveOption;
        duplicateTranslations: boolean;
        translateUntranslatedOnly: boolean;
        translateWithPerfectMatchOnly: boolean;
    }

    export type Method = 'tm' | 'mt';

    export type AutoApproveOption = 'all' | 'exceptAutoSubstituted' | 'perfectMatchOnly' | 'none';

    export type CharTransformation = 'asian' | 'european' | 'arabic' | 'cyrillic';

    export interface Build {
        id: number;
        status: BuildStatus;
        progress: number;
        attributes: Attribute[];
    }

    export interface Attribute {
        projectId: number;
        branchId: number;
        targetLanguagesId: string[];
        skipUntranslatedStrings: boolean;
        exportApprovedOnly: boolean;
        exportWithMinApprovalsCount: number;
        skipUntranslatedFiles: boolean;
    }

    export interface BuildRequest {
        branchId?: number;
        targetLanguageIds?: string[];
        skipUntranslatedStrings?: boolean;
        skipUntranslatedFiles?: boolean;
        exportApprovedOnly?: boolean;
        exportWithMinApprovalsCount?: number;
    }

    export interface PseudoBuildRequest {
        pseudo: boolean;
        branchId?: number;
        prefix?: string;
        suffix?: string;
        lengthTransformation?: number;
        charTransformation?: CharTransformation;
    }

    export interface UploadTranslationRequest {
        storageId: number;
        fileId: number;
        importEqSuggestions?: boolean;
        autoApproveImported?: boolean;
        markAddedTranslationsAsDone?: boolean;
        translateHidden?: boolean;
    }

    export interface UploadTranslationResponse {
        projectId: number;
        storageId: number;
        languageId: string;
        fileId: number;
    }

    export interface ExportProjectTranslationRequest {
        targetLanguageId: string;
        format?: string;
        labelIds?: number[];
        branchIds?: number[];
        directoryIds?: number[];
        fileIds?: number[];
        skipUntranslatedStrings?: boolean;
        skipUntranslatedFiles?: boolean;
        exportWithMinApprovalsCount?: number;
    }

    export interface ListProjectBuildsOptions extends PaginationOptions {
        branchId?: number;
    }
}
