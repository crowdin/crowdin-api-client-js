import { CrowdinApi, ResponseObject, PatchRequest, Pagination } from '../core';

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
    listApplicationInstallations(options?: Pagination): Promise<ResponseObject<ApplicationsModel.ApplicationData>> {
        const url = `${this.url}/applications/installations`;
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param applicationUrl Manifest URL
     * @param permissions application permissions
     * @see https://developer.crowdin.com/api/v2/#operation/api.applications.installations.post
     */
    installApplication(
        applicationUrl: string,
        permissions?: ApplicationsModel.ApplicationPermissions,
    ): Promise<ResponseObject<ApplicationsModel.ApplicationData>> {
        const url = `${this.url}/applications/installations`;
        return this.post(url, { url: applicationUrl, permissions: permissions }, this.defaultConfig());
    }

    /**
     * @param applicationId application identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.applications.installations.get
     */
    getApplicationInstallation(applicationId: string): Promise<ResponseObject<ApplicationsModel.ApplicationData>> {
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
    ): Promise<ResponseObject<ApplicationsModel.ApplicationData>> {
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
    ): Promise<ResponseObject<ApplicationsModel.ApplicationData>> {
        const url = `${this.url}/applications/installations/${applicationId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param applicationId application identifier
     * @param path path implemented by the application
     * @see https://developer.crowdin.com/api/v2/#operation/api.applications.api.get
     */
    getApplicationData(
        applicationId: string,
        path: string,
    ): Promise<ResponseObject<ApplicationsModel.ApplicationData>> {
        const url = `${this.url}/applications/${applicationId}/api/${path}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param applicationId application identifier
     * @param path path implemented by the application
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.applications.api.put
     */
    updateOrRestoreApplicationData(
        applicationId: string,
        path: string,
        request: ApplicationsModel.ApplicationData,
    ): Promise<ResponseObject<ApplicationsModel.ApplicationData>> {
        const url = `${this.url}/applications/${applicationId}/api/${path}`;
        return this.put(url, request, this.defaultConfig());
    }

    /**
     * @param applicationId application identifier
     * @param path path implemented by the application
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.applications.api.post
     */
    addApplicationData(
        applicationId: string,
        path: string,
        request: ApplicationsModel.ApplicationData,
    ): Promise<ResponseObject<ApplicationsModel.ApplicationData>> {
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
    editApplicationData(
        applicationId: string,
        path: string,
        request: ApplicationsModel.ApplicationData,
    ): Promise<ResponseObject<ApplicationsModel.ApplicationData>> {
        const url = `${this.url}/applications/${applicationId}/api/${path}`;
        return this.patch(url, request, this.defaultConfig());
    }
}

export namespace ApplicationsModel {
    export interface ApplicationData {
        [key: string]: any;
    }

    export interface ApplicationPermissions {
        user: {
            value: 'all' | 'owner' | 'managers' | 'guests' | 'restricted';
            ids: Array<number>;
        };
        project: {
            value: 'own' | 'restricted';
            ids: Array<number>;
        };
    }
}
