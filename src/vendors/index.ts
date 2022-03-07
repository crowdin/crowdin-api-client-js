import { CrowdinApi, isOptionalNumber, PaginationOptions, ResponseList } from '../core';

export class Vendors extends CrowdinApi {
    /**
     * @param options optional pagination parameters for the request
     * @see https://support.crowdin.com/enterprise/api/#operation/api.vendors.getMany
     */
    listVendors(options?: PaginationOptions): Promise<ResponseList<VendorsModel.Vendor>>;
    /**
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @deprecated optional parameters should be passed through an object
     * @see https://support.crowdin.com/enterprise/api/#operation/api.vendors.getMany
     */
    listVendors(limit?: number, offset?: number): Promise<ResponseList<VendorsModel.Vendor>>;
    listVendors(
        options?: number | PaginationOptions,
        deprecatedOffset?: number,
    ): Promise<ResponseList<VendorsModel.Vendor>> {
        if (isOptionalNumber(options)) {
            options = { limit: options, offset: deprecatedOffset };
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
