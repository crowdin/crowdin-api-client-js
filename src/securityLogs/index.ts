import { CrowdinApi, ResponseList, isOptionalNumber, ResponseObject } from '../core';

export class SecurityLogs extends CrowdinApi {
    /**
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.users.security-logs.getMany
     */
    listUserSecurityLogs(
        userId: number,
        options?: SecurityLogsModel.SecurtiyOptions,
    ): Promise<ResponseList<SecurityLogsModel.Log>>;
    /**
     * @param userId User identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @param event
     * @param createdAfter
     * @param createdBefore
     * @deprecated optional parameters should be passed through an object
     * @see https://developer.crowdin.com/api/v2/#operation/api.users.security-logs.getMany
     */
    listUserSecurityLogs(
        userId: number,
        limit?: number,
        offset?: number,
        event?: SecurityLogsModel.Event,
        createdAfter?: string,
        createdBefore?: string,
        ipAddress?: string,
    ): Promise<ResponseList<SecurityLogsModel.Log>>;
    listUserSecurityLogs(
        userId: number,
        options?: number | SecurityLogsModel.SecurtiyOptions,
        deprecatedoffset?: number,
        deprecatedevent?: SecurityLogsModel.Event,
        deprecatedcreatedAfter?: string,
        deprecatedcreatedBefore?: string,
        deprecatedipAddress?: string,
    ): Promise<ResponseList<SecurityLogsModel.Log>> {
        if (isOptionalNumber(options, '2' in arguments)) {
            options = {
                limit: options,
                offset: deprecatedoffset,
                event: deprecatedevent,
                createdAfter: deprecatedcreatedAfter,
                createdBefore: deprecatedcreatedBefore,
                ipAddress: deprecatedipAddress,
            };
        }
        let url = `${this.url}/users/${userId}/security-logs`;
        url = this.addQueryParam(url, 'event', options.event);
        url = this.addQueryParam(url, 'createdAfter', options.createdAfter);
        url = this.addQueryParam(url, 'createdBefore', options.createdBefore);
        url = this.addQueryParam(url, 'ipAddress', options.ipAddress);
        url = this.addQueryParam(url, 'createdAfter', options.createdAfter);
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param userId User identifier
     * @param securityLogId User Security Log
     * @see https://developer.crowdin.com/api/v2/#operation/api.users.security-logs.get
     */
    getUserSecurityLog(userId: number, securityLogId: any): Promise<ResponseObject<SecurityLogsModel.Log>> {
        const url = `${this.url}/users/${userId}/security-logs/${securityLogId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.security-logs.getMany
     */
    listOrganizationSecurityLogs(
        options?: SecurityLogsModel.SecurtiyOptionsOrganization,
    ): Promise<ResponseList<SecurityLogsModel.Log>>;
    /**
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @param event
     * @param createdAfter
     * @param createdBefore
     * @param userId User identifier
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.security-logs.getMany
     */
    listOrganizationSecurityLogs(
        limit?: number,
        offset?: number,
        event?: SecurityLogsModel.Event,
        createdAfter?: string,
        createdBefore?: string,
        ipAddress?: string,
        userId?: number,
    ): Promise<ResponseList<SecurityLogsModel.Log>>;
    listOrganizationSecurityLogs(
        options?: number | SecurityLogsModel.SecurtiyOptionsOrganization,
        deprecatedoffset?: number,
        deprecatedevent?: SecurityLogsModel.Event,
        deprecatedcreatedAfter?: string,
        deprecatedcreatedBefore?: string,
        deprecatedipAddress?: string,
        deprecateduserId?: number,
    ): Promise<ResponseList<SecurityLogsModel.Log>> {
        if (isOptionalNumber(options, '1' in arguments)) {
            options = {
                limit: options,
                offset: deprecatedoffset,
                event: deprecatedevent,
                createdAfter: deprecatedcreatedAfter,
                createdBefore: deprecatedcreatedBefore,
                ipAddress: deprecatedipAddress,
                userId: deprecateduserId,
            };
        }
        let url = `${this.url}/security-logs`;
        url = this.addQueryParam(url, 'event', options.event);
        url = this.addQueryParam(url, 'createdAfter', options.createdAfter);
        url = this.addQueryParam(url, 'createdBefore', options.createdBefore);
        url = this.addQueryParam(url, 'ipAddress', options.ipAddress);
        url = this.addQueryParam(url, 'userId', options.userId);
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param securityLogId Organization securtiy log
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.security-logs.get
     */
    getOrganizationSecurityLog(securityLogId: any): Promise<ResponseObject<SecurityLogsModel.Log>> {
        const url = `${this.url}/security-logs/${securityLogId}`;
        return this.get(url, this.defaultConfig());
    }
}
export namespace SecurityLogsModel {
    export interface Log {
        id: number;
        event: string;
        info: string;
        userId: number;
        location: string;
        ipAddress: string;
        deviceName: string;
        createdAt: string;
    }

    export interface SecurtiyOptions {
        limit?: number;
        offset?: number;
        event?: Event;
        createdAfter?: string;
        createdBefore?: string;
        ipAddress?: string;
    }

    export interface SecurtiyOptionsOrganization {
        limit?: number;
        offset?: number;
        event?: Event;
        createdAfter?: string;
        createdBefore?: string;
        ipAddress?: string;
        userId?: number;
    }

    export type Event =
        | 'login'
        | 'password.set'
        | 'password.change'
        | 'email.change'
        | 'login.change'
        | 'personal_token.issued'
        | 'personal_token.revoked'
        | 'mfa.enabled'
        | 'mfa.disabled'
        | 'session.revoke'
        | 'session.revoke_all'
        | 'sso.connect'
        | 'sso.disconnect'
        | 'user.remove'
        | 'application.connected'
        | 'application.disconnected'
        | 'webauthn.created'
        | 'webauthn.deleted'
        | 'trusted_device.remove'
        | 'trusted_device.remove_all'
        | 'device_verification.enabled'
        | 'device_verification.disabled';
}
