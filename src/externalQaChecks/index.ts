import { CrowdinApi, PaginationOptions, ResponseList, ResponseObject } from '../core';

/**
 * External QA checks are provided by Crowdin apps and run additional quality checks on translations.
 *
 * Use the API to list and get the external QA checks available in the organization.
 */
export class ExternalQaChecks extends CrowdinApi {
    /**
     * @param options optional pagination and filter parameters for the request
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/External-QA-Checks/operation/api.external-qa-checks.getMany
     */
    listExternalQaChecks(
        options?: ExternalQaChecksModel.ListExternalQaChecksOptions,
    ): Promise<ResponseList<ExternalQaChecksModel.ExternalQaCheck>> {
        let url = `${this.url}/external-qa-checks`;
        url = this.addQueryParam(url, 'projectId', options?.projectId);
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param externalQaCheckId external QA check identifier
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/External-QA-Checks/operation/api.external-qa-checks.get
     */
    getExternalQaCheck(externalQaCheckId: number): Promise<ResponseObject<ExternalQaChecksModel.ExternalQaCheck>> {
        const url = `${this.url}/external-qa-checks/${externalQaCheckId}`;
        return this.get(url, this.defaultConfig());
    }
}

export namespace ExternalQaChecksModel {
    export interface ExternalQaCheck {
        id: number;
        name: string;
        description: string | null;
        config: Record<string, any>;
        createdAt: string;
        updatedAt: string | null;
    }

    export interface ListExternalQaChecksOptions extends PaginationOptions {
        projectId?: number;
    }
}
