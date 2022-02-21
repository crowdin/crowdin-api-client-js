import { CrowdinApi, PaginationOptions, ResponseList } from '../core';

export class Vendors extends CrowdinApi {
    /**
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @deprecated Optional parameters should be passed through an object
     * @see https://support.crowdin.com/enterprise/api/#operation/api.vendors.getMany
     */
    listVendors(limit?: number, offset?: number): Promise<ResponseList<VendorsModel.Vendor>>;
    /**
     * @param options optional pagination options for the request
     * @see https://support.crowdin.com/enterprise/api/#operation/api.vendors.getMany
     */
    listVendors(options?: PaginationOptions): Promise<ResponseList<VendorsModel.Vendor>>;
    listVendors(
        options?: number | PaginationOptions,
        deprecatedOffset?: number,
    ): Promise<ResponseList<VendorsModel.Vendor>> {
        if (typeof options === 'number' || typeof options === 'undefined') {
            options = { limit: options, offset: deprecatedOffset };
            this.emitDeprecationWarning();
        }
        const url = `${this.url}/vendors`;
        return this.getList(url, options.limit, options.offset);
    }
}

export namespace VendorsModel {
    export interface Vendor {
        id: number;
        name: string;
        description: string;
        status: string;
    }
}
