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
import { ProjectsGroupsModel } from '../projectsGroups';

/**
 * Translators can work with entirely untranslated project or you can pre-translate the files to ease the translations process.
 *
 * Use API to pre-translate files via Machine Translation (MT) or Translation Memory (TM), upload your existing translations, and download translations correspondingly.
 * Pre-translate and build are asynchronous operations and shall be completed with sequence of API methods.
 */
export class Translations extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.pre-translations.getMany
     */
    listPreTranslations(
        projectId: number,
        options?: TranslationsModel.ListPreTranslationsOptions,
    ): Promise<ResponseList<Status<TranslationsModel.PreTranslationStatusAttributes>>> {
        let url = `${this.url}/projects/${projectId}/pre-translations`;
        url = this.addQueryParam(url, 'orderBy', options?.orderBy);
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param projectId project identifier
     * @param preTranslationId pre translation identifier
     * @see https://developer.crowdin.com/api/v2/#tag/Translations/paths/~1projects~1{projectId}~1pre-translations~1{preTranslationId}/get
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
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.pre-translations.post
     */
    applyPreTranslation(
        projectId: number,
        request:
            | TranslationsModel.PreTranslateRequest
            | TranslationsModel.PreTranslateStringsRequest
            | TranslationsModel.PreTranslateByTaskRequest,
    ): Promise<ResponseObject<Status<TranslationsModel.PreTranslationStatusAttributes>>> {
        const url = `${this.url}/projects/${projectId}/pre-translations`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param preTranslationId pre translation identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.pre-translations.patch
     */
    editPreTranslation(
        projectId: number,
        preTranslationId: string,
        request: PatchRequest[],
    ): Promise<ResponseObject<Status<TranslationsModel.PreTranslationStatusAttributes>>> {
        const url = `${this.url}/projects/${projectId}/pre-translations/${preTranslationId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#tag/Translations/operation/api.projects.pre-translations.patchBatch
     */
    editPreTranslations(
        projectId: number,
        request: PatchRequest[],
    ): Promise<ResponseList<Status<TranslationsModel.PreTranslationStatusAttributes>>> {
        const url = `${this.url}/projects/${projectId}/pre-translations`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param preTranslationId pre translation identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.pre-translations.report.getReport
     */
    getPreTranslationReport(
        projectId: number,
        preTranslationId: string,
    ): Promise<ResponseObject<TranslationsModel.PreTranslationReport>> {
        const url = `${this.url}/projects/${projectId}/pre-translations/${preTranslationId}/report`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param directoryId directory identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.translations.builds.directories.post
     */
    buildProjectDirectoryTranslation(
        projectId: number,
        directoryId: number,
        request: TranslationsModel.BuildProjectDirectoryTranslationRequest = {},
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
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.translations.builds.files.post
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
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.translations.builds.getMany
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
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.translations.builds.getMany
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
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.translations.builds.post
     */
    buildProject(
        projectId: number,
        request: TranslationsModel.BuildRequest | TranslationsModel.PseudoBuildRequest = {},
    ): Promise<ResponseObject<TranslationsModel.Build>> {
        const url = `${this.url}/projects/${projectId}/translations/builds`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @deprecated Use {@link Translations.importTranslations} instead
     *
     * @param projectId project identifier
     * @param languageId language identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.translations.postOnLanguage
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
     * @deprecated Use {@link Translations.importTranslations} instead
     *
     * @param projectId project identifier
     * @param languageId language identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.translations.postOnLanguage
     */
    uploadTranslationStrings(
        projectId: number,
        languageId: string,
        request: TranslationsModel.UploadTranslationStringsRequest,
    ): Promise<ResponseObject<TranslationsModel.UploadTranslationStringsResponse>> {
        const url = `${this.url}/projects/${projectId}/translations/${languageId}`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param buildId build identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.translations.builds.download.download
     */
    downloadTranslations(projectId: number, buildId: number): Promise<ResponseObject<DownloadLink>> {
        const url = `${this.url}/projects/${projectId}/translations/builds/${buildId}/download`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param buildId build identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.translations.builds.get
     */
    checkBuildStatus(projectId: number, buildId: number): Promise<ResponseObject<TranslationsModel.Build>> {
        const url = `${this.url}/projects/${projectId}/translations/builds/${buildId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param buildId build identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.translations.builds.delete
     */
    cancelBuild(projectId: number, buildId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/translations/builds/${buildId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.translations.exports.post
     */
    exportProjectTranslation(
        projectId: number,
        request: TranslationsModel.ExportProjectTranslationRequest,
    ): Promise<ResponseObject<DownloadLink>> {
        const url = `${this.url}/projects/${projectId}/translations/exports`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/developer/api/v2/#tag/Translations/operation/api.projects.translations.imports
     */
    importTranslations(
        projectId: number,
        request: TranslationsModel.ImportTranslationsRequest | TranslationsModel.ImportTranslationsStringsRequest,
    ): Promise<
        ResponseObject<
            Status<
                | TranslationsModel.ImportTranslationsStatusAttributes
                | TranslationsModel.ImportTranslationsStringsStatusAttributes
            >
        >
    > {
        const url = `${this.url}/projects/${projectId}/translations/imports`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param importId import identifier
     * @see https://support.crowdin.com/developer/api/v2/#tag/Translations/operation/api.projects.translations.imports.get
     */
    importTranslationsStatus(
        projectId: number,
        importId: string,
    ): Promise<
        ResponseObject<
            Status<
                | TranslationsModel.ImportTranslationsStatusAttributes
                | TranslationsModel.ImportTranslationsStringsStatusAttributes
            >
        >
    > {
        const url = `${this.url}/projects/${projectId}/translations/imports/${importId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param importId import identifier
     * @see https://support.crowdin.com/developer/api/v2/#tag/Translations/operation/api.projects.translations.imports.report.get
     */
    importTranslationsReport(
        projectId: number,
        importId: string,
    ): Promise<
        ResponseObject<TranslationsModel.ImportTranslationsReport | TranslationsModel.ImportTranslationsStringsReport>
    > {
        const url = `${this.url}/projects/${projectId}/translations/imports/${importId}/report`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/developer/api/v2/#tag/Translations/operation/api.projects.translations.validate-qa-checks.post
     */
    validateQaChecks(
        projectId: number,
        request: TranslationsModel.ValidateQaChecksRequest[],
    ): Promise<ResponseList<TranslationsModel.QaCheckValidationResult>> {
        const url = `${this.url}/projects/${projectId}/translations/validate-qa-checks`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.translations.getMany
     */
    listTranslations(
        options: TranslationsModel.ListTranslationsOptions,
    ): Promise<ResponseList<TranslationsModel.TranslationSearchResult>> {
        let url = `${this.url}/translations`;
        url = this.addQueryParam(url, 'filter', options.filter);
        url = this.addQueryParam(url, 'projectIds', options.projectIds?.join(','));
        url = this.addQueryParam(url, 'userId', options.userId);
        url = this.addQueryParam(url, 'languageIds', options.languageIds?.join(','));
        url = this.addQueryParam(url, 'denormalizePlaceholders', options.denormalizePlaceholders);
        return this.getList(url, options.limit, options.offset);
    }
}

export namespace TranslationsModel {
    export interface PreTranslateRequest {
        languageIds: string[];
        fileIds?: number[];
        directoryIds?: number[];
        branchIds?: number[];
        method?: Method;
        priority?: Priority;
        engineId?: number;
        aiPromptId?: number;
        autoApproveOption?: AutoApproveOption;
        duplicateTranslations?: boolean;
        skipApprovedTranslations?: boolean;
        /**
         * @deprecated Use {@link scope} instead
         */
        translateUntranslatedOnly?: boolean;
        scope?: Scope;
        translationModifiedBefore?: string | null;
        translationModifiedAfter?: string | null;
        replaceTranslationsOption?: ReplaceTranslationsOption;
        resetApprovalStatus?: boolean;
        notifyOnCompletion?: boolean;
        translateWithPerfectMatchOnly?: boolean;
        /**
         * Enterprise only
         */
        minimumMatchRatio?: number;
        fallbackLanguages?: {
            languageId?: string[];
        };
        labelIds?: number[];
        excludeLabelIds?: number[];
        sourceLanguageId?: string;
        customInstruction?: string;
    }

    export interface PreTranslateStringsRequest {
        languageIds: string[];
        branchIds?: number[];
        method?: Method;
        priority?: Priority;
        engineId?: number;
        aiPromptId?: number;
        autoApproveOption?: AutoApproveOption;
        duplicateTranslations?: boolean;
        skipApprovedTranslations?: boolean;
        /**
         * @deprecated Use {@link scope} instead
         */
        translateUntranslatedOnly?: boolean;
        scope?: Scope;
        translationModifiedBefore?: string | null;
        translationModifiedAfter?: string | null;
        replaceTranslationsOption?: ReplaceTranslationsOption;
        resetApprovalStatus?: boolean;
        notifyOnCompletion?: boolean;
        translateWithPerfectMatchOnly?: boolean;
        /**
         * Enterprise only
         */
        minimumMatchRatio?: number;
        fallbackLanguages?: {
            languageId: string[];
        };
        labelIds?: number[];
        excludeLabelIds?: number[];
        sourceLanguageId?: string;
        customInstruction?: string;
    }

    export interface PreTranslateByTaskRequest {
        taskId: number;
        method?: Method;
        priority?: Priority;
        engineId?: number;
        aiPromptId?: number;
        autoApproveOption?: AutoApproveOption;
        duplicateTranslations?: boolean;
        skipApprovedTranslations?: boolean;
        scope?: Scope;
        translationModifiedBefore?: string | null;
        translationModifiedAfter?: string | null;
        replaceTranslationsOption?: ReplaceTranslationsOption;
        resetApprovalStatus?: boolean;
        notifyOnCompletion?: boolean;
        translateWithPerfectMatchOnly?: boolean;
        /**
         * Enterprise only
         */
        minimumMatchRatio?: number;
        fallbackLanguages?: {
            languageId?: string[];
        };
        sourceLanguageId?: string;
        customInstruction?: string;
    }

    export interface ListPreTranslationsOptions extends PaginationOptions {
        orderBy?: string;
    }

    export interface BuildProjectDirectoryTranslationRequest {
        targetLanguageIds?: string[];
        skipUntranslatedStrings?: boolean;
        skipUntranslatedFiles?: boolean;
        preserveFolderHierarchy?: boolean;
        // enterprise
        exportStringsThatPassedWorkflow?: boolean;
        exportWithMinApprovalsCount?: number;
        // community
        exportApprovedOnly?: boolean;
    }

    export interface BuildProjectDirectoryTranslationResponse {
        id: number;
        projectId: number;
        status: BuildStatus;
        progress: number;
        createdAt: string | null;
        updatedAt: string | null;
        finishedAt: string | null;
        attributes?: BuildProjectDirectoryTranslationAttributes;
    }

    export interface BuildProjectDirectoryTranslationAttributes {
        directoryId: number | null;
        targetLanguageIds: string[];
        skipUntranslatedStrings: boolean;
        skipUntranslatedFiles: boolean;
        preserveFolderHierarchy?: boolean;
        // community
        exportApprovedOnly?: boolean;
        // enterprise
        exportWithMinApprovalsCount?: number;
        exportStringsThatPassedWorkflow?: boolean;
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
        // community
        exportApprovedOnly?: boolean;
        // enterprise
        exportWithMinApprovalsCount?: number;
        exportStringsThatPassedWorkflow?: boolean;
    }

    export interface BuildProjectFileTranslationResponse extends DownloadLink {
        etag: string;
    }

    export interface PreTranslationStatusAttributes {
        languageIds: string[];
        fileIds: number[];
        directoryIds: number[];
        branchIds: number[];
        method: Method;
        autoApproveOption: AutoApproveOption;
        duplicateTranslations: boolean;
        skipApprovedTranslations: boolean;
        /**
         * @deprecated Use {@link scope} instead
         */
        translateUntranslatedOnly: boolean;
        translateWithPerfectMatchOnly: boolean;
        priority: Priority;
        taskId?: number;
        scope?: Scope;
        translationModifiedBefore?: string | null;
        translationModifiedAfter?: string | null;
        replaceTranslationsOption?: ReplaceTranslationsOption;
        resetApprovalStatus?: boolean;
        notifyOnCompletion?: boolean;
        /**
         * Enterprise only
         */
        minimumMatchRatio?: number;
    }

    export type Method = 'tm' | 'mt' | 'ai';

    export type AutoApproveOption =
        | 'all'
        | 'exceptAutoSubstituted'
        | 'perfectMatchOnly'
        | 'perfectMatchApprovedOnly'
        | 'none';

    export type Scope = 'untranslated' | 'translated' | 'all';

    export type ReplaceTranslationsOption = 'none' | 'autoTranslated' | 'all';

    export type Priority = 'low' | 'normal' | 'high';

    export type CharTransformation = 'asian' | 'european' | 'arabic' | 'cyrillic';

    export interface Build {
        id: number;
        projectId: number;
        status: BuildStatus;
        progress: number;
        attributes: Attribute;
        createdAt: string | null;
        updatedAt: string | null;
        finishedAt: string | null;
        error?: {
            message: string;
        };
    }

    export interface Attribute {
        branchId: number | null;
        directoryId: number | null;
        targetLanguageIds: string[];
        skipUntranslatedStrings: boolean;
        skipUntranslatedFiles: boolean;
        // community
        exportApprovedOnly: boolean;
        // enterprise
        exportWithMinApprovalsCount: number;
        exportStringsThatPassedWorkflow: boolean;
        // pseudo build
        pseudo?: boolean;
        prefix?: string;
        suffix?: string;
        lengthTransformation?: number;
        charTransformation?: CharTransformation;
    }

    export interface BuildRequest {
        branchId?: number;
        targetLanguageIds?: string[];
        skipUntranslatedStrings?: boolean;
        skipUntranslatedFiles?: boolean;
        // community
        exportApprovedOnly?: boolean;
        // enterprise
        exportWithMinApprovalsCount?: number;
        exportStringsThatPassedWorkflow?: boolean;
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
        fileId?: number;
        importEqSuggestions?: boolean;
        autoApproveImported?: boolean;
        translateHidden?: boolean;
        addToTm?: boolean;
    }

    export interface UploadTranslationStringsRequest {
        storageId: number;
        branchId?: number;
        importEqSuggestions?: boolean;
        autoApproveImported?: boolean;
        translateHidden?: boolean;
        addToTm?: boolean;
    }

    export interface UploadTranslationResponse {
        projectId: number;
        storageId: number;
        languageId: string;
        fileId: number;
        info?: {
            imported: {
                strings: number;
                words: number;
            };
            approved: {
                strings: number;
                words: number;
            };
            skipped: {
                translation_eq_source: number;
                qa_check: number;
                hidden_strings: number;
                ai_error: number;
            };
            skippedQaCheckCategories: Record<string, number>;
        };
    }

    export interface UploadTranslationStringsResponse {
        projectId: number;
        storageId: number;
        languageId: string;
        branchId: number;
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
        // community
        exportApprovedOnly?: boolean;
        // enterprise
        exportWithMinApprovalsCount?: number;
        exportStringsThatPassedWorkflow?: boolean;
    }

    export interface ListProjectBuildsOptions extends PaginationOptions {
        branchId?: number;
    }

    export interface PreTranslationReport {
        languages: TargetLanguage[];
        preTranslateType: Method;
    }

    export interface TargetLanguage {
        id: string;
        files: TargetLanguageFile[];
        skipped: SkippedInfo;
        skippedQaCheckCategories: ProjectsGroupsModel.CheckCategories;
    }

    export interface TargetLanguageFile {
        id: number;
        statistics: TargetLanguageFileStatistics;
    }

    export interface TargetLanguageFileStatistics {
        phrases: number;
        words: number;
    }

    export interface SkippedInfo {
        [key: string]: any;
    }

    /* Import Translations START */

    export interface ImportTranslationsRequest {
        storageId: number;
        languageIds?: string[];
        fileId?: number;
        importEqSuggestions?: boolean;
        autoApproveImported?: boolean;
        translateHidden?: boolean;
        addToTm?: boolean;
    }

    export interface ImportTranslationsStringsRequest {
        storageId: number;
        languageIds?: string[];
        branchId: number;
        importEqSuggestions?: boolean;
        autoApproveImported?: boolean;
        translateHidden?: boolean;
        addToTm?: boolean;
        importOptions?: {
            scheme?: {
                none?: number;
                identifier?: number;
                sourceOrTranslation?: number;
                translation?: number;
                [languageCode: string]: number | undefined;
            };
        };
    }

    export interface ImportTranslationsStatusAttributes {
        storageId: number;
        fileId: number;
        importEqSuggestions: boolean;
        autoApproveImported: boolean;
        translateHidden: boolean;
        addToTm: boolean;
        languageIds: string[];
    }

    export interface ImportTranslationsStringsStatusAttributes {
        storageId: number;
        branchId: number;
        importEqSuggestions: boolean;
        autoApproveImported: boolean;
        translateHidden: boolean;
        addToTm: boolean;
        languageIds: string[];
    }

    export interface ImportTranslationsReport {
        languages: {
            id: string;
            files: {
                id: number;
                statistics: {
                    phrases: number;
                    words: number;
                };
            }[];
            skipped: {
                translationEqSource: number;
                hiddenStrings: number;
                qaCheck: number;
            };
            skippedQaCheckCategories: {
                size: number;
                duplicate: number;
            };
        }[];
    }

    export interface ImportTranslationsStringsReport {
        languages: {
            id: string;
            branches: {
                id: number;
                statistics: {
                    phrases: number;
                    words: number;
                };
            }[];
            skipped: {
                translationEqSource: number;
                hiddenStrings: number;
                qaCheck: number;
            };
            skippedQaCheckCategories: {
                size: number;
                duplicate: number;
            };
        }[];
    }

    /* Import Translations END */

    export interface ListTranslationsOptions extends PaginationOptions {
        filter: string;
        projectIds?: number[];
        userId?: number;
        languageIds?: string[];
        denormalizePlaceholders?: 0 | 1;
    }

    export interface TranslationSearchResult {
        id: number;
        text: string;
        pluralCategoryName?: string;
        projectId: number;
        stringId: number;
        languageId: string;
        user?: {
            id: number;
            username: string;
            fullName: string;
            avatarUrl: string;
        };
        rating?: number;
        provider: string | null;
        providerId?: number | null;
        isPreTranslated: boolean;
        matchRate: number | null;
        matchType: string | null;
        createdAt: string;
        /**
         * Enterprise only
         */
        workflowStepId?: number;
    }

    export interface ValidateQaChecksRequest {
        stringId: number;
        languageId: string;
        text: string;
        pluralCategoryName?: string;
    }

    export interface QaCheckValidationResult {
        stringId: number;
        languageId: string;
        category: string;
        categoryDescription: string;
        validation: string;
        validationDescription: string;
        pluralId: number;
        pluralCategoryName: string;
        text: string;
        translation: string;
    }
}
