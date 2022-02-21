import { AxisProvider } from './internal/axios/axiosProvider';
import { FetchClient } from './internal/fetch/fetchClient';
import { RetryConfig, RetryService } from './internal/retry';

export interface RequestConfig {
    headers?: Record<string, string>;
    mode?: string;
}

export interface HttpClient {
    get<T>(url: string, config?: RequestConfig): Promise<T>;
    delete<T>(url: string, config?: RequestConfig): Promise<T>;
    head<T>(url: string, config?: RequestConfig): Promise<T>;
    post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T>;
    put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T>;
    patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T>;
}

export enum HttpClientType {
    AXIOS = 'axios',
    FETCH = 'fetch',
}

export interface Credentials {
    token: string;
    organization?: string;
    baseUrl?: string;
}

export interface ClientConfig {
    httpClientType?: HttpClientType;
    httpClient?: HttpClient;
    userAgent?: string;
    integrationUserAgent?: string;
    retryConfig?: RetryConfig;
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

export type PaginationOptions = Partial<Pagination>;

export interface ValidationErrorResponse {
    errors: ErrorHolder[];
}

export interface CommonErrorResponse {
    error: Error;
}

export interface ErrorHolder {
    error: ErrorKey;
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
    value?: any;
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

export interface Status<T> {
    identifier: string;
    status: string;
    progress: number;
    attributes: T;
    createdAt: string;
    updatedAt: string;
    startedAt: string;
    finishedAt: string;
}

export interface Attribute {
    [key: string]: string;
}

export abstract class CrowdinApi {
    private static readonly CROWDIN_URL_SUFFIX: string = 'api.crowdin.com/api/v2';
    private static readonly AXIOS_INSTANCE = new AxisProvider().axios;
    private static readonly FETCH_INSTANCE = new FetchClient();

    readonly token: string;
    readonly organization?: string;
    readonly url: string;
    readonly config: ClientConfig | undefined;
    readonly retryService: RetryService;

    protected fetchAllFlag = false;
    protected maxLimit: number | undefined;

    /**
     * @param credentials credentials
     * @param config optional configuration of the client
     */
    constructor(credentials: Credentials, config?: ClientConfig) {
        this.token = credentials.token;
        this.organization = credentials.organization;

        if (credentials.baseUrl) {
            this.url = credentials.baseUrl;
        } else {
            if (this.organization) {
                this.url = `https://${this.organization}.${CrowdinApi.CROWDIN_URL_SUFFIX}`;
            } else {
                this.url = `https://${CrowdinApi.CROWDIN_URL_SUFFIX}`;
            }
        }

        let retryConfig: RetryConfig;
        if (config?.retryConfig) {
            retryConfig = config.retryConfig;
        } else {
            retryConfig = {
                waitInterval: 0,
                retries: 0,
                conditions: [],
            };
        }
        this.retryService = new RetryService(retryConfig);

        this.config = config;
    }

    protected addQueryParam(url: string, name: string, value?: string | number): string {
        if (value) {
            url += new RegExp(/\?.+=.*/g).test(url) ? '&' : '?';
            url += `${name}=${value}`;
        }
        return url;
    }

    protected defaultConfig(): { headers: Record<string, string> } {
        const config: {
            headers: Record<string, string>;
        } = {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        };
        if (this.config?.userAgent) {
            config.headers['User-Agent'] = this.config.userAgent;
        }
        if (this.config?.integrationUserAgent) {
            config.headers['X-Crowdin-Integrations-User-Agent'] = this.config.integrationUserAgent;
        }
        return config;
    }

    get httpClient(): HttpClient {
        if (this.config?.httpClient) {
            return this.config.httpClient;
        }
        if (this.config?.httpClientType) {
            switch (this.config.httpClientType) {
                case HttpClientType.AXIOS:
                    return CrowdinApi.AXIOS_INSTANCE;
                case HttpClientType.FETCH:
                    return CrowdinApi.FETCH_INSTANCE;
                default:
                    return CrowdinApi.AXIOS_INSTANCE;
            }
        }
        return CrowdinApi.AXIOS_INSTANCE;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public withFetchAll(maxLimit?: number) {
        this.fetchAllFlag = true;
        this.maxLimit = maxLimit;
        return this;
    }

    protected async getList<T = any>(
        url: string,
        limit?: number,
        offset?: number,
        config?: { headers: Record<string, string> },
    ): Promise<ResponseList<T>> {
        const conf = config ?? this.defaultConfig();
        if (this.fetchAllFlag) {
            this.fetchAllFlag = false;
            const maxAmount = this.maxLimit;
            this.maxLimit = undefined;
            return await this.fetchAll(url, conf, maxAmount);
        } else {
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            return this.get(url, conf);
        }
    }

    protected async fetchAll<T>(
        url: string,
        config: { headers: Record<string, string> },
        maxAmount?: number,
    ): Promise<ResponseList<T>> {
        let limit = 500;
        if (maxAmount && maxAmount < limit) {
            limit = maxAmount;
        }
        let offset = 0;
        let resp: ResponseList<T> | undefined;
        for (;;) {
            let urlWithPagination = this.addQueryParam(url, 'limit', limit);
            urlWithPagination = this.addQueryParam(urlWithPagination, 'offset', offset);
            const e: ResponseList<T> = await this.get(urlWithPagination, config);
            if (!resp) {
                resp = e;
            } else {
                resp.data = resp.data.concat(e.data);
                resp.pagination.limit += e.data.length;
            }
            if (e.data.length < limit || (maxAmount && resp.data.length >= maxAmount)) {
                break;
            } else {
                offset += limit;
            }
            if (maxAmount && maxAmount < resp.data.length + limit) {
                limit = maxAmount - resp.data.length;
            }
        }
        return resp;
    }

    //Http overrides

    protected get<T>(url: string, config?: { headers: Record<string, string> }): Promise<T> {
        return this.retryService.executeAsyncFunc(() => this.httpClient.get(url, config));
    }

    protected delete<T>(url: string, config?: { headers: Record<string, string> }): Promise<T> {
        return this.retryService.executeAsyncFunc(() => this.httpClient.delete(url, config));
    }

    protected head<T>(url: string, config?: { headers: Record<string, string> }): Promise<T> {
        return this.retryService.executeAsyncFunc(() => this.httpClient.head(url, config));
    }

    protected post<T>(url: string, data?: unknown, config?: { headers: Record<string, string> }): Promise<T> {
        return this.retryService.executeAsyncFunc(() => this.httpClient.post(url, data, config));
    }

    protected put<T>(url: string, data?: unknown, config?: { headers: Record<string, string> }): Promise<T> {
        return this.retryService.executeAsyncFunc(() => this.httpClient.put(url, data, config));
    }

    protected patch<T>(url: string, data?: unknown, config?: { headers: Record<string, string> }): Promise<T> {
        return this.retryService.executeAsyncFunc(() => this.httpClient.patch(url, data, config));
    }
}

let deprecationEmittedForOptionalParams = false;

export function emitDeprecationWarning(): void {
    if (!deprecationEmittedForOptionalParams) {
        process.emitWarning(
            'Passing optional parameters individually is deprecated. Pass a sole object instead',
            'DeprecationWarning',
        );
        deprecationEmittedForOptionalParams = true;
    }
}
