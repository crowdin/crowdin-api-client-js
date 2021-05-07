import { CrowdinApi, DownloadLink, ResponseObject, Status } from '../core';

export class Reports extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param request request body
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
     */
    downloadReport(projectId: number, reportId: string): Promise<ResponseObject<DownloadLink>> {
        const url = `${this.url}/projects/${projectId}/reports/${reportId}/download`;
        return this.get(url, this.defaultConfig());
    }
}

export namespace ReportsModel {
    export interface GenerateReportRequest {
        name: string;
        schema:
            | CostEstimateSchema
            | CostEstimateFuzzyModeSchema
            | TranslationCostSchema
            | TopMembersSchema
            | ContributionRawDataSchema;
    }

    export interface ReportStatusAttributes {
        format: Format;
        reportName: string;
        schema: any;
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

    export enum Unit {
        STRINGS = 'strings',
        WORDS = 'words',
        CHARS = 'chars',
        CHARS_WITH_SPACES = 'chars_with_spaces',
    }

    export enum Currency {
        USD = 'USD',
        EUR = 'EUR',
        JPY = 'JPY',
        GBP = 'GBP',
        AUD = 'AUD',
        CAD = 'CAD',
        CHF = 'CHF',
        CNY = 'CNY',
        SEK = 'SEK',
        NZD = 'NZD',
        MXN = 'MXN',
        SGD = 'SGD',
        HKD = 'HKD',
        NOK = 'NOK',
        KRW = 'KRW',
        TRY = 'TRY',
        RUB = 'RUB',
        INR = 'INR',
        BRL = 'BRL',
        ZAR = 'ZAR',
        GEL = 'GEL',
        UAH = 'UAH',
    }

    export enum Format {
        XLSX = 'xlsx',
        CSV = 'csv',
        JSON = 'json',
    }

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

    export interface IndividualRate {
        languageIds: string[];
        rates: RegularRate[];
    }

    export enum Mode {
        NO_MATCH = 'no_match',
        TM_MATCH = 'tm_match',
        APPROVAL = 'approval',
    }

    export enum ContributionMode {
        TRANSLATIONS = 'translations',
        APPROVALS = 'approvals',
        VOTES = 'votes',
    }

    export enum GroupBy {
        USER = 'user',
        LANGUAGE = 'language',
    }
}
