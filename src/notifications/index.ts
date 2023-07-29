import { CrowdinApi } from '../core';

export class Notifications extends CrowdinApi {
    /**
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.notify.post
     */
    sendNotificationToAuthenticatedUser(request: NotificationsModel.Notification): Promise<void> {
        const url = `${this.url}/notify`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.notify.post
     */
    sendNotificationToProjectMembers(
        projectId: number,
        request: NotificationsModel.NotificationByUsers | NotificationsModel.NotificationByRole,
    ): Promise<void> {
        const url = `${this.url}/projects/${projectId}/notify`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param request request body
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.notify.post
     */
    sendNotificationToOrganizationMembers(
        request: NotificationsModel.NotificationByUsers | NotificationsModel.NotificationByRole,
    ): Promise<void> {
        const url = `${this.url}/notify`;
        return this.post(url, request, this.defaultConfig());
    }
}

export namespace NotificationsModel {
    export interface Notification {
        message: string;
    }

    export interface NotificationByUsers extends Notification {
        userIds: number[];
    }

    export interface NotificationByRole extends Notification {
        role: 'owner' | 'admin';
    }
}
