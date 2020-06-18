import { CrowdinApi, ResponseList, ResponseObject } from '../core';

export class UploadStorage extends CrowdinApi {
    /**
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     */
    listStorages(limit?: number, offset?: number): Promise<ResponseList<UploadStorageModel.Storage>> {
        let url = `${this.url}/storages`;
        url = this.addQueryParam(url, 'limit', limit);
        url = this.addQueryParam(url, 'offset', offset);
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param fileName file name
     * @param request binary file data
     * @param contentType content type header
     */
    addStorage(
        fileName: string,
        request: any,
        contentType?: string,
    ): Promise<ResponseObject<UploadStorageModel.Storage>> {
        const url = `${this.url}/storages`;
        const config = this.defaultConfig();
        config.headers['Crowdin-API-FileName'] = fileName;
        if (!!contentType) {
            config.headers['Content-Type'] = contentType;
        }
        return this.post(url, request, config);
    }

    /**
     * @param storageId storage identifier
     */
    getStorage(storageId: number): Promise<ResponseObject<UploadStorageModel.Storage>> {
        const url = `${this.url}/storages/${storageId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param storageId storage identifier
     */
    deleteStorage(storageId: number): Promise<void> {
        const url = `${this.url}/storages/${storageId}`;
        return this.delete(url, this.defaultConfig());
    }
}

export namespace UploadStorageModel {
    export interface Storage {
        id: number;
        fileName: string;
    }
}
