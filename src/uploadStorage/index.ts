import { CrowdinApi, ResponseList, ResponseObject } from '../core';

export class UploadStorage extends CrowdinApi {
    listStorages(): Promise<ResponseList<UploadStorageModel.Storage>> {
        const url = `${this.url}/storages`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param fileName file name
     * @param request binary file data
     */
    addStorage(fileName: string, request: any): Promise<ResponseObject<UploadStorageModel.Storage>> {
        const url = `${this.url}/storages`;
        const config = this.defaultConfig();
        config.headers['Crowdin-API-FileName'] = fileName;
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
    }
}
