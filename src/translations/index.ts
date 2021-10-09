import { CrowdinApi, DownloadLink, ResponseList, ResponseObject, Status } from '../core';

export class Translations extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param request request body
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
     * @param preTranslationId pre translation identifier
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
     * @param directoryId directory identifier
     * @param request request body
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
     * @param eTag eTag 'If-None-Match' header
     */
    buildProjectFileTranslation(
        projectId: number,
        fileId: number,
        request: TranslationsModel.BuildProjectFileTranslationRequest,
        eTag?: string,
    ): Promise<ResponseObject<TranslationsModel.BuildProjectFileTranslationResponse>> {
        const url = `${this.url}/projects/${projectId}/translations/builds/files/${fileId}`;
        const config = this.defaultConfig();
        if (!!eTag) {
            config.headers['If-None-Match'] = eTag;
        }
        return this.post(url, request, config);
    }

    /**
     * @param projectId project identifier
     * @param branchId branch identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     */
    listProjectBuilds(
        projectId: number,
        branchId?: number,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<TranslationsModel.Build>> {
        let url = `${this.url}/projects/${projectId}/translations/builds`;
        url = this.addQueryParam(url, 'branchId', branchId);
        return this.getList(url, limit, offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
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
     * @param buildId build identifier
     */
    downloadTranslations(projectId: number, buildId: number): Promise<ResponseObject<DownloadLink>> {
        const url = `${this.url}/projects/${projectId}/translations/builds/${buildId}/download`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param buildId build identifier
     */
    checkBuildStatus(projectId: number, buildId: number): Promise<ResponseObject<TranslationsModel.Build>> {
        const url = `${this.url}/projects/${projectId}/translations/builds/${buildId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param buildId build identifier
     */
    cancelBuild(projectId: number, buildId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/translations/builds/${buildId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param languageId language identifier
     * @param request request body
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
     * @param request request body
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

    export enum BuildStatus {
        CREATED = 'created',
        IN_PROGRESS = 'inProgress',
        CANCELED = 'canceled',
        FAILED = 'failed',
        FINISHED = 'finished',
    }

    export interface BuildProjectFileTranslationRequest {
        targetLanguageId: string;
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

    export enum Method {
        TM = 'tm',
        MT = 'mt',
    }

    export enum AutoApproveOption {
        ALL = 'all',
        EXCEPT_AUTO_SUBSTITUTED = 'exceptAutoSubstituted',
        PERFECT_MATCH_ONLY = 'perfectMatchOnly',
        NONE = 'none',
    }

    export enum CharTransformation {
        ASIAN = 'asian',
        EUROPEAN = 'european',
        ARABIC = 'arabic',
        CYRILLIC = 'cyrillic',
    }

    export interface Build {
        id: number;
        status: string;
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
}
