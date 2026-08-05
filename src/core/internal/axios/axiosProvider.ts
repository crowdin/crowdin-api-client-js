import axios, { AxiosInstance } from 'axios';
import { HttpClient } from '../../http-client';

/**
 * @internal
 */
export class AxiosProvider implements HttpClient {
    private static readonly CROWDIN_API_MAX_CONCURRENT_REQUESTS = 15;
    private static readonly CROWDIN_API_REQUESTS_INTERVAL_MS = 10;

    private pendingRequests = 0;
    private readonly axios: AxiosInstance = axios.create({});

    constructor() {
        this.configureRequest();
        this.configureResponse();
    }

    withTimeout(timeout?: number): this {
        this.axios.defaults.timeout = timeout;
        return this;
    }

    get<T>(url: string, config?: { headers: Record<string, string> }): Promise<T> {
        return this.unwrap(this.axios.get<T>(url, config));
    }
    delete<T>(url: string, config?: { headers: Record<string, string> }): Promise<T> {
        return this.unwrap(this.axios.delete<T>(url, config));
    }
    head<T>(url: string, config?: { headers: Record<string, string> }): Promise<T> {
        return this.unwrap(this.axios.head<T>(url, config));
    }
    post<T>(url: string, data?: unknown, config?: { headers: Record<string, string> }): Promise<T> {
        return this.unwrap(this.axios.post<T>(url, data, config));
    }
    put<T>(url: string, data?: unknown, config?: { headers: Record<string, string> }): Promise<T> {
        return this.unwrap(this.axios.put<T>(url, data, config));
    }
    patch<T>(url: string, data?: unknown, config?: { headers: Record<string, string> }): Promise<T> {
        return this.unwrap(this.axios.patch<T>(url, data, config));
    }

    private async unwrap<T>(request: Promise<{ data: T }>): Promise<T> {
        return (await request).data;
    }

    private configureRequest(): void {
        this.axios.interceptors.request.use((config) => {
            return new Promise((resolve) => {
                const interval = setInterval(() => {
                    if (this.pendingRequests < AxiosProvider.CROWDIN_API_MAX_CONCURRENT_REQUESTS) {
                        this.pendingRequests++;
                        clearInterval(interval);
                        resolve(config);
                    }
                }, AxiosProvider.CROWDIN_API_REQUESTS_INTERVAL_MS);
            });
        });
    }

    private configureResponse(): void {
        this.axios.interceptors.response.use(
            (response) => {
                this.pendingRequests = Math.max(0, this.pendingRequests - 1);
                return response;
            },
            (error: unknown) => {
                this.pendingRequests = Math.max(0, this.pendingRequests - 1);
                return Promise.reject(error);
            },
        );
    }
}
