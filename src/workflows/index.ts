import { CrowdinApi, isOptionalNumber, PaginationOptions, ResponseList, ResponseObject } from '../core';

/**
 * Workflows are the sequences of steps that content in your project should go through (e.g. pre-translation, translation, proofreading).
 * You can use a default template or create the one that works best for you and assign it to the needed projects.
 *
 * Use API to get the list of workflow templates available in your organization and to check the details of a specific template.
 */
export class Workflows extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param options optional pagination parameters for the request
     * @see https://support.crowdin.com/enterprise/api/#operation/api.projects.workflow-steps.getMany
     */
    listWorkflowSteps(
        projectId: number,
        options?: PaginationOptions,
    ): Promise<ResponseList<WorkflowModel.WorkflowStep>>;
    /**
     * @param projectId project identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @deprecated optional parameters should be passed through an object
     * @see https://support.crowdin.com/enterprise/api/#operation/api.projects.workflow-steps.getMany
     */
    listWorkflowSteps(
        projectId: number,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<WorkflowModel.WorkflowStep>>;
    listWorkflowSteps(
        projectId: number,
        options?: number | PaginationOptions,
        deprecatedOffset?: number,
    ): Promise<ResponseList<WorkflowModel.WorkflowStep>> {
        if (isOptionalNumber(options, '1' in arguments)) {
            options = { limit: options, offset: deprecatedOffset };
        }
        const url = `${this.url}/projects/${projectId}/workflow-steps`;
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param projectId project identifier
     * @param stepId workflow step identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.projects.workflow-steps.getMany
     */
    getWorkflowStep(projectId: number, stepId: number): Promise<ResponseObject<WorkflowModel.WorkflowStep>> {
        const url = `${this.url}/projects/${projectId}/workflow-steps/${stepId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param options optional parameters for the request
     * @see https://support.crowdin.com/enterprise/api/#operation/api.workflow-templates.getMany
     */
    listWorkflowTemplates(
        options?: WorkflowModel.ListWorkflowTemplatesOptions,
    ): Promise<ResponseList<WorkflowModel.Workflow>>;
    /**
     * @param groupId group identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @deprecated optional parameters should be passed through an object
     * @see https://support.crowdin.com/enterprise/api/#operation/api.workflow-templates.getMany
     */
    listWorkflowTemplates(
        groupId?: number,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<WorkflowModel.Workflow>>;
    listWorkflowTemplates(
        options?: number | WorkflowModel.ListWorkflowTemplatesOptions,
        deprecatedLimit?: number,
        deprecatedOffset?: number,
    ): Promise<ResponseList<WorkflowModel.Workflow>> {
        let url = `${this.url}/workflow-templates`;
        if (isOptionalNumber(options, '0' in arguments)) {
            options = { groupId: options, limit: deprecatedLimit, offset: deprecatedOffset };
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
    export interface WorkflowStep {
        id: number;
        title: string;
        type: string;
        languages: string[];
        config: {
            assignees: { [language: string]: number[] };
        };
    }
    export interface ListWorkflowTemplatesOptions extends PaginationOptions {
        groupId?: number;
    }

    export interface Workflow {
        id: number;
        title: string;
        description: string;
        groupId: number;
        isDefault: boolean;
        webUrl: string;
        steps: {
            id: number;
            languages: string[];
            assignees: number[];
            vendorId: number;
            config: {
                minRelevant: number;
                autoSubstitution: boolean;
            };
            mtId: number;
        }[];
    }
}
