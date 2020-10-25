import { CrowdinApi, PatchRequest, ResponseList, ResponseObject } from '../core';
import { SourceStringsModel } from '../sourceStrings';

export class Labels extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     */
    listLabels(projectId: number, limit?: number, offset?: number): Promise<ResponseList<LabelsModel.Label>> {
        const url = `${this.url}/projects/${projectId}/labels`;
        return this.getList(url, limit, offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     */
    addLabel(projectId: number, request: LabelsModel.AddLabelRequest): Promise<ResponseObject<LabelsModel.Label>> {
        const url = `${this.url}/projects/${projectId}/labels`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param labelId label identifier
     */
    getLabel(projectId: number, labelId: number): Promise<ResponseObject<LabelsModel.Label>> {
        const url = `${this.url}/projects/${projectId}/labels/${labelId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param labelId label identifier
     */
    deleteLabel(projectId: number, labelId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/labels/${labelId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param labelId label identifier
     * @param request request body
     */
    editLabel(projectId: number, labelId: number, request: PatchRequest[]): Promise<ResponseObject<LabelsModel.Label>> {
        const url = `${this.url}/projects/${projectId}/labels/${labelId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param labelId label identifier
     * @param request request body
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
