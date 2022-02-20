import { BooleanInt, CrowdinApi, ResponseList, ResponseObject } from '../core';

export class StringTranslations extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param stringId string identifier
     * @param languageId language identifier
     * @param translationId translation identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @param fileId file identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.approvals.getMany
     */
    listTranslationApprovals(
        projectId: number,
        stringId?: number,
        languageId?: string,
        translationId?: number,
        limit?: number,
        offset?: number,
        fileId?: number,
    ): Promise<ResponseList<StringTranslationsModel.Approval>>;

    listTranslationApprovals(
        projectId: number,
        stringIdOrRequest?: number | StringTranslationsModel.ListTranslationApprovalsRequest,
        languageId?: string,
        translationId?: number,
        limit?: number,
        offset?: number,
        fileId?: number,
    ): Promise<ResponseList<StringTranslationsModel.Approval>> {
        let url = `${this.url}/projects/${projectId}/approvals`;
        let request: StringTranslationsModel.ListTranslationApprovalsRequest;
        if (stringIdOrRequest && typeof stringIdOrRequest === 'object') {
            request = stringIdOrRequest;
        } else {
            request = { stringId: stringIdOrRequest, languageId, translationId, limit, offset, fileId };
        }
        url = this.addQueryParam(url, 'stringId', request.stringId);
        url = this.addQueryParam(url, 'languageId', request.languageId);
        url = this.addQueryParam(url, 'translationId', request.translationId);
        url = this.addQueryParam(url, 'fileId', request.fileId);
        return this.getList(url, request.limit, request.offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.approvals.post
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
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.approvals.get
     */
    approvalInfo(projectId: number, approvalId: number): Promise<ResponseObject<StringTranslationsModel.Approval>> {
        const url = `${this.url}/projects/${projectId}/approvals/${approvalId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param approvalId approval identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.approvals.delete
     */
    removeApproval(projectId: number, approvalId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/approvals/${approvalId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param languageId language identifier
     * @param stringIds filter translations by stringIds
     * @param fileId filter translations by fileId
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @param labelIds filter translations by fileId
     * @param denormalizePlaceholders enable denormalize placeholders
     * @param croql filter translations by CroQL (Can't be used with `stringIds`, `labelIds` or `fileId` in same request)
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.languages.translations.getMany
     */
    listLanguageTranslations(
        projectId: number,
        languageId: string,
        stringIds?: string,
        fileId?: number,
        limit?: number,
        offset?: number,
        labelIds?: string,
        denormalizePlaceholders?: BooleanInt,
        croql?: string,
    ): Promise<
        ResponseList<
            | StringTranslationsModel.PlainLanguageTranslation
            | StringTranslationsModel.PluralLanguageTranslation
            | StringTranslationsModel.IcuLanguageTranslation
        >
    >;

    listLanguageTranslations(
        projectId: number,
        languageId: string,
        stringIdsOrRequest?: string | StringTranslationsModel.ListLanguageTranslationsRequest,
        fileId?: number,
        limit?: number,
        offset?: number,
        labelIds?: string,
        denormalizePlaceholders?: BooleanInt,
        croql?: string,
    ): Promise<
        ResponseList<
            | StringTranslationsModel.PlainLanguageTranslation
            | StringTranslationsModel.PluralLanguageTranslation
            | StringTranslationsModel.IcuLanguageTranslation
        >
    > {
        let url = `${this.url}/projects/${projectId}/languages/${languageId}/translations`;
        let request: StringTranslationsModel.ListLanguageTranslationsRequest;
        if (stringIdsOrRequest && typeof stringIdsOrRequest === 'object') {
            request = stringIdsOrRequest;
        } else {
            request = {
                stringIds: stringIdsOrRequest,
                fileId,
                limit,
                offset,
                labelIds,
                denormalizePlaceholders,
                croql,
            };
        }
        url = this.addQueryParam(url, 'stringIds', request.stringIds);
        url = this.addQueryParam(url, 'fileId', request.fileId);
        url = this.addQueryParam(url, 'labelIds', request.labelIds);
        url = this.addQueryParam(url, 'denormalizePlaceholders', request.denormalizePlaceholders);
        url = this.addQueryParam(url, 'croql', request.croql);
        return this.getList(url, request.limit, request.offset);
    }

    /**
     * @param projectId project identifier
     * @param stringId string identifier
     * @param languageId language identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @param denormalizePlaceholders enable denormalize placeholders
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.translations.getMany
     */
    listStringTranslations(
        projectId: number,
        stringId: number,
        languageId: string,
        limit?: number,
        offset?: number,
        denormalizePlaceholders?: BooleanInt,
    ): Promise<ResponseList<StringTranslationsModel.StringTranslation>> {
        let url = `${this.url}/projects/${projectId}/translations`;
        url = this.addQueryParam(url, 'stringId', stringId);
        url = this.addQueryParam(url, 'languageId', languageId);
        url = this.addQueryParam(url, 'denormalizePlaceholders', denormalizePlaceholders);
        return this.getList(url, limit, offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.translations.post
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
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.translations.deleteMany
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
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.translations.get
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
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.translations.put
     */
    restoreTranslation(
        projectId: number,
        translationId: number,
    ): Promise<ResponseObject<StringTranslationsModel.StringTranslation>> {
        const url = `${this.url}/projects/${projectId}/translations/${translationId}/restore`;
        return this.put(url, {}, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param translation translation identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.translations.delete
     */
    deleteTranslation(projectId: number, translationId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/translations/${translationId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param stringId string identifier
     * @param languageId language identifier
     * @param translationId translation identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.votes.getMany
     */
    listTranslationVotes(
        projectId: number,
        stringId?: number,
        languageId?: string,
        translationId?: number,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<StringTranslationsModel.Vote>>;

    listTranslationVotes(
        projectId: number,
        stringIdOrRequest?: number | StringTranslationsModel.ListTranslationVotesRequest,
        languageId?: string,
        translationId?: number,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<StringTranslationsModel.Vote>> {
        let url = `${this.url}/projects/${projectId}/votes`;
        let request: StringTranslationsModel.ListTranslationVotesRequest;
        if (stringIdOrRequest && typeof stringIdOrRequest === 'object') {
            request = stringIdOrRequest;
        } else {
            request = { stringId: stringIdOrRequest, languageId, translationId, limit, offset };
        }
        url = this.addQueryParam(url, 'stringId', request.stringId);
        url = this.addQueryParam(url, 'languageId', request.languageId);
        url = this.addQueryParam(url, 'translationId', request.translationId);
        return this.getList(url, request.limit, request.offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.votes.post
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
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.votes.get
     */
    voteInfo(projectId: number, voteId: number): Promise<ResponseObject<StringTranslationsModel.Vote>> {
        const url = `${this.url}/projects/${projectId}/votes/${voteId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param voteId vote identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.votes.delete
     */
    cancelVote(projectId: number, voteId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/votes/${voteId}`;
        return this.delete(url, this.defaultConfig());
    }
}

export namespace StringTranslationsModel {
    export interface ListTranslationApprovalsRequest {
        stringId?: number;
        languageId?: string;
        translationId?: number;
        limit?: number;
        offset?: number;
        fileId?: number;
    }

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
        createdAt: string;
    }

    export interface ListLanguageTranslationsRequest {
        stringIds?: string;
        fileId?: number;
        limit?: number;
        offset?: number;
        labelIds?: string;
        denormalizePlaceholders?: BooleanInt;
        croql?: string;
    }

    export interface PlainLanguageTranslation {
        stringId: number;
        contentType: string;
        translationId: number;
        text: string;
        user: User;
        createdAt: string;
    }

    export interface PluralLanguageTranslation {
        stringId: number;
        contentType: string;
        plurals: Plural[];
    }

    export interface IcuLanguageTranslation {
        stringId: number;
        contentType: string;
        translationId: number;
        text: string;
        user: User;
        createdAt: string;
    }

    export interface Plural {
        translationId: number;
        text: string;
        pluralForm: string;
        user: User;
        createdAt: string;
    }

    export interface AddStringTranslationRequest {
        stringId: number;
        languageId: string;
        text: string;
        pluralCategoryName?: string;
    }

    export interface ListTranslationVotesRequest {
        stringId?: number;
        languageId?: string;
        translationId?: number;
        limit?: number;
        offset?: number;
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
        username: string;
        fullName: string;
        avatarUrl: string;
    }

    export enum Mark {
        UP = 'up',
        DOWN = 'down',
    }
}
