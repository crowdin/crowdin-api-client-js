import { handleHttpClientError } from './error-handling';
import { HttpClient } from './http-client';
import { toHttpClientError } from './http-client-error';
import { AxiosProvider } from './internal/axios/axiosProvider';
import { FetchClient } from './internal/fetch/fetchClient';
import { RetryConfig, RetryService } from './internal/retry';

export * from './error-handling';
export * from './http-client';

export type HttpClientType = 'axios' | 'fetch';

/**
 * Authorization credentials
 */
export interface Credentials {
    /** Personal Access Token */
    token: string;

    /** Yor Crowdin Enterprise organization name */
    organization?: string;

    /** @deprecated API base URL. Use `apiDomain` instead` */
    baseUrl?: string;

    /** API domain (e.g., 'api.crowdin.com') */
    apiDomain?: string;
}

/**
 * Client Configuration
 */
export interface ClientConfig {
    /** The type of HTTP client to be used for making requests */
    httpClientType?: HttpClientType;

    /** Instance of your HTTP client if needed */
    httpClient?: HttpClient;

    /** Custom User-Agent to be passed to the `User-Agent` header */
    userAgent?: string;

    /** Custom User-Agent to be passed to the `X-Crowdin-Integrations-User-Agent` header */
    integrationUserAgent?: string;

    /** Retry strategy configuration */
    retryConfig?: RetryConfig;

    /** Http request timeout in ms */
    httpRequestTimeout?: number;
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

/**
 * A JSON Patch document as defined by [RFC 6902](https://datatracker.ietf.org/doc/html/rfc6902#section-3)
 */
export interface PatchRequest {
    /** Patch value */
    value?: any;

    /** Patch operation to perform */
    op: PatchOperation;

    /** A JSON Pointer as defined by [RFC 6901](https://datatracker.ietf.org/doc/html/rfc6901) */
    path: string;
}

export type PatchOperation = 'add' | 'remove' | 'replace' | 'move' | 'copy' | 'test';

export type ProjectRoles = 'manager' | 'developer' | 'translator' | 'proofreader' | 'language_coordinator' | 'member';

export interface DownloadLink {
    url: string;
    expireIn: string;
}

/**
 * @internal
 */
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
    eta: string;
}

export interface Attribute {
    [key: string]: string;
}

export type PlainObject = Record<string, any>;

export abstract class CrowdinApi {
    private static readonly CROWDIN_API_DOMAIN: string = 'api.crowdin.com';
    private static readonly AXIOS_INSTANCE = new AxiosProvider();
    private static readonly FETCH_INSTANCE = new FetchClient();

    /** @internal */
    readonly token: string;
    /** @internal */
    readonly organization?: string;
    /** @internal */
    readonly url: string;
    /** @internal */
    readonly apiDomain: string;
    /** @internal */
    readonly config: ClientConfig | undefined;
    /** @internal */
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
        this.apiDomain = credentials.apiDomain || CrowdinApi.CROWDIN_API_DOMAIN;

        if (credentials.baseUrl) {
            this.url = credentials.baseUrl;
        } else {
            if (this.organization) {
                this.url = `https://${this.organization}.${this.apiDomain}/api/v2`;
            } else {
                this.url = `https://${this.apiDomain}/api/v2`;
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

        if (config?.httpRequestTimeout) {
            CrowdinApi.FETCH_INSTANCE.withTimeout(config?.httpRequestTimeout);
            CrowdinApi.AXIOS_INSTANCE.withTimeout(config?.httpRequestTimeout);
        }

        this.config = config;
    }

    graphql<T>(
        req: { query: string; operationName?: string; variables?: any },
        config: { url?: string } = {},
    ): Promise<ResponseObject<T>> {
        let url;

        if (config?.url) {
            url = config.url;
        } else {
            if (this.organization) {
                url = `https://${this.organization}.${this.apiDomain}/api/graphql`;
            } else {
                url = `https://${this.apiDomain}/api/graphql`;
            }
        }

        return this.post<ResponseObject<T>>(url, req, this.defaultConfig());
    }

    protected addQueryParam(url: string, name: string, value?: string | number): string {
        if (value !== undefined && value !== null) {
            url += new RegExp(/\?.+=.*/g).test(url) ? '&' : '?';
            url += `${name}=${this.encodeUrlParam(value)}`;
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

    /** @internal */
    get httpClient(): HttpClient {
        if (this.config?.httpClient) {
            return this.config.httpClient;
        }
        if (this.config?.httpClientType) {
            switch (this.config.httpClientType) {
                case 'axios':
                    return CrowdinApi.AXIOS_INSTANCE;
                case 'fetch':
                    return CrowdinApi.FETCH_INSTANCE;
                default:
                    return CrowdinApi.AXIOS_INSTANCE;
            }
        }
        return CrowdinApi.AXIOS_INSTANCE;
    }

    public withFetchAll(maxLimit?: number): this {
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

    protected encodeUrlParam(param: string | number | boolean): string {
        return encodeURIComponent(param);
    }

    //Http overrides

    protected get<T>(url: string, config?: { headers: Record<string, string> }): Promise<T> {
        return this.retryService
            .executeAsyncFunc(() => this.httpClient.get<T>(url, config))
            .catch((err: unknown) => handleHttpClientError(toHttpClientError(err)));
    }

    protected delete<T>(url: string, config?: { headers: Record<string, string> }): Promise<T> {
        return this.retryService
            .executeAsyncFunc(() => this.httpClient.delete<T>(url, config))
            .catch((err: unknown) => handleHttpClientError(toHttpClientError(err)));
    }

    protected head<T>(url: string, config?: { headers: Record<string, string> }): Promise<T> {
        return this.retryService
            .executeAsyncFunc(() => this.httpClient.head<T>(url, config))
            .catch((err: unknown) => handleHttpClientError(toHttpClientError(err)));
    }

    protected post<T>(url: string, data?: unknown, config?: { headers: Record<string, string> }): Promise<T> {
        return this.retryService
            .executeAsyncFunc(() => this.httpClient.post<T>(url, data, config))
            .catch((err: unknown) => handleHttpClientError(toHttpClientError(err)));
    }

    protected put<T>(url: string, data?: unknown, config?: { headers: Record<string, string> }): Promise<T> {
        return this.retryService
            .executeAsyncFunc(() => this.httpClient.put<T>(url, data, config))
            .catch((err: unknown) => handleHttpClientError(toHttpClientError(err)));
    }

    protected patch<T>(url: string, data?: unknown, config?: { headers: Record<string, string> }): Promise<T> {
        return this.retryService
            .executeAsyncFunc(() => this.httpClient.patch<T>(url, data, config))
            .catch((err: unknown) => handleHttpClientError(toHttpClientError(err)));
    }
}

let deprecationEmittedForOptionalParams = false;

function emitDeprecationWarning(): void {
    if (!deprecationEmittedForOptionalParams) {
        if (typeof process !== 'undefined' && typeof process.emitWarning === 'function') {
            process.emitWarning(
                'Passing optional parameters individually is deprecated. Pass a sole object instead',
                'DeprecationWarning',
            );
        } else {
            console.warn(
                'DeprecationWarning: Passing optional parameters individually is deprecated. Pass a sole object instead',
            );
        }
        deprecationEmittedForOptionalParams = true;
    }
}

/**
 * @internal
 */
export function isOptionalString(
    parameter: string | unknown,
    parameterInArgs: boolean,
): parameter is string | undefined {
    if (typeof parameter === 'string' || typeof parameter === 'undefined') {
        if (parameterInArgs) {
            emitDeprecationWarning();
        }
        return true;
    } else {
        return false;
    }
}

/**
 * @internal
 */
export function isOptionalNumber(
    parameter: number | unknown,
    parameterInArgs: boolean,
): parameter is number | undefined {
    if (typeof parameter === 'number' || typeof parameter === 'undefined') {
        if (parameterInArgs) {
            emitDeprecationWarning();
        }
        return true;
    } else {
        return false;
    }
}

export interface ProjectRole {
    name: string;
    permissions: ProjectRolePermissions;
}

export interface ProjectRolePermissions {
    allLanguages: boolean;
    languagesAccess: {
        [lang: string]: { allContent: boolean; workflowStepIds: number[] };
    };
}
