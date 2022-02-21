import { CrowdinApi, PaginationOptions, PatchRequest, ResponseList, ResponseObject } from '../core';

/**
 * @deprecated
 */
export class Issues extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param options optional options for listing reported issues
     */
    listReportedIssues(
        projectId: number,
        options?: IssuesModel.ListReportedIssuesOptions,
    ): Promise<ResponseList<IssuesModel.Issue>>;
    /**
     * @param projectId project identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @param type defines the issue type
     * @param status defines the issue resolution status
     * @deprecated Optional parameters should be passed through an object
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.issues.getMany
     */
    listReportedIssues(
        projectId: number,
        limit?: number,
        offset?: number,
        type?: IssuesModel.Type,
        status?: IssuesModel.Status,
    ): Promise<ResponseList<IssuesModel.Issue>>;
    listReportedIssues(
        projectId: number,
        options: number | IssuesModel.ListReportedIssuesOptions = {},
        deprecatedOffset?: number,
        deprecatedType?: IssuesModel.Type,
        deprecatedStatus?: IssuesModel.Status,
    ): Promise<ResponseList<IssuesModel.Issue>> {
        if (typeof options === 'number') {
            options = {
                limit: options,
                offset: deprecatedOffset,
                type: deprecatedType,
                status: deprecatedStatus,
            };
            this.emitDeprecationWarning();
        }
        let url = `${this.url}/projects/${projectId}/issues`;
        url = this.addQueryParam(url, 'type', options.type);
        url = this.addQueryParam(url, 'status', options.status);
        return this.getList(url, options.limit, deprecatedOffset);
    }

    /**
     * @param projectId project identifier
     * @param issueId issue identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.issues.patch
     */
    editIssue(projectId: number, issueId: number, request: PatchRequest[]): Promise<ResponseObject<IssuesModel.Issue>> {
        const url = `${this.url}/projects/${projectId}/issues/${issueId}`;
        return this.patch(url, request, this.defaultConfig());
    }
}

/**
 * @deprecated
 */
export namespace IssuesModel {
    export enum Type {
        ALL = 'all',
        GENERAL_QUESTION = 'general_question',
        TRANSLATION_MISTAKE = 'translation_mistake',
        CONTEXT_REQUEST = 'context_request',
        SOURCE_MISTAKE = 'source_mistake',
    }

    export enum Status {
        ALL = 'all',
        RESOLVED = 'resolved',
        UNRESOLVED = 'unresolved',
    }

    export interface Issue {
        id: number;
        text: string;
        userId: number;
        stringId: number;
        user: User;
        string: string;
        languageId: string;
        type: Type;
        status: Status;
        createdAt: string;
    }

    export interface User {
        id: number;
        username: string;
        fullName: string;
        avatarUrl: string;
    }

    export interface String {
        id: number;
        text: string;
        type: string;
        hasPlurals: boolean;
        isIcu: boolean;
        context: string;
        fileId: number;
    }

    export interface ListReportedIssuesOptions extends PaginationOptions {
        type?: IssuesModel.Type;
        status?: IssuesModel.Status;
    }
}
