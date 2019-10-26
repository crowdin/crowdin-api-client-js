import { CrowdinApi, ResponseList, ResponseObject } from '../core';

export class StringTranslations extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param stringId string identifier
     * @param languageId language identifier
     * @param translationId translation identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     */
    listTranslationApprovals(
        projectId: number,
        stringId?: number,
        languageId?: string,
        translationId?: number,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<StringTranslationsModel.Approval>> {
        let url = `${this.url}/projects/${projectId}/approvals`;
        url = this.addQueryParam(url, 'stringId', stringId);
        url = this.addQueryParam(url, 'languageId', languageId);
        url = this.addQueryParam(url, 'translationId', translationId);
        url = this.addQueryParam(url, 'limit', limit);
        url = this.addQueryParam(url, 'offset', offset);
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param request request body
     */
    addApproval(
        projectId: number,
        request: StringTranslationsModel.AddApprovalRequest,
    ): Promise<ResponseObject<StringTranslationsModel.Approval>> {
        const url = `${this.url}/projects/${projectId}/approvals`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param approvalId approval identifier
     */
    approvalInfo(projectId: number, approvalId: number): Promise<ResponseObject<StringTranslationsModel.Approval>> {
        const url = `${this.url}/projects/${projectId}/approvals/${approvalId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param approvalId approval identifier
     */
    removeApproval(projectId: number, approvalId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/approvals/${approvalId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param stringId string identifier
     * @param languageId language identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     */
    listStringTranslations(
        projectId: number,
        stringId: number,
        languageId: string,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<StringTranslationsModel.StringTranslation>> {
        let url = `${this.url}/projects/${projectId}/translations`;
        url = this.addQueryParam(url, 'stringId', stringId);
        url = this.addQueryParam(url, 'languageId', languageId);
        url = this.addQueryParam(url, 'limit', limit);
        url = this.addQueryParam(url, 'offset', offset);
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param request request body
     */
    addTranslation(
        projectId: number,
        request: StringTranslationsModel.AddStringTranslationRequest,
    ): Promise<ResponseObject<StringTranslationsModel.StringTranslation>> {
        const url = `${this.url}/projects/${projectId}/translations`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param stringId string identifier
     * @param languageId language identifier
     */
    deleteAllTranslations(projectId: number, stringId: number, languageId: string): Promise<void> {
        let url = `${this.url}/projects/${projectId}/translations`;
        url = this.addQueryParam(url, 'stringId', stringId);
        url = this.addQueryParam(url, 'languageId', languageId);
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param translationId translation identifier
     */
    translationInfo(
        projectId: number,
        translationId: number,
    ): Promise<ResponseObject<StringTranslationsModel.StringTranslation>> {
        const url = `${this.url}/projects/${projectId}/translations/${translationId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param translation translation identifier
     */
    deleteTranslation(projectId: number, translationId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/translations/${translationId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param translation translation identifier
     */
    restoreTranslation(projectId: number, translationId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/translations/${translationId}/restore`;
        return this.post(url, undefined, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param stringId string identifier
     * @param languageId language identifier
     * @param translationId translation identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     */
    listTranslationVotes(
        projectId: number,
        stringId?: number,
        languageId?: string,
        translationId?: number,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<StringTranslationsModel.Vote>> {
        let url = `${this.url}/projects/${projectId}/votes`;
        url = this.addQueryParam(url, 'stringId', stringId);
        url = this.addQueryParam(url, 'languageId', languageId);
        url = this.addQueryParam(url, 'translationId', translationId);
        url = this.addQueryParam(url, 'limit', limit);
        url = this.addQueryParam(url, 'offset', offset);
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param request request body
     */
    addVote(
        projectId: number,
        request: StringTranslationsModel.AddVoteRequest,
    ): Promise<ResponseObject<StringTranslationsModel.Vote>> {
        const url = `${this.url}/projects/${projectId}/votes`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param voteId vote identifier
     */
    voteInfo(projectId: number, voteId: number): Promise<ResponseObject<StringTranslationsModel.Vote>> {
        const url = `${this.url}/projects/${projectId}/votes/${voteId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param voteId vote identifier
     */
    cancelVote(projectId: number, voteId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/votes/${voteId}`;
        return this.delete(url, this.defaultConfig());
    }
}

export namespace StringTranslationsModel {
    export interface Approval {
        id: number;
        user: User;
        translationId: number;
        stringId: number;
        languageId: string;
        workflowStepId: number;
        createdAt: string;
    }

    export interface AddApprovalRequest {
        translationId: number;
    }

    export interface StringTranslation {
        id: number;
        text: string;
        pluralCategoryName: string;
        user: User;
        rating: number;
    }

    export interface AddStringTranslationRequest {
        stringId: number;
        languageId: string;
        text: string;
        pluralCategoryName?: string;
    }

    export interface Vote {
        id: number;
        user: User;
        translationId: number;
        votedAt: string;
        mark: Mark;
    }

    export interface AddVoteRequest {
        mark: Mark;
        translationId: number;
    }

    export interface User {
        id: number;
        login: string;
    }

    export enum Mark {
        UP = 'up',
        DOWN = 'down',
    }
}
