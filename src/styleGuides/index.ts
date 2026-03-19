import { CrowdinApi, PaginationOptions, PatchRequest, ResponseList, ResponseObject } from '../core';

export class StyleGuides extends CrowdinApi {
    /**
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.style-guides.getMany
     */
    listStyleGuides(
        options?: StyleGuidesModel.ListStyleGuidesOptions,
    ): Promise<ResponseList<StyleGuidesModel.StyleGuide>> {
        let url = `${this.url}/style-guides`;
        url = this.addQueryParam(url, 'orderBy', options?.orderBy);
        url = this.addQueryParam(url, 'userId', options?.userId);
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.style-guides.post
     */
    createStyleGuide(
        request: StyleGuidesModel.CreateStyleGuideRequest,
    ): Promise<ResponseObject<StyleGuidesModel.StyleGuide>> {
        const url = `${this.url}/style-guides`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param styleGuideId style guide identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.style-guides.get
     */
    getStyleGuide(styleGuideId: number): Promise<ResponseObject<StyleGuidesModel.StyleGuide>> {
        const url = `${this.url}/style-guides/${styleGuideId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param styleGuideId style guide identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.style-guides.delete
     */
    deleteStyleGuide(styleGuideId: number): Promise<void> {
        const url = `${this.url}/style-guides/${styleGuideId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param styleGuideId style guide identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.style-guides.patch
     */
    editStyleGuide(
        styleGuideId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<StyleGuidesModel.StyleGuide>> {
        const url = `${this.url}/style-guides/${styleGuideId}`;
        return this.patch(url, request, this.defaultConfig());
    }
}

export namespace StyleGuidesModel {
    export interface StyleGuide {
        id: number;
        name: string;
        aiInstructions: string | null;
        userId: number;
        languageIds: string[] | null;
        projectIds: number[] | null;
        isShared: boolean;
        webUrl: string;
        downloadLink: string;
        createdAt: string;
        updatedAt: string;
        /** Enterprise only */
        groupId?: number;
    }

    export interface CreateStyleGuideRequest {
        name: string;
        storageId: number | null;
        aiInstructions?: string;
        languageIds?: string[];
        projectIds?: number[];
        isShared?: boolean;
        /** Enterprise only */
        groupId?: number | null;
    }

    export interface ListStyleGuidesOptions extends PaginationOptions {
        orderBy?: string;
        userId?: number;
    }
}
