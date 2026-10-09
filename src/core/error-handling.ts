import { AxiosError } from 'axios';
import { HttpClientError } from './http-client-error';
import { FetchClientJsonPayloadError } from './internal/fetch/fetchClientError';

/**
 * @internal
 */
export class CrowdinError extends Error {
    /**
     * The error payload the API returned: the `error`/`errors` member of a Crowdin error response,
     * or the whole `{ data: … }` body when an application returned the error through the
     * applications proxy (`/applications/{identifier}/api/{path}`).
     */
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
 * Reads the error an application returned through the applications proxy
 * (`/applications/{identifier}/api/{path}`). Crowdin forwards the application's status code and
 * wraps its body in the same `data` envelope as a successful response, so the error sits one level
 * deeper than in Crowdin's own error responses. Applications report errors in several shapes:
 * `{ error: { message, code? } }`, `{ error: 'message' }`, or `{ message, code? }`.
 * Returns undefined when the body is not an application error.
 */
function proxiedApplicationError(body: unknown): { message: string; code?: number } | undefined {
    const data = isRecord(body) ? body.data : undefined;
    if (!isRecord(data)) {
        return undefined;
    }
    if (typeof data.error === 'string') {
        return { message: data.error };
    }
    const source = isRecord(data.error) && typeof data.error.message === 'string' ? data.error : data;
    if (typeof source.message !== 'string') {
        return undefined;
    }
    return { message: source.message, code: typeof source.code === 'number' ? source.code : undefined };
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
}

/**
 * @internal
 */
export function handleHttpClientError(error: HttpClientError): never {
    let responseBody: unknown = null;
    let crowdinResponseErrors: any = null;

    if (isAxiosError(error)) {
        responseBody = error.response?.data;
        crowdinResponseErrors = (error.response?.data as any)?.errors || (error.response?.data as any)?.error;
    } else if (error instanceof FetchClientJsonPayloadError) {
        responseBody = error.jsonPayload;
        crowdinResponseErrors =
            error.jsonPayload &&
            typeof error.jsonPayload === 'object' &&
            ('errors' in error.jsonPayload || 'error' in error.jsonPayload)
                ? error.jsonPayload.errors || error.jsonPayload.error
                : null;
    }

    const httpStatus =
        error instanceof AxiosError && error.response?.status
            ? error.response?.status
            : error instanceof FetchClientJsonPayloadError
              ? error.statusCode
              : 500;

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

    const applicationError = proxiedApplicationError(responseBody);
    if (applicationError) {
        throw new CrowdinError(applicationError.message, applicationError.code ?? httpStatus, responseBody);
    }

    if (error instanceof Error) {
        throw new CrowdinError(error.message, httpStatus, crowdinResponseErrors);
    }
    throw new CrowdinError(`unknown http error: ${String(error)}`, 500, crowdinResponseErrors);
}
