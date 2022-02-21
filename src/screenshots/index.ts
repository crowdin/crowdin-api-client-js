import { CrowdinApi, PaginationOptions, PatchRequest, ResponseList, ResponseObject } from '../core';

export class Screenshots extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.screenshots.getMany
     */
    listScreenshots(
        projectId: number,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<ScreenshotsModel.Screenshot>>;
    /**
     * @param projectId project identifier
     * @param options optional pagination options
     */
    listScreenshots(projectId: number, options?: PaginationOptions): Promise<ResponseList<ScreenshotsModel.Screenshot>>;
    listScreenshots(
        projectId: number,
        options: number | PaginationOptions = {},
        deprecatedOffset?: number,
    ): Promise<ResponseList<ScreenshotsModel.Screenshot>> {
        if (typeof options === 'number') {
            options = { limit: options, offset: deprecatedOffset };
            this.emitDeprecationWarning();
        }
        const url = `${this.url}/projects/${projectId}/screenshots`;
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.screenshots.post
     */
    addScreenshot(
        projectId: number,
        request: ScreenshotsModel.CreateScreenshotRequest,
    ): Promise<ResponseObject<ScreenshotsModel.Screenshot>> {
        const url = `${this.url}/projects/${projectId}/screenshots`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param screenshotId screenshot identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.screenshots.get
     */
    getScreenshot(projectId: number, screenshotId: number): Promise<ResponseObject<ScreenshotsModel.Screenshot>> {
        const url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param screenshotId screenshot identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.screenshots.put
     */
    updateScreenshot(
        projectId: number,
        screenshotId: number,
        request: ScreenshotsModel.CreateScreenshotRequest,
    ): Promise<ResponseObject<ScreenshotsModel.Screenshot>> {
        const url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}`;
        return this.put(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param screenshotId screenshot identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.screenshots.delete
     */
    deleteScreenshot(projectId: number, screenshotId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param screenshotId screenshot identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.screenshots.patch
     */
    editScreenshot(
        projectId: number,
        screenshotId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<ScreenshotsModel.Screenshot>> {
        const url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param screenshotId screenshot identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.screenshots.tags.getMany
     */
    listScreenshotTags(
        projectId: number,
        screenshotId: number,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<ScreenshotsModel.Tag>>;
    listScreenshotTags(
        projectId: number,
        screenshotId: number,
        options?: PaginationOptions,
    ): Promise<ResponseList<ScreenshotsModel.Tag>>;
    listScreenshotTags(
        projectId: number,
        screenshotId: number,
        options: number | PaginationOptions = {},
        deprecatedOffset?: number,
    ): Promise<ResponseList<ScreenshotsModel.Tag>> {
        if (typeof options === 'number') {
            options = { limit: options, offset: deprecatedOffset };
            this.emitDeprecationWarning();
        }
        const url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}/tags`;
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param projectId project identifier
     * @param screenshotId screenshot identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.screenshots.tags.putMany
     */
    replaceTags(projectId: number, screenshotId: number, request: ScreenshotsModel.AddTagRequest[]): Promise<void> {
        const url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}/tags`;
        return this.put(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param screenshotId screenshot identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.screenshots.tags.post
     */
    addTag(
        projectId: number,
        screenshotId: number,
        request: ScreenshotsModel.AddTagRequest[],
    ): Promise<ResponseObject<ScreenshotsModel.Tag>> {
        const url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}/tags`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param screenshotId screenshot identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.screenshots.tags.deleteMany
     */
    clearTags(projectId: number, screenshotId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}/tags`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param screenshotId screenshot identifier
     * @param tagId tag identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.screenshots.tags.get
     */
    getTag(projectId: number, screenshotId: number, tagId: number): Promise<ResponseObject<ScreenshotsModel.Tag>> {
        const url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}/tags/${tagId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param screenshotId screenshot identifier
     * @param tagId tag identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.screenshots.tags.delete
     */
    deleteTag(projectId: number, screenshotId: number, tagId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}/tags/${tagId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param screenshotId screenshot identifier
     * @param tagId tag identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.screenshots.tags.patch
     */
    updateTag(
        projectId: number,
        screenshotId: number,
        tagId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<ScreenshotsModel.Screenshot>> {
        const url = `${this.url}/projects/${projectId}/screenshots/${screenshotId}/tags/${tagId}`;
        return this.patch(url, request, this.defaultConfig());
    }
}

export namespace ScreenshotsModel {
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
        autoTag?: boolean;
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
