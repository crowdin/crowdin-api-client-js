import { CrowdinApi, ResponseObject, DownloadLink, Status } from '../core';

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
        schema: CostEstimateSchema | TranslationCostSchema | TopMembersSchema;
    }

    export interface ReportStatusAttributes {
        organizationId: number;
        projectId: number;
        format: Format;
        reportName: string;
        schema: any;
    }

    export interface CostEstimateSchema {
        unit: Unit;
        currency: Currency;
        languageId: string;
        format: Format;
        stepTypes: Array<TranslateStep | ProofreadStep>;
    }

    export interface TranslationCostSchema {
        unit: Unit;
        currency: Currency;
        format: Format;
        groupBy: GroupBy;
        stepTypes: Array<TranslateStep | ProofreadStep>;
    }

    export interface TopMembersSchema {
        unit: Unit;
        languageId: string;
        format: Format;
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
    }

    export interface TranslateStep {
        type: string;
        mode: string;
        calculateInternalFuzzyMatches: boolean;
        regularRates: RegularRates[];
    }

    export interface ProofreadStep {
        type: string;
        mode: string;
        regularRates: RegularRates[];
    }

    export interface RegularRates {
        mode: Mode;
        value: number;
    }

    export enum Mode {
        NO_MATCH = 'no_match',
        TM_MATCH = 'tm_match',
    }

    export enum GroupBy {
        USER = 'user',
        LANGUAGE = 'language',
    }
}
