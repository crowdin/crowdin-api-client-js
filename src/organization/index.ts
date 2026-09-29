import { CrowdinApi, ResponseObject } from '../core';

/**
 * Organization is the top-level workspace in Crowdin Enterprise that holds projects, members, and settings.
 *
 * Use the API to get organization info and authentication settings.
 */
export class Organization extends CrowdinApi {
    /**
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/Organization/operation/api.organization.get
     */
    getOrganization(): Promise<ResponseObject<OrganizationModel.Organization>> {
        const url = `${this.url}/organization`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/Organization/operation/api.organization.auth-settings.get
     */
    getOrganizationAuthSettings(): Promise<ResponseObject<OrganizationModel.AuthSettings>> {
        const url = `${this.url}/organization/auth-settings`;
        return this.get(url, this.defaultConfig());
    }
}

export namespace OrganizationModel {
    export interface Organization {
        id: number;
        domain: string;
        name: string;
        logo: string | null;
        defaultLogo: string;
        description: string | null;
        internalDescription: string | null;
        cname: string | null;
        isVendor: string;
        defaultPublicProjectsView: 'grid' | 'list';
        plan: {
            name: string;
            wordsLimit: number | null;
            managersLimit: number | null;
        };
        defaults: {
            name: string;
            isLocked: boolean;
            defaultValue: string;
        }[];
    }

    export interface AuthSettings {
        allowSignUp: boolean;
        twoFactorAuthentication: boolean;
        authMethods: {
            name: string;
            isEnabled: boolean;
            isDefault: boolean;
        }[];
    }
}
