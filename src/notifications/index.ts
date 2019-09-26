import { CrowdinApi, ResponseList, ResponseObject } from '../core';

export class Notifications extends CrowdinApi {
    listSubscriptions(): Promise<ResponseList<NotificationsModel.Subscription>> {
        const url = `${this.url}/notification-channels/subscriptions`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param request request body
     */
    subscribeToChannel(
        request: NotificationsModel.SubscribeToChannel,
    ): Promise<ResponseObject<NotificationsModel.Subscription>> {
        const url = `${this.url}/notification-channels/subscriptions`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param subscriptonId subscripton identifier
     */
    getSubscription(subscriptonId: string): Promise<ResponseObject<NotificationsModel.Subscription>> {
        const url = `${this.url}/notification-channels/subscriptions/${subscriptonId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param subscriptonId subscripton identifier
     */
    removeChannelSubscription(subscriptonId: string): Promise<void> {
        const url = `${this.url}/notification-channels/subscriptions/${subscriptonId}`;
        return this.delete(url, this.defaultConfig());
    }
}

export namespace NotificationsModel {
    export interface Subscription {
        subscriptionId: string;
        type: string;
        status: string;
    }

    export interface SubscribeToChannel {
        subscriptionId: string;
    }
}
