import {
    BooleanInt,
    CrowdinApi,
    DownloadLink,
    isOptionalNumber,
    PaginationOptions,
    PatchRequest,
    ResponseList,
    ResponseObject,
} from '../core';
import { LanguagesModel } from '../languages';

/**
 * Using projects, you can keep your source files sorted.
 *
 * Use API to manage projects, change their settings, or remove them if required.
 *
 * Only Crowdin Enterprise: Groups allow you to organize your projects based on specific characteristics.
 * Using projects, you can keep your source files sorted.
 */
export class ProjectsGroups extends CrowdinApi {
    /**
     * @param options optional parameters for the request
     * @see https://support.crowdin.com/enterprise/api/#operation/api.groups.getMany
     */
    listGroups(options?: ProjectsGroupsModel.ListGroupsOptions): Promise<ResponseList<ProjectsGroupsModel.Group>>;
    /**
     * @param parentId parent group identifier
     * @param offset starting offset in the collection (default 0)
     * @param userId get user own projects
     * @param limit maximum number of items to retrieve (default 25)
     * @deprecated optional parameters should be passed through an object
     * @see https://support.crowdin.com/enterprise/api/#operation/api.groups.getMany
     */
    listGroups(
        parentId?: number,
        offset?: number,
        userId?: number,
        limit?: number,
    ): Promise<ResponseList<ProjectsGroupsModel.Group>>;
    listGroups(
        options?: number | ProjectsGroupsModel.ListGroupsOptions,
        deprecatedOffset?: number,
        deprecatedUserId?: number,
        deprecatedLimit?: number,
    ): Promise<ResponseList<ProjectsGroupsModel.Group>> {
        if (isOptionalNumber(options, '0' in arguments)) {
            options = {
                parentId: options,
                offset: deprecatedOffset,
                userId: deprecatedUserId,
                limit: deprecatedLimit,
            };
        }
        let url = `${this.url}/groups`;
        url = this.addQueryParam(url, 'parentId', options.parentId);
        url = this.addQueryParam(url, 'userId', options.userId);
        url = this.addQueryParam(url, 'orderBy', options.orderBy);
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param request request body
     * @see https://support.crowdin.com/enterprise/api/#operation/api.groups.post
     */
    addGroup(request: ProjectsGroupsModel.AddGroupRequest): Promise<ResponseObject<ProjectsGroupsModel.Group>> {
        const url = `${this.url}/groups`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param group group identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.groups.get
     */
    getGroup(groupId: number): Promise<ResponseObject<ProjectsGroupsModel.Group>> {
        const url = `${this.url}/groups/${groupId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param groupId group identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.groups.delete
     */
    deleteGroup(groupId: number): Promise<void> {
        const url = `${this.url}/groups/${groupId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param groupId group identifier
     * @param request request body
     * @see https://support.crowdin.com/enterprise/api/#operation/api.groups.patch
     */
    editGroup(groupId: number, request: PatchRequest[]): Promise<ResponseObject<ProjectsGroupsModel.Group>> {
        const url = `${this.url}/groups/${groupId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.getMany
     */
    listProjects(
        options?: ProjectsGroupsModel.ListProjectsOptions,
    ): Promise<ResponseList<ProjectsGroupsModel.Project | ProjectsGroupsModel.ProjectSettings>>;
    /**
     * @param groupId group identifier
     * @param hasManagerAccess projects with manager access (default 0)
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @deprecated optional parameters should be passed through an object
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.getMany
     */
    listProjects(
        groupId?: number,
        hasManagerAccess?: BooleanInt,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<ProjectsGroupsModel.Project | ProjectsGroupsModel.ProjectSettings>>;
    listProjects(
        options?: number | ProjectsGroupsModel.ListProjectsOptions,
        deprecatedHasManagerAccess?: BooleanInt,
        deprecatedLimit?: number,
        deprecatedOffset?: number,
    ): Promise<ResponseList<ProjectsGroupsModel.Project | ProjectsGroupsModel.ProjectSettings>> {
        if (isOptionalNumber(options, '0' in arguments)) {
            options = {
                groupId: options,
                hasManagerAccess: deprecatedHasManagerAccess,
                limit: deprecatedLimit,
                offset: deprecatedOffset,
            };
        }
        let url = `${this.url}/projects`;
        url = this.addQueryParam(url, 'groupId', options.groupId);
        url = this.addQueryParam(url, 'hasManagerAccess', options.hasManagerAccess);
        url = this.addQueryParam(url, 'type', options.type);
        url = this.addQueryParam(url, 'orderBy', options.orderBy);
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.post
     */
    addProject(
        request: ProjectsGroupsModel.CreateProjectEnterpriseRequest | ProjectsGroupsModel.CreateProjectRequest,
    ): Promise<ResponseObject<ProjectsGroupsModel.Project | ProjectsGroupsModel.ProjectSettings>> {
        const url = `${this.url}/projects`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.get
     */
    getProject(
        projectId: number,
    ): Promise<ResponseObject<ProjectsGroupsModel.Project | ProjectsGroupsModel.ProjectSettings>> {
        const url = `${this.url}/projects/${projectId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.delete
     */
    deleteProject(projectId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.patch
     */
    editProject(
        projectId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<ProjectsGroupsModel.Project | ProjectsGroupsModel.ProjectSettings>> {
        const url = `${this.url}/projects/${projectId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param fileFormatSettingsId file format settings identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.file-format-settings.custom-segmentations.get
     */
    downloadProjectFileFormatSettingsCustomSegmentation(
        projectId: number,
        fileFormatSettingsId: number,
    ): Promise<ResponseObject<DownloadLink>> {
        const url = `${this.url}/projects/${projectId}/file-format-settings/${fileFormatSettingsId}/custom-segmentations`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param fileFormatSettingsId file format settings identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.file-format-settings.custom-segmentations.delete
     */
    resetProjectFileFormatSettingsCustomSegmentation(
        projectId: number,
        fileFormatSettingsId: number,
    ): Promise<ResponseObject<DownloadLink>> {
        const url = `${this.url}/projects/${projectId}/file-format-settings/${fileFormatSettingsId}/custom-segmentations`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.file-format-settings.getMany
     */
    listProjectFileFormatSettings(
        projectId: number,
        options?: PaginationOptions,
    ): Promise<ResponseList<ProjectsGroupsModel.ProjectFileFormatSettings>> {
        const url = `${this.url}/projects/${projectId}/file-format-settings`;
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.file-format-settings.post
     */
    addProjectFileFormatSettings(
        projectId: number,
        request: ProjectsGroupsModel.AddProjectFileFormatSettingsRequest,
    ): Promise<ResponseObject<ProjectsGroupsModel.ProjectFileFormatSettings>> {
        const url = `${this.url}/projects/${projectId}/file-format-settings`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param fileFormatSettingsId file format settings identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.file-format-settings.get
     */
    getProjectFileFormatSettings(
        projectId: number,
        fileFormatSettingsId: number,
    ): Promise<ResponseObject<ProjectsGroupsModel.ProjectFileFormatSettings>> {
        const url = `${this.url}/projects/${projectId}/file-format-settings/${fileFormatSettingsId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param fileFormatSettingsId file format settings identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.file-format-settings.delete
     */
    deleteProjectFileFormatSettings(projectId: number, fileFormatSettingsId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/file-format-settings/${fileFormatSettingsId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param fileFormatSettingsId file format settings identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.file-format-settings.patch
     */
    editProjectFileFormatSettings(
        projectId: number,
        fileFormatSettingsId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<ProjectsGroupsModel.ProjectFileFormatSettings>> {
        const url = `${this.url}/projects/${projectId}/file-format-settings/${fileFormatSettingsId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.strings-exporter-settings.getMany
     */
    listProjectStringsExporterSettings(
        projectId: number,
        options?: PaginationOptions,
    ): Promise<ResponseList<ProjectsGroupsModel.ProjectStringsExporterSettings>> {
        const url = `${this.url}/projects/${projectId}/strings-exporter-settings`;
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.strings-exporter-settings.post
     */
    addProjectStringsExporterSettings(
        projectId: number,
        request: ProjectsGroupsModel.AddProjectStringsExporterSettingsRequest,
    ): Promise<ResponseObject<ProjectsGroupsModel.ProjectStringsExporterSettings>> {
        const url = `${this.url}/projects/${projectId}/strings-exporter-settings`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param systemStringsExporterSettingsId file format settings identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.strings-exporter-settings.get
     */
    getProjectStringsExporterSettings(
        projectId: number,
        systemStringsExporterSettingsId: number,
    ): Promise<ResponseObject<ProjectsGroupsModel.ProjectStringsExporterSettings>> {
        const url = `${this.url}/projects/${projectId}/strings-exporter-settings/${systemStringsExporterSettingsId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param systemStringsExporterSettingsId file format settings identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.strings-exporter-settings.delete
     */
    deleteProjectStringsExporterSettings(projectId: number, systemStringsExporterSettingsId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/strings-exporter-settings/${systemStringsExporterSettingsId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param systemStringsExporterSettingsId file format settings identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.strings-exporter-settings.patch
     */
    editProjectStringsExporterSettings(
        projectId: number,
        systemStringsExporterSettingsId: number,
        request: ProjectsGroupsModel.AddProjectStringsExporterSettingsRequest,
    ): Promise<ResponseObject<ProjectsGroupsModel.ProjectStringsExporterSettings>> {
        const url = `${this.url}/projects/${projectId}/strings-exporter-settings/${systemStringsExporterSettingsId}`;
        return this.patch(url, request, this.defaultConfig());
    }
}

export namespace ProjectsGroupsModel {
    export interface Group {
        id: number;
        name: string;
        description: string;
        parentId: number;
        organizationId: number;
        userId: number;
        subgroupsCount: number;
        projectsCount: number;
        webUrl: string;
        createdAt: string;
        updatedAt: string;
    }

    export interface AddGroupRequest {
        name: string;
        parentId?: number;
        description?: string;
    }

    export interface Project {
        id: number;
        type: Type;
        userId: number;
        sourceLanguageId: string;
        targetLanguageIds: string[];
        languageAccessPolicy: LanguageAccessPolicy;
        name: string;
        identifier: string;
        description: string;
        visibility: string;
        logo: string;
        publicDownloads: boolean;
        createdAt: string;
        updatedAt: string;
        lastActivity: string;
        sourceLanguage: LanguagesModel.Language;
        targetLanguages: LanguagesModel.Language[];
        webUrl: string;
        savingsReportSettingsTemplateId: number;
        fields: Record<string, any>;
        //community
        cname: string;
        //enterprise
        groupId: number;
        background: string;
        isExternal: boolean;
        externalType: string;
        externalProjectId: number;
        externalOrganizationId: number;
        workflowId: number;
        hasCrowdsourcing: boolean;
        publicUrl: string;
    }

    export interface CreateProjectRequest {
        name: string;
        identifier: string;
        sourceLanguageId: string;
        targetLanguageIds?: string[];
        visibility?: JoinPolicy;
        languageAccessPolicy?: LanguageAccessPolicy;
        cname?: string;
        description?: string;
        tagDetection?: TagDetection;
        isMtAllowed?: boolean;
        taskBasedAccessControl?: boolean;
        autoSubstitution?: boolean;
        autoTranslateDialects?: boolean;
        publicDownloads?: boolean;
        hiddenStringsProofreadersAccess?: boolean;
        useGlobalTm?: boolean;
        showTmSuggestionsDialects?: boolean;
        skipUntranslatedStrings?: boolean;
        exportApprovedOnly?: boolean;
        qaCheckIsActive?: boolean;
        qaCheckCategories?: CheckCategories;
        qaChecksIgnorableCategories?: CheckCategories;
        languageMapping?: LanguageMapping;
        /**
         * @deprecated
         */
        glossaryAccess?: boolean;
        glossaryAccessOption?: GlossaryAccessOption;
        normalizePlaceholder?: boolean;
        notificationSettings?: NotificationSettings;
        tmPreTranslate?: ProjectSettings['tmPreTranslate'];
        mtPreTranslate?: ProjectSettings['mtPreTranslate'];
        aiPreTranslate?: ProjectSettings['aiPreTranslate'];
        assistActionAiPromptId?: number;
        editorSuggestionAiPromptId?: number;
        savingsReportSettingsTemplateId?: number;
        defaultTmId?: number;
        defaultGlossaryId?: number;
        inContext?: boolean;
        inContextProcessHiddenStrings?: boolean;
        inContextPseudoLanguageId?: string;
        saveMetaInfoInSource?: boolean;
        type?: BooleanInt;
        skipUntranslatedFiles?: boolean;
        tmContextType?: TmContextType;
    }

    export interface CreateProjectEnterpriseRequest {
        name: string;
        sourceLanguageId: string;
        templateId?: number;
        steps?: WorkflowTemplateStepConfig[];
        groupId?: number;
        targetLanguageIds?: string[];
        vendorId?: number;
        mtEngineId?: number;
        description?: string;
        translateDuplicates?: TranslateDuplicates;
        tagsDetection?: TagDetection;
        isMtAllowed?: boolean;
        taskBasedAccessControl?: boolean;
        taskReviewerIds?: number[];
        autoSubstitution?: boolean;
        showTmSuggestionsDialects?: boolean;
        autoTranslateDialects?: boolean;
        publicDownloads?: boolean;
        hiddenStringsProofreadersAccess?: boolean;
        delayedWorkflowStart?: boolean;
        skipUntranslatedStrings?: boolean;
        exportWithMinApprovalsCount?: number;
        exportStringsThatPassedWorkflow?: number;
        normalizePlaceholder?: boolean;
        qaCheckIsActive?: boolean;
        qaApprovalsCount?: number;
        qaCheckCategories?: CheckCategories;
        qaChecksIgnorableCategories?: CheckCategories;
        customQaCheckIds?: number[];
        languageMapping?: LanguageMapping;
        /**
         * @deprecated
         */
        glossaryAccess?: boolean;
        glossaryAccessOption?: GlossaryAccessOption;
        notificationSettings?: NotificationSettings;
        savingsReportSettingsTemplateId?: number;
        fields?: Record<string, any>;
        assistActionAiPromptId?: number;
        editorSuggestionAiPromptId?: number;
        alignmentActionAiPromptId?: number;
        defaultTmId?: number;
        defaultGlossaryId?: number;
        inContext?: boolean;
        inContextProcessHiddenStrings?: boolean;
        inContextPseudoLanguageId?: string;
        saveMetaInfoInSource?: boolean;
        type?: BooleanInt;
        skipUntranslatedFiles?: boolean;
        tmContextType?: TmContextType;
    }

    export type GlossaryAccessOption = 'readOnly' | 'fullAccess' | 'manageDrafts';

    export interface ProjectSettings extends Project {
        translateDuplicates: TranslateDuplicates;
        tagsDetection: TagDetection;
        glossaryAccess: boolean;
        glossaryAccessOption: GlossaryAccessOption;
        isMtAllowed: boolean;
        taskBasedAccessControl: boolean;
        hiddenStringsProofreadersAccess: boolean;
        autoSubstitution: boolean;
        exportTranslatedOnly: boolean;
        skipUntranslatedStrings: boolean;
        exportApprovedOnly: boolean;
        autoTranslateDialects: boolean;
        useGlobalTm: boolean;
        showTmSuggestionsDialects: boolean;
        isSuspended: boolean;
        qaCheckIsActive: boolean;
        qaCheckCategories: CheckCategories;
        qaChecksIgnorableCategories: CheckCategories;
        languageMapping: LanguageMapping;
        notificationSettings: NotificationSettings;
        defaultTmId: number;
        defaultGlossaryId: number;
        assignedTms: { [id: string]: { priority: number } };
        assignedGlossaries: number[];
        tmPenalties: {
            autoSubstitution: number;
            tmPriority: {
                priority: number;
                penalty: number;
            };
            multipleTranslations: number;
            timeSinceLastUsage: {
                months: number;
                penalty: number;
            };
            timeSinceLastModified: {
                months: number;
                penalty: number;
            };
        };
        normalizePlaceholder: boolean;
        tmPreTranslate: {
            enabled: boolean;
            autoApproveOption:
                | 'all'
                | 'perfectMatchOnly'
                | 'exceptAutoSubstituted'
                | 'perfectMatchApprovedOnly'
                | 'none';
            minimumMatchRatio: 'perfect' | '100';
        };
        mtPreTranslate: {
            enabled: boolean;
            mts: {
                mtId: number;
                languageIds: string[];
            }[];
        };
        aiPreTranslate: {
            enabled: boolean;
            aiPrompts: {
                aiPromptId: number;
                languageIds: string[];
            }[];
        };
        assistActionAiPromptId: number;
        editorSuggestionAiPromptId: number;
        inContext: boolean;
        inContextProcessHiddenStrings: string;
        inContextPseudoLanguageId: string;
        inContextPseudoLanguage: LanguagesModel.Language;
        saveMetaInfoInSource: boolean;
        skipUntranslatedFiles: boolean;
        tmContextType: TmContextType;
        //enterprise
        clientOrganizationId: number;
        taskReviewerIds: number[];
        exportWithMinApprovalsCount: number;
        exportStringsThatPassedWorkflow: boolean;
        qaApprovalsCount: number;
        customQaCheckIds: number[];
        externalQaCheckIds: number[];
        delayedWorkflowStart: boolean;
        alignmentActionAiPromptId: number;
    }

    export enum Type {
        FILES_BASED = 0,
        STRINGS_BASED = 1,
    }

    export enum TagDetection {
        AUTO = 0,
        COUNT_TAGS = 1,
        SKIP_TAGS = 2,
    }

    export type JoinPolicy = 'open' | 'private';

    export type LanguageAccessPolicy = 'open' | 'moderate';

    export interface CheckCategories {
        empty: boolean;
        size: boolean;
        tags: boolean;
        spaces: boolean;
        variables: boolean;
        punctuation: boolean;
        symbolRegister: boolean;
        specialSymbols: boolean;
        wrongTranslation: boolean;
        spellcheck: boolean;
        icu: boolean;
        terms: boolean;
        duplicate: boolean;
        ftl: boolean;
        android: boolean;
    }

    export interface LanguageMapping {
        [key: string]: LanguageMappingEntity;
    }

    export interface LanguageMappingEntity {
        name: string;
        two_letters_code: string;
        three_letters_code: string;
        locale: string;
        locale_with_underscore: string;
        android_code: string;
        osx_code: string;
        osx_locale: string;
    }

    export enum TranslateDuplicates {
        SHOW = 0,
        HIDE_REGULAR_DETECTION = 1,
        SHOW_AUTO_TRANSLATE = 2,
        SHOW_WITHIN_VERION_BRANCH_REGULAR_DETECTION = 3,
        HIDE_STRICT_DETECTION = 4,
        SHOW_WITHIN_VERION_BRANCH_STRICT_DETECTION = 5,
    }

    export interface NotificationSettings {
        translatorNewStrings?: boolean;
        managerNewStrings?: boolean;
        managerLanguageCompleted?: boolean;
    }

    export interface ListGroupsOptions extends PaginationOptions {
        parentId?: number;
        userId?: number;
        orderBy?: string;
    }

    export interface ListProjectsOptions extends PaginationOptions {
        groupId?: number;
        hasManagerAccess?: BooleanInt;
        orderBy?: string;
        type?: BooleanInt;
    }

    export type Settings =
        | PropertyFileFormatSettings
        | CommonFileFormatSettings
        | XmlFileFormatSettings
        | MdxV2FormatSettings
        | FmHtmlFormatSettings
        | HtmlFormatSettings
        | JsonFormatSettings
        | MdxV1FormatSettings
        | JavaScriptFileFormatSettings
        | DocxFileFormatSettings;

    export interface ProjectFileFormatSettings {
        id: number;
        name: string;
        format: string;
        extensions: string[];
        settings: Settings;
        createdAt: string;
        updatedAt: string;
    }

    export interface AddProjectFileFormatSettingsRequest {
        format: string;
        settings: Settings;
    }

    export interface PropertyFileFormatSettings {
        escapeQuotes?: 0 | 1 | 2 | 3;
        escapeSpecialCharacters?: 0 | 1;
        exportPattern?: string;
    }

    export interface JavaScriptFileFormatSettings {
        exportPattern?: 'string';
        exportQuotes?: 'single' | 'double';
    }

    export interface CommonFileFormatSettings {
        contentSegmentation?: boolean;
        srxStorageId?: number;
        exportPattern?: string;
    }

    export interface XmlFileFormatSettings extends CommonFileFormatSettings {
        translateContent?: boolean;
        translateAttributes?: boolean;
        translatableElements?: string[];
    }

    export interface JsonFormatSettings extends CommonFileFormatSettings {
        type?: 'i18next_json' | 'nestjs_i18n';
    }

    export interface MdxV2FormatSettings extends CommonFileFormatSettings {
        excludeCodeBlocks?: boolean;
        excludedFrontMatterElements?: string[];
    }

    export interface MdxV1FormatSettings extends CommonFileFormatSettings {
        excludeCodeBlocks?: boolean;
        excludedFrontMatterElements?: string[];
        type?: 'mdx_v1' | 'mdx_v2';
    }

    export interface FmHtmlFormatSettings extends CommonFileFormatSettings {
        excludedElements?: boolean;
        excludedFrontMatterElements?: string[];
    }

    export interface HtmlFormatSettings extends CommonFileFormatSettings {
        excludedElements?: boolean;
    }

    export interface DocxFileFormatSettings extends CommonFileFormatSettings {
        cleanTagsAggressively?: boolean;
        translateHiddenText?: boolean;
        translateHyperlinkUrls?: boolean;
        translateHiddenRowsAndColumns?: boolean;
        importNotes?: boolean;
        importHiddenSlides?: boolean;
    }

    export type TmContextType = 'segmentContext' | 'auto' | 'prevAndNextSegment';

    export type WorkflowTemplateStepConfig =
        | WorkflowTemplateStepConfigTranslateProofread
        | WorkflowTemplateStepConfigVendor
        | WorkflowTemplateStepConfigTMPreTranslate
        | WorkflowTemplateStepConfigMTPreTranslate;

    export interface WorkflowTemplateStepConfigTranslateProofread {
        id: number;
        languages?: string[];
        /**
         * @deprecated
         */
        assignees?: number[];
        config?: { assignees: { [key: string]: number[] } };
    }

    export interface WorkflowTemplateStepConfigVendor {
        id: number;
        languages?: string[];
        vendorId?: number;
    }

    export interface WorkflowTemplateStepConfigTMPreTranslate {
        id: number;
        languages?: string[];
        config?: {
            minRelevant?: number;
            autoSubstitution?: boolean;
        };
    }

    export interface WorkflowTemplateStepConfigMTPreTranslate {
        id: number;
        languages?: string[];
        mtId?: number;
    }

    export type StringsExporterSettings =
        | AndroidStringsExporterSettings
        | MacOSXStringsExporterSettings
        | XliffStringsExporterSettings;

    export interface ProjectStringsExporterSettings {
        id: number;
        format: string;
        settings: StringsExporterSettings;
        createdAt: string;
        updatedAt: string;
    }

    export interface AndroidStringsExporterSettings {
        convertPlaceholders?: boolean;
        convertLineBreaks?: boolean;
        useCdataForStringsWithTags?: boolean;
    }

    export interface MacOSXStringsExporterSettings {
        convertPlaceholders?: boolean;
        convertLineBreaks?: boolean;
    }

    export interface XliffStringsExporterSettings {
        languagePairMapping?: { [key: string]: { sourceLanguageId: string } };
        copySourceToEmptyTarget?: boolean;
        exportTranslatorsComment?: boolean;
    }

    export interface AddProjectStringsExporterSettingsRequest {
        format: string;
        settings: StringsExporterSettings;
    }
}
