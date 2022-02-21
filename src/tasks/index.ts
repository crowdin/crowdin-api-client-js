import {
    BooleanInt,
    CrowdinApi,
    DownloadLink,
    PaginationOptions,
    PatchRequest,
    ResponseList,
    ResponseObject,
} from '../core';

export class Tasks extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @param status list tasks with specified statuses. It can be one status or a list of comma-separated status values
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.tasks.getMany
     */
    listTasks(
        projectId: number,
        limit?: number,
        offset?: number,
        status?: TasksModel.Status,
    ): Promise<ResponseList<TasksModel.Task>>;
    /**
     * @param projectId project identifier
     * @param options optional parameters for the request
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.tasks.getMany
     */
    listTasks(projectId: number, options?: TasksModel.ListTasksOptions): Promise<ResponseList<TasksModel.Task>>;
    listTasks(
        projectId: number,
        options?: number | TasksModel.ListTasksOptions,
        deprecatedOffset?: number,
        deprecatedStatus?: TasksModel.Status,
    ): Promise<ResponseList<TasksModel.Task>> {
        if (typeof options === 'number' || typeof options === 'undefined') {
            options = { limit: options, offset: deprecatedOffset, status: deprecatedStatus };
            this.emitDeprecationWarning();
        }
        let url = `${this.url}/projects/${projectId}/tasks`;
        url = this.addQueryParam(url, 'status', options.status);
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.tasks.post
     */
    addTask(
        projectId: number,
        request:
            | TasksModel.CreateTaskEnterpriseRequest
            | TasksModel.CreateTaskRequest
            | TasksModel.CreateTaskVendorOhtRequest
            | TasksModel.CreateTaskVendorGengoRequest
            | TasksModel.CreateTaskVendorTranslatedRequest,
    ): Promise<ResponseObject<TasksModel.Task>> {
        const url = `${this.url}/projects/${projectId}/tasks`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param taskId task identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.tasks.exports.post
     */
    exportTaskStrings(projectId: number, taskId: number): Promise<ResponseObject<DownloadLink>> {
        const url = `${this.url}/projects/${projectId}/tasks/${taskId}/exports`;
        return this.post(url, {}, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param taskId task identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.tasks.get
     */
    getTask(projectId: number, taskId: number): Promise<ResponseObject<TasksModel.Task>> {
        const url = `${this.url}/projects/${projectId}/tasks/${taskId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param taskId task identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.tasks.delete
     */
    deleteTask(projectId: number, taskId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/tasks/${taskId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param taskId task identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.tasks.patch
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
     * @see https://support.crowdin.com/api/v2/#operation/api.user.tasks.getMany
     * @deprecated Optional parameters should be passed through an object
     */
    listUserTasks(
        limit?: number,
        offset?: number,
        status?: TasksModel.Status,
        isArchived?: BooleanInt,
    ): Promise<ResponseList<TasksModel.UserTask>>;
    /**
     * @param options optional parameters for the request
     * @see https://support.crowdin.com/api/v2/#operation/api.user.tasks.getMany
     */
    listUserTasks(options?: TasksModel.ListUserTasksRequest): Promise<ResponseList<TasksModel.UserTask>>;
    listUserTasks(
        options?: number | TasksModel.ListUserTasksRequest,
        deprecatedOffset?: number,
        deprecatedStatus?: TasksModel.Status,
        deprecatedIsArchived?: BooleanInt,
    ): Promise<ResponseList<TasksModel.UserTask>> {
        let url = `${this.url}/user/tasks`;
        if (typeof options === 'number' || typeof options === 'undefined') {
            options = {
                limit: options,
                offset: deprecatedOffset,
                status: deprecatedStatus,
                isArchived: deprecatedIsArchived,
            };
            this.emitDeprecationWarning();
        }
        url = this.addQueryParam(url, 'status', options.status);
        url = this.addQueryParam(url, 'isArchived', options.isArchived);
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param projectId project identifier
     * @param taskId task identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.user.tasks.patch
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
        vendor: string;
        status: Status;
        title: string;
        assignees: Assignee[];
        assignedTeams: AssignedTeam[];
        fileIds: number[];
        progress: Progress;
        translateProgress: Progress;
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
        buyUrl: string;
        createdAt: string;
        updatedAt: string;
    }

    export interface ListUserTasksRequest {
        limit?: number;
        offset?: number;
        status?: Status;
        isArchived?: BooleanInt;
    }

    export interface UserTask extends Task {
        isArchived: boolean;
    }

    export interface CreateTaskEnterpriseRequest {
        workflowStepId: number;
        title: string;
        languageId: string;
        fileIds: number[];
        status?: Status;
        description?: string;
        splitFiles?: boolean;
        skipAssignedStrings?: boolean;
        assignees?: CreateTaskAssignee[];
        deadline?: string;
        labelIds?: number[];
        dateFrom?: string;
        dateTo?: string;
    }

    export interface CreateTaskRequest {
        title: string;
        languageId: string;
        fileIds: number[];
        type: Type;
        status?: Status;
        description?: string;
        splitFiles?: boolean;
        skipAssignedStrings?: boolean;
        skipUntranslatedStrings?: boolean;
        labelIds?: number[];
        assignees?: CreateTaskAssignee[];
        deadline?: string;
        dateFrom?: string;
        dateTo?: string;
    }

    export interface CreateTaskVendorOhtRequest {
        title: string;
        languageId: string;
        fileIds: number[];
        type: Type;
        vendor: string;
        status?: Status;
        description?: string;
        expertise?: Expertise;
        labelIds?: number[];
        includeUntranslatedStringsOnly?: boolean;
        dateFrom?: string;
        dateTo?: string;
    }

    export interface CreateTaskVendorGengoRequest {
        title: string;
        languageId: string;
        fileIds: number[];
        type: Type;
        vendor: string;
        status?: Status;
        description?: string;
        expertise?: Expertise;
        tone?: Tone;
        purpose?: Purpose;
        customerMessage?: string;
        usePreferred?: boolean;
        editService?: boolean;
        labelIds?: number[];
        dateFrom?: string;
        dateTo?: string;
    }

    export interface CreateTaskVendorTranslatedRequest {
        title: string;
        languageId: string;
        fileIds: number[];
        type: Type;
        vendor: string;
        status?: Status;
        description?: string;
        expertise?: Expertise;
        subject?: Subject;
        labelIds?: number[];
        dateFrom?: string;
        dateTo?: string;
    }

    export interface CreateTaskAssignee {
        id: number;
        wordsCount?: number;
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
        TRANSLATE_BY_VENDOR = 2,
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

    export enum Expertise {
        STANDARD = 'standard',
        MOBILE_APPLICATIONS = 'mobile-applications',
        SOFTWARE_IT = 'software-it',
        GAMING_VIDEO_GAMES = 'gaming-video-games',
        TECHNICAL_ENGINEERING = 'technical-engineering',
        MARKETING_CONSUMER_MEDIA = 'marketing-consumer-media',
        BUSINESS_FINANCE = 'business-finance',
        LEGAL_CERTIFICATE = 'legal-certificate',
        CV = 'cv',
        MEDICAL = 'medical',
        PATENTS = 'patents',
        AD_WORDS_BANNERS = 'ad-words-banners',
        AUTOMOTIVE_AEROSPACE = 'automotive-aerospace',
        SCIENTIFIC = 'scientific',
        SCIENTIFIC_ACADEMIC = 'scientific-academic',
        TOURISM = 'tourism',
        CERTIFICATES_TRANSLATION = 'certificates-translation',
        TRAINING_EMPLOYEE_HANDBOOKS = 'training-employee-handbooks',
        FOREX_CRYPTO = 'forex-crypto',
    }

    export enum Tone {
        EPTY = '',
        INFORMAL = 'Informal',
        FRIENDLY = 'Friendly',
        BUSINESS = 'Business',
        FORMAL = 'Formal',
        OTHER = 'other',
    }

    export enum Purpose {
        STANDARD = 'standard',
        PERSONAL_USE = 'Personal use',
        ONLINE_CONTENT = 'Online content',
        APP_WEB_LOCALIZATION = 'App/Web localization',
        MEDIA_CONTENT = 'Media content',
        SEMI_TECHNICAL = 'Semi-technical',
        OTHER = 'other',
    }

    export enum Subject {
        GENERAL = 'general',
        ACCOUNTING_FINANCE = 'accounting_finance',
        AEROSPACE_DEFENCE = 'aerospace_defence',
        ARCHITECTURE = 'architecture',
        ART = 'art',
        AUTOMOTIVE = 'automotive',
        CERTIFICATES_DIPLOMAS_LICENCES_CV_ETC = 'certificates_diplomas_licences_cv_etc',
        CHEMICAL = 'chemical',
        CIVIL_ENGINEERING_CONSTRUCTION = 'civil_engineering_construction',
        CORPORATE_SOCIAL_RESPONSIBILITY = 'corporate_social_responsibility',
        COSMETICS = 'cosmetics',
        CULINARY = 'culinary',
        ELECTRONICS_ELECTRICAL_ENGINEERING = 'electronics_electrical_engineering',
        ENERGY_POWER_GENERATION_OIL_GAS = 'energy_power_generation_oil_gas',
        ENVIRONMENT = 'environment',
        FASHION = 'fashion',
        GAMES_VISEOGAMES_CASINO = 'games_viseogames_casino',
        GENERAL_BUSINESS_COMMERCE = 'general_business_commerce',
        HISTORY_ARCHAEOLOGY = 'history_archaeology',
        INFORMATION_TECHNOLOGY = 'information_technology',
        INSURANCE = 'insurance',
        INTERNET_E_COMMERCE = 'internet_e-commerce',
        LEGAL_DOCUMENTS_CONTRACTS = 'legal_documents_contracts',
        LITERARY_TRANSLATIONS = 'literary_translations',
        MARKETING_ADVERTISING_MATERIAL_PUBLIC_RELATIONS = 'marketing_advertising_material_public_relations',
        MATEMATICS_AND_PHYSICS = 'matematics_and_physics',
        MECHANICAL_MANUFACTURING = 'mechanical_manufacturing',
        MEDIA_JOURNALISM_PUBLISHING = 'media_journalism_publishing',
        MEDICAL_PHARMACEUTICAL = 'medical_pharmaceutical',
        MUSIC = 'music',
        PRIVATE_CORRESPONDENCE_LETTERS = 'private_correspondence_letters',
        RELIGION = 'religion',
        SCIENCE = 'science',
        SHIPPING_SAILING_MARITIME = 'shipping_sailing_maritime',
        SOCIAL_SCIENCE = 'social_science',
        TELECOMMUNICATIONS = 'telecommunications',
        TRAVEL_TOURISM = 'travel_tourism',
    }

    export interface ListTasksOptions extends PaginationOptions {
        status?: TasksModel.Status;
    }
}
