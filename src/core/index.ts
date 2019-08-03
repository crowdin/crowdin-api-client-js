import { AxisProvider } from './internal/axios/axiosProvider';
import { AxiosInstance } from 'axios';

export abstract class CrowdinApi {

    private static readonly CROWDIN_URL_SUFFIX: string = 'crowdin.com/api/v2';
    private static readonly AXIOS_INSTANCE = new AxisProvider().axios;

    readonly login: string;
    readonly accountKey: string;
    readonly organization: string;
    readonly url: string;
    readonly axios: AxiosInstance;

    /**
     * @param login login
     * @param accountKey account key
     * @param organization organization name
     */
    constructor(login: string, accountKey: string, organization?: string) {
        this.accountKey = accountKey;
        this.login = login;
        this.organization = !!organization ? organization : 'api';
        this.url = `https://${this.organization}.${CrowdinApi.CROWDIN_URL_SUFFIX}`;
        this.axios = CrowdinApi.AXIOS_INSTANCE;
    }

    protected addQueryParam(url: string, name: string, value?: any): string {
        if (!!value) {
            url += `&${name}=${value}`;
        }
        return url;
    }
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
    error: Error;
}

export interface Error {
    message: string;
    code: number;
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