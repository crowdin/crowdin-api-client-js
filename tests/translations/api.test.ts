import * as nock from 'nock';
import { Credentials, Translations } from '../../src';

describe('Translations API', () => {

    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg'
    };
    const api: Translations = new Translations(credentials);
    const projectId = 2;
    const preTranslationId = '21';
    const pseudoTranslationBuildId = '21';
    const downloadLink = 'test.com';
    const buildId = 1223;
    const statusId = 222;
    const url = 'test.com';
    const storageId = '5';
    const fileId = 51;
    const languageId = 66;

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .post(`/projects/${projectId}/pre-translations`,
                {
                    languageIds: [],
                    fileIds: []
                },
                {
                    reqheaders: {
                        'Authorization': `Bearer ${api.token}`
                    }
                }
            )
            .reply(200, {
                data: {
                    identifier: preTranslationId
                }
            })
            .get(`/projects/${projectId}/pre-translations/${preTranslationId}`, undefined,
                {
                    reqheaders: {
                        'Authorization': `Bearer ${api.token}`
                    }
                }
            )
            .reply(200, {
                data: {
                    identifier: preTranslationId
                }
            })
            .post(`/projects/${projectId}/pseudo-translations/builds`,
                {},
                {
                    reqheaders: {
                        'Authorization': `Bearer ${api.token}`
                    }
                }
            )
            .reply(200, {
                data: {
                    identifier: pseudoTranslationBuildId
                }
            })
            .get(`/projects/${projectId}/pseudo-translations/builds/${pseudoTranslationBuildId}`, undefined,
                {
                    reqheaders: {
                        'Authorization': `Bearer ${api.token}`
                    }
                }
            )
            .reply(200, {
                data: {
                    identifier: pseudoTranslationBuildId
                }
            })
            .get(`/projects/${projectId}/pseudo-translations/builds/download`, undefined,
                {
                    reqheaders: {
                        'Authorization': `Bearer ${api.token}`
                    }
                }
            )
            .reply(200, {
                data: {
                    url: downloadLink
                }
            })
            .get(`/projects/${projectId}/translations/builds`, undefined,
                {
                    reqheaders: {
                        'Authorization': `Bearer ${api.token}`
                    }
                }
            )
            .reply(200, {
                data: [{
                    data: {
                        id: buildId
                    }
                }],
                pagination: {
                    offset: 0,
                    limit: limit
                }
            })
            .post(`/projects/${projectId}/translations/builds`,
                {},
                {
                    reqheaders: {
                        'Authorization': `Bearer ${api.token}`
                    }
                }
            )
            .reply(200, {
                data: {
                    id: buildId
                }
            })
            .get(`/projects/${projectId}/translations/builds/${buildId}/download`, undefined,
                {
                    reqheaders: {
                        'Authorization': `Bearer ${api.token}`
                    }
                }
            )
            .reply(200, {
                data: {
                    url: url
                }
            })
            .get(`/projects/${projectId}/translations/builds/${buildId}`, undefined,
                {
                    reqheaders: {
                        'Authorization': `Bearer ${api.token}`
                    }
                }
            )
            .reply(200, {
                data: {
                    id: statusId
                }
            })
            .delete(`/projects/${projectId}/translations/builds/${buildId}`, undefined,
                {
                    reqheaders: {
                        'Authorization': `Bearer ${api.token}`
                    }
                }
            )
            .reply(200)
            .post(`/projects/${projectId}/translations/${languageId}`,
                {
                    storageId: storageId,
                    fileId: fileId
                },
                {
                    reqheaders: {
                        'Authorization': `Bearer ${api.token}`
                    }
                }
            )
            .reply(200);
    });

    afterAll(() => {
        scope.done();
    });

    it('Pre-translate', async () => {
        const preTranslation = await api.preTranslate(projectId, {
            fileIds: [],
            languageIds: []
        });
        expect(preTranslation.data.identifier).toBe(preTranslationId);
    });

    it('Pre-translation status', async () => {
        const preTranslation = await api.preTranslationStatus(projectId, preTranslationId);
        expect(preTranslation.data.identifier).toBe(preTranslationId);
    });

    it('Build pseudo-translation', async () => {
        const pseudoTranslation = await api.buildPseudoTranslation(projectId, {});
        expect(pseudoTranslation.data.identifier).toBe(pseudoTranslationBuildId);
    });

    it('Check pseudo-translation build status', async () => {
        const pseudoTranslation = await api.checkPseudoTranslationBuildStatus(projectId, pseudoTranslationBuildId);
        expect(pseudoTranslation.data.identifier).toBe(pseudoTranslationBuildId);
    });

    it('Download pseudo-translation', async () => {
        const downloadLinkResp = await api.downloadPseudoTranslation(projectId);
        expect(downloadLinkResp.data.url).toBe(downloadLink);
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
        await api.uploadTranslation(projectId, languageId, {
            storageId: storageId,
            fileId: fileId
        });
    });
});