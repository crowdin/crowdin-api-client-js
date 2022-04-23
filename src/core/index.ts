import { AxiosProvider } from './internal/axios/axiosProvider';
import { FetchClient } from './internal/fetch/fetchClient';
import { RetryConfig, RetryService } from './internal/retry';

export interface HttpClient {
    get<T>(url: string, config?: { headers: Record<string, string> }): Promise<T>;
    delete<T>(url: string, config?: { headers: Record<string, string> }): Promise<T>;
    head<T>(url: string, config?: { headers: Record<string, string> }): Promise<T>;
    post<T>(url: string, data?: unknown, config?: { headers: Record<string, string> }): Promise<T>;
    put<T>(url: string, data?: unknown, config?: { headers: Record<string, string> }): Promise<T>;
    patch<T>(url: string, data?: unknown, config?: { headers: Record<string, string> }): Promise<T>;
}

export type HttpClientType = 'axios' | 'fetch';

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

export interface PatchRequest {
    value?: any;
    op: PatchOperation;
    path: string;
}

export type PatchOperation = 'add' | 'remove' | 'replace' | 'move' | 'copy' | 'test';

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

export class CrowdinError extends Error {
    public code: number;
    constructor(message: string, code: number) {
        super(message);
        this.code = code;
    }
}

export class CrowdinValidationError extends CrowdinError {
    public validationCodes: string[];
    constructor(messsage: string, validationCodes: string[]) {
        super(messsage, 400);
        this.validationCodes = validationCodes;
    }
}

function handleError<T>(error: any = {}): T {
    if (Array.isArray(error.errors)) {
        const validationCodes: string[] = [];
        const validationMessages: string[] = [];
        error.errors.forEach((e: any) => {
            if (Array.isArray(e.error?.errors)) {
                e.error.errors.forEach((er: any) => {
                    if (er.message && er.code) {
                        validationCodes.push(er.code);
                        validationMessages.push(er.message);
                    }
                });
            }
        });
        const message = validationMessages.length === 0 ? 'Validation error' : validationMessages.join(', ');
        throw new CrowdinValidationError(message, validationCodes);
    }
    const message = error.error?.message || 'Error occured';
    const code = error.error?.code || 500;
    throw new CrowdinError(message, code);
}

export abstract class CrowdinApi {
    private static readonly CROWDIN_URL_SUFFIX: string = 'api.crowdin.com/api/v2';
    private static readonly AXIOS_INSTANCE = new AxiosProvider().axios;
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
        return this.retryService.executeAsyncFunc(() => this.httpClient.get<T>(url, config).catch(e => handleError(e)));
    }

    protected delete<T>(url: string, config?: { headers: Record<string, string> }): Promise<T> {
        return this.retryService.executeAsyncFunc(() =>
            this.httpClient.delete<T>(url, config).catch(e => handleError(e)),
        );
    }

    protected head<T>(url: string, config?: { headers: Record<string, string> }): Promise<T> {
        return this.retryService.executeAsyncFunc(() =>
            this.httpClient.head<T>(url, config).catch(e => handleError(e)),
        );
    }

    protected post<T>(url: string, data?: unknown, config?: { headers: Record<string, string> }): Promise<T> {
        return this.retryService.executeAsyncFunc(() =>
            this.httpClient.post<T>(url, data, config).catch(e => handleError(e)),
        );
    }

    protected put<T>(url: string, data?: unknown, config?: { headers: Record<string, string> }): Promise<T> {
        return this.retryService.executeAsyncFunc(() =>
            this.httpClient.put<T>(url, data, config).catch(e => handleError(e)),
        );
    }

    protected patch<T>(url: string, data?: unknown, config?: { headers: Record<string, string> }): Promise<T> {
        return this.retryService.executeAsyncFunc(() =>
            this.httpClient.patch<T>(url, data, config).catch(e => handleError(e)),
        );
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
