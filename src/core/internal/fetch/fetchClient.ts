/**
 * Import DOM types for this module _just_ to expose adequate types for
 * fetch interfaces
 */
/// <reference lib="dom" />

import { HttpClient } from '../..';
import { FetchClientJsonPayloadError } from './fetchClientError';

/**
 * @internal
 */
export class FetchClient implements HttpClient {
    private maxConcurrentRequests = 15;
    private requestIntervalMs = 10;
    private pendingRequests = 0;

    get<T>(url: string, config?: { headers: Record<string, string> }): Promise<T> {
        return this.request(url, 'GET', config);
    }
    delete<T>(url: string, config?: { headers: Record<string, string> }): Promise<T> {
        return this.request(url, 'DELETE', config);
    }
    head<T>(url: string, config?: { headers: Record<string, string> }): Promise<T> {
        return this.request(url, 'HEAD', config);
    }
    post<T>(url: string, data?: unknown, config?: { headers: Record<string, string> }): Promise<T> {
        return this.request(url, 'POST', config, data);
    }
    put<T>(url: string, data?: unknown, config?: { headers: Record<string, string> }): Promise<T> {
        return this.request(url, 'PUT', config, data);
    }
    patch<T>(url: string, data?: unknown, config?: { headers: Record<string, string> }): Promise<T> {
        return this.request(url, 'PATCH', config, data);
    }

    private async request<T>(
        url: string,
        method: string,
        config?: { headers: Record<string, string> },
        data?: unknown,
    ): Promise<T> {
        let body = '{}';
        if (data) {
            if (typeof data === 'object' && !this.isBuffer(data)) {
                body = JSON.stringify(data);
                config = config ?? { headers: {} };
                config.headers = config.headers ?? {};
                config.headers['Content-Type'] = 'application/json';
            } else {
                body = typeof data === 'string' ? data : JSON.stringify(data);
            }
        }
        await this.waitInQueue();

        return fetch(url, {
            method: method,
            headers: config ? config.headers : {},
            body: body,
        })
            .then(async res => {
                if (res.status === 204) {
                    return {};
                }
                const text = await res.text();
                const json = text ? JSON.parse(text) : {};
                if (res.status >= 200 && res.status < 300) {
                    return json;
                } else {
                    throw new FetchClientJsonPayloadError(res.statusText, json, res.status);
                }
            })
            .finally(() => (this.pendingRequests = Math.max(0, this.pendingRequests - 1)));
    }

    private isBuffer(data: unknown): boolean {
        if (typeof ArrayBuffer === 'function') {
            return ArrayBuffer.isView(data);
        } else if (typeof Buffer === 'function') {
            return Buffer.isBuffer(data);
        } else {
            return false;
        }
    }

    private waitInQueue(): Promise<void> {
        return new Promise<void>(resolve => {
            const interval = setInterval(() => {
                if (this.pendingRequests < this.maxConcurrentRequests) {
                    this.pendingRequests++;
                    clearInterval(interval);
                    resolve();
                }
            }, this.requestIntervalMs);
        });
    }
}
