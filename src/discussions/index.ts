import { CrowdinApi, PaginationOptions, PatchRequest, ResponseList, ResponseObject } from '../core';

/**
 * Discussions are project-level conversations between project members.
 *
 * Use the API to start, list, edit and delete project discussions and manage their replies.
 */
export class Discussions extends CrowdinApi {
    /**
     * @requiredScope project.discussion:read
     * @param projectId project identifier
     * @param options optional parameters for the request
     * @see https://support.crowdin.com/developer/api/v2/#tag/Discussions/operation/api.projects.discussions.getMany
     */
    listDiscussions(
        projectId: number,
        options?: DiscussionsModel.ListDiscussionsOptions,
    ): Promise<ResponseList<DiscussionsModel.Discussion>> {
        let url = `${this.url}/projects/${projectId}/discussions`;
        url = this.addQueryParam(url, 'status', options?.status);
        url = this.addQueryParam(url, 'userIds', options?.userIds);
        url = this.addQueryParam(url, 'languageIds', options?.languageIds);
        url = this.addQueryParam(url, 'search', options?.search);
        url = this.addQueryParam(url, 'orderBy', options?.orderBy);
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @requiredScope project.discussion:write
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/developer/api/v2/#tag/Discussions/operation/api.projects.discussions.post
     */
    addDiscussion(
        projectId: number,
        request: DiscussionsModel.AddDiscussionRequest,
    ): Promise<ResponseObject<DiscussionsModel.Discussion>> {
        const url = `${this.url}/projects/${projectId}/discussions`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @requiredScope project.discussion:read
     * @param projectId project identifier
     * @param discussionId discussion identifier
     * @see https://support.crowdin.com/developer/api/v2/#tag/Discussions/operation/api.projects.discussions.get
     */
    getDiscussion(projectId: number, discussionId: number): Promise<ResponseObject<DiscussionsModel.Discussion>> {
        const url = `${this.url}/projects/${projectId}/discussions/${discussionId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @requiredScope project.discussion:write
     * @param projectId project identifier
     * @param discussionId discussion identifier
     * @see https://support.crowdin.com/developer/api/v2/#tag/Discussions/operation/api.projects.discussions.delete
     */
    deleteDiscussion(projectId: number, discussionId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/discussions/${discussionId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @requiredScope project.discussion:write
     * @param projectId project identifier
     * @param discussionId discussion identifier
     * @param request request body
     * @see https://support.crowdin.com/developer/api/v2/#tag/Discussions/operation/api.projects.discussions.patch
     */
    editDiscussion(
        projectId: number,
        discussionId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<DiscussionsModel.Discussion>> {
        const url = `${this.url}/projects/${projectId}/discussions/${discussionId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @requiredScope project.discussion:read
     * @param projectId project identifier
     * @param discussionId discussion identifier
     * @param options optional pagination parameters for the request
     * @see https://support.crowdin.com/developer/api/v2/#tag/Discussions/operation/api.projects.discussions.replies.getMany
     */
    listDiscussionReplies(
        projectId: number,
        discussionId: number,
        options?: PaginationOptions,
    ): Promise<ResponseList<DiscussionsModel.DiscussionReply>> {
        const url = `${this.url}/projects/${projectId}/discussions/${discussionId}/replies`;
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @requiredScope project.discussion:write
     * @param projectId project identifier
     * @param discussionId discussion identifier
     * @param request request body
     * @see https://support.crowdin.com/developer/api/v2/#tag/Discussions/operation/api.projects.discussions.replies.post
     */
    addDiscussionReply(
        projectId: number,
        discussionId: number,
        request: DiscussionsModel.AddDiscussionReplyRequest,
    ): Promise<ResponseObject<DiscussionsModel.DiscussionReply>> {
        const url = `${this.url}/projects/${projectId}/discussions/${discussionId}/replies`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @requiredScope project.discussion:read
     * @param projectId project identifier
     * @param discussionId discussion identifier
     * @param replyId reply identifier
     * @see https://support.crowdin.com/developer/api/v2/#tag/Discussions/operation/api.projects.discussions.replies.get
     */
    getDiscussionReply(
        projectId: number,
        discussionId: number,
        replyId: number,
    ): Promise<ResponseObject<DiscussionsModel.DiscussionReply>> {
        const url = `${this.url}/projects/${projectId}/discussions/${discussionId}/replies/${replyId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @requiredScope project.discussion:write
     * @param projectId project identifier
     * @param discussionId discussion identifier
     * @param replyId reply identifier
     * @see https://support.crowdin.com/developer/api/v2/#tag/Discussions/operation/api.projects.discussions.replies.delete
     */
    deleteDiscussionReply(projectId: number, discussionId: number, replyId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/discussions/${discussionId}/replies/${replyId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @requiredScope project.discussion:write
     * @param projectId project identifier
     * @param discussionId discussion identifier
     * @param replyId reply identifier
     * @param request request body
     * @see https://support.crowdin.com/developer/api/v2/#tag/Discussions/operation/api.projects.discussions.replies.patch
     */
    editDiscussionReply(
        projectId: number,
        discussionId: number,
        replyId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<DiscussionsModel.DiscussionReply>> {
        const url = `${this.url}/projects/${projectId}/discussions/${discussionId}/replies/${replyId}`;
        return this.patch(url, request, this.defaultConfig());
    }
}

export namespace DiscussionsModel {
    export interface ListDiscussionsOptions extends PaginationOptions {
        /**
         * One status or a comma-separated list: `open`, `closed`. Default is `open`
         */
        status?: string;
        /**
         * One user ID or a comma-separated list
         */
        userIds?: string;
        /**
         * One language ID or a comma-separated list
         */
        languageIds?: string;
        search?: string;
        orderBy?: string;
    }

    export interface Discussion {
        id: number;
        projectId: number;
        title: string;
        status: Status;
        languageId: string | null;
        userId: number;
        user: User;
        repliesCount: number;
        isMuted: boolean;
        createdAt: string;
        updatedAt: string;
    }

    export interface AddDiscussionRequest {
        title: string;
        text: string;
        languageId?: string | null;
    }

    export interface DiscussionReply {
        id: number;
        discussionId: number;
        type: ReplyType;
        text: string;
        userId: number;
        user: User;
        createdAt: string;
        updatedAt: string;
    }

    export interface AddDiscussionReplyRequest {
        text: string;
    }

    export interface User {
        id: number | null;
        username: string | null;
        fullName: string | null;
        avatarUrl: string | null;
    }

    export type Status = 'open' | 'closed';

    export type ReplyType = 'reply' | 'description' | 'system';
}
