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
        request: Omit<ReportsModel.ReportSettings, 'id' | 'createdAt' | 'updatedAt'>,
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
}

export namespace ReportsModel {
    export interface ReportArchive {
        id: number;
        scopeType: number;
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

    export type GroupReportSchema = GroupTranslationCostsPostEditingSchema | GroupTopMembersSchema;

    export type OrganizationReportSchema = GroupTranslationCostsPostEditingSchema | GroupTopMembersSchema;

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

    export type ReportSchema =
        | CostEstimationPostEndingSchema
        | CostEstimationPostEndingSchemaByTask
        | TranslationCostsPostEndingSchema
        | TranslationCostsPostEndingSchemaByTask
        | TopMembersSchema
        | ContributionRawDataSchema;

    export interface GenerateReportRequest {
        name:
            | 'costs-estimation'
            | 'translation-costs'
            | 'top-members'
            | 'contribution-raw-data'
            | 'costs-estimation-pe'
            | 'translation-costs-pe';
        schema: ReportSchema;
    }

    export interface ReportStatusAttributes<S> {
        format: Format;
        reportName: string;
        projectIds?: number[];
        schema: S;
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
    }

    export interface TranslationCostsPostEndingSchema {
        unit?: Unit;
        currency?: Currency;
        format?: Format;
        baseRates: BaseRate;
        individualRates: IndividualRate[];
        netRateSchemes: NetRateSchemas;
        excludeApprovalsForEditedTranslations?: boolean;
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

    export interface ReportSettings {
        id: number;
        name: string;
        currency: Currency;
        unit: Unit;
        config: ReportSettinsConfig;
        isPublic: boolean;
        createdAt: string;
        updatedAt: string;
    }

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
        mtMatch?: {
            matchType: Mode;
            price: number;
        }[];
        suggestionMatch?: {
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
}
