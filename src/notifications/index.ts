import { CrowdinApi, ResponseList, ResponseObject, PatchRequest } from '../core';

export namespace Notifications {

    export class Api extends CrowdinApi {

        listSubscriptions(): Promise<ResponseList<Model.Subscription>> {
            let url = `${this.url}/notification-channels/subscriptions`;
            return this.get(url, this.defaultConfig());
        }

        /**
         * @param request request body
         */
        subscribeToChannel(request: Model.SubscribeToChannel): Promise<ResponseObject<Model.Subscription>> {
            let url = `${this.url}/notification-channels/subscriptions`;
            return this.post(url, request, this.defaultConfig());
        }

        /**
         * @param subscriptonId subscripton identifier
         */
        getSubscription(subscriptonId: string): Promise<ResponseObject<Model.Subscription>> {
            let url = `${this.url}/notification-channels/subscriptions/${subscriptonId}`;
            return this.get(url, this.defaultConfig());
        }

        /**
         * @param subscriptonId subscripton identifier
         */
        removeChannelSubscription(subscriptonId: string): Promise<void> {
            let url = `${this.url}/notification-channels/subscriptions/${subscriptonId}`;
            return this.delete(url, this.defaultConfig());
        }

    }

    export namespace Model {

        export interface Subscription {
            subscriptionId: string;
            type: string;
            status: string;
        }

        export interface SubscribeToChannel {
            subscriptionId: string;
        }
    }
}