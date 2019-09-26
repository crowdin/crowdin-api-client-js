import { HttpClient } from '../..';

declare const fetch: Function;

interface IRequestConfig {
    headers?: [any];
    mode?: string
}

export class FetchClient implements HttpClient {

    private maxConcurrentRequests = 15;
    private requestIntervalMs = 10;
    private pendingRequests = 0;

    get<T>(url: string, config?: { headers: any }): Promise<T> {
        return this.request(url, 'GET', config);
    }
    delete<T>(url: string, config?: { headers: any }): Promise<T> {
        return this.request(url, 'DELETE', config);
    }
    head<T>(url: string, config?: { headers: any }): Promise<T> {
        return this.request(url, 'HEAD', config);
    }
    post<T>(url: string, data?: any, config?: { headers: any }): Promise<T> {
        return this.request(url, 'POST', config, data);
    }
    put<T>(url: string, data?: any, config?: { headers: any }): Promise<T> {
        return this.request(url, 'PUT', config, data);
    }
    patch<T>(url: string, data?: any, config?: { headers: any }): Promise<T> {
        return this.request(url, 'PATCH', config, data);
    }

    private async request(url: string, method: string, config?: IRequestConfig, data?: any) {
        const reqConfig = config || {};
        const reqData = data || {};

        await this.waitInQueue();
        return fetch(url, {
            headers: {
                ...reqConfig.headers,
                'Content-Type': 'application/json'
            },
            mode: reqConfig.mode || 'no-cors',
            body: typeof reqData === 'object'? JSON.stringify(reqData): reqData,
            method,
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