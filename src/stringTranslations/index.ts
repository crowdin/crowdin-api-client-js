import { BooleanInt, CrowdinApi, PaginationOptions, ResponseList, ResponseObject } from '../core';

export class StringTranslations extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param stringId string identifier
     * @param languageId language identifier
     * @param translationId translation identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @param fileId file identifier
     * @deprecated Optional parameters should be passed through an object
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
    /**
     * @param projectId project identifier
     * @param options optional parameters for the request
     */
    listTranslationApprovals(
        projectId: number,
        options?: StringTranslationsModel.ListTranslationApprovalsRequest,
    ): Promise<ResponseList<StringTranslationsModel.Approval>>;
    listTranslationApprovals(
        projectId: number,
        options?: number | StringTranslationsModel.ListTranslationApprovalsRequest,
        deprecatedLanguageId?: string,
        deprecatedTranslationId?: number,
        deprecatedLimit?: number,
        deprecatedOffset?: number,
        deprecatedFileId?: number,
    ): Promise<ResponseList<StringTranslationsModel.Approval>> {
        let url = `${this.url}/projects/${projectId}/approvals`;
        if (typeof options === 'number' || typeof options === 'undefined') {
            options = {
                stringId: options,
                languageId: deprecatedLanguageId,
                translationId: deprecatedTranslationId,
                limit: deprecatedLimit,
                offset: deprecatedOffset,
                fileId: deprecatedFileId,
            };
            this.emitDeprecationWarning();
        }
        url = this.addQueryParam(url, 'stringId', options.stringId);
        url = this.addQueryParam(url, 'languageId', options.languageId);
        url = this.addQueryParam(url, 'translationId', options.translationId);
        url = this.addQueryParam(url, 'fileId', options.fileId);
        return this.getList(url, options.limit, options.offset);
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
     * @deprecated Optional parameters should be passed through an object
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
    /**
     *
     * @param projectId project identifier
     * @param languageId language identifier
     * @param options optional parameters for the request
     */
    listLanguageTranslations(
        projectId: number,
        languageId: string,
        options?: StringTranslationsModel.ListLanguageTranslationsRequest,
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
        options?: string | StringTranslationsModel.ListLanguageTranslationsRequest,
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
        if (typeof options === 'string' || typeof options === 'undefined') {
            options = {
                stringIds: options,
                fileId,
                limit,
                offset,
                labelIds,
                denormalizePlaceholders,
                croql,
            };
            this.emitDeprecationWarning();
        }
        url = this.addQueryParam(url, 'stringIds', options.stringIds);
        url = this.addQueryParam(url, 'fileId', options.fileId);
        url = this.addQueryParam(url, 'labelIds', options.labelIds);
        url = this.addQueryParam(url, 'denormalizePlaceholders', options.denormalizePlaceholders);
        url = this.addQueryParam(url, 'croql', options.croql);
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param projectId project identifier
     * @param stringId string identifier
     * @param languageId language identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @param denormalizePlaceholders enable denormalize placeholders
     * @deprecated Optional parameters should be passed through an object
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.translations.getMany
     */
    listStringTranslations(
        projectId: number,
        stringId: number,
        languageId: string,
        limit?: number,
        offset?: number,
        denormalizePlaceholders?: BooleanInt,
    ): Promise<ResponseList<StringTranslationsModel.StringTranslation>>;
    /**
     * @param projectId project identifier
     * @param stringId string identifier
     * @param languageId language identifier
     * @param options optional parameters for the request
     */
    listStringTranslations(
        projectId: number,
        stringId: number,
        languageId: string,
        options?: StringTranslationsModel.ListStringTranslationsOptions,
    ): Promise<ResponseList<StringTranslationsModel.StringTranslation>>;
    listStringTranslations(
        projectId: number,
        stringId: number,
        languageId: string,
        options?: number | StringTranslationsModel.ListStringTranslationsOptions,
        deprecatedOffset?: number,
        deprecatedDenormalizePlaceholders?: BooleanInt,
    ): Promise<ResponseList<StringTranslationsModel.StringTranslation>> {
        if (typeof options === 'number' || typeof options === 'undefined') {
            options = {
                limit: options,
                offset: deprecatedOffset,
                denormalizePlaceholders: deprecatedDenormalizePlaceholders,
            };
            this.emitDeprecationWarning();
        }
        let url = `${this.url}/projects/${projectId}/translations`;
        url = this.addQueryParam(url, 'stringId', stringId);
        url = this.addQueryParam(url, 'languageId', languageId);
        url = this.addQueryParam(url, 'denormalizePlaceholders', options.denormalizePlaceholders);
        return this.getList(url, options.limit, options.offset);
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
    /**
     * @param projectId project identifier
     * @param options optional parameters for the request
     */
    listTranslationVotes(
        projectId: number,
        options?: StringTranslationsModel.ListTranslationVotesRequest,
    ): Promise<ResponseList<StringTranslationsModel.Vote>>;
    listTranslationVotes(
        projectId: number,
        options?: number | StringTranslationsModel.ListTranslationVotesRequest,
        deprecatedLanguageId?: string,
        deprecatedTranslationId?: number,
        deprecatedLimit?: number,
        deprecatedOffset?: number,
    ): Promise<ResponseList<StringTranslationsModel.Vote>> {
        let url = `${this.url}/projects/${projectId}/votes`;
        if (typeof options === 'number' || typeof options === 'undefined') {
            options = {
                stringId: options,
                languageId: deprecatedLanguageId,
                translationId: deprecatedTranslationId,
                limit: deprecatedLimit,
                offset: deprecatedOffset,
            };
            this.emitDeprecationWarning();
        }
        url = this.addQueryParam(url, 'stringId', options.stringId);
        url = this.addQueryParam(url, 'languageId', options.languageId);
        url = this.addQueryParam(url, 'translationId', options.translationId);
        return this.getList(url, options.limit, options.offset);
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

    export interface ListTranslationVotesRequest extends PaginationOptions {
        stringId?: number;
        languageId?: string;
        translationId?: number;
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

    export interface ListStringTranslationsOptions extends PaginationOptions {
        denormalizePlaceholders?: BooleanInt;
    }
}
