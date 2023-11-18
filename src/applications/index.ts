import { CrowdinApi, ResponseObject } from '../core';

/**
 * Crowdin Apps are web applications that can be integrated with Crowdin to extend its functionality.
 *
 * Use the API to manage the necessary app data.
 */
export class Applications extends CrowdinApi {
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
}
