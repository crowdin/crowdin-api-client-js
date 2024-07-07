import { CrowdinApi, isOptionalNumber, PaginationOptions, PatchRequest, ResponseList, ResponseObject } from '../core';
import { ScreenshotsModel } from '../screenshots';
import { SourceStringsModel } from '../sourceStrings';

export class Labels extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param options optional pagination parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.labels.getMany
     */
    listLabels(projectId: number, options?: LabelsModel.ListLabelsParams): Promise<ResponseList<LabelsModel.Label>>;
    /**
     * @param projectId project identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @deprecated optional parameters should be passed through an object
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.labels.getMany
     */
    listLabels(projectId: number, limit?: number, offset?: number): Promise<ResponseList<LabelsModel.Label>>;
    listLabels(
        projectId: number,
        options?: number | LabelsModel.ListLabelsParams,
        deprecatedOffset?: number,
    ): Promise<ResponseList<LabelsModel.Label>> {
        if (isOptionalNumber(options, '1' in arguments)) {
            options = { limit: options, offset: deprecatedOffset };
        }
        let url = `${this.url}/projects/${projectId}/labels`;
        url = this.addQueryParam(url, 'orderBy', options.orderBy);
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.labels.post
     */
    addLabel(projectId: number, request: LabelsModel.AddLabelRequest): Promise<ResponseObject<LabelsModel.Label>> {
        const url = `${this.url}/projects/${projectId}/labels`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param labelId label identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.labels.get
     */
    getLabel(projectId: number, labelId: number): Promise<ResponseObject<LabelsModel.Label>> {
        const url = `${this.url}/projects/${projectId}/labels/${labelId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param labelId label identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.labels.delete
     */
    deleteLabel(projectId: number, labelId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/labels/${labelId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param labelId label identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.labels.patch
     */
    editLabel(projectId: number, labelId: number, request: PatchRequest[]): Promise<ResponseObject<LabelsModel.Label>> {
        const url = `${this.url}/projects/${projectId}/labels/${labelId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param labelId label identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.labels.screenshots.post
     */
    assignLabelToScreenshots(
        projectId: number,
        labelId: number,
        request: LabelsModel.AssignLabelToScreenshotsRequet,
    ): Promise<ResponseList<ScreenshotsModel.Screenshot>> {
        const url = `${this.url}/projects/${projectId}/labels/${labelId}/screenshots`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param labelId label identifier
     * @param screenshotIds screenshot identifiers
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.labels.screenshots.deleteMany
     */
    unassignLabelFromScreenshots(
        projectId: number,
        labelId: number,
        screenshotIds: string,
    ): Promise<ResponseList<ScreenshotsModel.Screenshot>> {
        let url = `${this.url}/projects/${projectId}/labels/${labelId}/screenshots`;
        url = this.addQueryParam(url, 'screenshotIds', screenshotIds);
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param labelId label identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.labels.strings.post
     */
    assignLabelToString(
        projectId: number,
        labelId: number,
        request: LabelsModel.AssignLabelToStringsRequet,
    ): Promise<ResponseList<SourceStringsModel.String>> {
        const url = `${this.url}/projects/${projectId}/labels/${labelId}/strings`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param labelId label identifier
     * @param stringIds string identifiers
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.labels.strings.deleteMany
     */
    unassignLabelFromString(
        projectId: number,
        labelId: number,
        stringIds: string,
    ): Promise<ResponseList<SourceStringsModel.String>> {
        let url = `${this.url}/projects/${projectId}/labels/${labelId}/strings`;
        url = this.addQueryParam(url, 'stringIds', stringIds);
        return this.delete(url, this.defaultConfig());
    }
}

export namespace LabelsModel {
    export interface ListLabelsParams extends PaginationOptions {
        orderBy?: string;
    }

    export interface Label {
        id: number;
        title: string;
    }

    export interface AddLabelRequest {
        title: string;
    }

    export interface AssignLabelToStringsRequet {
        stringIds: number[];
    }

    export interface AssignLabelToScreenshotsRequet {
        screenshotIds: number[];
    }
}
