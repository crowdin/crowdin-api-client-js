import { CrowdinApi, ResponseObject, PatchRequest } from '../core';

export namespace ProjectsSettings {

    export class Api extends CrowdinApi {

        /**
         * @param projectId project identifier
         * @param request request body
         */
        uploadProjectBackground(projectId: number, request: Model.UploadRequest): Promise<ResponseObject<Model.ProjectImage>> {
            let url = `${this.url}/projects/${projectId}/background?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.put(url, request);
        }

        /**
         * @param projectId project identifier
         */
        deleteProjectBackground(projectId: number): Promise<void> {
            let url = `${this.url}/projects/${projectId}/background?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.delete(url);
        }

        /**
         * @param projectId project identifier
         * @param request request body
         */
        updateProjectLogo(projectId: number, request: Model.UploadRequest): Promise<ResponseObject<Model.ProjectImage>> {
            let url = `${this.url}/projects/${projectId}/logo?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.put(url, request);
        }

        /**
         * @param projectId project identifier
         */
        deleteProjectLogo(projectId: number): Promise<ResponseObject<Model.ProjectImage>> {
            let url = `${this.url}/projects/${projectId}/logo?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.delete(url);
        }

        /**
         * @param projectId project identifier
         */
        getProjectSettings(projectId: number): Promise<ResponseObject<Model.ProjectSettings>> {
            let url = `${this.url}/projects/${projectId}/settings?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

        /**
        * @param projectId project identifier
        * @param request request body
        */
        updateProjectSettings(projectId: number, request: PatchRequest[]): Promise<ResponseObject<Model.ProjectSettings>> {
            let url = `${this.url}/projects/${projectId}/settings?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.patch(url, request);
        }
    }

    export namespace Model {
        export interface UploadRequest {
            storageId: number;
        }

        export interface ProjectImage {
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