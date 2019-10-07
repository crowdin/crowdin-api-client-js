import { CrowdinApi, ResponseObject, DownloadLink, Status, ResponseList } from '../core';

export class Translations extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param request request body
     */
    preTranslate(projectId: number, request: TranslationsModel.PreTranslateRequest): Promise<ResponseObject<Status>> {
        const url = `${this.url}/projects/${projectId}/pre-translations`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param preTranslationId pre translation identifier
     */
    preTranslationStatus(projectId: number, preTranslationId: string): Promise<ResponseObject<Status>> {
        const url = `${this.url}/projects/${projectId}/pre-translations/${preTranslationId}`;
        return this.get(url, this.defaultConfig());
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
        url = this.addQueryParam(url, 'limit', limit);
        url = this.addQueryParam(url, 'offset', offset);
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param request request body
     */
    buildProject(
        projectId: number,
        request: TranslationsModel.BuildRequest,
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
        languageId: number,
        request: TranslationsModel.UploadTranslationRequest,
    ): Promise<void> {
        const url = `${this.url}/projects/${projectId}/translations/${languageId}`;
        return this.post(url, request, this.defaultConfig());
    }
}

export namespace TranslationsModel {
    export interface PreTranslateRequest {
        languageIds: number[];
        fileIds: number[];
        method?: Method;
        engineId?: number;
        autoApproveOption?: AutoApproveOption;
        duplicateTranslations?: boolean;
        translateUntranslatedOnly?: boolean;
        translateWithPerfectMatchOnly?: boolean;
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
    }

    export interface Build {
        id: number;
        projectId: number;
        branchId: number;
        languagesId: number[];
        status: string;
        progress: Progress;
    }

    export interface Progress {
        percent: number;
        currentLanguageId: string;
        currentFileId: string;
    }

    export interface BuildRequest {
        branchId?: number;
        targetLanguagesId?: number[];
    }

    export interface UploadTranslationRequest {
        storageId: string;
        fileId: number;
        importDuplicates?: boolean;
        importEqSuggestions?: boolean;
        autoApproveImported?: boolean;
    }
}
