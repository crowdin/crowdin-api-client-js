import { CrowdinApi, ResponseList, ResponseObject } from '../core';

export class UploadStorage extends CrowdinApi {

        listStorages(): Promise<ResponseList<UploadStorageModel.Storage>> {
            let url = `${this.url}/storages`;
            return this.get(url, this.defaultConfig());
        }

        /**
         * @param contentType file content type
         * @param request binary file data
         */
        addStorage(contentType: string, request: any): Promise<ResponseObject<UploadStorageModel.Storage>> {
            let url = `${this.url}/storages`;
            let config = this.defaultConfig();
            config.headers['Content-Type'] = contentType;
            return this.post(url, request, config);
        }

        /**
         * @param storageId storage identifier
         */
        getStorage(storageId: number): Promise<ResponseObject<UploadStorageModel.Storage>> {
            let url = `${this.url}/storages/${storageId}`;
            return this.get(url, this.defaultConfig());
        }

        /**
         * @param storageId storage identifier
         */
        deleteStorage(storageId: number): Promise<void> {
            let url = `${this.url}/storages/${storageId}`;
            return this.delete(url, this.defaultConfig());
        }
    }

    export namespace UploadStorageModel {
        export interface Storage {
            id: number;
        }
    }