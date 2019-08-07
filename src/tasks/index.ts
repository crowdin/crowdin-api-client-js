import { CrowdinApi, ResponseList, ResponseObject, PatchRequest } from '../core';

export namespace Tasks {

    export class Api extends CrowdinApi {

        /**
         * @param projectId project identifier
         * @param limit maximum number of items to retrieve (default 25)
         * @param offset starting offset in the collection (default 0)
         */
        listTasks(projectId: number, limit?: number, offset?: number): Promise<ResponseList<Model.Task>> {
            let url = `${this.url}/projects/${projectId}/tasks?account-key=${this.accountKey}&login=${this.login}`;
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            return this.axios.get(url);
        }

        /**
         * @param projectId project identifier
         * @param request request body
         */
        createTask(projectId: number, request: Model.CreateTaskRequest): Promise<ResponseObject<Model.Task>> {
            let url = `${this.url}/projects/${projectId}/tasks?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.post(url, request);
        }

        /**
         * @param projectId project identifier
         * @param taskId task identifier
         */
        getTask(projectId: number, taskId: number): Promise<ResponseObject<Model.Task>> {
            let url = `${this.url}/projects/${projectId}/tasks/${taskId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

        /**
         * @param projectId project identifier
         * @param taskId task identifier
         */
        deleteTask(projectId: number, taskId: number): Promise<void> {
            let url = `${this.url}/projects/${projectId}/tasks/${taskId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.delete(url);
        }

        /**
         * @param projectId project identifier
         * @param taskId task identifier
         * @param request request body
         */
        updateTask(projectId: number, taskId: number, request: PatchRequest[]): Promise<ResponseObject<Model.Task>> {
            let url = `${this.url}/projects/${projectId}/tasks/${taskId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.patch(url, request);
        }

        /**
         * @param projectId project identifier
         * @param limit maximum number of items to retrieve (default 25)
         * @param offset starting offset in the collection (default 0)
         * @param status defines the task resolution status
         * @param languageIds language identifier for filter
         */
        listTaskStatistic(projectId: number, limit?: number, offset?: number, status?: Model.Status, languageIds?: string): Promise<ResponseList<Model.Statistic>> {
            let url = `${this.url}/projects/${projectId}/tasks/statistics?account-key=${this.accountKey}&login=${this.login}`;
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            url = this.addQueryParam(url, 'status', status);
            url = this.addQueryParam(url, 'languageIds', languageIds);
            return this.axios.get(url);
        }
    }

    export namespace Model {
        export interface Task {
            id: number;
            projectId: number;
            creatorId: number;
            type: Type;
            status: Status;
            title: string;
            assignees: Assignee[];
            fileIds: number[];
            progress: Progress;
            sourceLanguageId: number;
            targetLanguageId: number;
            description: string;
            hash: string;
            translationUrl: string;
            wordsCount: number;
            filesCount: number;
            commentsCount: number;
            deadline: string;
            timeRange: string;
            workflowStepId: number;
            createdAt: string;
            updatedAt: string;
        }

        export interface CreateTaskRequest {
            status?: Status;
            title: string;
            description?: string;
            languageId: number;
            workflowStepId: number;
            fileIds: number[];
            type: Type;
            splitFiles?: boolean;
            assignees?: Assignee[];
            deadline?: string;
            dateFrom?: string;
            dateTo?: string;
        }

        export interface Statistic {
            total: number;
            languageId: number;
        }

        export enum Status {
            TO_DO = 0,
            IN_PROGRESS = 1,
            DONE = 2,
            CLOSED = 3,
            ARCHIVED = 4,
            OVERDUE = 5,
        }

        export enum Type {
            TRANSLATE = 0,
            PROOFREAD = 1,
        }

        export interface Assignee {
            id: number;
            wordsCount: number;
        }

        export interface Progress {
            total: number;
            done: number;
            percent: number;
        }
    }
}