import * as nock from 'nock';
import { Credentials, PatchOperation, Screenshots } from '../../src';

describe('Screenshots API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: Screenshots = new Screenshots(credentials);
    const projectId = 2;
    const screenshotId = 23;
    const screenshotName = 'test.png';
    const tagId = 123;
    const storageId = 144;
    const stringId = 56;

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get(`/projects/${projectId}/screenshots`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: screenshotId,
                            name: screenshotName,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                `/projects/${projectId}/screenshots`,
                {
                    storageId: storageId,
                    name: screenshotName,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: screenshotId,
                    name: screenshotName,
                },
            })
            .get(`/projects/${projectId}/screenshots/${screenshotId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: screenshotId,
                    name: screenshotName,
                },
            })
            .put(
                `/projects/${projectId}/screenshots/${screenshotId}`,
                {
                    storageId: storageId,
                    name: screenshotName,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: screenshotId,
                    name: screenshotName,
                },
            })
            .delete(`/projects/${projectId}/screenshots/${screenshotId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .patch(
                `/projects/${projectId}/screenshots/${screenshotId}`,
                [
                    {
                        value: screenshotName,
                        op: PatchOperation.REPLACE,
                        path: '/name',
                    },
                ],
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: screenshotId,
                    name: screenshotName,
                },
            })
            .get(`/projects/${projectId}/screenshots/${screenshotId}/tags`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: tagId,
                            screenshotId: screenshotId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .put(
                `/projects/${projectId}/screenshots/${screenshotId}/tags`,
                [
                    {
                        stringId: stringId,
                    },
                ],
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200)
            .post(
                `/projects/${projectId}/screenshots/${screenshotId}/tags`,
                [
                    {
                        stringId: stringId,
                    },
                ],
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: tagId,
                    screenshotId: screenshotId,
                },
            })
            .delete(`/projects/${projectId}/screenshots/${screenshotId}/tags`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .get(`/projects/${projectId}/screenshots/${screenshotId}/tags/${tagId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: tagId,
                    screenshotId: screenshotId,
                },
            })
            .delete(`/projects/${projectId}/screenshots/${screenshotId}/tags/${tagId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .patch(
                `/projects/${projectId}/screenshots/${screenshotId}/tags/${tagId}`,
                [
                    {
                        value: stringId,
                        op: PatchOperation.REPLACE,
                        path: '/stringId',
                    },
                ],
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: screenshotId,
                },
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List screenshots', async () => {
        const screenshots = await api.listScreenshots(projectId);
        expect(screenshots.data.length).toBe(1);
        expect(screenshots.data[0].data.id).toBe(screenshotId);
        expect(screenshots.data[0].data.name).toBe(screenshotName);
        expect(screenshots.pagination.limit).toBe(limit);
    });

    it('Add screenshot', async () => {
        const screenshot = await api.addScreenshot(projectId, {
            name: screenshotName,
            storageId: storageId,
        });
        expect(screenshot.data.id).toBe(screenshotId);
        expect(screenshot.data.name).toBe(screenshotName);
    });

    it('Get screenshot', async () => {
        const screenshot = await api.getScreenshot(projectId, screenshotId);
        expect(screenshot.data.id).toBe(screenshotId);
        expect(screenshot.data.name).toBe(screenshotName);
    });

    it('Update screenshot', async () => {
        const screenshot = await api.updateScreenshot(projectId, screenshotId, {
            storageId: storageId,
            name: screenshotName,
        });
        expect(screenshot.data.id).toBe(screenshotId);
        expect(screenshot.data.name).toBe(screenshotName);
    });

    it('Delete screenshot', async () => {
        await api.deleteScreenshot(projectId, screenshotId);
    });

    it('Edit screenshot', async () => {
        const screenshot = await api.editScreenshot(projectId, screenshotId, [
            {
                op: PatchOperation.REPLACE,
                path: '/name',
                value: screenshotName,
            },
        ]);
        expect(screenshot.data.id).toBe(screenshotId);
        expect(screenshot.data.name).toBe(screenshotName);
    });

    it('List screenshot tags', async () => {
        const tags = await api.listScreenshotTags(projectId, screenshotId);
        expect(tags.data.length).toBe(1);
        expect(tags.data[0].data.id).toBe(tagId);
        expect(tags.data[0].data.screenshotId).toBe(screenshotId);
        expect(tags.pagination.limit).toBe(limit);
    });

    it('Replace tags', async () => {
        await api.replaceTags(projectId, screenshotId, [
            {
                stringId: stringId,
            },
        ]);
    });

    it('Add tag', async () => {
        const tag = await api.addTag(projectId, screenshotId, [
            {
                stringId: stringId,
            },
        ]);
        expect(tag.data.id).toBe(tagId);
        expect(tag.data.screenshotId).toBe(screenshotId);
    });

    it('Clear tags', async () => {
        await api.clearTags(projectId, screenshotId);
    });

    it('Get tag', async () => {
        const tag = await api.getTag(projectId, screenshotId, tagId);
        expect(tag.data.id).toBe(tagId);
        expect(tag.data.screenshotId).toBe(screenshotId);
    });

    it('Delete tag', async () => {
        await api.deleteTag(projectId, screenshotId, tagId);
    });

    it('Update tag', async () => {
        const tag = await api.updateTag(projectId, screenshotId, tagId, [
            {
                op: PatchOperation.REPLACE,
                path: '/stringId',
                value: stringId,
            },
        ]);
        expect(tag.data.id).toBe(screenshotId);
    });
});
