import {
    CrowdinApi,
    DownloadLink,
    PaginationOptions,
    PatchRequest,
    ResponseList,
    ResponseObject,
    Status,
} from '../core';

/**
 * Reports help to estimate costs, calculate translation costs, and identify the top members.
 *
 * Use API to generate Cost Estimate, Translation Cost, and Top Members reports.
 * You can then export reports in .xlsx or .csv file formats.
 * Report generation is an asynchronous operation and shall be completed with a sequence of API methods.
 */
export class Reports extends CrowdinApi {
    /**
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.reports.archives.getMany
     */
    listOrganizationReportArchives(
        options?: ReportsModel.ListReportArchiveParams,
    ): Promise<ResponseList<ReportsModel.ReportArchive>> {
        let url = `${this.url}/reports/archives`;
        url = this.addQueryParam(url, 'scopeId', options?.scopeId);
        url = this.addQueryParam(url, 'scopeType', options?.scopeType);
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param archiveId archive identifier
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.reports.archives.get
     */
    getOrganizationReportArchive(archiveId: number): Promise<ResponseObject<ReportsModel.ReportArchive>> {
        const url = `${this.url}/reports/archives/${archiveId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param archiveId archive identifier
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.reports.archives.delete
     */
    deleteOrganizationReportArchive(archiveId: number): Promise<void> {
        const url = `${this.url}/reports/archives/${archiveId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param archiveId archive identifier
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.reports.archives.exports.post
     */
    exportOrganizationReportArchive(
        archiveId: number,
        request: { format?: ReportsModel.Format } = {},
    ): Promise<ResponseObject<Status<ReportsModel.ReportArchiveStatusAttribute>>> {
        const url = `${this.url}/reports/archives/${archiveId}/exports`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param archiveId archive identifier
     * @param exportId export identifier
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.reports.archives.exports.get
     */
    checkOrganizationReportArchiveStatus(
        archiveId: number,
        exportId: string,
    ): Promise<ResponseObject<Status<ReportsModel.ReportArchiveStatusAttribute>>> {
        const url = `${this.url}/reports/archives/${archiveId}/exports/${exportId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param archiveId archive identifier
     * @param exportId export identifier
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.reports.archives.exports.download.get
     */
    downloadOrganizationReportArchive(archiveId: number, exportId: string): Promise<ResponseObject<DownloadLink>> {
        const url = `${this.url}/reports/archives/${archiveId}/exports/${exportId}/download`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.reports.archives.getMany
     */
    listUserReportArchives(
        userId: number,
        options?: ReportsModel.ListReportArchiveParams,
    ): Promise<ResponseList<ReportsModel.ReportArchive>> {
        let url = `${this.url}/users/${userId}/reports/archives`;
        url = this.addQueryParam(url, 'scopeId', options?.scopeId);
        url = this.addQueryParam(url, 'scopeType', options?.scopeType);
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param userId user identifier
     * @param archiveId archive identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.users.reports.archives.get
     */
    getUserReportArchive(userId: number, archiveId: number): Promise<ResponseObject<ReportsModel.ReportArchive>> {
        const url = `${this.url}/users/${userId}/reports/archives/${archiveId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param archiveId archive identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.users.reports.archives.delete
     */
    deleteUserReportArchive(userId: number, archiveId: number): Promise<void> {
        const url = `${this.url}/users/${userId}/reports/archives/${archiveId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param archiveId archive identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.reports.archives.exports.post
     */
    exportUserReportArchive(
        userId: number,
        archiveId: number,
        request: { format?: ReportsModel.Format } = {},
    ): Promise<ResponseObject<Status<ReportsModel.ReportArchiveStatusAttribute>>> {
        const url = `${this.url}/users/${userId}/reports/archives/${archiveId}/exports`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param archiveId archive identifier
     * @param exportId export identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.users.reports.archives.exports.get
     */
    checkUserReportArchiveStatus(
        userId: number,
        archiveId: number,
        exportId: string,
    ): Promise<ResponseObject<Status<ReportsModel.ReportArchiveStatusAttribute>>> {
        const url = `${this.url}/users/${userId}/reports/archives/${archiveId}/exports/${exportId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param archiveId archive identifier
     * @param exportId export identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.users.reports.archives.exports.download.get
     */
    downloadUserReportArchive(
        userId: number,
        archiveId: number,
        exportId: string,
    ): Promise<ResponseObject<DownloadLink>> {
        const url = `${this.url}/users/${userId}/reports/archives/${archiveId}/exports/${exportId}/download`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param groupId group identifier
     * @param request request body
     * @see https://support.crowdin.com/enterprise/api/#operation/api.groups.reports.post
     */
    generateGroupReport(
        groupId: number,
        request: ReportsModel.GenerateGroupReportRequest,
    ): Promise<ResponseObject<Status<ReportsModel.ReportStatusAttributes<ReportsModel.GroupReportSchema>>>> {
        const url = `${this.url}/groups/${groupId}/reports`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param groupId group identifier
     * @param reportId report identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.groups.reports.get
     */
    checkGroupReportStatus(
        groupId: number,
        reportId: string,
    ): Promise<ResponseObject<Status<ReportsModel.ReportStatusAttributes<ReportsModel.GroupReportSchema>>>> {
        const url = `${this.url}/groups/${groupId}/reports/${reportId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param groupId group identifier
     * @param reportId report identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.groups.reports.download.download
     */
    downloadGroupReport(groupId: number, reportId: string): Promise<ResponseObject<DownloadLink>> {
        const url = `${this.url}/groups/${groupId}/reports/${reportId}/download`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param options optional parameters for the request
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/Reports/operation/api.reports.settings-templates.getMany
     */
    listOrganizationReportSettingsTemplates(
        options?: ReportsModel.ListOrganizationReportSettingsParams,
    ): Promise<ResponseList<ReportsModel.OrganizationReportSettings>> {
        let url = `${this.url}/reports/settings-templates`;
        url = this.addQueryParam(url, 'projectId', options?.projectId);
        url = this.addQueryParam(url, 'groupId', options?.groupId);
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param request request body
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/Reports/operation/api.reports.settings-templates.post
     */
    addOrganizationReportSettingsTemplate(
        request: ReportsModel.AddOrganizationReportSettingsRequest,
    ): Promise<ResponseObject<ReportsModel.OrganizationReportSettings>> {
        const url = `${this.url}/reports/settings-templates`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param reportSettingsTemplateId report settings template identifier
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/Reports/operation/api.reports.settings-templates.get
     */
    getOrganizationReportSettingsTemplate(
        reportSettingsTemplateId: number,
    ): Promise<ResponseObject<ReportsModel.OrganizationReportSettings>> {
        const url = `${this.url}/reports/settings-templates/${reportSettingsTemplateId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param reportSettingsTemplateId report settings template identifier
     * @param request request body
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/Reports/operation/api.reports.settings-templates.patch
     */
    editOrganizationReportSettingsTemplate(
        reportSettingsTemplateId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<ReportsModel.OrganizationReportSettings>> {
        const url = `${this.url}/reports/settings-templates/${reportSettingsTemplateId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param reportSettingsTemplateId report settings template identifier
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/Reports/operation/api.reports.settings-templates.delete
     */
    deleteOrganizationReportSettingsTemplate(reportSettingsTemplateId: number): Promise<void> {
        const url = `${this.url}/reports/settings-templates/${reportSettingsTemplateId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param request request body
     * @see https://support.crowdin.com/enterprise/api/#operation/api.reports.post
     */
    generateOrganizationReport(
        request: ReportsModel.GenerateOrganizationReportRequest,
    ): Promise<ResponseObject<Status<ReportsModel.ReportStatusAttributes<ReportsModel.OrganizationReportSchema>>>> {
        const url = `${this.url}/reports`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param reportId report identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.reports.get
     */
    checkOrganizationReportStatus(
        reportId: string,
    ): Promise<ResponseObject<Status<ReportsModel.ReportStatusAttributes<ReportsModel.OrganizationReportSchema>>>> {
        const url = `${this.url}/reports/${reportId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param reportId report identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.reports.download.download
     */
    downloadOrganizationReport(reportId: string): Promise<ResponseObject<DownloadLink>> {
        const url = `${this.url}/reports/${reportId}/download`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.reports.post
     */
    generateReport(
        projectId: number,
        request: ReportsModel.GenerateReportRequest,
    ): Promise<ResponseObject<Status<ReportsModel.ReportStatusAttributes<ReportsModel.ReportSchema>>>> {
        const url = `${this.url}/projects/${projectId}/reports`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param reportId report identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.reports.get
     */
    checkReportStatus(
        projectId: number,
        reportId: string,
    ): Promise<ResponseObject<Status<ReportsModel.ReportStatusAttributes<ReportsModel.ReportSchema>>>> {
        const url = `${this.url}/projects/${projectId}/reports/${reportId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param reportId report identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.reports.download.download
     */
    downloadReport(projectId: number, reportId: string): Promise<ResponseObject<DownloadLink>> {
        const url = `${this.url}/projects/${projectId}/reports/${reportId}/download`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.reports.settings-templates.getMany
     */
    listReportSettingsTemplates(
        projectId: number,
        options?: PaginationOptions,
    ): Promise<ResponseList<ReportsModel.ReportSettings>> {
        const url = `${this.url}/projects/${projectId}/reports/settings-templates`;
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.reports.settings-templates.post
     */
    addReportSettingsTemplate(
        projectId: number,
        request: ReportsModel.AddReportSettingsRequest,
    ): Promise<ResponseObject<ReportsModel.ReportSettings>> {
        const url = `${this.url}/projects/${projectId}/reports/settings-templates`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param reportSettingsTemplateId report settings template identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.reports.settings-templates.get
     */
    getReportSettingsTemplate(
        projectId: number,
        reportSettingsTemplateId: number,
    ): Promise<ResponseObject<ReportsModel.ReportSettings>> {
        const url = `${this.url}/projects/${projectId}/reports/settings-templates/${reportSettingsTemplateId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param reportSettingsTemplateId report settings template identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.reports.settings-templates.patch
     */
    editReportSettingsTemplate(
        projectId: number,
        reportSettingsTemplateId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<ReportsModel.ReportSettings>> {
        const url = `${this.url}/projects/${projectId}/reports/settings-templates/${reportSettingsTemplateId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param reportSettingsTemplateId report settings template identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.settings-templates.delete
     */
    deleteReportSettingsTemplate(projectId: number, reportSettingsTemplateId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/reports/settings-templates/${reportSettingsTemplateId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param options optional parameters for the request
     * @see https://support.crowdin.com/developer/api/v2/#tag/Reports/operation/api.users.reports.settings-templates.getMany
     */
    listUserReportSettingsTemplates(
        userId: number,
        options?: PaginationOptions,
    ): Promise<ResponseList<ReportsModel.UserReportSettings>> {
        const url = `${this.url}/users/${userId}/reports/settings-templates`;
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param userId user identifier
     * @param request request body
     * @see https://support.crowdin.com/developer/api/v2/#tag/Reports/operation/api.users.reports.settings-templates.post
     */
    addUserReportSettingsTemplate(
        userId: number,
        request: ReportsModel.AddUserReportSettingsRequest,
    ): Promise<ResponseObject<ReportsModel.UserReportSettings>> {
        const url = `${this.url}/users/${userId}/reports/settings-templates`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param reportSettingsTemplateId report settings template identifier
     * @see https://support.crowdin.com/developer/api/v2/#tag/Reports/operation/api.users.reports.settings-templates.get
     */
    getUserReportSettingsTemplate(
        userId: number,
        reportSettingsTemplateId: number,
    ): Promise<ResponseObject<ReportsModel.UserReportSettings>> {
        const url = `${this.url}/users/${userId}/reports/settings-templates/${reportSettingsTemplateId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param reportSettingsTemplateId report settings template identifier
     * @param request request body
     * @see https://support.crowdin.com/developer/api/v2/#tag/Reports/operation/api.users.reports.settings-templates.patch
     */
    editUserReportSettingsTemplate(
        userId: number,
        reportSettingsTemplateId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<ReportsModel.UserReportSettings>> {
        const url = `${this.url}/users/${userId}/reports/settings-templates/${reportSettingsTemplateId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param reportSettingsTemplateId report settings template identifier
     * @see https://support.crowdin.com/developer/api/v2/#tag/Reports/operation/api.users.reports.settings-templates.delete
     */
    deleteUserReportSettingsTemplate(userId: number, reportSettingsTemplateId: number): Promise<void> {
        const url = `${this.url}/users/${userId}/reports/settings-templates/${reportSettingsTemplateId}`;
        return this.delete(url, this.defaultConfig());
    }
}

export namespace ReportsModel {
    export interface ReportArchive {
        id: number;
        scopeType: string;
        scopeId: number;
        userId: number;
        name: string;
        webUrl: string;
        scheme: any;
        createdAt: string;
    }

    export interface ListReportArchiveParams extends PaginationOptions {
        scopeType: string;
        scopeId: number;
    }

    export interface ReportArchiveStatusAttribute {
        format: Format;
        reportName: string;
        schema: any;
    }

    export type GroupReportSchema =
        | GroupTranslationCostsPostEditingSchema
        | GroupTopMembersSchema
        | GroupTaskUsageSchema
        | GroupQaCheckIssuesSchema
        | GroupTranslationActivitySchema;

    export type OrganizationReportSchema =
        | GroupTranslationCostsPostEditingSchema
        | GroupTopMembersSchema
        | GroupTaskUsageSchema
        | GroupQaCheckIssuesSchema
        | GroupTranslationActivitySchema;

    export interface GenerateGroupReportRequest {
        name: string;
        schema: GroupReportSchema;
    }

    export interface GenerateOrganizationReportRequest {
        name: string;
        schema: OrganizationReportSchema;
    }

    export interface GroupTranslationCostsPostEditingSchema {
        projectIds?: number[];
        unit?: Unit;
        currency?: Currency;
        format?: Format;
        baseRates: BaseRate;
        individualRates: IndividualRate[];
        netRateSchemes: NetRateSchemas;
        excludeApprovalsForEditedTranslations?: boolean;
        preTranslatedStringsCategorizationAdjustment?: boolean;
        groupBy?: GroupBy;
        dateFrom?: string;
        dateTo?: string;
        userIds?: number[];
    }

    export interface GroupTranslationCostsPerEditingByTaskSchema {
        unit?: Unit;
        currency?: Currency;
        format?: Format;
        baseRates: BaseRate;
        individualRates: IndividualRate[];
        netRateSchemes: NetRateSchemas;
        taskId?: number;
    }

    export interface CostsEstimationSchema {
        projectIds?: number[];
        unit?: Unit;
        currency?: Currency;
        format?: Format;
        baseRates: BaseRate;
        individualRates: IndividualRate[];
        netRateSchemes: NetRateSchemas;
        calculateInternalMatches?: boolean;
        includePreTranslatedStrings?: boolean;
        languageId?: string;
        branchIds?: number[];
        dateFrom?: string;
        dateTo?: string;
        labelIds?: number[];
        labelIncludeType?: LabelIncludeType;
    }

    export interface CostsEstimationByTaskSchema {
        unit?: Unit;
        currency?: Currency;
        format?: Format;
        baseRates?: BaseRate;
        individualRates?: IndividualRate[];
        netRateSchemes?: NetRateSchemas;
        calculateInternalMatches?: boolean;
        includePreTranslatedStrings?: boolean;
        taskId?: number;
    }

    export interface GroupTopMembersSchema {
        projectIds?: number[];
        unit?: Unit;
        languageId?: string;
        format?: Format;
        dateFrom?: string;
        dateTo?: string;
    }

    export interface RawDataSchema {
        mode: ContributionMode;
        unit?: Unit;
        languageId?: string;
        userId?: number;
        dateFrom?: string;
        dateTo?: string;
    }

    export type GenerateReportRequest =
        | PreTranslateAccuracy
        | TranslateAccuracy
        | CostEstimationPostEnding
        | TranslationCostsPostEnding
        | TopMembers
        | ContributionRawData
        | SourceContentUpdates
        | ProjectMembers
        | EditorIssues
        | QaCheckIssues
        | SavingActivity
        | TranslationActivity;

    export type ReportSchema = Pick<GenerateReportRequest, 'schema'>;

    export interface PreTranslateAccuracy {
        name: 'pre-translate-efficiency' | 'pre-translate-accuracy';
        schema: PreTranslateAccuracySchema | PreTranslateAccuracySchemaByTask;
    }

    export interface TranslateAccuracy {
        name: 'translator-accuracy';
        schema: TranslateAccuracySchema;
    }

    export interface CostEstimationPostEnding {
        name: 'costs-estimation-pe';
        schema: CostEstimationPostEndingSchema | CostEstimationPostEndingSchemaByTask;
    }

    export interface TranslationCostsPostEnding {
        name: 'translation-costs-pe';
        schema: TranslationCostsPostEndingSchema | TranslationCostsPostEndingSchemaByTask;
    }

    export interface TopMembers {
        name: 'top-members';
        schema: TopMembersSchema;
    }

    export interface ContributionRawData {
        name: 'contribution-raw-data';
        schema: ContributionRawDataSchema | ContributionRawDataSchemaByTask;
    }

    export interface SourceContentUpdates {
        name: 'source-content-updates';
        schema: SourceContentUpdatesSchema;
    }

    export interface ProjectMembers {
        name: 'project-members';
        schema: MembersSchema;
    }

    export interface EditorIssues {
        name: 'editor-issues';
        schema: EditorIssuesSchema;
    }

    export interface QaCheckIssues {
        name: 'qa-check-issues';
        schema: ProjectQaCheckIssuesSchema;
    }

    export interface SavingActivity {
        name: 'saving-activity';
        schema: SavingActivitySchema;
    }

    export interface TranslationActivity {
        name: 'translation-activity';
        schema: ProjectConsumptionSchema;
    }

    export interface ReportStatusAttributes<S> {
        format: Format;
        reportName: string;
        schema: S;
    }

    export interface PreTranslateAccuracySchema {
        unit?: Unit;
        format?: Format;
        postEditingCategories?: string[];
        languageId?: string;
        dateFrom?: string;
        dateTo?: string;
    }

    export interface PreTranslateAccuracySchemaByTask {
        unit?: Unit;
        format?: Format;
        postEditingCategories?: string[];
        taskId?: number;
    }

    export interface TranslateAccuracySchema {
        unit?: Unit;
        format?: Format;
        postEditingCategories?: string[];
        languageId?: string;
        userIds?: number[];
        dateFrom?: string;
        dateTo?: string;
    }

    export interface CostEstimationPostEndingSchema {
        unit?: Unit;
        currency?: Currency;
        format?: Format;
        baseRates: BaseRate;
        individualRates: IndividualRate[];
        netRateSchemes: Omit<NetRateSchemas, 'mtMatch' | 'suggestionMatch'>;
        calculateInternalMatches?: boolean;
        includePreTranslatedStrings?: boolean;
        languageId?: string;
        fileIds?: number[];
        directoryIds?: number[];
        branchIds?: number[];
        dateFrom?: string;
        dateTo?: string;
        labelIds?: number[];
        labelIncludeType?: LabelIncludeType;
        workflowStepId?: number;
    }

    export interface CostEstimationPostEndingSchemaByTask {
        unit?: Unit;
        currency?: Currency;
        format?: Format;
        baseRates?: BaseRate;
        individualRates?: IndividualRate[];
        netRateSchemes?: Omit<NetRateSchemas, 'mtMatch' | 'suggestionMatch'>;
        calculateInternalMatches?: boolean;
        includePreTranslatedStrings?: boolean;
        taskId?: number;
    }

    export interface TranslationCostsPostEndingSchemaByTask {
        unit?: Unit;
        currency?: Currency;
        format?: Format;
        baseRates: BaseRate;
        individualRates: IndividualRate[];
        netRateSchemes: NetRateSchemas;
        taskId?: number;
        excludeApprovalsForEditedTranslations?: boolean;
        preTranslatedStringsCategorizationAdjustment?: boolean;
    }

    export interface TranslationCostsPostEndingSchema {
        unit?: Unit;
        currency?: Currency;
        format?: Format;
        baseRates: BaseRate;
        individualRates: IndividualRate[];
        netRateSchemes: NetRateSchemas;
        excludeApprovalsForEditedTranslations?: boolean;
        preTranslatedStringsCategorizationAdjustment?: boolean;
        groupBy?: GroupBy;
        dateFrom?: string;
        dateTo?: string;
        languageId?: string;
        userIds?: number[];
        fileIds?: number[];
        directoryIds?: number[];
        branchIds?: number[];
        labelIds?: number;
        labelIncludeType?: LabelIncludeType;
        workflowStepId?: number;
    }

    export interface TopMembersSchema {
        unit?: Unit;
        languageId?: string;
        format?: Format;
        dateFrom?: string;
        dateTo?: string;
    }

    export interface ContributionRawDataSchema {
        mode: ContributionMode;
        unit?: Unit;
        languageId?: string;
        userId?: string;
        columns?: Column[];
        fileIds?: number[];
        directoryIds?: number[];
        branchIds?: number[];
        tmIds?: number[];
        mtIds?: number[];
        aiPromptIds?: number[];
        dateFrom?: string;
        dateTo?: string;
    }

    export interface ContributionRawDataSchemaByTask {
        mode: ContributionMode;
        unit?: Unit;
        taskId: number;
        columns?: Column[];
        tmIds?: number[];
        mtIds?: number[];
        aiPromptIds?: number[];
        dateFrom?: string;
        dateTo?: string;
    }

    export interface PreTranslateEfficiencySchema {
        unit?: Unit;
        format?: Format;
        postEditingCategories?: string[];
        languageId?: string;
        dateFrom?: string;
        dateTo?: string;
    }

    export interface ListOrganizationReportSettingsParams extends PaginationOptions {
        projectId?: number;
        groupId?: number;
    }

    export interface ReportSettings {
        id: number;
        name: string;
        currency: Currency;
        unit: Unit;
        config: ReportSettinsConfig;
        isPublic: boolean;
        isGlobal: boolean;
        createdAt: string;
        updatedAt: string;
    }

    export interface AddReportSettingsRequest {
        name: string;
        currency: Currency;
        unit: Unit;
        config: ReportSettinsConfig;
        isPublic?: boolean;
        isGlobal?: boolean;
    }

    export type UserReportSettings = Omit<ReportSettings, 'isPublic' | 'isGlobal'>;
    export type AddUserReportSettingsRequest = Omit<AddReportSettingsRequest, 'isPublic' | 'isGlobal'>;

    export type OrganizationReportSettings = Omit<ReportSettings, 'isGlobal'> & {
        projectId: number;
        groupId: number;
    };
    export type AddOrganizationReportSettingsRequest = Omit<AddReportSettingsRequest, 'isGlobal'> & {
        projectId?: number;
        groupId?: number;
    };

    export interface ReportSettinsConfig {
        baseRates: BaseRate;
        netRateSchemes: NetRateSchemas[];
        individualRates: IndividualRate[];
    }

    export type Unit = 'strings' | 'words' | 'chars' | 'chars_with_spaces';

    export type Currency =
        | 'USD'
        | 'EUR'
        | 'JPY'
        | 'GBP'
        | 'AUD'
        | 'CAD'
        | 'CHF'
        | 'CNY'
        | 'SEK'
        | 'NZD'
        | 'MXN'
        | 'SGD'
        | 'HKD'
        | 'NOK'
        | 'KRW'
        | 'TRY'
        | 'RUB'
        | 'INR'
        | 'BRL'
        | 'ZAR'
        | 'GEL'
        | 'UAH';

    export type Format = 'xlsx' | 'csv' | 'json';

    export interface BaseRate {
        fullTranslation: number;
        proofread: number;
    }

    export interface IndividualRate extends BaseRate {
        languageIds: string[];
        userIds: number[];
        fullTranslation: number;
        proofread: number;
    }

    export interface NetRateSchemas {
        tmMatch: {
            matchType: Mode;
            price: number;
        }[];
        mtMatch: {
            matchType: Mode;
            price: number;
        }[];
        suggestionMatch: {
            matchType: Mode;
            price: number;
        }[];
        aiMatch?: {
            matchType: Mode;
            price: number;
        }[];
    }

    export type Mode = 'no_match' | 'tm_match' | 'approval' | '99-95' | '94-90' | '89-80' | 'perfect' | '100';

    export type ContributionMode = 'translations' | 'approvals' | 'votes';

    export type GroupBy = 'user' | 'language';

    export type LabelIncludeType = 'strings_with_label' | 'strings_without_label';

    export type Column =
        | 'userId'
        | 'languageId'
        | 'stringId'
        | 'translationId'
        | 'fileId'
        | 'filePath'
        | 'pluralForm'
        | 'sourceStringTextHash'
        | 'mtEngine'
        | 'mtId'
        | 'tmName'
        | 'tmId'
        | 'aiPromptName'
        | 'aiPromptId'
        | 'preTranslated'
        | 'tmMatch'
        | 'mtMatch'
        | 'aiMatch'
        | 'suggestionMatch'
        | 'sourceUnits'
        | 'targetUnits'
        | 'createdAt'
        | 'updatedAt'
        | 'mark';

    export interface SourceContentUpdatesSchema {
        unit?: Unit;
        format?: Format;
        dateFrom?: string;
        dateTo?: string;
        languageId?: string;
        userIds?: number[];
        fileIds?: number[];
        directoryIds?: number[];
        branchIds?: number[];
        labelIds?: number[];
        labelIncludeType?: LabelIncludeType;
    }

    export interface MembersSchema {
        format?: Format;
        dateFrom?: string;
        dateTo?: string;
    }

    export interface EditorIssuesSchema {
        dateFrom?: string;
        dateTo?: string;
        format?: Format;
        languageId?: string;
        userId?: number;
    }

    export interface ProjectQaCheckIssuesSchema {
        format?: Format;
        dateFrom?: string;
        dateTo?: string;
        languageId?: string;
    }

    export interface SavingActivitySchema {
        unit?: Unit;
        languageId?: string;
        format?: Format;
        dateFrom?: string;
        dateTo?: string;
        userIds?: number[];
        fileIds?: number[];
        directoryIds?: number[];
        branchIds?: number[];
        labelIds?: number[];
        labelIncludeType?: LabelIncludeType;
    }

    export interface ProjectConsumptionSchema {
        unit?: Unit;
        languageId?: string;
        format?: Format;
        dateFrom?: string;
        dateTo?: string;
        userIds?: number[];
        fileIds?: number[];
        directoryIds?: number[];
        branchIds?: number[];
        labelIds?: number[];
        labelIncludeType?: LabelIncludeType;
    }

    export interface GroupTaskUsageSchema {
        format: Format;
        type: 'workload' | 'create-vs-resolve' | 'performance' | 'time' | 'cost';
        projectIds?: number[];
        assigneeId?: number;
        creatorId?: number;
        dateFrom?: string;
        dateTo?: string;
        wordsCountFrom?: number;
        wordsCountTo?: number;
        excludeApprovalsForEditedTranslations?: boolean;
        currency?: Currency;
        baseRates?: BaseRate;
        individualRates?: IndividualRate[];
        netRateSchemes?: NetRateSchemas;
    }

    export interface GroupQaCheckIssuesSchema {
        projectIds?: number[];
        format?: Format;
        dateFrom?: string;
        dateTo?: string;
        languageId?: string;
    }

    export interface GroupTranslationActivitySchema {
        projectIds?: number[];
        unit?: Unit;
        languageId?: string;
        format?: Format;
        dateFrom?: string;
        dateTo?: string;
        userIds?: number[];
        fileIds?: number[];
        directoryIds?: number[];
        branchIds?: number[];
        labelIds?: number[];
        labelIncludeType?: LabelIncludeType;
    }
}
