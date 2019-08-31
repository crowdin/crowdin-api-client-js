import { CrowdinApi, ResponseList, ResponseObject, PatchRequest, BooleanInt } from '../core';

export namespace ProjectsGroups {

    export class Api extends CrowdinApi {

        /**
         * @param parentId parent group identifier
         * @param offset starting offset in the collection (default 0)
         * @param userId get user own projects
         */
        listGroups(parentId?: number, offset?: number, userId?: number): Promise<ResponseList<Model.Group>> {
            let url = `${this.url}/groups`;
            url = this.addQueryParam(url, 'parentId', parentId);
            url = this.addQueryParam(url, 'offset', offset);
            url = this.addQueryParam(url, 'userId', userId);
            return this.axios.get(url, this.defaultConfig());
        }

        /**
         * @param request request body
         */
        addGroup(request: Model.AddGroupRequest): Promise<ResponseObject<Model.Group>> {
            let url = `${this.url}/groups`;
            return this.axios.post(url, request, this.defaultConfig());
        }

        /**
         * @param group group identifier
         */
        getGroup(groupId: number): Promise<ResponseObject<Model.Group>> {
            let url = `${this.url}/groups/${groupId}`;
            return this.axios.get(url, this.defaultConfig());
        }

        /**
         * @param groupId group identifier
         */
        deleteGroup(groupId: number): Promise<void> {
            let url = `${this.url}/groups/${groupId}`;
            return this.axios.delete(url, this.defaultConfig());
        }

        /**
         * @param groupId group identifier
         * @param request request body
         */
        editGroup(groupId: number, request: PatchRequest[]): Promise<ResponseObject<Model.Group>> {
            let url = `${this.url}/groups/${groupId}`;
            return this.axios.patch(url, request, this.defaultConfig());
        }

        /**
         * @param groupId group identifier
         * @param hasManagerAccess projects with manager access (default 0)
         * @param limit maximum number of items to retrieve (default 25)
         * @param offset starting offset in the collection (default 0)
         */
        listProjects(groupId?: number, hasManagerAccess?: BooleanInt, limit?: number, offset?: number): Promise<ResponseList<Model.Project>> {
            let url = `${this.url}/projects`;
            url = this.addQueryParam(url, 'groupId', groupId);
            url = this.addQueryParam(url, 'hasManagerAccess', hasManagerAccess);
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            return this.axios.get(url, this.defaultConfig());
        }

        /**
         * @param request request body
         */
        addProject(request: Model.CreateProjectRequest): Promise<ResponseObject<Model.Project>> {
            let url = `${this.url}/projects`;
            return this.axios.post(url, request, this.defaultConfig());
        }

        /**
         * @param projectId project identifier
         */
        getProject(projectId: number): Promise<ResponseObject<Model.Project>> {
            let url = `${this.url}/projects/${projectId}`;
            return this.axios.get(url, this.defaultConfig());
        }

        /**
         * @param projectId project identifier
         */
        deleteProject(projectId: number): Promise<void> {
            let url = `${this.url}/projects/${projectId}`;
            return this.axios.delete(url, this.defaultConfig());
        }

        /**
         * @param projectId project identifier
         * @param request request body
         */
        editProject(projectId: number, request: PatchRequest[]): Promise<ResponseObject<Model.Project>> {
            let url = `${this.url}/projects/${projectId}`;
            return this.axios.patch(url, request, this.defaultConfig());
        }

        /**
         * @param projectId project identifier
         */
        getProjectSettings(projectId: number): Promise<ResponseObject<Model.ProjectSettings>> {
            let url = `${this.url}/projects/${projectId}/settings`;
            return this.axios.get(url, this.defaultConfig());
        }

        /**
        * @param projectId project identifier
        * @param request request body
        */
        editProjectSettings(projectId: number, request: PatchRequest[]): Promise<ResponseObject<Model.ProjectSettings>> {
            let url = `${this.url}/projects/${projectId}/settings`;
            return this.axios.patch(url, request, this.defaultConfig());
        }
    }

    export namespace Model {
        export interface Group {
            id: number;
            visibility: number;
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
            sourceLanguageId: number;
            targetLanguageIds: number[];
            joinPolicy: string;
            languageAccessPolicy: string;
            type: number;
            name: string;
            cname: string;
            identifier: string;
            description: string;
            visibility: string;
            logo: string;
            background: string;
            isExternal: boolean;
            externalType: string;
            advancedWorkflowId: number;
            hasCrowdsourcing: boolean;
            createdAt: string;
            updatedAt: string;
        }

        export interface CreateProjectRequest {
            name: string;
            type?: Type;
            groupId: number;
            targetLanguageIds?: number[];
            templateId?: number;
            vendorId?: number;
            mtEngineId?: number;
            sourceLanguageId: number;
            description?: string;
        }

        export interface ProjectSettings {
            projectId: number;
            translateDuplicates: number;
            isMtAllowed: boolean;
            autoSubstitution: boolean;
            exportTranslatedOnly: boolean;
            exportApprovedOnly: boolean;
            autoTranslateDialects: boolean;
            publicDownloads: boolean;
            useGlobalTm: boolean;
            inContext: boolean;
            pseudoLanguageId: number;
            qaCheckIsActive: boolean;
            qaCheckCategories: CheckCategories;
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
    }
}