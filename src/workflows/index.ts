import { CrowdinApi, ResponseList, ResponseObject } from '../core';

export class Workflows extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @see https://support.crowdin.com/enterprise/api/#operation/api.projects.workflow-steps.getMany
     */
    listWorkflowSteps(
        projectId: number,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<WorkflowModel.ListWorkflowStepsResponse>> {
        const url = `${this.url}/projects/${projectId}/workflow-steps`;
        return this.getList(url, limit, offset);
    }

    /**
     * @param projectId project identifier
     * @param stepId workflow step identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.projects.workflow-steps.getMany
     */
    getWorkflowStep(
        projectId: number,
        stepId: number,
    ): Promise<ResponseObject<WorkflowModel.ListWorkflowStepsResponse>> {
        const url = `${this.url}/projects/${projectId}/workflow-steps/${stepId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param groupId group identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @see https://support.crowdin.com/enterprise/api/#operation/api.workflow-templates.getMany
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
     * @see https://support.crowdin.com/enterprise/api/#operation/api.workflow-templates.get
     */
    getWorkflowTemplateInfo(templateId: number): Promise<ResponseObject<WorkflowModel.Workflow>> {
        const url = `${this.url}/workflow-templates/${templateId}`;
        return this.get(url, this.defaultConfig());
    }
}

export namespace WorkflowModel {
    export interface ListWorkflowStepsResponse {
        id: number;
        title: string;
        type: string;
        languages: string[];
        config:
            | {
                  minRelevant: string;
                  autoSubstitution: number;
                  assignees: Record<string, number[]>;
              }
            | never[];
    }
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
