import { AxiosError } from 'axios';
import { HttpClientError, toHttpClientError } from './http-client-error';
import { AxiosProvider } from './internal/axios/axiosProvider';
import { FetchClient } from './internal/fetch/fetchClient';
import { FetchClientJsonPayloadError } from './internal/fetch/fetchClientError';
import { RetryConfig, RetryService } from './internal/retry';

/**
 * @internal
 */
export interface HttpClient {
    get<T>(url: string, config?: { headers: Record<string, string> }): Promise<T>;
    delete<T>(url: string, config?: { headers: Record<string, string> }): Promise<T>;
    head<T>(url: string, config?: { headers: Record<string, string> }): Promise<T>;
    post<T>(url: string, data?: unknown, config?: { headers: Record<string, string> }): Promise<T>;
    put<T>(url: string, data?: unknown, config?: { headers: Record<string, string> }): Promise<T>;
    patch<T>(url: string, data?: unknown, config?: { headers: Record<string, string> }): Promise<T>;
}

export type HttpClientType = 'axios' | 'fetch';

/**
 * Authorization credentials
 */
export interface Credentials {
    /** Personal Access Token */
    token: string;

    /** Yor Crowdin Enterprise organization name */
    organization?: string;

    /** API base URL */
    baseUrl?: string;
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

/**
 * @internal
 */
export class CrowdinError extends Error {
    public apiError: any;
    public code: number;
    constructor(message: string, code: number, apiError: any) {
        super(message);
        this.code = code;
        this.apiError = apiError;
    }
}

/**
 * @internal
 */
export class CrowdinValidationError extends CrowdinError {
    public validationCodes: { key: string; codes: string[] }[];
    constructor(message: string, validationCodes: { key: string; codes: string[] }[], apiError: any) {
        super(message, 400, apiError);
        this.validationCodes = validationCodes;
    }
}

function isAxiosError(error: any): error is AxiosError {
    return error instanceof AxiosError || !!error.response?.data;
}

/**
 * @internal
 */
export function handleHttpClientError(error: HttpClientError): never {
    let crowdinResponseErrors: any = null;

    if (isAxiosError(error)) {
        crowdinResponseErrors = (error.response?.data as any)?.errors || (error.response?.data as any)?.error;
    } else if (error instanceof FetchClientJsonPayloadError) {
        crowdinResponseErrors =
            error.jsonPayload &&
            typeof error.jsonPayload === 'object' &&
            ('errors' in error.jsonPayload || 'error' in error.jsonPayload)
                ? error.jsonPayload.errors || error.jsonPayload.error
                : null;
    }

    if (Array.isArray(crowdinResponseErrors)) {
        const validationCodes: { key: string; codes: string[] }[] = [];
        const validationMessages: string[] = [];
        crowdinResponseErrors.forEach((e: any) => {
            if (typeof e.index === 'number' || typeof e.error?.key === 'number') {
                throw new CrowdinValidationError(
                    JSON.stringify(crowdinResponseErrors, null, 2),
                    [],
                    crowdinResponseErrors,
                );
            }
            if (e.error?.key && Array.isArray(e.error?.errors)) {
                const codes: string[] = [];
                e.error.errors.forEach((er: any) => {
                    if (er.message && er.code) {
                        codes.push(er.code);
                        validationMessages.push(er.message);
                    }
                });
                validationCodes.push({ key: e.error.key, codes });
            }
        });
        const message = validationMessages.length === 0 ? 'Validation error' : validationMessages.join(', ');
        throw new CrowdinValidationError(message, validationCodes, crowdinResponseErrors);
    } else if (crowdinResponseErrors?.message && crowdinResponseErrors?.code) {
        throw new CrowdinError(crowdinResponseErrors.message, crowdinResponseErrors.code, crowdinResponseErrors);
    }

    if (error instanceof Error) {
        const code =
            error instanceof AxiosError && error.response?.status
                ? error.response?.status
                : error instanceof FetchClientJsonPayloadError
                  ? error.statusCode
                  : 500;
        throw new CrowdinError(error.message, code, crowdinResponseErrors);
    }
    throw new CrowdinError(`unknown http error: ${String(error)}`, 500, crowdinResponseErrors);
}

export abstract class CrowdinApi {
    private static readonly CROWDIN_URL_SUFFIX: string = 'api.crowdin.com/api/v2';
    private static readonly AXIOS_INSTANCE = new AxiosProvider().axios;
    private static readonly FETCH_INSTANCE = new FetchClient();

    /** @internal */
    readonly token: string;
    /** @internal */
    readonly organization?: string;
    /** @internal */
    readonly url: string;
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

        if (config?.httpRequestTimeout) {
            CrowdinApi.FETCH_INSTANCE.withTimeout(config?.httpRequestTimeout);
            CrowdinApi.AXIOS_INSTANCE.defaults.timeout = config?.httpRequestTimeout;
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
                url = `https://${this.organization}.api.crowdin.com/api/graphql`;
            } else {
                url = 'https://api.crowdin.com/api/graphql';
            }
        }

        return this.post<ResponseObject<T>>(url, req, this.defaultConfig());
    }

    protected addQueryParam(url: string, name: string, value?: string | number): string {
        if (value) {
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
