import { CrowdinApi, ResponseList } from '../core';

export class Vendors extends CrowdinApi {
    /**
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     */
    listVendors(limit?: number, offset?: number): Promise<ResponseList<VendorsModel.Vendor>> {
        let url = `${this.url}/vendors`;
        url = this.addQueryParam(url, 'limit', limit);
        url = this.addQueryParam(url, 'offset', offset);
        return this.get(url, this.defaultConfig());
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
