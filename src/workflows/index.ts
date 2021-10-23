import { CrowdinApi, ResponseList, ResponseObject } from '../core';

export class Workflows extends CrowdinApi {
    /**
     * @param groupId group identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     */
    listWorkflowTemplates(
        groupId?: number,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<WorkflowModel.Workflow>>;

    listWorkflowTemplates(
        groupIdOrRequest?: number | WorkflowModel.ListWorkflowTemplatesRequest,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<WorkflowModel.Workflow>> {
        let url = `${this.url}/workflow-templates`;
        let request: WorkflowModel.ListWorkflowTemplatesRequest;
        if (groupIdOrRequest && typeof groupIdOrRequest === 'object') {
            request = groupIdOrRequest;
        } else {
            request = { groupId: groupIdOrRequest, limit, offset };
        }
        url = this.addQueryParam(url, 'groupId', request.groupId);
        return this.getList(url, request.limit, request.offset);
    }

    /**
     * @param templateId workflow template identifier
     */
    getWorkflowTemplateInfo(templateId: number): Promise<ResponseObject<WorkflowModel.Workflow>> {
        const url = `${this.url}/workflow-templates/${templateId}`;
        return this.get(url, this.defaultConfig());
    }
}

export namespace WorkflowModel {
    export interface ListWorkflowTemplatesRequest {
        groupId?: number;
        limit?: number;
        offset?: number;
    }

    export interface Workflow {
        id: number;
        title: string;
        description: string;
        groupId: number;
        isDefault: boolean;
    }
}
