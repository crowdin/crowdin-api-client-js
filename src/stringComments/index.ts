import { CrowdinApi, isOptionalNumber, PaginationOptions, PatchRequest, ResponseList, ResponseObject } from '../core';

/**
 * Use API to list, add, get, edit or delete string comments.
 */
export class StringComments extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param options optional parameters for the requesr
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.comments.getMany
     */
    listStringComments(
        projectId: number,
        options?: StringCommentsModel.ListStringCommentsOptions,
    ): Promise<ResponseList<StringCommentsModel.StringComment>>;
    /**
     * @param projectId project identifier
     * @param stringId string identifier
     * @param type defines string comment type
     * @param targetLanguageId defines target language id. It can be one target language id or a list of comma-separated ones
     * @param issueType defines issue type. It can be one issue type or a list of comma-separated ones
     * @param issueStatus defines issue resolution status
     * @deprecated optional parameters should be passed through an object
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.comments.getMany
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
        options?: number | StringCommentsModel.ListStringCommentsOptions,
        deprecatedType?: StringCommentsModel.Type,
        deprecatedTargetLanguageId?: string,
        deprecatedIssueType?: StringCommentsModel.IssueType,
        deprecatedIssueStatus?: StringCommentsModel.IssueStatus,
    ): Promise<ResponseList<StringCommentsModel.StringComment>> {
        let url = `${this.url}/projects/${projectId}/comments`;
        if (isOptionalNumber(options, '1' in arguments)) {
            options = {
                stringId: options,
                type: deprecatedType,
                targetLanguageId: deprecatedTargetLanguageId,
                issueStatus: deprecatedIssueStatus,
                issueType: deprecatedIssueType,
            };
        }
        url = this.addQueryParam(url, 'stringId', options.stringId);
        url = this.addQueryParam(url, 'type', options.type);
        url = this.addQueryParam(url, 'targetLanguageId', options.targetLanguageId);
        url = this.addQueryParam(url, 'issueType', options.issueType);
        url = this.addQueryParam(url, 'issueStatus', options.issueStatus);
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.comments.post
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
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.comments.get
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
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.comments.delete
     */
    deleteStringComment(projectId: number, stringCommentId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/comments/${stringCommentId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param stringCommentId string comment identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.comments.patch
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
    export interface ListStringCommentsOptions extends PaginationOptions {
        stringId?: number;
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

    export type Type = 'comment' | 'issue';

    export type IssueType = 'general_question' | 'translation_mistake' | 'context_request' | 'source_mistake';

    export type IssueStatus = 'unresolved' | 'resolved';
}
