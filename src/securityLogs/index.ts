import { CrowdinApi, PaginationOptions, ResponseList, ResponseObject } from '../core';

export class SecurityLogs extends CrowdinApi {
    /**
     * @param options optional parameters for the request
     * @see https://support.crowdin.com/enterprise/api/#operation/api.projects.workflow-steps.getMany
     */
    listOrganizationSecurityLogs(
        options?: SecurityLogsModel.ListOrganizationSecurityLogsParams,
    ): Promise<ResponseList<SecurityLogsModel.SecurityLog>> {
        let url = `${this.url}/security-logs`;
        url = this.addQueryParam(url, 'event', options?.event);
        url = this.addQueryParam(url, 'createdAfter', options?.createdAfter);
        url = this.addQueryParam(url, 'createdBefore', options?.createdBefore);
        url = this.addQueryParam(url, 'ipAddress', options?.ipAddress);
        url = this.addQueryParam(url, 'userId', options?.userId);
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param securityLogId security log identifier
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.security-logs.get
     */
    getOrganizationSecurityLog(securityLogId: number): Promise<ResponseObject<SecurityLogsModel.SecurityLog>> {
        const url = `${this.url}/security-logs/${securityLogId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.users.security-logs.getMany
     */
    listUserSecurityLogs(
        userId: number,
        options?: SecurityLogsModel.ListUserSecurityLogsParams,
    ): Promise<ResponseList<SecurityLogsModel.SecurityLog>> {
        let url = `${this.url}/users/${userId}/security-logs`;
        url = this.addQueryParam(url, 'event', options?.event);
        url = this.addQueryParam(url, 'createdAfter', options?.createdAfter);
        url = this.addQueryParam(url, 'createdBefore', options?.createdBefore);
        url = this.addQueryParam(url, 'ipAddress', options?.ipAddress);
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param userId security log identifier
     * @param securityLogId security log identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.users.security-logs.get
     */
    getUserSecurityLog(userId: number, securityLogId: number): Promise<ResponseObject<SecurityLogsModel.SecurityLog>> {
        const url = `${this.url}/users/${userId}/security-logs/${securityLogId}`;
        return this.get(url, this.defaultConfig());
    }
}

export namespace SecurityLogsModel {
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
        | 'user.registered'
        | 'user.remove'
        | 'application.connected'
        | 'application.disconnected'
        | 'webauthn.created'
        | 'webauthn.deleted'
        | 'trusted_device.remove'
        | 'trusted_device.remove_all'
        | 'device_verification.enabled'
        | 'device_verification.disabled'
        | 'user.force_removed'
        | 'user.blocked'
        | 'user.unblocked'
        | 'team.member.added'
        | 'team.member.removed'
        | 'role.admin.granted'
        | 'role.admin.revoked'
        | 'role.group_manager.granted'
        | 'role.group_manager.revoked'
        | 'organization.settings.saml.changed'
        | 'organization.settings.invite_restrict.changed'
        | 'organization.settings.device_verification.changed'
        | 'organization.settings.mfa.changed'
        | 'organization.settings.remember_me.changed'
        | 'organization.settings.sign_up.changed'
        | 'organization.settings.token_creation.changed'
        | 'organization.settings.token_expiration.changed'
        | 'sso.custom_app.configured'
        | 'sso.custom_app.disabled'
        | 'organization.auth_method.disabled'
        | 'organization.auth_method.enabled';

    export interface ListOrganizationSecurityLogsParams extends PaginationOptions {
        event?: Event;
        createdAfter?: string;
        createdBefore?: string;
        ipAddress?: string;
        userId?: number;
    }

    export type ListUserSecurityLogsParams = Omit<ListOrganizationSecurityLogsParams, 'userId'>;

    export interface SecurityLog {
        id: number;
        event: string;
        info: string;
        userId: number;
        location: string;
        ipAddress: string;
        deviceName: string;
        createdAt: string;
    }
}
