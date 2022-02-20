import { CrowdinApi, PatchRequest, ResponseList, ResponseObject } from '../core';

export class StringComments extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param stringId string identifier
     * @param type defines string comment type
     * @param targetLanguageId defines target language id. It can be one target language id or a list of comma-separated ones
     * @param issueType defines issue type. It can be one issue type or a list of comma-separated ones
     * @param issueStatus defines issue resolution status
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.comments.getMany
     */
    listStringComments(
        projectId: number,
        stringId?: number,
        type?: StringCommentsModel.Type,
        targetLanguageId?: string,
        issueType?: StringCommentsModel.IssueType,
        issueStatus?: StringCommentsModel.IssueStatus,
    ): Promise<ResponseList<StringCommentsModel.StringComment>>;

    listStringComments(
        projectId: number,
        request?: StringCommentsModel.ListStringCommentsRequest,
    ): Promise<ResponseList<StringCommentsModel.StringComment>>;

    listStringComments(
        projectId: number,
        stringIdOrRequest?: number | StringCommentsModel.ListStringCommentsRequest,
        type?: StringCommentsModel.Type,
        targetLanguageId?: string,
        issueType?: StringCommentsModel.IssueType,
        issueStatus?: StringCommentsModel.IssueStatus,
    ): Promise<ResponseList<StringCommentsModel.StringComment>> {
        let url = `${this.url}/projects/${projectId}/comments`;
        let request: StringCommentsModel.ListStringCommentsRequest;
        if (stringIdOrRequest && typeof stringIdOrRequest === 'object') {
            request = stringIdOrRequest;
        } else {
            request = { stringId: stringIdOrRequest, type, targetLanguageId, issueStatus, issueType };
        }
        url = this.addQueryParam(url, 'stringId', request.stringId);
        url = this.addQueryParam(url, 'type', request.type);
        url = this.addQueryParam(url, 'targetLanguageId', request.targetLanguageId);
        url = this.addQueryParam(url, 'issueType', request.issueType);
        url = this.addQueryParam(url, 'issueStatus', request.issueStatus);
        return this.getList(url, request.limit, request.offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.comments.post
     */
    addStringComment(
        projectId: number,
        request: StringCommentsModel.AddStringCommentRequest,
    ): Promise<ResponseObject<StringCommentsModel.StringComment>> {
        const url = `${this.url}/projects/${projectId}/comments`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param stringCommentId string comment identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.comments.get
     */
    getStringComment(
        projectId: number,
        stringCommentId: number,
    ): Promise<ResponseObject<StringCommentsModel.StringComment>> {
        const url = `${this.url}/projects/${projectId}/comments/${stringCommentId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param stringCommentId string comment identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.comments.delete
     */
    deleteStringComment(projectId: number, stringCommentId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/comments/${stringCommentId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param stringCommentId string comment identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.comments.patch
     */
    editStringComment(
        projectId: number,
        stringCommentId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<StringCommentsModel.StringComment>> {
        const url = `${this.url}/projects/${projectId}/comments/${stringCommentId}`;
        return this.patch(url, request, this.defaultConfig());
    }
}

export namespace StringCommentsModel {
    export interface ListStringCommentsRequest {
        stringId?: number;
        limit?: number;
        offset?: number;
        type?: Type;
        targetLanguageId?: string;
        issueType?: IssueType;
        issueStatus?: IssueStatus;
    }

    export interface StringComment {
        id: number;
        text: string;
        userId: number;
        stringId: number;
        user: User;
        string: StringModel;
        languageId: string;
        type: Type;
        issueType: IssueType;
        issueStatus: IssueStatus;
        resolverId: number;
        resolver: User;
        resolvedAt: string;
        createdAt: string;
    }

    export interface User {
        id: number;
        username: string;
        fullName: string;
        avatarUrl: string;
    }

    export interface StringModel {
        id: number;
        text: string;
        type: string;
        hasPlurals: boolean;
        isIcu: boolean;
        context: string;
        fileId: number;
    }

    export interface AddStringCommentRequest {
        stringId: number;
        text: string;
        targetLanguageId: string;
        type: Type;
        issueType?: IssueType;
    }

    export enum Type {
        COMMENT = 'comment',
        ISSUE = 'issue',
    }

    export enum IssueType {
        GENERAL_QUESTION = 'general_question',
        TRANSLATION_MISTAKE = 'translation_mistake',
        CONTEXT_REQUEST = 'context_request',
        SOURCE_MISTAKE = 'source_mistake',
    }

    export enum IssueStatus {
        UNRESOLVED = 'unresolved',
        RESOLVED = 'resolved',
    }
}
