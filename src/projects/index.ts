import { CrowdinApi, ResponseList, ResponseObject, PatchRequest } from '../core';

export namespace Projects {

    export class Api extends CrowdinApi {

        /**
         * @param limit maximum number of items to retrieve (default 25)
         * @param offset starting offset in the collection (default 0)
         * @param userId get user own projects
         */
        listProjects(limit?: number, offset?: number, userId?: number): Promise<ResponseList<Model.Project>> {
            let url = `${this.url}/projects?account-key=${this.accountKey}&login=${this.login}`;
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            url = this.addQueryParam(url, 'userId', userId);
            return this.axios.get(url);
        }

        /**
         * @param request request body
         */
        createProject(request: Model.CreateProjectRequest): Promise<ResponseObject<Model.Project>> {
            let url = `${this.url}/projects?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.post(url, request);
        }

        /**
         * @param projectId project identifier
         */
        getProject(projectId: number): Promise<ResponseObject<Model.Project>> {
            let url = `${this.url}/projects/${projectId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

        /**
         * @param projectId project identifier
         */
        deleteProject(projectId: number): Promise<void> {
            let url = `${this.url}/projects/${projectId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.delete(url);
        }

        /**
         * @param projectId project identifier
         * @param request request body
         */
        updateProject(projectId: number, request: PatchRequest[]): Promise<ResponseObject<Model.Project>> {
            let url = `${this.url}/projects/${projectId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.patch(url, request);
        }
    }

    export namespace Model {
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
            identifier?: string;
            type?: Type;
            sourceLanguageId: number;
            targetLanguageIds: number[];
            joinPolicy?: JoinPolicy;
            languageAccessPolicy?: LanguageAccessPolicy;
            cname?: string;
            description?: string;
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
    }
}