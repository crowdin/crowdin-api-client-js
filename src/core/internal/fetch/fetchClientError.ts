type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export class FetchClientJsonPayloadError extends Error {
    public readonly payload: unknown;
    public readonly statusCode: number;
    constructor(msg: string, payload: unknown, statusCode: number) {
        super(msg);
        this.payload = payload;
        this.statusCode = statusCode;
        /**
         * Support instanceof operator
         * @see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#support-for-newtarget
         */
        Object.setPrototypeOf(this, new.target.prototype);
    }
    get jsonPayload(): Json {
        if (typeof this.payload === 'object' && this.payload) {
            return this.payload as Json;
        }
        return null;
    }
}
