import { HttpClient } from '../..';

declare const fetch: Function;

export class FetchClient implements HttpClient {

    private maxConcurrentRequests = 15;
    private requestIntervalMs = 10;
    private pendingRequests = 0;

    get<T>(url: string, config?: { headers: any }): Promise<T> {
        return this.request(url, 'GET', config);
    }
    delete<T>(url: string, config?: { headers: any }): Promise<T> {
        return this.request(url, 'GET', config);
    }
    head<T>(url: string, config?: { headers: any }): Promise<T> {
        return this.request(url, 'GET', config);
    }
    post<T>(url: string, data?: any, config?: { headers: any }): Promise<T> {
        return this.request(url, 'GET', config);
    }
    put<T>(url: string, data?: any, config?: { headers: any }): Promise<T> {
        return this.request(url, 'GET', config);
    }
    patch<T>(url: string, data?: any, config?: { headers: any }): Promise<T> {
        return this.request(url, 'GET', config);
    }

    private async request(url: string, method: string, config?: { headers: any }, data?: any) {
        let body = undefined;
        if (!!data) {
            if (typeof data === 'object') {
                body = JSON.stringify(data);
            } else {
                body = data;
            }
        }
        await this.waitInQueue();

        return fetch(url, {
            method: method,
            headers: !!config ? config.headers : {},
            body: body
        })
            .then(async (resp: any) => {
                let json = resp.json();
                if (resp.status >= 200 && resp.status < 300) {
                    return json;
                } else {
                    const err = await json;
                    throw err;
                }
            })
            .finally(() => this.pendingRequests = Math.max(0, this.pendingRequests - 1));
    }

    private waitInQueue() {
        return new Promise((resolve, _reject) => {
            let interval = setInterval(() => {
                if (this.pendingRequests < this.maxConcurrentRequests) {
                    this.pendingRequests++;
                    clearInterval(interval);
                    resolve();
                }
            }, this.requestIntervalMs);
        });
    }

}