export interface RetryConfig {
    //amount of retries
    retries: number;
    //wait interval in ms between retries
    waitInterval: number;
    //array of conditions which will check if retry should not be applied
    conditions: SkipRetryCondition[];
}

export interface SkipRetryCondition {
    test(error: any): boolean;
}

export class RetryService {
    constructor(private config: RetryConfig) {}

    /**
     *
     * @param func function to execute (should return {@link promise})
     */
    async executeAsyncFunc(func: Function): Promise<any> {
        for (let i = 0; i <= this.config.retries; i++) {
            try {
                const result = await func();
                return result;
            } catch (error) {
                const skip = this.config.conditions.map(condition => condition.test(error)).find(skip => skip === true);
                if (skip || i === this.config.retries) {
                    throw error;
                }
                await this.wait();
            }
        }
    }

    /**
     *
     * @param func function to execute
     */
    async executeSyncFunc(func: Function): Promise<any> {
        for (let i = 0; i <= this.config.retries; i++) {
            try {
                const result = func();
                return result;
            } catch (error) {
                const skip = this.config.conditions.map(condition => condition.test(error)).find(skip => skip === true);
                if (skip || i === this.config.retries) {
                    throw error;
                }
                await this.wait();
            }
        }
    }

    private wait(): Promise<any> {
        return new Promise((res): void => {
            setTimeout(() => res(), this.config.waitInterval);
        });
    }
}
