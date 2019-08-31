import { CrowdinApi, ResponseList, ResponseObject, PatchRequest } from '../core';

export namespace Screenshots {

    export class Api extends CrowdinApi {

        /**
         * @param projectId project identifier
         * @param limit maximum number of items to retrieve (default 25)
         * @param offset starting offset in the collection (default 0)
         */
        listScreenshots(projectId: number, limit?: number, offset?: number): Promise<ResponseList<Model.Screenshot>> {
            let url = `${this.url}/projects/${projectId}/screenshots`;
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            return this.axios.get(url, this.defaultConfig());
        }

        /**
         * @param projectId project identifier
         * @param request request body
         */
        addScreenshot(projectId: number, request: Model.CreateScreenshotRequest): Promise<ResponseObject<Model.Screenshot>> {
            let url = `${this.url}/projects/${projectId}/screenshots`;
            return this.axios.post(url, request, this.defaultConfig());
        }

        /**
         * @param projectId project identifier
         * @param screenshotId screenshot identifier
         */
        getScreenshot(projectId: number, screenshotId: number): Promise<ResponseObject<Model.Screenshot>> {
            let url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}`;
            return this.axios.get(url, this.defaultConfig());
        }

        /**
         * @param projectId project identifier
         * @param screenshotId screenshot identifier
         * @param request request body
         */
        updateScreenshot(projectId: number, screenshotId: number, request: Model.CreateScreenshotRequest): Promise<ResponseObject<Model.Screenshot>> {
            let url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}`;
            return this.axios.put(url, request, this.defaultConfig());
        }

        /**
         * @param projectId project identifier
         * @param screenshotId screenshot identifier
         */
        deleteScreenshot(projectId: number, screenshotId: number): Promise<void> {
            let url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}`;
            return this.axios.delete(url, this.defaultConfig());
        }

        /**
         * @param projectId project identifier
         * @param screenshotId screenshot identifier
         * @param request request body
         */
        editScreenshot(projectId: number, screenshotId: number, request: PatchRequest[]): Promise<ResponseObject<Model.Screenshot>> {
            let url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}`;
            return this.axios.patch(url, request, this.defaultConfig());
        }

        /**
         * @param projectId project identifier
         * @param screenshotId screenshot identifier
         * @param limit maximum number of items to retrieve (default 25)
         * @param offset starting offset in the collection (default 0)
         */
        listScreenshotTags(projectId: number, screenshotId: number, limit?: number, offset?: number): Promise<ResponseList<Model.Tag>> {
            let url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}/tags`;
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            return this.axios.get(url, this.defaultConfig());
        }

        /**
         * @param projectId project identifier
         * @param screenshotId screenshot identifier
         * @param request request body
         */
        replaceTags(projectId: number, screenshotId: number, request: Model.AddTagRequest[]): Promise<void> {
            let url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}/tags`;
            return this.axios.put(url, request, this.defaultConfig());
        }

        /**
         * @param projectId project identifier
         * @param screenshotId screenshot identifier
         * @param request request body
         */
        addTag(projectId: number, screenshotId: number, request: Model.AddTagRequest[]): Promise<ResponseObject<Model.Tag>> {
            let url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}/tags`;
            return this.axios.post(url, request, this.defaultConfig());
        }

        /**
         * @param projectId project identifier
         * @param screenshotId screenshot identifier
         */
        clearTags(projectId: number, screenshotId: number): Promise<void> {
            let url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}/tags`;
            return this.axios.delete(url, this.defaultConfig());
        }

        /**
         * @param projectId project identifier
         * @param screenshotId screenshot identifier
         * @param tagId tag identifier
         */
        getTag(projectId: number, screenshotId: number, tagId: number): Promise<ResponseObject<Model.Tag>> {
            let url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}/tags/${tagId}`;
            return this.axios.get(url, this.defaultConfig());
        }

        /**
         * @param projectId project identifier
         * @param screenshotId screenshot identifier
         * @param tagId tag identifier
         */
        deleteTag(projectId: number, screenshotId: number, tagId: number): Promise<void> {
            let url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}/tags/${tagId}`;
            return this.axios.delete(url, this.defaultConfig());
        }

        /**
         * @param projectId project identifier
         * @param screenshotId screenshot identifier
         * @param tagId tag identifier
         * @param request request body
         */
        updateTag(projectId: number, screenshotId: number, tagId: number, request: PatchRequest[]): Promise<ResponseObject<Model.Screenshot>> {
            let url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}/tags/${tagId}`;
            return this.axios.patch(url, request, this.defaultConfig());
        }
    }

    export namespace Model {
        export interface Screenshot {
            id: number;
            userId: number;
            url: string;
            name: string;
            size: Size;
            tagsCount: number;
            tags: Tag[];
            createdAt: string;
            updatedAt: string;
        }

        export interface CreateScreenshotRequest {
            storageId: number;
            name: string;
        }

        export interface Tag {
            id: number;
            screenshotId: number;
            stringId: number;
            position: Position;
            createdAt: string;
        }

        export interface AddTagRequest {
            stringId: number;
            position?: Position;
        }

        export interface Size {
            width: number;
            height: number;
        }

        export interface Position {
            x: number;
            y: number;
            width: number;
            height: number;
        }
    }
}