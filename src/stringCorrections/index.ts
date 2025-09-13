import { BooleanInt, CrowdinApi, PaginationOptions, ResponseList, ResponseObject } from '../core';

export class StringCorrections extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param options optional pagination parameters for the request
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/String-Corrections/operation/api.projects.corrections.getMany
     */
    listStringCorrections(
        projectId: number,
        options: StringCorrectionsModel.ListStringCorrectionsParams,
    ): Promise<ResponseList<StringCorrectionsModel.StringCorrection>> {
        let url = `${this.url}/projects/${projectId}/corrections`;
        url = this.addQueryParam(url, 'stringId', options.stringId);
        url = this.addQueryParam(url, 'denormalizePlaceholders', options.denormalizePlaceholders);
        url = this.addQueryParam(url, 'orderBy', options.orderBy);
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/String-Corrections/operation/api.projects.corrections.post
     */
    addStringCorrection(
        projectId: number,
        request: StringCorrectionsModel.AddStringCorrectionRequest,
    ): Promise<ResponseObject<StringCorrectionsModel.StringCorrection>> {
        const url = `${this.url}/projects/${projectId}/corrections`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param stringId string identifier
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/String-Corrections/operation/api.projects.corrections.deleteMany
     */
    deleteStringCorrections(projectId: number, stringId: number): Promise<void> {
        let url = `${this.url}/projects/${projectId}/corrections`;
        url = this.addQueryParam(url, 'stringId', stringId);
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param correctionId correction identifier
     * @param params query params
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/String-Corrections/operation/api.projects.corrections.get
     */
    getStringCorrection(
        projectId: number,
        correctionId: number,
        params?: { denormalizePlaceholders?: BooleanInt },
    ): Promise<ResponseObject<StringCorrectionsModel.StringCorrection>> {
        let url = `${this.url}/projects/${projectId}/corrections/${correctionId}`;
        url = this.addQueryParam(url, 'denormalizePlaceholders', params?.denormalizePlaceholders);
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param correctionId correction identifier
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/String-Corrections/operation/api.projects.corrections.put
     */
    restoreStringCorrection(
        projectId: number,
        correctionId: number,
    ): Promise<ResponseObject<StringCorrectionsModel.StringCorrection>> {
        const url = `${this.url}/projects/${projectId}/corrections/${correctionId}`;
        return this.put(url, undefined, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param correctionId correction identifier
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/String-Corrections/operation/api.projects.corrections.delete
     */
    deleteStringCorrection(projectId: number, correctionId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/corrections/${correctionId}`;
        return this.delete(url, this.defaultConfig());
    }
}

export namespace StringCorrectionsModel {
    export interface ListStringCorrectionsParams extends PaginationOptions {
        stringId: number;
        orderBy?: string;
        denormalizePlaceholders?: BooleanInt;
    }

    export interface StringCorrection {
        id: number;
        text: string;
        pluralCategoryName: PluralCategoryName;
        user: {
            id: number;
            username: string;
            fullName: string;
            avatarUrl: string;
        };
        createdAt: string;
    }

    export type PluralCategoryName = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other';

    export interface AddStringCorrectionRequest {
        stringId: number;
        text: string;
        pluralCategoryName?: PluralCategoryName;
    }
}
