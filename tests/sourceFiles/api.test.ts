import * as nock from 'nock';
import { Credentials, CrowdinError, CrowdinValidationError, SourceFiles } from '../../src';

describe('Source Files API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: SourceFiles = new SourceFiles(credentials, { httpClientType: 'axios', integrationUserAgent: 'test' });
    const projectId = 2;
    const fileName = '1.txt';
    const fileTitle = 'Test file';

    const filleRawUrl = 'test.com';
    const fileRevisionId = 888;

    const branchId = 12;
    const sourceBranchId = 14;
    const mergeBranchId = 'merge-123';
    const mergeBranchStatus = 'merged';
    const branchName = 'master';
    const branchTitle = 'testTitle';
    const storageId = 123;

    const directoryName = 'folder1';
    const directoryTitle = 'testTitle';

    const directoryId = 444;

    const buildId = 121212;

    const cloneId = 'test12312';

    const fileId = 321;
    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get(`/projects/${projectId}/branches/${branchId}/clones/${cloneId}/branch`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: branchId,
                    name: branchName,
                },
            })
            .post(
                `/projects/${projectId}/branches/${branchId}/clones`,
                {
                    name: branchName,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    identifier: cloneId,
                },
            })
            .get(`/projects/${projectId}/branches/${branchId}/clones/${cloneId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    identifier: cloneId,
                },
            })
            .get(`/projects/${projectId}/branches`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .query({
                name: branchName,
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: branchId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                `/projects/${projectId}/branches`,
                {
                    name: branchName,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(500, {
                messgae: 'Error occured',
                code: 500,
            })
            .get(`/projects/${projectId}/branches/${branchId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: branchId,
                    name: branchName,
                },
            })
            .delete(`/projects/${projectId}/branches/${branchId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(400, {
                errors: [
                    {
                        error: {
                            key: 'branchId',
                            errors: [
                                {
                                    message: 'validation error',
                                    code: 400,
                                },
                            ],
                        },
                    },
                ],
            })
            .patch(
                `/projects/${projectId}/branches/${branchId}`,
                [
                    {
                        value: branchTitle,
                        op: 'replace',
                        path: '/title',
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
                    id: branchId,
                    name: branchName,
                    title: branchTitle,
                },
            })
            .post(
                `/projects/${projectId}/branches/${branchId}/merges`,
                {
                    sourceBranchId,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    identifier: mergeBranchId,
                },
            })
            .get(`/projects/${projectId}/branches/${branchId}/merges/${mergeBranchId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    identifier: mergeBranchId,
                },
            })
            .get(`/projects/${projectId}/branches/${branchId}/merges/${mergeBranchId}/summary`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    status: mergeBranchStatus,
                },
            })
            .get(`/projects/${projectId}/directories`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: directoryId,
                            name: directoryName,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                `/projects/${projectId}/directories`,
                {
                    name: directoryName,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: directoryId,
                    name: directoryName,
                },
            })
            .get(`/projects/${projectId}/directories/${directoryId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: directoryId,
                    name: directoryName,
                },
            })
            .delete(`/projects/${projectId}/directories/${directoryId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .patch(
                `/projects/${projectId}/directories/${directoryId}`,
                [
                    {
                        value: directoryTitle,
                        op: 'replace',
                        path: '/title',
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
                    id: directoryId,
                    name: directoryName,
                    title: directoryTitle,
                },
            })
            .get(`/projects/${projectId}/files`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: fileId,
                            name: fileName,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                `/projects/${projectId}/files`,
                {
                    name: fileName,
                    storageId: storageId,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: fileId,
                    name: fileName,
                },
            })
            .get(`/projects/${projectId}/files/${fileId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: fileId,
                    name: fileName,
                },
            })
            .put(
                `/projects/${projectId}/files/${fileId}`,
                {
                    storageId: storageId,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: fileId,
                    name: fileName,
                },
            })
            .delete(`/projects/${projectId}/files/${fileId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .patch(
                `/projects/${projectId}/files/${fileId}`,
                [
                    {
                        value: fileTitle,
                        op: 'replace',
                        path: '/title',
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
                    id: fileId,
                    name: fileName,
                    title: fileTitle,
                },
            })
            .get(`/projects/${projectId}/files/${fileId}/preview`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    url: filleRawUrl,
                },
            })
            .get(`/projects/${projectId}/files/${fileId}/download`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    url: filleRawUrl,
                },
            })
            .get(`/projects/${projectId}/files/${fileId}/revisions`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: fileRevisionId,
                            projectId: projectId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .get(`/projects/${projectId}/files/${fileId}/revisions/${fileRevisionId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: fileRevisionId,
                    projectId: projectId,
                },
            })
            .get(`/projects/${projectId}/strings/reviewed-builds`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: buildId,
                            attributes: {
                                branchId: branchId,
                            },
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                `/projects/${projectId}/strings/reviewed-builds`,
                {
                    branchId: branchId,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: buildId,
                    attributes: {
                        branchId: branchId,
                    },
                },
            })
            .get(`/projects/${projectId}/strings/reviewed-builds/${buildId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: buildId,
                    attributes: {
                        branchId: branchId,
                    },
                },
            })
            .get(`/projects/${projectId}/strings/reviewed-builds/${buildId}/download`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    url: filleRawUrl,
                },
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('Get Cloned Branch', async () => {
        const branch = await api.getClonedBranch(projectId, branchId, cloneId);
        expect(branch.data.id).toBe(branchId);
        expect(branch.data.name).toBe(branchName);
    });

    it('Clone branch', async () => {
        const clone = await api.clonedBranch(projectId, branchId, {
            name: branchName,
        });
        expect(clone.data.identifier).toBe(cloneId);
    });

    it('Check Branch Clone Status', async () => {
        const clone = await api.checkBranchClonedStatus(projectId, branchId, cloneId);
        expect(clone.data.identifier).toBe(cloneId);
    });

    it('List project branches', async () => {
        const branches = await api.listProjectBranches(projectId, { name: branchName });
        expect(branches.data.length).toBe(1);
        expect(branches.data[0].data.id).toBe(branchId);
        expect(branches.pagination.limit).toBe(limit);
    });

    it('Create branch should throw error', async () => {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const t = () =>
            api.createBranch(projectId, {
                name: branchName,
            });
        expect(t).rejects.toThrow(CrowdinError);
    });

    it('Get branch', async () => {
        const branch = await api.getBranch(projectId, branchId);
        expect(branch.data.id).toBe(branchId);
        expect(branch.data.name).toBe(branchName);
    });

    it('Delete branch should throw validation error', async () => {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const t = () => api.deleteBranch(projectId, branchId);
        expect(t).rejects.toThrow(CrowdinValidationError);
    });

    it('Edit branch', async () => {
        const branch = await api.editBranch(projectId, branchId, [
            {
                op: 'replace',
                path: '/title',
                value: branchTitle,
            },
        ]);
        expect(branch.data.id).toBe(branchId);
        expect(branch.data.name).toBe(branchName);
        expect(branch.data.title).toBe(branchTitle);
    });

    it('Merge branch', async () => {
        const mergeStatus = await api.mergeBranch(projectId, branchId, {
            sourceBranchId,
        });
        expect(mergeStatus.data.identifier).toBe(mergeBranchId);
    });

    it('Check Branch Merge Status', async () => {
        const mergeStatus = await api.checkBranchMergeStatus(projectId, branchId, mergeBranchId);
        expect(mergeStatus.data.identifier).toBe(mergeBranchId);
    });

    it('Get Branch Merge Summary', async () => {
        const mergeStatus = await api.getBranchMergeSummary(projectId, branchId, mergeBranchId);
        expect(mergeStatus.data.status).toBe(mergeBranchStatus);
    });

    it('List project directories', async () => {
        const directories = await api.listProjectDirectories(projectId);
        expect(directories.data.length).toBe(1);
        expect(directories.data[0].data.id).toBe(directoryId);
        expect(directories.data[0].data.name).toBe(directoryName);
        expect(directories.pagination.limit).toBe(limit);
    });

    it('Create directory', async () => {
        const directory = await api.createDirectory(projectId, {
            name: directoryName,
        });
        expect(directory.data.id).toBe(directoryId);
        expect(directory.data.name).toBe(directoryName);
    });

    it('Get directory', async () => {
        const directory = await api.getDirectory(projectId, directoryId);
        expect(directory.data.id).toBe(directoryId);
        expect(directory.data.name).toBe(directoryName);
    });

    it('Delete directory', async () => {
        await api.deleteDirectory(projectId, directoryId);
    });

    it('Edit directory', async () => {
        const directory = await api.editDirectory(projectId, directoryId, [
            {
                op: 'replace',
                path: '/title',
                value: directoryTitle,
            },
        ]);
        expect(directory.data.id).toBe(directoryId);
        expect(directory.data.name).toBe(directoryName);
        expect(directory.data.title).toBe(directoryTitle);
    });

    it('List project files', async () => {
        const files = await api.listProjectFiles(projectId);
        expect(files.data.length).toBe(1);
        expect(files.data[0].data.id).toBe(fileId);
        expect(files.data[0].data.name).toBe(fileName);
        expect(files.pagination.limit).toBe(limit);
    });

    it('Create file', async () => {
        const file = await api.createFile(projectId, {
            name: fileName,
            storageId: storageId,
        });
        expect(file.data.id).toBe(fileId);
        expect(file.data.name).toBe(fileName);
    });

    it('Get file', async () => {
        const file = await api.getFile(projectId, fileId);
        expect(file.data.id).toBe(fileId);
        expect(file.data.name).toBe(fileName);
    });

    it('Update or Restore File', async () => {
        const file = await api.updateOrRestoreFile(projectId, fileId, { storageId });
        expect(file.data.id).toBe(fileId);
        expect(file.data.name).toBe(fileName);
    });

    it('Delete file', async () => {
        await api.deleteFile(projectId, fileId);
    });

    it('Edit file', async () => {
        const file = await api.editFile(projectId, fileId, [
            {
                op: 'replace',
                path: '/title',
                value: fileTitle,
            },
        ]);
        expect(file.data.id).toBe(fileId);
        expect(file.data.name).toBe(fileName);
        expect(file.data.title).toBe(fileTitle);
    });

    it('Download file preview', async () => {
        const file = await api.downloadFilePreview(projectId, fileId);
        expect(file.data.url).toBe(filleRawUrl);
    });

    it('Download file', async () => {
        const file = await api.downloadFile(projectId, fileId);
        expect(file.data.url).toBe(filleRawUrl);
    });

    it('List file revisions', async () => {
        const revisions = await api.listFileRevisions(projectId, fileId);
        expect(revisions.data.length).toBe(1);
        expect(revisions.data[0].data.id).toBe(fileRevisionId);
        expect(revisions.data[0].data.projectId).toBe(projectId);
        expect(revisions.pagination.limit).toBe(limit);
    });

    it('Get file revision', async () => {
        const revision = await api.getFileRevision(projectId, fileId, fileRevisionId);
        expect(revision.data.id).toBe(fileRevisionId);
        expect(revision.data.projectId).toBe(projectId);
    });

    it('List reviewed source files builds', async () => {
        const builds = await api.listReviewedSourceFilesBuild(projectId);
        expect(builds.data.length).toBe(1);
        expect(builds.data[0].data.id).toBe(buildId);
        expect(builds.data[0].data.attributes.branchId).toBe(branchId);
        expect(builds.pagination.limit).toBe(limit);
    });

    it('Build reviewed source files', async () => {
        const build = await api.buildReviewedSourceFiles(projectId, {
            branchId,
        });
        expect(build.data.id).toBe(buildId);
        expect(build.data.attributes.branchId).toBe(branchId);
    });

    it('Check reviewed source files build status', async () => {
        const build = await api.checkReviewedSourceFilesBuildStatus(projectId, buildId);
        expect(build.data.id).toBe(buildId);
        expect(build.data.attributes.branchId).toBe(branchId);
    });

    it('Download reviewed source files', async () => {
        const file = await api.downloadReviewedSourceFiles(projectId, buildId);
        expect(file.data.url).toBe(filleRawUrl);
    });
});
