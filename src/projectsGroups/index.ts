import { BooleanInt, CrowdinApi, PatchRequest, ResponseList, ResponseObject } from '../core';

export class ProjectsGroups extends CrowdinApi {
    /**
     * @param parentId parent group identifier
     * @param offset starting offset in the collection (default 0)
     * @param userId get user own projects
     * @param limit maximum number of items to retrieve (default 25)
     * @param fetchAll fetch all without pagination
     */
    listGroups(
        parentId?: number,
        offset?: number,
        userId?: number,
        limit?: number,
        fetchAll?: boolean,
    ): Promise<ResponseList<ProjectsGroupsModel.Group>> {
        let url = `${this.url}/groups`;
        url = this.addQueryParam(url, 'parentId', parentId);
        url = this.addQueryParam(url, 'userId', userId);
        return this.getList(url, limit, offset, fetchAll);
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
     * @param fetchAll fetch all without pagination
     */
    listProjects(
        groupId?: number,
        hasManagerAccess?: BooleanInt,
        limit?: number,
        offset?: number,
        fetchAll?: boolean,
    ): Promise<ResponseList<ProjectsGroupsModel.Project | ProjectsGroupsModel.ProjectSettings>> {
        let url = `${this.url}/projects`;
        url = this.addQueryParam(url, 'groupId', groupId);
        url = this.addQueryParam(url, 'hasManagerAccess', hasManagerAccess);
        return this.getList(url, limit, offset, fetchAll);
    }

    /**
     * @param request request body
     */
    addProject(
        request: ProjectsGroupsModel.CreateProjectRequest,
    ): Promise<ResponseObject<ProjectsGroupsModel.Project>> {
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
    }

    export interface CreateProjectRequest {
        name: string;
        sourceLanguageId: string;
        templateId?: number;
        groupId?: number;
        targetLanguageIds?: string[];
        vendorId?: number;
        mtEngineId?: number;
        description?: string;
        delayedWorkflowStart?: boolean;
        skipUntranslatedStrings?: boolean;
        skipUntranslatedFiles?: boolean;
        exportApprovedOnly?: boolean;
        exportWithMinApprovalsCount?: number;
        type?: Type;
        cname?: string;
        languageAccessPolicy?: LanguageAccessPolicy;
        visibility?: JoinPolicy;
        identifier?: string;
    }

    export interface ProjectSettings extends Project {
        translateDuplicates: number;
        isMtAllowed: boolean;
        autoSubstitution: boolean;
        skipUntranslatedStrings: boolean;
        skipUntranslatedFiles: boolean;
        exportApprovedOnly: boolean;
        exportWithMinApprovalsCount: number;
        autoTranslateDialects: boolean;
        useGlobalTm: boolean;
        inContext: boolean;
        inContextPseudoLanguageId: string;
        isSuspended: string;
        qaCheckIsActive: boolean;
        qaCheckCategories: CheckCategories;
        customQaCheckIds: number[];
        languageMapping: LanguageMapping;
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
}
