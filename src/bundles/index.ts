import {
    CrowdinApi,
    DownloadLink,
    PaginationOptions,
    PatchRequest,
    ResponseList,
    ResponseObject,
    Status,
} from '../core';
import { SourceFilesModel } from '../sourceFiles';

export class Bundles extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.bundles.getMany
     */
    listBundles(projectId: number, options?: PaginationOptions): Promise<ResponseList<BundlesModel.Bundle>> {
        const url = `${this.url}/projects/${projectId}/bundles`;
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.bundles.post
     */
    addBundle(
        projectId: number,
        request: BundlesModel.CreateBundleRequest,
    ): Promise<ResponseObject<BundlesModel.Bundle>> {
        const url = `${this.url}/projects/${projectId}/bundles`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param bundleId bundle identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.bundles.get
     */
    getBundle(projectId: number, bundleId: number): Promise<ResponseObject<BundlesModel.Bundle>> {
        const url = `${this.url}/projects/${projectId}/bundles/${bundleId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param bundleId bundle identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.bundles.delete
     */
    deleteBundle(projectId: number, bundleId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/bundles/${bundleId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param bundleId bundle identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.bundles.patch
     */
    editBundle(
        projectId: number,
        bundleId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<BundlesModel.Bundle>> {
        const url = `${this.url}/projects/${projectId}/bundles/${bundleId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param bundleId bundle identifier
     * @param exportId export identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.bundles.exports.download.get
     */
    downloadBundle(projectId: number, bundleId: number, exportId: string): Promise<ResponseObject<DownloadLink>> {
        const url = `${this.url}/projects/${projectId}/bundles/${bundleId}/exports/${exportId}/download`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param bundleId bundle identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.bundles.exports.post
     */
    exportBundle(
        projectId: number,
        bundleId: number,
        request?: BundlesModel.ExportBundleRequest,
    ): Promise<ResponseObject<Status<BundlesModel.ExportAttributes>>> {
        const url = `${this.url}/projects/${projectId}/bundles/${bundleId}/exports`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param bundleId bundle identifier
     * @param exportId export identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.bundles.exports.get
     */
    checkBundleExportStatus(
        projectId: number,
        bundleId: number,
        exportId: string,
    ): Promise<ResponseObject<Status<BundlesModel.ExportAttributes>>> {
        const url = `${this.url}/projects/${projectId}/bundles/${bundleId}/exports/${exportId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param bundleId bundle identifier
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.bundles.files.getMany
     */
    listBundleFiles(
        projectId: number,
        bundleId: number,
        options?: PaginationOptions,
    ): Promise<ResponseList<SourceFilesModel.File>> {
        const url = `${this.url}/projects/${projectId}/bundles/${bundleId}/files`;
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param projectId project identifier
     * @param bundleId bundle identifier
     * @param options optional parameters for the request
     * @see https://support.crowdin.com/developer/api/v2/string-based/#tag/Translations/operation/api.projects.bundles.branches.getMany
     */
    listBundleBranches(
        projectId: number,
        bundleId: number,
        options?: PaginationOptions,
    ): Promise<ResponseList<SourceFilesModel.Branch>> {
        const url = `${this.url}/projects/${projectId}/bundles/${bundleId}/branches`;
        return this.getList(url, options?.limit, options?.offset);
    }
}

export namespace BundlesModel {
    export interface Bundle {
        id: number;
        name: string;
        format: string | null;
        sourcePatterns: string[];
        ignorePatterns: string[];
        exportPattern: string | null;
        isMultilingual: boolean;
        includeProjectSourceLanguage: boolean;
        includeInContextPseudoLanguage: boolean;
        sourceLanguageExportPattern: string;
        labelMatchRule: LabelMatchRule | null;
        excludeLabelMatchRule: LabelMatchRule | null;
        labelIds: number[];
        excludeLabelIds: number[];
        languageIds: string[] | null;
        createdAt: string;
        webUrl: string;
        updatedAt: string;
    }

    export interface CreateBundleRequest {
        name: string;
        format?: string;
        sourcePatterns: string[];
        ignorePatterns?: string[];
        exportPattern?: string | null;
        isMultilingual?: boolean;
        includeProjectSourceLanguage?: boolean;
        sourceLanguageExportPattern?: string;
        includeInContextPseudoLanguage?: boolean;
        labelIds?: number[];
        excludeLabelIds?: number[];
        labelMatchRule?: LabelMatchRule | null;
        excludeLabelMatchRule?: LabelMatchRule | null;
        languageIds?: string[] | null;
    }

    export type LabelMatchRule = 'all' | 'any';

    export interface ExportBundleRequest {
        targetLanguageIds?: string[];
        skipUntranslatedStrings?: boolean;
        skipUntranslatedFiles?: boolean;
        // community
        exportApprovedOnly?: boolean;
        // enterprise
        exportWithMinApprovalsCount?: number;
        exportStringsThatPassedWorkflow?: boolean;
    }

    export interface ExportAttributes {
        bundleId: number;
        targetLanguageIds?: string[];
        skipUntranslatedStrings?: boolean;
        skipUntranslatedFiles?: boolean;
        // community
        exportApprovedOnly?: boolean;
        // enterprise
        exportWithMinApprovalsCount?: number;
        exportStringsThatPassedWorkflow?: boolean;
    }
}
