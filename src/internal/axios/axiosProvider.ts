import axios, { AxiosInstance } from 'axios';

export class AxisProvider {

    private static readonly CROWDIN_API_MAX_CONCURRENT_REQUESTS = 15;
    private static readonly CROWDIN_API_REQUESTS_INTERVAL_MS = 10;

    private pendingRequests = 0;
    axios: AxiosInstance = axios.create({});

    constructor() {
        this.configureRequest();
        this.configureResponse();
    }

    private configureRequest() {
        this.axios.interceptors.request.use(config => {
            return new Promise((resolve, reject) => {
                let interval = setInterval(() => {
                    if (this.pendingRequests < AxisProvider.CROWDIN_API_MAX_CONCURRENT_REQUESTS) {
                        this.pendingRequests++;
                        clearInterval(interval);
                        resolve(config);
                    }
                }, AxisProvider.CROWDIN_API_REQUESTS_INTERVAL_MS);
            });
        });
    }

    private configureResponse() {
        this.axios.interceptors.response.use(
            response => {
                this.pendingRequests = Math.max(0, this.pendingRequests - 1);
                return Promise.resolve(response);
            },
            error => {
                this.pendingRequests = Math.max(0, this.pendingRequests - 1);
                return Promise.reject(error);
            }
        );
    }
}