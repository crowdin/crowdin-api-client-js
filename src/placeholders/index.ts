import { CrowdinApi, PaginationOptions, PatchRequest, ResponseList, ResponseObject } from '../core';

/**
 * Placeholders are constructs in source strings (variables, tags, format specifiers) that must be kept intact in translations.
 *
 * Use the API to manage organization custom placeholders, assign them to projects, and turn system placeholders on or off per project.
 */
export class Placeholders extends CrowdinApi {
    /**
     * @param options optional pagination parameters for the request
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/Placeholders/operation/api.custom-placeholders.getMany
     */
    listCustomPlaceholders(options?: PaginationOptions): Promise<ResponseList<PlaceholdersModel.CustomPlaceholder>> {
        const url = `${this.url}/custom-placeholders`;
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param request request body
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/Placeholders/operation/api.custom-placeholders.post
     */
    addCustomPlaceholder(
        request: PlaceholdersModel.AddCustomPlaceholderRequest,
    ): Promise<ResponseObject<PlaceholdersModel.CustomPlaceholder>> {
        const url = `${this.url}/custom-placeholders`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param customPlaceholderId custom placeholder identifier
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/Placeholders/operation/api.custom-placeholders.get
     */
    getCustomPlaceholder(customPlaceholderId: number): Promise<ResponseObject<PlaceholdersModel.CustomPlaceholder>> {
        const url = `${this.url}/custom-placeholders/${customPlaceholderId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param customPlaceholderId custom placeholder identifier
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/Placeholders/operation/api.custom-placeholders.delete
     */
    deleteCustomPlaceholder(customPlaceholderId: number): Promise<void> {
        const url = `${this.url}/custom-placeholders/${customPlaceholderId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param customPlaceholderId custom placeholder identifier
     * @param request request body
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/Placeholders/operation/api.custom-placeholders.patch
     */
    editCustomPlaceholder(
        customPlaceholderId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<PlaceholdersModel.CustomPlaceholder>> {
        const url = `${this.url}/custom-placeholders/${customPlaceholderId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param options optional pagination parameters for the request
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/Placeholders/operation/api.projects.placeholders.getMany
     */
    listProjectPlaceholders(
        projectId: number,
        options?: PaginationOptions,
    ): Promise<ResponseList<PlaceholdersModel.ProjectPlaceholder>> {
        const url = `${this.url}/projects/${projectId}/placeholders`;
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/Placeholders/operation/api.projects.placeholders.post
     */
    addProjectPlaceholder(
        projectId: number,
        request: PlaceholdersModel.AddProjectPlaceholderRequest,
    ): Promise<ResponseObject<PlaceholdersModel.ProjectPlaceholder>> {
        const url = `${this.url}/projects/${projectId}/placeholders`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param projectPlaceholderId project placeholder identifier
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/Placeholders/operation/api.projects.placeholders.get
     */
    getProjectPlaceholder(
        projectId: number,
        projectPlaceholderId: number,
    ): Promise<ResponseObject<PlaceholdersModel.ProjectPlaceholder>> {
        const url = `${this.url}/projects/${projectId}/placeholders/${projectPlaceholderId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param projectPlaceholderId project placeholder identifier
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/Placeholders/operation/api.projects.placeholders.delete
     */
    deleteProjectPlaceholder(projectId: number, projectPlaceholderId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/placeholders/${projectPlaceholderId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param projectPlaceholderId project placeholder identifier
     * @param request request body
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/Placeholders/operation/api.projects.placeholders.patch
     */
    editProjectPlaceholder(
        projectId: number,
        projectPlaceholderId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<PlaceholdersModel.ProjectPlaceholder>> {
        const url = `${this.url}/projects/${projectId}/placeholders/${projectPlaceholderId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param options optional pagination parameters for the request
     * @see https://support.crowdin.com/developer/api/v2/#tag/Placeholders/operation/api.projects.system-placeholders.getMany
     */
    listSystemPlaceholders(
        projectId: number,
        options?: PaginationOptions,
    ): Promise<ResponseList<PlaceholdersModel.SystemPlaceholder>> {
        const url = `${this.url}/projects/${projectId}/system-placeholders`;
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/developer/api/v2/#tag/Placeholders/operation/api.projects.system-placeholders.batchPatch
     */
    systemPlaceholdersBatchOperations(
        projectId: number,
        request: PatchRequest[],
    ): Promise<ResponseList<PlaceholdersModel.SystemPlaceholder>> {
        const url = `${this.url}/projects/${projectId}/system-placeholders`;
        return this.patch(url, request, this.defaultConfig());
    }
}

export namespace PlaceholdersModel {
    export interface CustomPlaceholder {
        id: number;
        definition?: string;
        description: string | null;
        argumentDelimiter?: string;
    }

    export interface AddCustomPlaceholderRequest {
        definition: string;
        description?: string;
        argumentDelimiter?: string;
    }

    export type ProjectPlaceholderType = 'high' | 'low';

    export interface ProjectPlaceholder {
        id: number | null;
        customPlaceholderId: number | null;
        type: ProjectPlaceholderType | null;
        index: number | null;
        isBlocking: boolean | null;
        formats: string[];
    }

    export interface AddProjectPlaceholderRequest {
        customPlaceholderId: number;
        type?: ProjectPlaceholderType;
        index?: number;
        isBlocking?: boolean;
        formats?: string[];
    }

    export type SystemPlaceholderId =
        | 'wrappedAmpersand'
        | 'appleStringsdictPlural'
        | 'dollarInsideBraces'
        | 'dollarOutsideBraces'
        | 'wrappedColon'
        | 'wrappedDollar'
        | 'dollarParentheses'
        | 'i18nextNesting'
        | 'i18nextLegacy'
        | 'rubyInterpolation'
        | 'mailchimpMergeTag'
        | 'swiftInterpolation'
        | 'bracesTriple'
        | 'bracesDouble'
        | 'bracesSingle'
        | 'bracesDoubleFormatted'
        | 'dateTimePattern'
        | 'appleStringCatalogNamed'
        | 'printfSpecifier'
        | 'pythonPercentFormat'
        | 'railsI18n'
        | 'javaMessageFormat'
        | 'dotNetCompositeFormat'
        | 'twig'
        | 'phpInterpolation'
        | 'freemarkerDirective'
        | 'wrappedPercent'
        | 'dateTimeSpecifier';

    export interface SystemPlaceholder {
        id: SystemPlaceholderId;
        isEnabled: boolean;
        label: string;
        examples: string[];
        description: string;
    }
}
