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
     * @param func function to execute
     */
    async executeAsyncFunc<T>(func: () => Promise<T>): Promise<T> {
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
        throw new Error('Wrong retry configuration. Failed to retrieve value.');
    }

    /**
     *
     * @param func function to execute
     */
    async executeSyncFunc<T>(func: () => T): Promise<T> {
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
        throw new Error('Wrong retry configuration. Failed to retrieve value.');
    }

    private wait(): Promise<void> {
        return new Promise<void>((res): void => {
            setTimeout(() => res(), this.config.waitInterval);
        });
    }
}
