import { CrowdinApi, ResponseList, ResponseObject } from '../core';

export namespace Issues {

    export class Api extends CrowdinApi {

        /**
         * @param projectId project identifier
         * @param limit maximum number of items to retrieve (default 25)
         * @param offset starting offset in the collection (default 0)
         * @param type defines the issue type
         * @param status defines the issue resolution status
         */
        listIssues(projectId: number, limit?: number, offset?: number, type?: Model.Type, status?: Model.Status): Promise<ResponseList<Model.Issue>> {
            let url = `${this.url}/projects/${projectId}/issues?account-key=${this.accountKey}&login=${this.login}`;
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            url = this.addQueryParam(url, 'type', type);
            url = this.addQueryParam(url, 'status', status);
            return this.axios.get(url);
        }

        /**
         * @param projectId project identifier
         * @param limit maximum number of items to retrieve (default 25)
         * @param offset starting offset in the collection (default 0)
         * @param status defines the issue resolution status (default 'all')
         * @param languageIds language identifier for filter
         */
        listIssueStatistics(projectId: number, limit?: number, offset?: number, status?: Model.Status, languageIds?: string): Promise<ResponseList<Model.Statistic>> {
            let url = `${this.url}/projects/${projectId}/issues/statistics?account-key=${this.accountKey}&login=${this.login}`;
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            url = this.addQueryParam(url, 'status', status);
            url = this.addQueryParam(url, 'languageIds', languageIds);
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

        export interface Statistic {
            total: number;
            languageId: number;
        }
    }
}