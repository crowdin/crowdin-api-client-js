import axios, { AxiosInstance } from 'axios';

export class AxiosProvider {
    private static readonly CROWDIN_API_MAX_CONCURRENT_REQUESTS = 15;
    private static readonly CROWDIN_API_REQUESTS_INTERVAL_MS = 10;

    private pendingRequests = 0;
    axios: AxiosInstance = axios.create({});

    constructor() {
        this.configureRequest();
        this.configureResponse();
    }

    private configureRequest(): void {
        this.axios.interceptors.request.use(config => {
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            return new Promise(resolve => {
                const interval = setInterval(() => {
                    if (this.pendingRequests < AxiosProvider.CROWDIN_API_MAX_CONCURRENT_REQUESTS) {
                        this.pendingRequests++;
                        clearInterval(interval);
                        resolve(config);
                    }
                }, AxiosProvider.CROWDIN_API_REQUESTS_INTERVAL_MS);
            });
        });
    }

    private configureResponse(): void {
        this.axios.interceptors.response.use(
            response => {
                this.pendingRequests = Math.max(0, this.pendingRequests - 1);
                return Promise.resolve(response.data);
            },
            error => {
                this.pendingRequests = Math.max(0, this.pendingRequests - 1);
                return Promise.reject(error.response.data);
            },
        );
    }
}
