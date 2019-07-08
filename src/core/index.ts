export abstract class CrowdinApi {

    static readonly CROWDIN_URL_SUFFIX: string = 'crowdin.com/api/v2';

    readonly login: string;
    readonly accountKey: string;
    readonly organization: string;
    readonly url: string;

    constructor(login: string, accountKey: string, organization: string) {
        this.accountKey = accountKey;
        this.login = login;
        this.organization = organization;
        this.url = `https://${this.organization}.${CrowdinApi.CROWDIN_URL_SUFFIX}`;
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

export enum Priority {
    LOW = 0,
    NORMAL = 0,
    HIGH = 0,
}