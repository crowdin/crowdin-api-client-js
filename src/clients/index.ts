import { CrowdinApi, PaginationOptions, ResponseList } from '../core';

/**
 * Clients are the organizations that order professional translation services from Vendors.
 * Clients can invite an existing organization to become a Vendor for them.
 *
 * Use the API to get a list of the Clients you already cooperate with as a Vendor.
 */
export class Clients extends CrowdinApi {
    /**
     * @param options optional pagination parameters for the request
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.clients.getMany
     */
    listClients(options?: PaginationOptions): Promise<ResponseList<ClientsModel.Client>> {
        const url = `${this.url}/clients`;
        return this.getList(url, options?.limit, options?.offset);
    }
}

export namespace ClientsModel {
    export interface Client {
        id: number;
        name: string;
        description: string;
        status: 'pending' | 'confirmed' | 'rejected';
    }
}
