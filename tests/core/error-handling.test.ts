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

describe('core http error handling', () => {
    it('should extract Crowdin API messages with axios client', async () => {
        /**
         * Create an axios error matching Crowdin error responses.
         * @see https://github.com/axios/axios/blob/3772c8fe74112a56e3e9551f894d899bc3a9443a/test/specs/core/AxiosError.spec.js#L7
         */
        const request = { path: '/api/foo' };
        const response = {
            status: 200,
            data: genericCrowdinErrorPayload,
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const error = new AxiosError('Boom!', 'ESOMETHING', {} as any, request, response as any);
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
