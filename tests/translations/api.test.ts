import * as nock from 'nock';
import { Credentials, Translations } from '../../src';

describe('Translations API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: Translations = new Translations(credentials);
    const projectId = 2;
    const preTranslationId = '21';
    const buildId = 1223;
    const statusId = 222;
    const url = 'test.com';
    const storageId = 5;
    const fileId = 51;
    const directoryId = 61;
    const progress = 50;
    const languageId = 'uk';
    const sampleLabelIds = [101, 102];
    const sampleExcludeLabelIds = [103, 104];

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .post(
                `/projects/${projectId}/pre-translations`,
                {
                    languageIds: [],
                    fileIds: [],
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    identifier: preTranslationId,
                },
            })
            .get(`/projects/${projectId}/pre-translations/${preTranslationId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    identifier: preTranslationId,
                },
            })
            .post(
                `/projects/${projectId}/translations/builds/directories/${directoryId}`,
                {
                    targetLanguageIds: [languageId],
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    progress,
                },
            })
            .post(
                `/projects/${projectId}/translations/builds/files/${fileId}`,
                {
                    targetLanguageId: languageId,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    url: url,
                },
            })
            .get(`/projects/${projectId}/translations/builds`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: buildId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                `/projects/${projectId}/translations/builds`,
                {},
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: buildId,
                },
            })
            .get(`/projects/${projectId}/translations/builds/${buildId}/download`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    url: url,
                },
            })
            .get(`/projects/${projectId}/translations/builds/${buildId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: statusId,
                },
            })
            .delete(`/projects/${projectId}/translations/builds/${buildId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .post(
                `/projects/${projectId}/translations/${languageId}`,
                {
                    storageId: storageId,
                    fileId: fileId,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    fileId,
                    storageId,
                    languageId,
                    projectId,
                },
            })
            .post(
                `/projects/${projectId}/translations/exports`,
                {
                    targetLanguageId: languageId,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    url: url,
                },
            })
            .post(
                `/projects/${projectId}/pre-translations`,
                {
                    languageIds: [],
                    fileIds: [],
                    labelIds: sampleLabelIds,
                    excludeLabelIds: sampleExcludeLabelIds,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    identifier: preTranslationId,
                    attributes: {
                        labelIds: sampleLabelIds,
                        excludeLabelIds: sampleExcludeLabelIds,
                    },
                },
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('Apply Pre-Translation', async () => {
        const preTranslation = await api.applyPreTranslation(projectId, {
            fileIds: [],
            languageIds: [],
        });
        expect(preTranslation.data.identifier).toBe(preTranslationId);
    });

    it('Apply Pre-Translation with Label Filters', async () => {
        const preTranslation = await api.applyPreTranslation(projectId, {
            fileIds: [],
            languageIds: [],
            labelIds: sampleLabelIds,
            excludeLabelIds: sampleExcludeLabelIds,
        });
        expect(preTranslation.data.identifier).toBe(preTranslationId);
        expect(preTranslation.data.attributes.labelIds).toEqual(sampleLabelIds);
        expect(preTranslation.data.attributes.excludeLabelIds).toEqual(sampleExcludeLabelIds);
    });

    it('Pre-translation status', async () => {
        const preTranslation = await api.preTranslationStatus(projectId, preTranslationId);
        expect(preTranslation.data.identifier).toBe(preTranslationId);
    });

    it('Build Project Direcotry Translation', async () => {
        const result = await api.buildProjectDirectoryTranslation(projectId, directoryId, {
            targetLanguageIds: [languageId],
        });
        expect(result.data.progress).toBe(progress);
    });

    it('Build Project File Translation', async () => {
        const preTranslation = await api.buildProjectFileTranslation(projectId, fileId, {
            targetLanguageId: languageId,
        });
        expect(preTranslation.data.url).toBe(url);
    });

    it('List project builds', async () => {
        const builds = await api.listProjectBuilds(projectId);
        expect(builds.data.length).toBe(1);
        expect(builds.data[0].data.id).toBe(buildId);
        expect(builds.pagination.limit).toBe(limit);
    });

    it('Build project', async () => {
        const build = await api.buildProject(projectId, {});
        expect(build.data.id).toBe(buildId);
    });

    it('Download Translations', async () => {
        const download = await api.downloadTranslations(projectId, buildId);
        expect(download.data.url).toBe(url);
    });

    it('Check build status', async () => {
        const status = await api.checkBuildStatus(projectId, buildId);
        expect(status.data.id).toBe(statusId);
    });

    it('Cancel build', async () => {
        await api.cancelBuild(projectId, buildId);
    });

    it('Upload Translation', async () => {
        const res = await api.uploadTranslation(projectId, languageId, {
            storageId: storageId,
            fileId: fileId,
        });
        expect(res.data.fileId).toBe(fileId);
        expect(res.data.languageId).toBe(languageId);
        expect(res.data.projectId).toBe(projectId);
        expect(res.data.storageId).toBe(storageId);
    });

    it('Export Project Translation', async () => {
        const res = await api.exportProjectTranslation(projectId, {
            targetLanguageId: languageId,
        });
        expect(res.data.url).toBe(url);
    });
});
