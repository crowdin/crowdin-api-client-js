import { CrowdinApi, ResponseObject, ResponseList, DownloadLink } from '../core';

export class Reports extends CrowdinApi {

        /**
         * @param projectId project identifier
         * @param limit maximum number of items to retrieve (default 25)
         * @param offset starting offset in the collection (default 0)
         */
        listSupportedReports(projectId: number, limit?: number, offset?: number): Promise<ResponseList<ReportsModel.SupportedReport>> {
            let url = `${this.url}/projects/${projectId}/supported-reports`;
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            return this.get(url, this.defaultConfig());
        }

        /**
         * @param projectId project identifier
         * @param request request body
         */
        generateReport(projectId: number, request: ReportsModel.GenerateReportRequest): Promise<ResponseObject<ReportsModel.Report>> {
            let url = `${this.url}/projects/${projectId}/reports`;
            return this.post(url, request, this.defaultConfig());
        }

        /**
         * @param projectId project identifier
         * @param reportId report identifier
         */
        exportProjectReportRaw(projectId: number, reportId: string): Promise<ResponseObject<DownloadLink>> {
            let url = `${this.url}/projects/${projectId}/reports/${reportId}/download`;
            return this.get(url, this.defaultConfig());
        }
    }

    export namespace ReportsModel {
        export interface SupportedReport {
            name: string;
            schema: Schema[];
        }

        export interface GenerateReportRequest {
            name: string;
            schema: Schema;
        }

        export interface Report {
            name: string;
            reportId: string;
            report: any;
        }

        export interface Schema {
            name: string;
            type: string;
            description: string;
        }
    }