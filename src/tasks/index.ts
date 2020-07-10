import { BooleanInt, CrowdinApi, PatchRequest, ResponseList, ResponseObject } from '../core';

export class Tasks extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @param status list tasks with specified statuses. It can be one status or a list of comma-separated status values
     * @param fetchAll fetch all without pagination
     */
    listTasks(
        projectId: number,
        limit?: number,
        offset?: number,
        status?: TasksModel.Status,
        fetchAll?: boolean,
    ): Promise<ResponseList<TasksModel.Task>> {
        let url = `${this.url}/projects/${projectId}/tasks`;
        url = this.addQueryParam(url, 'status', status);
        return this.getList(url, limit, offset, fetchAll);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     */
    addTask(projectId: number, request: TasksModel.CreateTaskRequest): Promise<ResponseObject<TasksModel.Task>> {
        const url = `${this.url}/projects/${projectId}/tasks`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param taskId task identifier
     */
    getTask(projectId: number, taskId: number): Promise<ResponseObject<TasksModel.Task>> {
        const url = `${this.url}/projects/${projectId}/tasks/${taskId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param taskId task identifier
     */
    deleteTask(projectId: number, taskId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/tasks/${taskId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param taskId task identifier
     * @param request request body
     */
    editTask(projectId: number, taskId: number, request: PatchRequest[]): Promise<ResponseObject<TasksModel.Task>> {
        const url = `${this.url}/projects/${projectId}/tasks/${taskId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @param status list tasks with specified statuses. It can be one status or a list of comma-separated status values
     * @param isArchived list archived/not archived tasks for the authorized user. 1 - archived, 0 - not archived
     * @param fetchAll fetch all without pagination
     */
    listUserTasks(
        limit?: number,
        offset?: number,
        status?: TasksModel.Status,
        isArchived?: BooleanInt,
        fetchAll?: boolean,
    ): Promise<ResponseList<TasksModel.UserTask>> {
        let url = `${this.url}/user/tasks`;
        url = this.addQueryParam(url, 'status', status);
        url = this.addQueryParam(url, 'isArchived', isArchived);
        return this.getList(url, limit, offset, fetchAll);
    }

    /**
     * @param projectId project identifier
     * @param taskId task identifier
     * @param request request body
     */
    editTaskArchivedStatus(
        projectId: number,
        taskId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<TasksModel.UserTask>> {
        let url = `${this.url}/user/tasks/${taskId}`;
        url = this.addQueryParam(url, 'projectId', projectId);
        return this.patch(url, request, this.defaultConfig());
    }
}

export namespace TasksModel {
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
        sourceLanguageId: string;
        targetLanguageId: string;
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

    export interface UserTask extends Task {
        isArchived: boolean;
    }

    export interface CreateTaskRequest {
        workflowStepId: number;
        status?: Status;
        title: string;
        description?: string;
        languageId: string;
        fileIds: number[];
        type: Type;
        splitFiles?: boolean;
        skipAssignedStrings?: boolean;
        skipUntranslatedStrings?: boolean;
        assignees?: Assignee[];
        deadline?: string;
        dateFrom?: string;
        dateTo?: string;
    }

    export enum Status {
        TODO = 'todo',
        IN_PROGRESS = 'in_progress',
        DONE = 'done',
        CLOSED = 'closed',
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
