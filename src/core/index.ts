import { AxisProvider } from './internal/axios/axiosProvider';
import { AxiosRequestConfig } from 'axios';
import { URL } from 'url';
import { FetchClient } from './internal/fetch/fetchClient';

export abstract class CrowdinApi {

    private static readonly CROWDIN_URL_SUFFIX: string = 'crowdin.com/api/v2';
    private static readonly AXIOS_INSTANCE = new AxisProvider().axios;
    private static readonly FETCH_INSTANCE = new FetchClient();
    private static readonly QUERY_PARAM_PATTERN = new RegExp(/\?.+=.*/g);

    readonly token: string;
    readonly organization: string;
    readonly url: string;
    readonly config: ClientConfig | undefined;

    /**
     * @param credentials credentials
     * @param config optional configuration of the client
     */
    constructor(credentials: Credentials, config?: ClientConfig) {
        this.token = credentials.token;
        this.organization = !!credentials.organization ? credentials.organization : 'api';
        this.url = `https://${this.organization}.${CrowdinApi.CROWDIN_URL_SUFFIX}`;
        this.config = config;
    }

    protected addQueryParam(url: string, name: string, value?: any): string {
        if (!!value) {
            url += CrowdinApi.QUERY_PARAM_PATTERN.test(url) ? '&' : '?';
            url += `${name}=${value}`;
        }
        return url;
    }

    protected defaultConfig(): any {
        return { headers: { Authorization: `Bearer ${this.token}` } };
    }

    get httpClient(): HttpClient {
        if (!!this.config) {
            if (!!this.config.httpClient) {
                return this.config.httpClient;
            }
            if (!!this.config.httpClientType) {
                switch (this.config.httpClientType) {
                    case HttpClientType.AXIOS: return CrowdinApi.AXIOS_INSTANCE;
                    case HttpClientType.FETCH: return CrowdinApi.FETCH_INSTANCE;
                    default: return CrowdinApi.AXIOS_INSTANCE;
                }
            }
        }
        return CrowdinApi.AXIOS_INSTANCE;
    }

    //Http overrides

    protected get<T = any>(url: string, config?: { headers: any }): Promise<T> {
        return this.httpClient.get(url, config);
    }

    protected delete<T>(url: string, config?: { headers: any }): Promise<T> {
        return this.httpClient.delete(url, config);
    }

    protected head<T>(url: string, config?: { headers: any }): Promise<T> {
        return this.httpClient.head(url, config);
    }

    protected post<T>(url: string, data?: any, config?: { headers: any }): Promise<T> {
        return this.httpClient.post(url, data, config);
    }

    protected put<T>(url: string, data?: any, config?: { headers: any }): Promise<T> {
        return this.httpClient.put(url, data, config);
    }

    protected patch<T>(url: string, data?: any, config?: { headers: any }): Promise<T> {
        return this.httpClient.patch(url, data, config);
    }
}

export interface HttpClient {
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}

export enum HttpClientType {
    AXIOS = 'axios',
    FETCH = 'fetch',
}

export interface Credentials {
    token: string;
    organization?: string;
}

export interface ClientConfig {
    httpClientType?: HttpClientType;
    httpClient?: HttpClient;
}

export interface ResponseList<T> {
    data: ResponseObject<T>[];
    pagination: Pagination;
}

export interface ResponseObject<T> {
    data: T;
}

export interface Pagination {
    offset: number;
    limit: number;
}

export interface ErrorResponse {
    errors: ErrorKey[];
}

export interface ErrorKey {
    key: string;
    errors: Error[];
}

export interface Error {
    code: string;
    message: string;
}

export interface PatchRequest {
    value: any;
    op: PatchOperation;
    path: string;
}

export enum PatchOperation {
    ADD = 'add',
    REMOVE = 'remove',
    REPLACE = 'replace',
    MOVE = 'move',
    copy = 'copy',
    TEST = 'test',
}

export interface DownloadLink {
    url: string;
    expireIn: string;
}

export enum BooleanInt {
    TRUE = 1,
    FALSE = 0,
}

export interface Status {
    identifier: string;
    status: string;
    progress: number;
    attributes: Attribute[];
    createdAt: string;
    updatedAt: string;
    startedAt: string;
    finishedAt: string;
    eta: string;
}

export interface Attribute {
    [key: string]: string;
}