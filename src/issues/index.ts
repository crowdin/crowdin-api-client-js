import { CrowdinApi, PatchRequest, ResponseList, ResponseObject } from '../core';

export class Issues extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @param type defines the issue type
     * @param status defines the issue resolution status
     * @param fetchAll fetch all without pagination
     */
    listReportedIssues(
        projectId: number,
        limit?: number,
        offset?: number,
        type?: IssuesModel.Type,
        status?: IssuesModel.Status,
        fetchAll?: boolean,
    ): Promise<ResponseList<IssuesModel.Issue>> {
        let url = `${this.url}/projects/${projectId}/issues`;
        url = this.addQueryParam(url, 'type', type);
        url = this.addQueryParam(url, 'status', status);
        return this.getList(url, limit, offset, fetchAll);
    }

    /**
     * @param projectId project identifier
     * @param issueId issue identifier
     * @param request request body
     */
    editIssue(projectId: number, issueId: number, request: PatchRequest[]): Promise<ResponseObject<IssuesModel.Issue>> {
        const url = `${this.url}/projects/${projectId}/issues/${issueId}`;
        return this.patch(url, request, this.defaultConfig());
    }
}

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
        languageId: string;
        type: Type;
        status: Status;
        createdAt: string;
    }
}
