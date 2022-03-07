import { CrowdinApi, isOptionalNumber, PaginationOptions, PatchRequest, ResponseList, ResponseObject } from '../core';
import { SourceStringsModel } from '../sourceStrings';

export class Labels extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param options optional pagination parameters for the request
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.labels.getMany
     */
    listLabels(projectId: number, options?: PaginationOptions): Promise<ResponseList<LabelsModel.Label>>;
    /**
     * @param projectId project identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @deprecated optional parameters should be passed through an object
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.labels.getMany
     */
    listLabels(projectId: number, limit?: number, offset?: number): Promise<ResponseList<LabelsModel.Label>>;
    listLabels(
        projectId: number,
        options?: number | PaginationOptions,
        deprecatedOffset?: number,
    ): Promise<ResponseList<LabelsModel.Label>> {
        if (isOptionalNumber(options)) {
            options = { limit: options, offset: deprecatedOffset };
        }
        const url = `${this.url}/projects/${projectId}/labels`;
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.labels.post
     */
    addLabel(projectId: number, request: LabelsModel.AddLabelRequest): Promise<ResponseObject<LabelsModel.Label>> {
        const url = `${this.url}/projects/${projectId}/labels`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param labelId label identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.labels.get
     */
    getLabel(projectId: number, labelId: number): Promise<ResponseObject<LabelsModel.Label>> {
        const url = `${this.url}/projects/${projectId}/labels/${labelId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param labelId label identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.labels.delete
     */
    deleteLabel(projectId: number, labelId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/labels/${labelId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param labelId label identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.labels.patch
     */
    editLabel(projectId: number, labelId: number, request: PatchRequest[]): Promise<ResponseObject<LabelsModel.Label>> {
        const url = `${this.url}/projects/${projectId}/labels/${labelId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param labelId label identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.labels.strings.post
     */
    assignLabelToString(
        projectId: number,
        labelId: number,
        request: LabelsModel.AssignLabelToStringRequet,
    ): Promise<ResponseList<SourceStringsModel.String>> {
        const url = `${this.url}/projects/${projectId}/labels/${labelId}/strings`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param labelId label identifier
     * @param stringIds string identifiers
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.labels.strings.deleteMany
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
    export interface Label {
        id: number;
        title: string;
    }

    export interface AddLabelRequest {
        title: string;
    }

    export interface AssignLabelToStringRequet {
        stringIds: number[];
    }
}
