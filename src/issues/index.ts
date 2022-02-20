import { CrowdinApi, PatchRequest, ResponseList, ResponseObject } from '../core';

/**
 * @deprecated
 */
export class Issues extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @param type defines the issue type
     * @param status defines the issue resolution status
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.issues.getMany
     */
    listReportedIssues(
        projectId: number,
        limit?: number,
        offset?: number,
        type?: IssuesModel.Type,
        status?: IssuesModel.Status,
    ): Promise<ResponseList<IssuesModel.Issue>> {
        let url = `${this.url}/projects/${projectId}/issues`;
        url = this.addQueryParam(url, 'type', type);
        url = this.addQueryParam(url, 'status', status);
        return this.getList(url, limit, offset);
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
}
