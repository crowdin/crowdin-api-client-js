import { CrowdinApi, ResponseList, ResponseObject } from '../core';

export namespace UploadStorage {

    export class Api extends CrowdinApi {

        listStorages(): Promise<ResponseList<Model.Storage>> {
            let url = `${this.url}/storages?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

        /**
         * @param contentType file content type
         * @param request binary file data
         */
        addStorage(contentType: string, request: any): Promise<ResponseObject<Model.Storage>> {
            let url = `${this.url}/storages?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.post(url, request, {
                headers: {
                    'Content-Type': contentType
                }
            });
        }

        /**
         * @param storageId storage identifier
         */
        getStorage(storageId: number): Promise<ResponseObject<Model.Storage>> {
            let url = `${this.url}/storages/${storageId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

        /**
         * @param storageId storage identifier
         */
        deleteStorage(storageId: number): Promise<void> {
            let url = `${this.url}/storages/${storageId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.delete(url);
        }
    }

    export namespace Model {
        export interface Storage {
            id: number;
        }
    }
}