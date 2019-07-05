export abstract class CrowdinApi {
    readonly login: string;
    readonly accountKey: string;

    constructor(login: string, accountKey: string) {
        this.accountKey = accountKey;
        this.login = login;
    }
}

export interface ResponseList<T> {
    data: ResponseObject<T>[];
    pagination: Pagination[];
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