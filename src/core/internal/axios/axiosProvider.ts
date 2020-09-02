import axios, { AxiosInstance } from 'axios';
import { CommonErrorResponse, ValidationErrorResponse } from '../..';

export class AxisProvider {
    private static readonly CROWDIN_API_MAX_CONCURRENT_REQUESTS = 15;
    private static readonly CROWDIN_API_REQUESTS_INTERVAL_MS = 10;

    private pendingRequests = 0;
    axios: AxiosInstance = axios.create({});

    constructor() {
        this.configureRequest();
        this.configureResponse();
    }

    private configureRequest(): any {
        this.axios.interceptors.request.use(config => {
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            return new Promise(resolve => {
                const interval = setInterval(() => {
                    if (this.pendingRequests < AxisProvider.CROWDIN_API_MAX_CONCURRENT_REQUESTS) {
                        this.pendingRequests++;
                        clearInterval(interval);
                        resolve(config);
                    }
                }, AxisProvider.CROWDIN_API_REQUESTS_INTERVAL_MS);
            });
        });
    }

    private configureResponse(): any {
        this.axios.interceptors.response.use(
            response => {
                this.pendingRequests = Math.max(0, this.pendingRequests - 1);
                return Promise.resolve(response.data);
            },
            error => {
                this.pendingRequests = Math.max(0, this.pendingRequests - 1);
                if (!!error.response && !!error.response.data) {
                    if (error.response.status === 400) {
                        return Promise.reject(error.response.data as ValidationErrorResponse);
                    } else {
                        return Promise.reject(error.response.data as CommonErrorResponse);
                    }
                } else {
                    const errorCode = (error.response && error.response.status) || '500';
                    const defaultError: CommonErrorResponse = {
                        error: {
                            code: errorCode,
                            message: `Request failed. ${error}`,
                        },
                    };
                    return Promise.reject(defaultError);
                }
            },
        );
    }
}
