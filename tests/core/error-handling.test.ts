import { AxiosError } from 'axios';
import { CrowdinValidationError, handleHttpClientError } from '../../src/core/';
import { FetchClientJsonPayloadError } from '../../src/core/internal/fetch/fetchClientError';

const genericCrowdinErrorPayload = {
    errors: [
        {
            error: {
                key: 'ERROR_KEY',
                errors: [
                    {
                        message: 'test_errors_error_msg',
                        code: 403,
                    },
                ],
            },
        },
    ],
};

const genericCrowdinSingleErrorPayload = {
    error: {
        message: 'test_errors_error_msg',
        code: 403,
    },
};

const stringBatchOperationsErrorPayload = {
    errors: [
        {
            index: 0,
            errors: [
                {
                    error: {
                        key: 'ERROR_KEY',
                        errors: [
                            {
                                message: 'test_errors_error_msg',
                                code: 'isEmpty',
                            },
                        ],
                    },
                },
            ],
        },
        {
            index: 1,
            errors: [
                {
                    error: {
                        key: 'ERROR_KEY',
                        errors: [
                            {
                                message: 'test_errors_error_msg',
                                code: 'isEmpty',
                            },
                        ],
                    },
                },
            ],
        },
    ],
};

const taskCreationErrorPayload = {
    errors: [
        {
            error: {
                key: 0,
                errors: [
                    {
                        code: 'languageId',
                        message: {
                            languageNotSupported: 'This language pair is not supported by vendor',
                        },
                    },
                ],
            },
        },
    ],
};

const createAxiosError = (errorPayload: unknown): AxiosError => {
    /**
     * Create an axios error matching Crowdin error responses.
     * @see https://github.com/axios/axios/blob/3772c8fe74112a56e3e9551f894d899bc3a9443a/test/specs/core/AxiosError.spec.js#L7
     */
    const request = { path: '/api/foo' };
    const response = {
        status: 200,
        data: errorPayload,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new AxiosError('Boom!', 'ESOMETHING', {} as any, request, response as any);
};

describe('core http error handling', () => {
    it('should extract Crowdin API messages with axios client', async () => {
        const error = createAxiosError(genericCrowdinErrorPayload);
        try {
            handleHttpClientError(error);
            throw new Error('expected re-throw');
        } catch (e) {
            const err = e as CrowdinValidationError;
            expect(err.code).toBe(400);
            expect(err.message).toBe('test_errors_error_msg');
            expect(err.validationCodes).toEqual([
                {
                    codes: [403],
                    key: 'ERROR_KEY',
                },
            ]);
        }
    });

    it('should extract Crowdin API single message with axios client', async () => {
        const error = createAxiosError(genericCrowdinSingleErrorPayload);
        expect(() => handleHttpClientError(error)).toThrowError(genericCrowdinSingleErrorPayload.error.message);
    });

    it('should print full error message for stringBatchOperations axios errors', async () => {
        const error = createAxiosError(stringBatchOperationsErrorPayload);
        expect(() => handleHttpClientError(error)).toThrowError(
            JSON.stringify(stringBatchOperationsErrorPayload.errors, null, 2),
        );
    });

    it('should print full error message for taskCreation axios errors', async () => {
        const error = createAxiosError(taskCreationErrorPayload);
        expect(() => handleHttpClientError(error)).toThrowError(
            JSON.stringify(taskCreationErrorPayload.errors, null, 2),
        );
    });

    it('should extract Crowdin API messages with fetch client', async () => {
        const error = new FetchClientJsonPayloadError('foo', genericCrowdinErrorPayload, 418);
        try {
            handleHttpClientError(error);
            throw new Error('expected re-throw');
        } catch (e) {
            const err = e as CrowdinValidationError;
            expect(err.code).toBe(400);
            expect(err.message).toBe('test_errors_error_msg');
            expect(err.validationCodes).toEqual([
                {
                    codes: [403],
                    key: 'ERROR_KEY',
                },
            ]);
        }
    });

    it('should produce meaningful error messages on non-Crowdin http errors', () => {
        const error = new Error('generic_error');
        try {
            handleHttpClientError(error);
            throw new Error('expected re-throw');
        } catch (e) {
            const err = e as CrowdinValidationError;
            expect(err.code).toBe(500);
            expect(err.message).toBe('generic_error');
            expect(err.validationCodes).toBeUndefined();
        }
    });
});
