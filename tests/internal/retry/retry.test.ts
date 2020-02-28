import { RetryService, SkipRetryCondition } from '../../../src/core/internal/retry';

describe('Retry Mechanism', () => {
    it('Should retry with async function', async () => {
        const result = 5;
        let executed = false;
        const asyncFunc = (): Promise<number> => {
            return new Promise<number>((res, rej): void => {
                setTimeout((): void => {
                    if (!executed) {
                        executed = true;
                        rej();
                    } else {
                        res(result);
                    }
                }, 100);
            });
        };
        const retries = 1;
        const waitInterval = 150;
        const retryService = new RetryService({
            retries,
            waitInterval,
            conditions: [],
        });
        const executedResult = await retryService.executeAsyncFunc(asyncFunc);
        expect(executedResult).toBe(result);
    });

    it('Should retry with sync function', async () => {
        const result = 7;
        let executed = false;
        const syncFunc = (): number => {
            if (!executed) {
                executed = true;
                throw Error('error!');
            } else {
                return result;
            }
        };
        const retries = 1;
        const waitInterval = 50;
        const retryService = new RetryService({
            retries,
            waitInterval,
            conditions: [],
        });
        const executedResult = await retryService.executeSyncFunc(syncFunc);
        expect(executedResult).toBe(result);
    });

    it('Should retry with conditions', async () => {
        const result = 7;
        let executed = false;
        let conditionInvoked = false;
        const syncFunc = (): number => {
            if (!executed) {
                executed = true;
                throw Error('error!');
            } else {
                return result;
            }
        };
        const condition: SkipRetryCondition = {
            test(): boolean {
                conditionInvoked = true;
                return false;
            },
        };
        const retries = 1;
        const waitInterval = 50;
        const retryService = new RetryService({
            retries,
            waitInterval,
            conditions: [condition],
        });
        const executedResult = await retryService.executeSyncFunc(syncFunc);
        expect(executedResult).toBe(result);
        expect(conditionInvoked).toBe(true);
    });
});
