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
     * @param groupId group identifier
     * @param request request body
     * @see https://support.crowdin.com/enterprise/api/#operation/api.groups.reports.post
     */
    generateGroupReport(
        groupId: number,
        request: ReportsModel.GenerateGroupReportRequest,
    ): Promise<ResponseObject<Status<ReportsModel.GroupReportStatusAttributes>>> {
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
    ): Promise<ResponseObject<Status<ReportsModel.GroupReportStatusAttributes>>> {
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
        request: ReportsModel.GenerateGroupReportRequest,
    ): Promise<ResponseObject<Status<ReportsModel.GroupReportStatusAttributes>>> {
        const url = `${this.url}/reports`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param reportId report identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.reports.get
     */
    checkOrganizationReportStatus(
        reportId: string,
    ): Promise<ResponseObject<Status<ReportsModel.GroupReportStatusAttributes>>> {
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
    ): Promise<ResponseObject<Status<ReportsModel.ReportStatusAttributes>>> {
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
    ): Promise<ResponseObject<Status<ReportsModel.ReportStatusAttributes>>> {
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
    export interface GenerateGroupReportRequest {
        name: string;
        schema: GroupTranslationCostSchema | GroupTopMembersSchema;
    }

    export interface GenerateReportRequest {
        name: 'costs-estimation' | 'translation-costs' | 'top-members' | 'contribution-raw-data';
        schema:
            | CostEstimateSchema
            | CostEstimateFuzzyModeSchema
            | TranslationCostSchema
            | TopMembersSchema
            | ContributionRawDataSchema;
    }

    export interface GroupReportStatusAttributes extends ReportStatusAttributes {
        projectIds: number[];
    }

    export interface ReportStatusAttributes {
        format: Format;
        reportName: string;
        schema:
            | CostEstimateSchema
            | CostEstimateFuzzyModeSchema
            | TranslationCostSchema
            | TopMembersSchema
            | ContributionRawDataSchema;
    }

    export interface GroupTranslationCostSchema {
        projectIds?: number[];
        unit?: Unit;
        currency?: Currency;
        format?: Format;
        groupBy?: GroupBy;
        dateFrom?: string;
        dateTo?: string;
    }

    export interface GroupTopMembersSchema {
        projectIds?: number[];
        unit?: Unit;
        languageId?: string;
        format?: Format;
        groupBy?: GroupBy;
        dateFrom?: string;
        dateTo?: string;
    }

    export interface CostEstimateSchema {
        unit?: Unit;
        currency?: Currency;
        mode?: string;
        languageId?: string;
        fileIds?: number[];
        format?: Format;
        regularRates?: RegularRate[];
        individualRates?: IndividualRate[];
        dateFrom?: string;
        dateTo?: string;
        stepTypes?: Array<TranslateStep | ProofreadStep>;
    }

    export interface CostEstimateFuzzyModeSchema extends CostEstimateSchema {
        calculateInternalFuzzyMatches?: boolean;
    }

    export interface TranslationCostSchema {
        unit?: Unit;
        currency?: Currency;
        mode?: string;
        languageId?: string;
        format?: Format;
        groupBy?: GroupBy;
        regularRates?: RegularRate[];
        individualRates?: IndividualRate[];
        dateFrom?: string;
        dateTo?: string;
        stepTypes?: Array<TranslateStep | ProofreadStep>;
    }

    export type TranslationCostFuzzyModeSchema = TranslationCostSchema;

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
        dateFrom?: string;
        dateTo?: string;
    }

    export interface ReportSettings {
        id: number;
        name: string;
        currency: Currency;
        unit: Unit;
        mode: 'fuzzy' | 'simple';
        config: ReportSettinsConfig;
        createdAt: string;
        updatedAt: string;
    }

    export interface ReportSettinsConfig {
        regularRates: RegularRate[];
        individualRates: UsersIndividualRate[];
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

    export interface TranslateStep {
        type: string;
        mode: string;
        regularRates: RegularRate[];
        individualRates: IndividualRate[];
    }

    export interface ProofreadStep {
        type: string;
        mode: string;
        regularRates: RegularRate[];
        individualRates: IndividualRate[];
    }

    export interface RegularRate {
        mode: Mode;
        value: number;
    }

    export interface UsersIndividualRate extends IndividualRate {
        userIds: number[];
    }

    export interface IndividualRate {
        languageIds: string[];
        rates: RegularRate[];
    }

    export type Mode = 'no_match' | 'tm_match' | 'approval' | '99-95' | '94-90' | '89-80' | 'perfect' | '100';

    export type ContributionMode = 'translations' | 'approvals' | 'votes';

    export type GroupBy = 'user' | 'language';
}
