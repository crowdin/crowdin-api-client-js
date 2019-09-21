import { CrowdinApi, ResponseList, ResponseObject } from '../core';

export namespace UploadStorage {

    export class Api extends CrowdinApi {

        listStorages(): Promise<ResponseList<Model.Storage>> {
            let url = `${this.url}/storages`;
            return this.get(url, this.defaultConfig());
        }

        /**
         * @param contentType file content type
         * @param request binary file data
         */
        addStorage(contentType: string, request: any): Promise<ResponseObject<Model.Storage>> {
            let url = `${this.url}/storages`;
            let config = this.defaultConfig();
            config.headers['Content-Type'] = contentType;
            return this.post(url, request, config);
        }

        /**
         * @param storageId storage identifier
         */
        getStorage(storageId: number): Promise<ResponseObject<Model.Storage>> {
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

    export namespace Model {
        export interface Storage {
            id: number;
        }
    }
}