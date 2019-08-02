import { CrowdinApi, ResponseObject, ResponseList, DownloadLink } from '../core';

export namespace Reports {

    export class Api extends CrowdinApi {

        /**
         * @param projectId project identifier
         * @param limit maximum number of items to retrieve (default 25)
         * @param offset starting offset in the collection (default 0)
         */
        listSupportedReports(projectId: number, limit?: number, offset?: number): Promise<ResponseList<Model.SupportedReport>> {
            let url = `${this.url}/projects/${projectId}/supported-reports?account-key=${this.accountKey}&login=${this.login}`;
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            return this.axios.get(url);
        }

        /**
         * @param projectId project identifier
         * @param request request body
         */
        generateReport(projectId: number, request: Model.GenerateReportRequest): Promise<ResponseObject<Model.Report>> {
            let url = `${this.url}/projects/${projectId}/reports?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.post(url, request);
        }

        /**
         * @param projectId project identifier
         * @param reportId report identifier
         */
        exportProjectReportRaw(projectId: number, reportId: string): Promise<ResponseObject<DownloadLink>> {
            let url = `${this.url}/projects/${projectId}/reports/${reportId}/download?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }
    }

    export namespace Model {
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
}