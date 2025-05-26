import { CrowdinApi, isOptionalNumber, PaginationOptions, PatchRequest, ResponseList, ResponseObject } from '../core';

export class Distributions extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param options optional pagination parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.distributions.getMany
     */
    listDistributions(
        projectId: number,
        options?: PaginationOptions,
    ): Promise<ResponseList<DistributionsModel.Distribution>>;
    /**
     * @param projectId project identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @deprecated optional parameters should be passed through an object
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.distributions.getMany
     */
    listDistributions(
        projectId: number,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<DistributionsModel.Distribution>>;
    listDistributions(
        projectId: number,
        options?: number | PaginationOptions,
        deprecatedOffset?: number,
    ): Promise<ResponseList<DistributionsModel.Distribution>> {
        if (isOptionalNumber(options, '1' in arguments)) {
            options = { limit: options, offset: deprecatedOffset };
        }
        const url = `${this.url}/projects/${projectId}/distributions`;
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.distributions.post
     */
    createDistribution(
        projectId: number,
        request:
            | DistributionsModel.CreateDistributionRequest
            | DistributionsModel.CreateDistributionStringsBasedRequest,
    ): Promise<ResponseObject<DistributionsModel.Distribution>> {
        const url = `${this.url}/projects/${projectId}/distributions`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param hash hash
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.distributions.get
     */
    getDistribution(projectId: number, hash: string): Promise<ResponseObject<DistributionsModel.Distribution>> {
        const url = `${this.url}/projects/${projectId}/distributions/${hash}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param hash hash
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.distributions.delete
     */
    deleteDistribution(projectId: number, hash: string): Promise<void> {
        const url = `${this.url}/projects/${projectId}/distributions/${hash}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param hash hash
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.distributions.patch
     */
    editDistribution(
        projectId: number,
        hash: string,
        request: PatchRequest[],
    ): Promise<ResponseObject<DistributionsModel.Distribution>> {
        const url = `${this.url}/projects/${projectId}/distributions/${hash}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param hash hash
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.distributions.release.get
     */
    getDistributionRelease(
        projectId: number,
        hash: string,
    ): Promise<
        ResponseObject<DistributionsModel.DistributionRelease | DistributionsModel.DistributionStringsBasedRelease>
    > {
        const url = `${this.url}/projects/${projectId}/distributions/${hash}/release`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param hash hash
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.distributions.release.post
     */
    createDistributionRelease(
        projectId: number,
        hash: string,
    ): Promise<
        ResponseObject<DistributionsModel.DistributionRelease | DistributionsModel.DistributionStringsBasedRelease>
    > {
        const url = `${this.url}/projects/${projectId}/distributions/${hash}/release`;
        return this.post(url, {}, this.defaultConfig());
    }
}

export namespace DistributionsModel {
    export interface Distribution {
        hash: string;
        manifestUrl: string;
        name: string;
        bundleIds: number[];
        createdAt: string;
        updatedAt: string;
        exportMode: ExportMode;
        fileIds: number[];
    }

    export interface CreateDistributionRequest {
        exportMode?: ExportMode;
        name: string;
        fileIds?: number[];
        bundleIds?: number[];
    }

    export interface CreateDistributionStringsBasedRequest {
        name: string;
        bundleIds: number[];
    }

    export interface DistributionRelease {
        status: string;
        progress: number;
        currentLanguageId: string;
        currentFileId: number;
        date: string;
    }

    export interface DistributionStringsBasedRelease {
        status: string;
        progress: number;
        currentLanguageId: string;
        currentBranchId: number;
        date: string;
    }

    export type ExportMode = 'default' | 'bundle';
}
