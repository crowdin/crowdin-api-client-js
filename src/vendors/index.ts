import { CrowdinApi, ResponseList } from '../core';

export class Vendors extends CrowdinApi {
    /**
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @param fetchAll fetch all without pagination
     */
    listVendors(limit?: number, offset?: number, fetchAll?: boolean): Promise<ResponseList<VendorsModel.Vendor>> {
        const url = `${this.url}/vendors`;
        return this.getList(url, limit, offset, fetchAll);
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
