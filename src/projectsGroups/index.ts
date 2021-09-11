import { BooleanInt, CrowdinApi, PatchRequest, ResponseList, ResponseObject } from '../core';
import { LanguagesModel } from '../languages';

export class ProjectsGroups extends CrowdinApi {
    /**
     * @param parentId parent group identifier
     * @param offset starting offset in the collection (default 0)
     * @param userId get user own projects
     * @param limit maximum number of items to retrieve (default 25)
     */
    listGroups(
        parentId?: number,
        offset?: number,
        userId?: number,
        limit?: number,
    ): Promise<ResponseList<ProjectsGroupsModel.Group>> {
        let url = `${this.url}/groups`;
        url = this.addQueryParam(url, 'parentId', parentId);
        url = this.addQueryParam(url, 'userId', userId);
        return this.getList(url, limit, offset);
    }

    /**
     * @param request request body
     */
    addGroup(request: ProjectsGroupsModel.AddGroupRequest): Promise<ResponseObject<ProjectsGroupsModel.Group>> {
        const url = `${this.url}/groups`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param group group identifier
     */
    getGroup(groupId: number): Promise<ResponseObject<ProjectsGroupsModel.Group>> {
        const url = `${this.url}/groups/${groupId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param groupId group identifier
     */
    deleteGroup(groupId: number): Promise<void> {
        const url = `${this.url}/groups/${groupId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param groupId group identifier
     * @param request request body
     */
    editGroup(groupId: number, request: PatchRequest[]): Promise<ResponseObject<ProjectsGroupsModel.Group>> {
        const url = `${this.url}/groups/${groupId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param groupId group identifier
     * @param hasManagerAccess projects with manager access (default 0)
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     */
    listProjects(
        groupId?: number,
        hasManagerAccess?: BooleanInt,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<ProjectsGroupsModel.Project | ProjectsGroupsModel.ProjectSettings>> {
        let url = `${this.url}/projects`;
        url = this.addQueryParam(url, 'groupId', groupId);
        url = this.addQueryParam(url, 'hasManagerAccess', hasManagerAccess);
        return this.getList(url, limit, offset);
    }

    /**
     * @param request request body
     */
    addProject(
        request:
            | ProjectsGroupsModel.CreateProjectEnterpriseRequest
            | ProjectsGroupsModel.FilesBasedCreateProjectRequest
            | ProjectsGroupsModel.StringsBasedCreateProjectRequest,
    ): Promise<ResponseObject<ProjectsGroupsModel.Project | ProjectsGroupsModel.ProjectSettings>> {
        const url = `${this.url}/projects`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     */
    getProject(
        projectId: number,
    ): Promise<ResponseObject<ProjectsGroupsModel.Project | ProjectsGroupsModel.ProjectSettings>> {
        const url = `${this.url}/projects/${projectId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     */
    deleteProject(projectId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param request request body
     */
    editProject(
        projectId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<ProjectsGroupsModel.Project | ProjectsGroupsModel.ProjectSettings>> {
        const url = `${this.url}/projects/${projectId}`;
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
        groupId: number;
        userId: number;
        sourceLanguageId: string;
        targetLanguageIds: string[];
        languageAccessPolicy: LanguageAccessPolicy;
        name: string;
        cname: string;
        identifier: string;
        description: string;
        visibility: string;
        logo: string;
        background: string;
        isExternal: boolean;
        externalType: string;
        workflowId: number;
        hasCrowdsourcing: boolean;
        publicDownloads: boolean;
        createdAt: string;
        updatedAt: string;
        lastActivity: string;
        targetLanguages: LanguagesModel.Language[];
    }

    export interface FilesBasedCreateProjectRequest {
        type?: Type;
        normalizePlaceholder?: boolean;
        saveMetaInfoInSource?: boolean;
        notificationSettings?: NotificationSettings;
        name: string;
        identifier: string;
        sourceLanguageId: string;
        targetLanguageIds?: string[];
        visibility?: JoinPolicy;
        languageAccessPolicy?: LanguageAccessPolicy;
        cname?: string;
        description?: string;
        translateDuplicates?: TranslateDuplicates;
        isMtAllowed?: boolean;
        autoSubstitution?: boolean;
        autoTranslateDialects?: boolean;
        publicDownloads?: boolean;
        hiddenStringsProofreadersAccess?: boolean;
        useGlobalTm?: boolean;
        skipUntranslatedStrings?: boolean;
        skipUntranslatedFiles?: boolean;
        exportApprovedOnly?: boolean;
        inContext?: boolean;
        inContextProcessHiddenStrings?: boolean;
        inContextPseudoLanguageId?: string;
        qaCheckIsActive?: boolean;
        qaCheckCategories?: CheckCategories;
        languageMapping?: LanguageMapping;
        glossaryAccess?: boolean;
    }

    export interface StringsBasedCreateProjectRequest {
        name: string;
        identifier?: string;
        type?: Type;
        sourceLanguageId: string;
        targetLanguageIds?: string[];
        visibility?: JoinPolicy;
        languageAccessPolicy?: LanguageAccessPolicy;
        cname?: string;
        description?: string;
        translateDuplicates?: TranslateDuplicates;
        isMtAllowed?: boolean;
        autoSubstitution?: boolean;
        autoTranslateDialects?: boolean;
        publicDownloads?: boolean;
        hiddenStringsProofreadersAccess?: boolean;
        useGlobalTm?: boolean;
        skipUntranslatedStrings?: boolean;
        skipUntranslatedFiles?: boolean;
        exportApprovedOnly?: boolean;
        inContext?: boolean;
        inContextProcessHiddenStrings?: boolean;
        inContextPseudoLanguageId?: string;
        qaCheckIsActive?: boolean;
        qaCheckCategories?: CheckCategories;
        languageMapping?: LanguageMapping;
        notificationSettings?: NotificationSettings;
        glossaryAccess?: boolean;
    }

    export interface CreateProjectEnterpriseRequest {
        name: string;
        sourceLanguageId: string;
        templateId: number;
        groupId?: number;
        targetLanguageIds?: string[];
        vendorId?: number;
        mtEngineId?: number;
        description?: string;
        translateDuplicates?: TranslateDuplicates;
        isMtAllowed?: boolean;
        autoSubstitution?: boolean;
        autoTranslateDialects?: boolean;
        publicDownloads?: boolean;
        hiddenStringsProofreadersAccess?: boolean;
        useGlobalTm?: boolean;
        delayedWorkflowStart?: boolean;
        skipUntranslatedStrings?: boolean;
        skipUntranslatedFiles?: boolean;
        exportWithMinApprovalsCount?: number;
        normalizePlaceholder?: boolean;
        saveMetaInfoInSource?: boolean;
        inContext?: boolean;
        inContextProcessHiddenStrings?: boolean;
        inContextPseudoLanguageId?: string;
        qaCheckIsActive?: boolean;
        qaCheckCategories?: CheckCategories;
        customQaCheckIds?: number[];
        languageMapping?: LanguageMapping;
        notificationSettings?: NotificationSettings;
        glossaryAccess?: boolean;
    }

    export interface ProjectSettings extends Project {
        translateDuplicates: TranslateDuplicates;
        glossaryAccess: boolean;
        isMtAllowed: boolean;
        hiddenStringsProofreadersAccess: boolean;
        autoSubstitution: boolean;
        exportTranslatedOnly: boolean;
        skipUntranslatedStrings: boolean;
        skipUntranslatedFiles: boolean;
        exportApprovedOnly: boolean;
        exportWithMinApprovalsCount: number;
        autoTranslateDialects: boolean;
        useGlobalTm: boolean;
        normalizePlaceholder: boolean;
        saveMetaInfoInSource: boolean;
        inContext: boolean;
        inContextProcessHiddenStrings: string;
        inContextPseudoLanguageId: string;
        inContextPseudoLanguage: LanguagesModel.Language;
        isSuspended: boolean;
        qaCheckIsActive: boolean;
        qaCheckCategories: CheckCategories;
        customQaCheckIds: number[];
        languageMapping: LanguageMapping;
        delayedWorkflowStart: boolean;
        notificationSettings: NotificationSettings;
    }

    export enum Type {
        FILES_BASED = 0,
        STRINGS_BASED = 1,
    }

    export enum JoinPolicy {
        OPEN = 'open',
        PRIVATE = 'private',
    }

    export enum LanguageAccessPolicy {
        OPEN = 'open',
        MODERATE = 'moderate',
    }

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
}
