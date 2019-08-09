import { CrowdinApi, ResponseList } from '../core';

export namespace TranslationStatus {

    export class Api extends CrowdinApi {

        /**
         * @param projectId project identifier
         * @param limit maximum number of items to retrieve (default 25)
         * @param offset starting offset in the collection (default 0)
         * @param type defines the issue type
         * @param status defines the issue resolution status
         */
        listReportedIssues(projectId: number, limit?: number, offset?: number, type?: Model.Type, status?: Model.Status): Promise<ResponseList<Model.Issue>> {
            let url = `${this.url}/projects/${projectId}/issues?account-key=${this.accountKey}&login=${this.login}`;
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            url = this.addQueryParam(url, 'type', type);
            url = this.addQueryParam(url, 'status', status);
            return this.axios.get(url);
        }

        /**
         * @param projectId project identifier
         * @param branchId branch identifier
         */
        getBranchProgress(projectId: number, branchId: number): Promise<ResponseList<Model.Progress>> {
            let url = `${this.url}/projects/${projectId}/branches/${branchId}/languages/progress?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

        /**
         * @param projectId project identifier
         * @param directoryId directory identifier
         */
        getDirectoryProgress(projectId: number, directoryId: number): Promise<ResponseList<Model.Progress>> {
            let url = `${this.url}/projects/${projectId}/directories/${directoryId}/languages/progress?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

        /**
         * @param projectId project identifier
         * @param languageIds language identifier for filter
         * @param limit maximum number of items to retrieve (default 25)
         * @param offset starting offset in the collection (default 0)
         */
        getProjectProgress(projectId: number, languageIds?: string, limit?: number, offset?: number): Promise<ResponseList<Model.ProjectProgress>> {
            let url = `${this.url}/projects/${projectId}/export-ready-progress?account-key=${this.accountKey}&login=${this.login}`;
            url = this.addQueryParam(url, 'languageIds', languageIds);
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            return this.axios.get(url);
        }

        /**
         * @param projectId project identifier
         * @param fileId file identifier
         */
        getFileProgress(projectId: number, fileId: number): Promise<ResponseList<Model.Progress>> {
            let url = `${this.url}/projects/${projectId}/files/${fileId}/languages/progress?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

        /**
         * @param projectId project identifier
         */
        getLanguageProgress(projectId: number): Promise<ResponseList<Model.Progress>> {
            let url = `${this.url}/projects/${projectId}/languages/progress?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

    }

    export namespace Model {
        export enum Type {
            ALL = 'all',
            GENERAL_QUESTION = 'general_question',
            TRANSLATION_MISTAKE = 'translation_mistake',
            CONTEXT_REQUEST = 'context_request',
            SOURCE_MISTAKE = 'source_mistake',
        }

        export enum Status {
            ALL = 'all',
            RESOLVED = 'resolved',
            UNRESOLVED = 'unresolved',
        }

        export interface Issue {
            id: number;
            text: string;
            userId: number;
            stringId: number;
            languageId: number;
            type: string;
            status: string;
            createdAt: string;
        }

        export interface Progress {
            languageId: number;
            phrasesCount: number;
            phrasesTranslatedCount: number;
            phrasesApprovedCount: number;
            phrasesTranslatedProgress: number;
            phrasesApprovedProgress: number;
        }

        export interface ProjectProgress {
            languageId: number;
            exportReadyProgress: number;
        }
    }
}