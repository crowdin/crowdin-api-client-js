import { CrowdinApi, PaginationOptions, ResponseObject, PatchRequest, ResponseList } from '../core';

/**
 * Crowdin Apps are web applications that can be integrated with Crowdin to extend its functionality.
 *
 * Use the API to manage the necessary app data.
 */
export class Applications extends CrowdinApi {
    /**
     * @param options optional pagination and filter parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.applications.installations.getMany
     */
    listApplicationInstallations(
        options?: ApplicationsModel.ListApplicationInstallationsOptions,
    ): Promise<ResponseList<ApplicationsModel.Application>> {
        let url = `${this.url}/applications/installations`;
        url = this.addQueryParam(url, 'installedBy', options?.installedBy);
        url = this.addQueryParam(url, 'orderBy', options?.orderBy);
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.applications.installations.post
     */
    installApplication(
        request: ApplicationsModel.InstallApplication | ApplicationsModel.InstallApplicationFromManifest,
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
        let url = `${this.url}/applications/installations/${applicationId}`;
        if (force) {
            url = this.addQueryParam(url, 'force', String(force));
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
     * @see https://support.crowdin.com/developer/api/v2/#tag/Applications/operation/api.applications.installations.update.get
     */
    getApplicationInstallationUpdate(
        applicationId: string,
    ): Promise<ResponseObject<ApplicationsModel.ApplicationInstallationUpdate>> {
        const url = `${this.url}/applications/installations/${applicationId}/update`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param applicationId application identifier
     * @param request request body
     * @see https://support.crowdin.com/developer/api/v2/#tag/Applications/operation/api.applications.installations.update.post
     */
    applyApplicationInstallationUpdate(
        applicationId: string,
        request: ApplicationsModel.ApplyApplicationInstallationUpdateRequest,
    ): Promise<ResponseObject<ApplicationsModel.Application>> {
        const url = `${this.url}/applications/installations/${applicationId}/update`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param applicationId application identifier
     * @param request request body
     * @see https://support.crowdin.com/developer/api/v2/#tag/Applications/operation/api.applications.installations.bundles.post
     */
    uploadApplicationBundle(
        applicationId: string,
        request: ApplicationsModel.UploadApplicationBundleRequest,
    ): Promise<ResponseObject<ApplicationsModel.Application>> {
        const url = `${this.url}/applications/installations/${applicationId}/bundles`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param applicationId application identifier
     * @param options optional pagination and filter parameters for the request
     * @see https://support.crowdin.com/developer/api/v2/#tag/Applications/operation/api.applications.storage.kv.records.getMany
     */
    listApplicationStorageRecords(
        applicationId: string,
        options?: ApplicationsModel.ListStorageRecordsOptions,
    ): Promise<ResponseList<ApplicationsModel.StorageRecord>> {
        let url = `${this.url}/applications/${applicationId}/storage/kv/records`;
        url = this.addQueryParam(url, 'prefix', options?.prefix);
        url = this.addQueryParam(url, 'orderBy', options?.orderBy);
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param applicationId application identifier
     * @param request request body
     * @see https://support.crowdin.com/developer/api/v2/#tag/Applications/operation/api.applications.storage.kv.records.post
     */
    addApplicationStorageRecord(
        applicationId: string,
        request: ApplicationsModel.AddStorageRecordRequest,
    ): Promise<ResponseObject<ApplicationsModel.StorageRecord>> {
        const url = `${this.url}/applications/${applicationId}/storage/kv/records`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param applicationId application identifier
     * @param key key of the record
     * @see https://support.crowdin.com/developer/api/v2/#tag/Applications/operation/api.applications.storage.kv.records.get
     */
    getApplicationStorageRecord(
        applicationId: string,
        key: string,
    ): Promise<ResponseObject<ApplicationsModel.StorageRecord>> {
        const url = `${this.url}/applications/${applicationId}/storage/kv/records/${encodeURIComponent(key)}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param applicationId application identifier
     * @param key key of the record
     * @param request request body
     * @see https://support.crowdin.com/developer/api/v2/#tag/Applications/operation/api.applications.storage.kv.records.patch
     */
    editApplicationStorageRecord(
        applicationId: string,
        key: string,
        request: PatchRequest[],
    ): Promise<ResponseObject<ApplicationsModel.StorageRecord>> {
        const url = `${this.url}/applications/${applicationId}/storage/kv/records/${encodeURIComponent(key)}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param applicationId application identifier
     * @param key key of the record
     * @see https://support.crowdin.com/developer/api/v2/#tag/Applications/operation/api.applications.storage.kv.records.delete
     */
    deleteApplicationStorageRecord(applicationId: string, key: string): Promise<void> {
        const url = `${this.url}/applications/${applicationId}/storage/kv/records/${encodeURIComponent(key)}`;
        return this.delete(url, this.defaultConfig());
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

    /**
     * @param options optional pagination and filter parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.applications.consents.getMany
     */
    listApplicationConsentDecisions(
        options?: ApplicationsModel.ListConsentDecisionsOptions,
    ): Promise<ResponseList<ApplicationsModel.ConsentDecision>> {
        let url = `${this.url}/applications/consents`;
        url = this.addQueryParam(url, 'identifier', options?.identifier);
        url = this.addQueryParam(url, 'orderBy', options?.orderBy);
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.applications.consents.post
     */
    createApplicationConsentDecision(
        request: ApplicationsModel.CreateConsentDecisionRequest,
    ): Promise<ResponseObject<ApplicationsModel.ConsentDecision>> {
        const url = `${this.url}/applications/consents`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param consentId consent decision identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.applications.consents.patch
     */
    editApplicationConsentDecision(
        consentId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<ApplicationsModel.ConsentDecision>> {
        const url = `${this.url}/applications/consents/${consentId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param consentId consent decision identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.applications.consents.delete
     */
    deleteApplicationConsentDecision(consentId: number): Promise<void> {
        const url = `${this.url}/applications/consents/${consentId}`;
        return this.delete(url, this.defaultConfig());
    }
}

export namespace ApplicationsModel {
    export interface Application {
        identifier: string;
        name: string;
        installedBy?: ApplicationUser | null;
        description: string | null;
        logo: string;
        logoUrl?: string | null;
        agent?: ApplicationUser | null;
        baseUrl: string | null;
        manifestUrl: string | null;
        manifest?: any | null;
        createdAt: string | null;
        manifestUpdatedAt?: string | null;
        isManifestOutdated?: boolean;
        modules: ApplicationModule[];
        scopes: string[];
        permissions: ApplicationPermissions;
        defaultPermissions: any;
        limitReached: boolean;
        stringBasedAvailable?: boolean;
        bundle?: ApplicationBundle | null;
    }

    export interface ApplicationUser {
        id: number;
        username: string;
        fullName: string;
        avatarUrl: string;
    }

    export type ApplicationBundle = { mode: 'internal' } | { mode: 'external'; url: string };

    export interface ListApplicationInstallationsOptions extends PaginationOptions {
        installedBy?: number;
        orderBy?: string;
    }

    export interface InstallApplication {
        url: string;
        permissions?: ApplicationPermissions;
        modules?: ApplicationModule[];
        assignAgent?: boolean;
    }

    export interface InstallApplicationFromManifest {
        manifest: ApplicationManifest;
        permissions?: ApplicationPermissions;
        modules?: ApplicationModule[];
    }

    export interface ApplicationManifest {
        name: string;
        description?: string;
        logo?: string;
        scopes?: string[];
        stringBasedAvailable?: boolean;
        modules: Record<string, ApplicationManifestModule[]>;
        default_permissions?: {
            user?: 'owner' | 'managers' | 'all' | 'guests';
            project?: 'own' | 'restricted';
        };
        bundle?: ApplicationBundle;
    }

    export interface ApplicationManifestModule {
        key: string;
        name: string;
        logo?: string;
        description?: string;
        environments?: ('crowdin' | 'crowdin-enterprise')[];
        permissions?: Omit<ApplicationPermissions, 'project'>;
        [key: string]: any;
    }

    export interface ApplicationInstallationUpdate {
        manifestHash: string | null;
        latestManifest: any | null;
        addedScopes: string[];
        removedScopes: string[];
        addedModules: any[];
        removedModules: any[];
        changedModules: any[];
        changedEvents: Record<string, { from: string; to: string }>;
        baseUrlChanged: { from: string | null; to: string | null } | null;
        authenticationTypeChanged: { from: string | null; to: string | null } | null;
        hasChanges: boolean;
    }

    export interface ApplyApplicationInstallationUpdateRequest {
        manifestHash: string;
    }

    export interface UploadApplicationBundleRequest {
        storageId: number;
    }

    export type StorageRecordValue = string | number | boolean | any[] | Record<string, any>;

    export interface StorageRecord {
        key: string;
        value: StorageRecordValue;
        secret: boolean;
        createdAt: string;
        updatedAt: string;
        expiresAt: string | null;
    }

    export interface ListStorageRecordsOptions extends PaginationOptions {
        prefix?: string;
        orderBy?: string;
    }

    export interface AddStorageRecordRequest {
        key: string;
        value: StorageRecordValue;
        secret?: boolean;
        ttl?: number | null;
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

    export type ConsentStatus = 'granted' | 'denied';

    export interface ConsentUser {
        id: number;
        username: string;
        fullName: string;
        avatarUrl: string;
    }

    export interface ConsentDecision {
        id: number;
        installedBy: ConsentUser | null;
        identifier: string;
        name: string | null;
        status: ConsentStatus;
        scopes: string[];
        createdAt: string;
        updatedAt: string;
    }

    export interface ListConsentDecisionsOptions extends PaginationOptions {
        identifier?: string;
        orderBy?: string;
    }

    export interface CreateConsentDecisionRequest {
        identifier: string;
        installedBy: number;
        status: ConsentStatus;
        scopes?: string[];
    }
}
