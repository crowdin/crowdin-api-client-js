import { BooleanInt, CrowdinApi, PatchRequest, ResponseList, ResponseObject } from '../core';

export class SourceStrings extends CrowdinApi {
    listProjectStrings(
        projectId: number,
        request: SourceStringsModel.ListProjectStringsRequest,
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
        fileIdOrRequest?: number | SourceStringsModel.ListProjectStringsRequest,
        limit?: number,
        offset?: number,
        filter?: string,
        denormalizePlaceholders?: BooleanInt,
        labelIds?: string,
        scope?: SourceStringsModel.Scope,
        croql?: string,
        branchId?: number,
        directoryId?: number,
    ): Promise<ResponseList<SourceStringsModel.String>> {
        let url = `${this.url}/projects/${projectId}/strings`;
        let request: SourceStringsModel.ListProjectStringsRequest;
        if (fileIdOrRequest && typeof fileIdOrRequest === 'object') {
            request = fileIdOrRequest;
        } else {
            request = {
                fileId: fileIdOrRequest,
                limit,
                offset,
                filter,
                denormalizePlaceholders,
                labelIds,
                scope,
                croql,
                branchId,
                directoryId,
            };
        }
        url = this.addQueryParam(url, 'fileId', request.fileId);
        url = this.addQueryParam(url, 'filter', request.filter);
        url = this.addQueryParam(url, 'denormalizePlaceholders', request.denormalizePlaceholders);
        url = this.addQueryParam(url, 'labelIds', request.labelIds);
        url = this.addQueryParam(url, 'scope', request.scope);
        url = this.addQueryParam(url, 'croql', request.croql);
        url = this.addQueryParam(url, 'branchId', request.branchId);
        url = this.addQueryParam(url, 'directoryId', request.directoryId);
        return this.getList(url, request.limit, request.offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
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
     * @param stringId string identifier
     */
    getString(projectId: number, stringId: number): Promise<ResponseObject<SourceStringsModel.String>> {
        const url = `${this.url}/projects/${projectId}/strings/${stringId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param stringId string identifier
     */
    deleteString(projectId: number, stringId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/strings/${stringId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param stringId string identifier
     * @param request request body
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
    export interface ListProjectStringsRequest {
        fileId?: number;
        limit?: number;
        offset?: number;
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
        identifier: string;
        fileId?: number;
        text: string;
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

    export enum Scope {
        IDENTIFIER = 'identifier',
        TEXT = 'text',
        CONTEXT = 'context',
    }
}
