import { CrowdinApi, PatchRequest, ResponseList, ResponseObject } from '../core';

export class Distributions extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     */
    listDistributions(
        projectId: number,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<DistributionsModel.Distribution>> {
        const url = `${this.url}/projects/${projectId}/distributions`;
        return this.getList(url, limit, offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     */
    createDistribution(
        projectId: number,
        request: DistributionsModel.CreateDistributionRequest,
    ): Promise<ResponseObject<DistributionsModel.Distribution>> {
        const url = `${this.url}/projects/${projectId}/distributions`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param hash hash
     */
    getDistribution(projectId: number, hash: string): Promise<ResponseObject<DistributionsModel.Distribution>> {
        const url = `${this.url}/projects/${projectId}/distributions/${hash}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param hash hash
     */
    deleteDistribution(projectId: number, hash: string): Promise<void> {
        const url = `${this.url}/projects/${projectId}/distributions/${hash}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param hash hash
     * @param request request body
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
     */
    getDistributionRelease(
        projectId: number,
        hash: string,
    ): Promise<ResponseObject<DistributionsModel.DistributionRelease>> {
        const url = `${this.url}/projects/${projectId}/distributions/${hash}/release`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param hash hash
     * @param request request body
     */
    createDistributionRelease(
        projectId: number,
        hash: string,
    ): Promise<ResponseObject<DistributionsModel.DistributionRelease>> {
        const url = `${this.url}/projects/${projectId}/distributions/${hash}/release`;
        return this.post(url, {}, this.defaultConfig());
    }
}

export namespace DistributionsModel {
    export interface Distribution {
        hash: string;
        name: string;
        fileIds: number[];
        createdAt: string;
        updatedAt: string;
    }

    export interface CreateDistributionRequest {
        name: string;
        fileIds: number[];
    }

    export interface DistributionRelease {
        status: string;
        progress: number;
        currentLanguageId: string;
        currentFileId: number;
        date: string;
    }
}
