import { CrowdinApi, ResponseObject, PatchRequest, Pagination, ResponseList } from '../core';

/**
 * Crowdin Apps are web applications that can be integrated with Crowdin to extend its functionality.
 *
 * Use the API to manage the necessary app data.
 */
export class Applications extends CrowdinApi {
    /**
     * @param options optional pagination parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.applications.installations.getMany
     */
    listApplicationInstallations(options?: Pagination): Promise<ResponseList<ApplicationsModel.Application>> {
        const url = `${this.url}/applications/installations`;
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.applications.installations.post
     */
    installApplication(
        request: ApplicationsModel.InstallApplication,
    ): Promise<ResponseObject<ApplicationsModel.Application>> {
        const url = `${this.url}/applications/installations`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param applicationId application identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.applications.installations.get
     */
    getApplicationInstallation(applicationId: string): Promise<ResponseObject<ApplicationsModel.Application>> {
        const url = `${this.url}/applications/installations/${applicationId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param applicationId application identifier
     * @param force force delete the application
     * @see https://developer.crowdin.com/api/v2/#operation/api.applications.installations.delete
     */
    deleteApplicationInstallation(
        applicationId: string,
        force?: boolean,
    ): Promise<ResponseObject<ApplicationsModel.Application>> {
        const url = `${this.url}/applications/installations/${applicationId}`;
        if (force) {
            this.addQueryParam(url, 'force', String(force));
        }
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param applicationId application identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.applications.installations.patch
     */
    editApplicationInstallation(
        applicationId: string,
        request: PatchRequest[],
    ): Promise<ResponseObject<ApplicationsModel.Application>> {
        const url = `${this.url}/applications/installations/${applicationId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param applicationId application identifier
     * @param path path implemented by the application
     * @see https://developer.crowdin.com/api/v2/#operation/api.applications.api.get
     */
    getApplicationData(applicationId: string, path: string): Promise<ResponseObject<any>> {
        const url = `${this.url}/applications/${applicationId}/api/${path}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param applicationId application identifier
     * @param path path implemented by the application
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.applications.api.put
     */
    updateOrRestoreApplicationData(applicationId: string, path: string, request: any): Promise<ResponseObject<any>> {
        const url = `${this.url}/applications/${applicationId}/api/${path}`;
        return this.put(url, request, this.defaultConfig());
    }

    /**
     * @param applicationId application identifier
     * @param path path implemented by the application
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.applications.api.post
     */
    addApplicationData(applicationId: string, path: string, request: any): Promise<ResponseObject<any>> {
        const url = `${this.url}/applications/${applicationId}/api/${path}`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param applicationId application identifier
     * @param path path implemented by the application
     * @see https://developer.crowdin.com/api/v2/#operation/api.applications.api.delete
     */
    deleteApplicationData(applicationId: string, path: string): Promise<void> {
        const url = `${this.url}/applications/${applicationId}/api/${path}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param applicationId application identifier
     * @param path path implemented by the application
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.applications.api.patch
     */
    editApplicationData(applicationId: string, path: string, request: any): Promise<ResponseObject<any>> {
        const url = `${this.url}/applications/${applicationId}/api/${path}`;
        return this.patch(url, request, this.defaultConfig());
    }
}

export namespace ApplicationsModel {
    export interface Application {
        identifier: string;
        name: string;
        description: string;
        logo: string;
        baseUrl: string;
        manifestUrl: string;
        createdAt: string;
        modules: ApplicationModule[];
        scopes: string[];
        permissions: ApplicationPermissions;
        defaultPermissions: any;
        limitReached: boolean;
    }

    export interface InstallApplication {
        url: string;
        permissions?: ApplicationPermissions;
        modules?: ApplicationModule[];
    }

    export interface ApplicationPermissions {
        user: {
            value: 'all' | 'owner' | 'managers' | 'guests' | 'restricted';
            ids: number[];
        };
        project: {
            value: 'own' | 'restricted';
            ids: number[];
        };
    }

    export interface ApplicationModule {
        key: string;
        type?: string;
        data?: any;
        authenticationType?: string;
        permissions: Omit<ApplicationPermissions, 'project'>;
    }
}
