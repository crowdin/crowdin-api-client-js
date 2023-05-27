import {
    BooleanInt,
    CrowdinApi,
    isOptionalNumber,
    PaginationOptions,
    PatchRequest,
    ResponseList,
    ResponseObject,
} from '../core';

/**
 * Source strings are the text units for translation. Instead of modifying source files, you can manage source strings one by one.
 *
 * Use API to add, edit, or delete some specific strings in the source-based and files-based projects.
 */
export class SourceStrings extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.strings.getMany
     */
    listProjectStrings(
        projectId: number,
        options?: SourceStringsModel.ListProjectStringsOptions,
    ): Promise<ResponseList<SourceStringsModel.String>>;
    /**
     * @param projectId project identifier
     * @param fileId file identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @param filter filter strings by text and context
     * @param denormalizePlaceholders enable denormalize placeholders
     * @param labelIds filter strings by labelIds
     * @param scope specify field to be the target of filtering
     * @param croql filter strings by CroQL (Can't be used with `labelIds`, `filter` or `scope` in same request)
     * @param branchId filter by branch identifier
     * @param directoryId filter by directory identifier
     * @deprecated optional parameters should be passed through an object
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.strings.getMany
     */
    listProjectStrings(
        projectId: number,
        fileId?: number,
        limit?: number,
        offset?: number,
        filter?: string,
        denormalizePlaceholders?: BooleanInt,
        labelIds?: string,
        scope?: SourceStringsModel.Scope,
        croql?: string,
        branchId?: number,
        directoryId?: number,
    ): Promise<ResponseList<SourceStringsModel.String>>;
    listProjectStrings(
        projectId: number,
        options?: number | SourceStringsModel.ListProjectStringsOptions,
        deprecatedLimit?: number,
        deprecatedOffset?: number,
        deprecatedFilter?: string,
        deprecatedDenormalizePlaceholders?: BooleanInt,
        deprecatedLabelIds?: string,
        deprecatedScope?: SourceStringsModel.Scope,
        deprecatedCroql?: string,
        deprecatedBranchId?: number,
        deprecatedDirectoryId?: number,
    ): Promise<ResponseList<SourceStringsModel.String>> {
        let url = `${this.url}/projects/${projectId}/strings`;
        if (isOptionalNumber(options, '1' in arguments)) {
            options = {
                fileId: options,
                limit: deprecatedLimit,
                offset: deprecatedOffset,
                filter: deprecatedFilter,
                denormalizePlaceholders: deprecatedDenormalizePlaceholders,
                labelIds: deprecatedLabelIds,
                scope: deprecatedScope,
                croql: deprecatedCroql,
                branchId: deprecatedBranchId,
                directoryId: deprecatedDirectoryId,
            };
        }
        url = this.addQueryParam(url, 'fileId', options.fileId);
        url = this.addQueryParam(url, 'filter', options.filter);
        url = this.addQueryParam(url, 'denormalizePlaceholders', options.denormalizePlaceholders);
        url = this.addQueryParam(url, 'labelIds', options.labelIds);
        url = this.addQueryParam(url, 'scope', options.scope);
        url = this.addQueryParam(url, 'croql', options.croql);
        url = this.addQueryParam(url, 'branchId', options.branchId);
        url = this.addQueryParam(url, 'directoryId', options.directoryId);
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.strings.post
     */
    addString(
        projectId: number,
        request: SourceStringsModel.CreateStringRequest,
    ): Promise<ResponseObject<SourceStringsModel.String>> {
        const url = `${this.url}/projects/${projectId}/strings`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.strings.batchPatch
     */
    stringBatchOperations(
        projectId: number,
        request: PatchRequest[],
    ): Promise<ResponseList<SourceStringsModel.String>> {
        const url = `${this.url}/projects/${projectId}/strings`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param stringId string identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.strings.get
     */
    getString(projectId: number, stringId: number): Promise<ResponseObject<SourceStringsModel.String>> {
        const url = `${this.url}/projects/${projectId}/strings/${stringId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param stringId string identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.strings.delete
     */
    deleteString(projectId: number, stringId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/strings/${stringId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param stringId string identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.strings.patch
     */
    editString(
        projectId: number,
        stringId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<SourceStringsModel.String>> {
        const url = `${this.url}/projects/${projectId}/strings/${stringId}`;
        return this.patch(url, request, this.defaultConfig());
    }
}

export namespace SourceStringsModel {
    export interface ListProjectStringsOptions extends PaginationOptions {
        fileId?: number;
        filter?: string;
        denormalizePlaceholders?: BooleanInt;
        labelIds?: string;
        scope?: SourceStringsModel.Scope;
        croql?: string;
        branchId?: number;
        directoryId?: number;
    }

    export interface String {
        id: number;
        projectId: number;
        fileId: number;
        branchId: number;
        identifier: string;
        text: string | PluralText;
        type: Type;
        context: string;
        maxLength: number;
        isDuplicate: boolean;
        masterStringId: boolean;
        isHidden: boolean;
        revision: number;
        hasPlurals: boolean;
        isIcu: boolean;
        labelIds: number[];
        createdAt: string;
        updatedAt: string;
    }

    export interface CreateStringRequest {
        text: string | PluralText;
        identifier?: string;
        fileId?: number;
        context?: string;
        isHidden?: boolean;
        maxLength?: number;
        labelIds?: number[];
    }

    export interface PluralText {
        zero?: string;
        one?: string;
        two?: string;
        few?: string;
        many?: string;
        other?: string;
    }

    export enum Type {
        TEXT = 0,
        ASSET = 1,
        ICU = 2,
    }

    export type Scope = 'identifier' | 'text' | 'context';
}
