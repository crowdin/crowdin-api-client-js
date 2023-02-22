import { AxiosError } from 'axios';
import { FetchClientJsonPayloadError } from './internal/fetch/fetchClientError';

export type HttpClientError = AxiosError | FetchClientJsonPayloadError | Error;

export const toHttpClientError = (error?: unknown): HttpClientError =>
    error instanceof AxiosError || error instanceof FetchClientJsonPayloadError || error instanceof Error
        ? error
        : new Error(`unknown http client error: ${error}`);
