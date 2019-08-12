import { CrowdinApi, ResponseList, ResponseObject, PatchRequest } from '../core';

export namespace Notifications {

    export class Api extends CrowdinApi {

        listSubscriptions(): Promise<ResponseList<Model.Subscription>> {
            let url = `${this.url}/notification-channels/subscriptions?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

        /**
         * @param request request body
         */
        subscribeToChannel(request: Model.SubscribeToChannel): Promise<ResponseObject<Model.Subscription>> {
            let url = `${this.url}/notification-channels/subscriptions?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.post(url, request);
        }

        /**
         * @param subscriptonId subscripton identifier
         */
        getSubscription(subscriptonId: string): Promise<ResponseObject<Model.Subscription>> {
            let url = `${this.url}/notification-channels/subscriptions/${subscriptonId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

        /**
         * @param subscriptonId subscripton identifier
         */
        removeChannelSubscription(subscriptonId: string): Promise<void> {
            let url = `${this.url}/notification-channels/subscriptions/${subscriptonId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.delete(url);
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