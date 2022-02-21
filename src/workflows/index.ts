import { CrowdinApi, PaginationOptions, ResponseList, ResponseObject } from '../core';

export class Workflows extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @deprecated Optional parameters should be passed through an object
     * @see https://support.crowdin.com/enterprise/api/#operation/api.projects.workflow-steps.getMany
     */
    listWorkflowSteps(
        projectId: number,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<WorkflowModel.ListWorkflowStepsResponse>>;
    /**
     * @param projectId project identifier
     * @param options optional pagination options for the request
     * @see https://support.crowdin.com/enterprise/api/#operation/api.projects.workflow-steps.getMany
     */
    listWorkflowSteps(
        projectId: number,
        options?: PaginationOptions,
    ): Promise<ResponseList<WorkflowModel.ListWorkflowStepsResponse>>;
    listWorkflowSteps(
        projectId: number,
        options: number | PaginationOptions = {},
        deprecatedOffset?: number,
    ): Promise<ResponseList<WorkflowModel.ListWorkflowStepsResponse>> {
        if (typeof options === 'number') {
            options = { limit: options, offset: deprecatedOffset };
            this.emitDeprecationWarning();
        }
        const url = `${this.url}/projects/${projectId}/workflow-steps`;
        return this.getList(url, options.limit, options.offset);
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
     * @deprecated Optional parameters should be passed through an object
     * @see https://support.crowdin.com/enterprise/api/#operation/api.workflow-templates.getMany
     */
    listWorkflowTemplates(
        groupId?: number,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<WorkflowModel.Workflow>>;
    /**
     * @param options optional parameters for the request
     * @see https://support.crowdin.com/enterprise/api/#operation/api.workflow-templates.getMany
     */
    listWorkflowTemplates(
        options?: WorkflowModel.ListWorkflowTemplatesRequest,
    ): Promise<ResponseList<WorkflowModel.Workflow>>;
    listWorkflowTemplates(
        options: number | WorkflowModel.ListWorkflowTemplatesRequest = {},
        deprecatedLimit?: number,
        deprecatedOffset?: number,
    ): Promise<ResponseList<WorkflowModel.Workflow>> {
        let url = `${this.url}/workflow-templates`;
        if (typeof options === 'number') {
            options = { groupId: options, limit: deprecatedLimit, offset: deprecatedOffset };
            this.emitDeprecationWarning();
        }
        url = this.addQueryParam(url, 'groupId', options.groupId);
        return this.getList(url, options.limit, options.offset);
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
    export interface ListWorkflowTemplatesRequest extends PaginationOptions {
        groupId?: number;
    }

    export interface Workflow {
        id: number;
        title: string;
        description: string;
        groupId: number;
        isDefault: boolean;
    }
}
