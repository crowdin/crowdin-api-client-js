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
 * Create and assign tasks to get files translated or proofread by specific people.
 * You can set the due dates, split words between people, and receive notifications about the changes and updates on tasks.
 * Tasks are project-specific, so you’ll have to create them within a project.
 *
 * Use API to create, modify, and delete specific tasks.
 */
export class Tasks extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.tasks.getMany
     */
    listTasks(projectId: number, options?: TasksModel.ListTasksOptions): Promise<ResponseList<TasksModel.Task>>;
    /**
     * @param projectId project identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @param status list tasks with specified statuses. It can be one status or a list of comma-separated status values
     * @deprecated optional parameters should be passed through an object
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.tasks.getMany
     */
    listTasks(
        projectId: number,
        limit?: number,
        offset?: number,
        status?: TasksModel.Status,
    ): Promise<ResponseList<TasksModel.Task>>;
    listTasks(
        projectId: number,
        options?: number | TasksModel.ListTasksOptions,
        deprecatedOffset?: number,
        deprecatedStatus?: TasksModel.Status,
    ): Promise<ResponseList<TasksModel.Task>> {
        if (isOptionalNumber(options, '1' in arguments)) {
            options = { limit: options, offset: deprecatedOffset, status: deprecatedStatus };
        }
        let url = `${this.url}/projects/${projectId}/tasks`;
        url = this.addQueryParam(url, 'status', options.status);
        url = this.addQueryParam(url, 'assigneeId', options.assigneeId);
        url = this.addQueryParam(url, 'orderBy', options.orderBy);
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.tasks.post
     */
    addTask(projectId: number, request: TasksModel.CreateTaskRequest): Promise<ResponseObject<TasksModel.Task>> {
        const url = `${this.url}/projects/${projectId}/tasks`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param taskId task identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.tasks.exports.post
     */
    exportTaskStrings(projectId: number, taskId: number): Promise<ResponseObject<DownloadLink>> {
        const url = `${this.url}/projects/${projectId}/tasks/${taskId}/exports`;
        return this.post(url, {}, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param taskId task identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.tasks.get
     */
    getTask(projectId: number, taskId: number): Promise<ResponseObject<TasksModel.Task>> {
        const url = `${this.url}/projects/${projectId}/tasks/${taskId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param taskId task identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.tasks.delete
     */
    deleteTask(projectId: number, taskId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/tasks/${taskId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param taskId task identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.tasks.patch
     */
    editTask(projectId: number, taskId: number, request: PatchRequest[]): Promise<ResponseObject<TasksModel.Task>> {
        const url = `${this.url}/projects/${projectId}/tasks/${taskId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.user.tasks.getMany
     */
    listUserTasks(options?: TasksModel.ListUserTasksOptions): Promise<ResponseList<TasksModel.UserTask>>;
    /**
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @param status list tasks with specified statuses. It can be one status or a list of comma-separated status values
     * @param isArchived list archived/not archived tasks for the authorized user. 1 - archived, 0 - not archived
     * @deprecated optional parameters should be passed through an object
     * @see https://developer.crowdin.com/api/v2/#operation/api.user.tasks.getMany
     */
    listUserTasks(
        limit?: number,
        offset?: number,
        status?: TasksModel.Status,
        isArchived?: BooleanInt,
    ): Promise<ResponseList<TasksModel.UserTask>>;
    listUserTasks(
        options?: number | TasksModel.ListUserTasksOptions,
        deprecatedOffset?: number,
        deprecatedStatus?: TasksModel.Status,
        deprecatedIsArchived?: BooleanInt,
    ): Promise<ResponseList<TasksModel.UserTask>> {
        let url = `${this.url}/user/tasks`;
        if (isOptionalNumber(options, '0' in arguments)) {
            options = {
                limit: options,
                offset: deprecatedOffset,
                status: deprecatedStatus,
                isArchived: deprecatedIsArchived,
            };
        }
        url = this.addQueryParam(url, 'status', options.status);
        url = this.addQueryParam(url, 'isArchived', options.isArchived);
        url = this.addQueryParam(url, 'orderBy', options.orderBy);
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param projectId project identifier
     * @param taskId task identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.user.tasks.patch
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

    /**
     * @param projectId project identifier
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.tasks.settings-templates.getMany
     */
    listTaskSettingsTemplates(
        projectId: number,
        options?: PaginationOptions,
    ): Promise<ResponseList<TasksModel.TaskSettingsTemplate>> {
        const url = `${this.url}/projects/${projectId}/tasks/settings-templates`;
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.tasks.settings-templates.post
     */
    addTaskSettingsTemplate(
        projectId: number,
        request: TasksModel.AddTaskSettingsTemplate,
    ): Promise<ResponseObject<TasksModel.TaskSettingsTemplate>> {
        const url = `${this.url}/projects/${projectId}/tasks/settings-templates`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param taskSettingsId task settings identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.tasks.settings-templates.get
     */
    getTaskSettingsTemplate(
        projectId: number,
        taskSettingsId: number,
    ): Promise<ResponseObject<TasksModel.TaskSettingsTemplate>> {
        const url = `${this.url}/projects/${projectId}/tasks/settings-templates/${taskSettingsId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param taskSettingsId task settings identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.tasks.settings-templates.delete
     */
    deleteTaskSettingsTemplate(projectId: number, taskSettingsId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/tasks/settings-templates/${taskSettingsId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param taskSettingsId task settings identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.tasks.settings-templates.patch
     */
    editTaskSettingsTemplate(
        projectId: number,
        taskSettingsId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<TasksModel.TaskSettingsTemplate>> {
        const url = `${this.url}/projects/${projectId}/tasks/settings-templates/${taskSettingsId}`;
        return this.patch(url, request, this.defaultConfig());
    }
}

export namespace TasksModel {
    export interface Task {
        id: number;
        projectId: number;
        creatorId: number;
        type: Type | TypeVendor;
        status: Status;
        title: string;
        assignees: Assignee[];
        assignedTeams: AssignedTeam[];
        progress: Progress;
        translateProgress: Progress;
        sourceLanguageId: string;
        targetLanguageId: string;
        description: string;
        translationUrl: string;
        webUrl: string;
        wordsCount: number;
        commentsCount: number;
        deadline: string;
        startedAt: string;
        resolvedAt: string;
        timeRange: string;
        workflowStepId: number;
        buyUrl: string;
        createdAt: string;
        updatedAt: string;
        sourceLanguage: LanguagesModel.Language;
        targetLanguages: LanguagesModel.Language[];
        labelIds: number[];
        excludeLabelIds: number[];
        precedingTaskId: number;
        filesCount: number;
        fileIds: number[];
        branchIds: number[];
        vendor: string;
    }

    export interface ListUserTasksOptions extends PaginationOptions {
        status?: Status;
        isArchived?: BooleanInt;
        orderBy?: string;
    }

    export interface UserTask extends Task {
        isArchived: boolean;
    }

    //Task create definitions

    export type CreateTaskRequest =
        | CreateTaskEnterpriseByBranchIds
        | CreateTaskEnterpriseByFileIds
        | CreateTaskEnterpriseByStringIds
        | CreateTaskEnterpriseVendorByBranchIds
        | CreateTaskEnterpriseVendorByFileIds
        | CreateTaskEnterpriseVendorByStringIds
        | CreateTaskEnterprisePendingTask
        | CreateTaskByFileIds
        | CreateTaskByStringIds
        | CreateTaskByBranchIds
        | CreateTaskByFileIdsLanguageService
        | CreateTaskByStringIdsLanguageService
        | CreateTaskByBranchIdsLanguageService
        | CreateTaskVendorOhtByFileIds
        | CreateTaskVendorOhtByStringIds
        | CreateTaskVendorOhtByBranchIds
        | CreateTaskVendorGengoByFileIds
        | CreateTaskVendorGengoByStringIds
        | CreateTaskVendorGengoByBranchIds
        | CreateTaskVendorManualByFileIds
        | CreateTaskVendorManualByStringIds
        | CreateTaskVendorManualByBranchIds
        | CreateTaskPendingTask
        | CreateTaskPendingTaskLanguageService
        | CreateTaskPendingTaskVendorManual;

    export interface CreateTaskEnterpriseByBranchIds {
        type: Type;
        workflowStepId: number;
        title: string;
        languageId: string;
        branchIds: number[];
        labelIds?: number[];
        excludeLabelIds?: number[];
        status?: RequestStatus;
        description?: string;
        splitContent?: boolean;
        skipAssignedStrings?: boolean;
        assignees?: CreateTaskAssignee[];
        assignedTeams?: AssignedTeam[];
        includePreTranslatedStringsOnly?: boolean;
        deadline?: string;
        startedAt?: string;
        dateFrom?: string;
        dateTo?: string;
    }

    export interface CreateTaskEnterpriseByStringIds {
        type: Type;
        workflowStepId: number;
        title: string;
        languageId: string;
        stringIds: number[];
        status?: RequestStatus;
        description?: string;
        splitContent?: boolean;
        skipAssignedStrings?: boolean;
        assignees?: CreateTaskAssignee[];
        assignedTeams?: AssignedTeam[];
        includePreTranslatedStringsOnly?: boolean;
        deadline?: string;
        startedAt?: string;
        dateFrom?: string;
        dateTo?: string;
    }

    export type CreateTaskEnterpriseVendorByStringIds = Omit<
        CreateTaskEnterpriseByStringIds,
        'type' | 'status' | 'splitContent' | 'assignees' | 'assignedTeams'
    >;

    export type CreateTaskEnterpriseVendorByBranchIds = Omit<
        CreateTaskEnterpriseByBranchIds,
        'type' | 'status' | 'splitContent' | 'assignees' | 'assignedTeams'
    >;

    export type CreateTaskEnterpriseByFileIds = Omit<CreateTaskEnterpriseByBranchIds, 'branchIds'> & {
        fileIds: number[];
    };

    export type CreateTaskEnterpriseVendorByFileIds = Omit<
        CreateTaskEnterpriseByFileIds,
        'type' | 'status' | 'splitContent' | 'assignees' | 'assignedTeams'
    >;

    export interface CreateTaskEnterprisePendingTask {
        precedingTaskId: number;
        type: Type.PROOFREAD;
        title: string;
        description?: string;
        assignees?: CreateTaskAssignee[];
        assignedTeams?: AssignedTeam[];
        deadline?: string;
    }

    export interface CreateTaskByFileIds {
        title: string;
        languageId: string;
        type: Type;
        fileIds: number[];
        labelIds?: number[];
        excludeLabelIds?: number[];
        status?: RequestStatus;
        description?: string;
        splitContent?: boolean;
        skipAssignedStrings?: boolean;
        includePreTranslatedStringsOnly?: boolean;
        assignees?: CreateTaskAssignee[];
        deadline?: string;
        startedAt?: string;
        dateFrom?: string;
        dateTo?: string;
    }

    export type CreateTaskByStringIds = Omit<CreateTaskByFileIds, 'fileIds' | 'labelIds' | 'excludeLabelIds'> & {
        stringIds: number;
    };

    export type CreateTaskByBranchIds = Omit<CreateTaskByFileIds, 'fileIds'> & { branchIds: number };

    export interface CreateTaskByFileIdsLanguageService {
        title: string;
        languageId: string;
        type: TypeVendor;
        vendor: 'crowdin_language_service';
        fileIds: number[];
        labelIds?: number[];
        excludeLabelIds?: number[];
        status?: RequestStatus;
        description?: string;
        includePreTranslatedStringsOnly?: boolean;
        assignees?: CreateTaskAssignee[];
        dateFrom?: string;
        dateTo?: string;
    }

    export type CreateTaskByStringIdsLanguageService = Omit<
        CreateTaskByFileIdsLanguageService,
        'fileIds' | 'labelIds' | 'excludeLabelIds'
    > & {
        stringIds: number[];
    };

    export type CreateTaskByBranchIdsLanguageService = Omit<CreateTaskByFileIdsLanguageService, 'fileIds'> & {
        branchIds: number[];
    };

    export interface CreateTaskVendorOhtByFileIds {
        title: string;
        languageId: string;
        type: TypeVendor;
        vendor: 'oht';
        fileIds: number[];
        labelIds?: number[];
        excludeLabelIds?: number[];
        status?: RequestStatus;
        description?: string;
        expertise?: Expertise;
        editService?: boolean;
        includePreTranslatedStringsOnly?: boolean;
        dateFrom?: string;
        dateTo?: string;
    }

    export type CreateTaskVendorOhtByStringIds = Omit<
        CreateTaskVendorOhtByFileIds,
        'fileIds' | 'labelIds' | 'excludeLabelIds'
    > & {
        stringIds: number[];
    };

    export type CreateTaskVendorOhtByBranchIds = Omit<CreateTaskVendorOhtByFileIds, 'fileIds'> & {
        branchIds: number[];
    };

    export interface CreateTaskVendorGengoByFileIds {
        title: string;
        languageId: string;
        type: TypeVendor.TRANSLATE_BY_VENDOR;
        vendor: 'gengo';
        fileIds: number[];
        labelIds?: number[];
        excludeLabelIds?: number[];
        status?: RequestStatus;
        description?: string;
        expertise?: 'standard' | 'pro';
        tone?: Tone;
        purpose?: Purpose;
        customerMessage?: string;
        usePreferred?: boolean;
        editService?: boolean;
        dateFrom?: string;
        dateTo?: string;
    }

    export type CreateTaskVendorGengoByStringIds = Omit<
        CreateTaskVendorGengoByFileIds,
        'fileIds' | 'labelIds' | 'excludeLabelIds'
    > & {
        stringIds: number[];
    };

    export type CreateTaskVendorGengoByBranchIds = Omit<CreateTaskVendorGengoByFileIds, 'fileIds'> & {
        branchIds: number[];
    };

    export interface CreateTaskVendorManualByFileIds {
        title: string;
        languageId: string;
        type: TypeVendor;
        vendor:
            | 'alconost'
            | 'babbleon'
            | 'tomedes'
            | 'e2f'
            | 'write_path_admin'
            | 'inlingo'
            | 'acclaro'
            | 'translate_by_humans'
            | 'lingo24'
            | 'assertio_language_services'
            | 'gte_localize'
            | 'kettu_solutions'
            | 'languageline_solutions';
        fileIds: number[];
        labelIds?: number[];
        excludeLabelIds?: number[];
        status?: RequestStatus;
        description?: string;
        skipAssignedStrings?: boolean;
        includePreTranslatedStringsOnly?: boolean;
        assignees?: CreateTaskAssignee[];
        deadline?: string;
        startedAt?: string;
        dateFrom?: string;
        dateTo?: string;
    }

    export type CreateTaskVendorManualByStringIds = Omit<
        CreateTaskVendorManualByFileIds,
        'fileIds' | 'labelIds' | 'excludeLabelIds'
    > & {
        stringIds: number[];
    };

    export type CreateTaskVendorManualByBranchIds = Omit<CreateTaskVendorManualByFileIds, 'fileIds'> & {
        branchIds: number[];
    };

    export interface CreateTaskPendingTask {
        precedingTaskId: number;
        type: Type.PROOFREAD;
        title: string;
        description?: string;
        assignees?: CreateTaskAssignee[];
        deadline?: string;
    }

    export interface CreateTaskPendingTaskLanguageService {
        precedingTaskId: number;
        type: TypeVendor.PROOFREAD_BY_VENDOR;
        vendor: 'crowdin_language_service';
        title: string;
        description?: string;
        deadline?: string;
    }

    export interface CreateTaskPendingTaskVendorManual {
        precedingTaskId: number;
        type: TypeVendor.PROOFREAD_BY_VENDOR;
        vendor: CreateTaskVendorManualByFileIds['vendor'];
        title: string;
        description?: string;
        deadline?: string;
    }

    //END

    export interface CreateTaskAssignee {
        id: number;
        wordsCount?: number;
    }

    export type Status = 'todo' | 'in_progress' | 'done' | 'closed';

    export type RequestStatus = Extract<Status, 'todo' | 'in_progress'>;

    export enum Type {
        TRANSLATE = 0,
        PROOFREAD = 1,
    }

    export enum TypeVendor {
        TRANSLATE_BY_VENDOR = 2,
        PROOFREAD_BY_VENDOR = 3,
    }

    export interface Assignee {
        id: number;
        username: string;
        fullName: string;
        avatarUrl: string;
        wordsCount: number;
        wordsLeft: number;
    }

    export interface AssignedTeam {
        id: number;
        wordsCount: number;
    }

    export interface Progress {
        total: number;
        done: number;
        percent: number;
    }

    export type Expertise =
        | 'standard'
        | 'mobile-applications'
        | 'software-it'
        | 'gaming-video-games'
        | 'technical-engineering'
        | 'marketing-consumer-media'
        | 'business-finance'
        | 'legal-certificate'
        | 'medical'
        | 'ad-words-banners'
        | 'automotive-aerospace'
        | 'scientific'
        | 'scientific-academic'
        | 'tourism'
        | 'training-employee-handbooks'
        | 'forex-crypto';

    export enum TranslatedExpertise {
        ECONOMY = 'P',
        PROFESSIONAL = 'T',
        PREMIUM = 'R',
    }

    export type Tone = '' | 'Informal' | 'Friendly' | 'Business' | 'Formal' | 'other';

    export type Purpose =
        | 'standard'
        | 'Personal use'
        | 'Business'
        | 'Online content'
        | 'App/Web localization'
        | 'Media content'
        | 'Semi-technical'
        | 'other';

    export type Subject =
        | 'general'
        | 'accounting_finance'
        | 'aerospace_defence'
        | 'architecture'
        | 'art'
        | 'automotive'
        | 'certificates_diplomas_licences_cv_etc'
        | 'chemical'
        | 'civil_engineering_construction'
        | 'corporate_social_responsibility'
        | 'cosmetics'
        | 'culinary'
        | 'electronics_electrical_engineering'
        | 'energy_power_generation_oil_gas'
        | 'environment'
        | 'fashion'
        | 'games_viseogames_casino'
        | 'general_business_commerce'
        | 'history_archaeology'
        | 'information_technology'
        | 'insurance'
        | 'internet_e-commerce'
        | 'legal_documents_contracts'
        | 'literary_translations'
        | 'marketing_advertising_material_public_relations'
        | 'matematics_and_physics'
        | 'mechanical_manufacturing'
        | 'media_journalism_publishing'
        | 'medical_pharmaceutical'
        | 'music'
        | 'private_correspondence_letters'
        | 'religion'
        | 'science'
        | 'shipping_sailing_maritime'
        | 'social_science'
        | 'telecommunications'
        | 'travel_tourism';

    export interface ListTasksOptions extends PaginationOptions {
        status?: TasksModel.Status;
        assigneeId?: number;
        orderBy?: string;
    }

    export interface TaskSettingsTemplate {
        id: number;
        name: string;
        config: TaskSettingsTemplateConfig;
        createdAt: string;
        updatedAt: string;
    }

    export interface AddTaskSettingsTemplate {
        name: string;
        config: TaskSettingsTemplateConfig;
    }

    export interface TaskSettingsTemplateConfig {
        languages: { languageId?: string; userIds?: number[]; teamIds?: number[] }[];
    }
}
