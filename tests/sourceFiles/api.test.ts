import * as nock from 'nock';
import { Credentials, PatchOperation, SourceFiles } from '../../src';

describe('Source Files API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: SourceFiles = new SourceFiles(credentials);
    const projectId = 2;
    const fileName = '1.txt';
    const fileTitle = 'Test file';

    const filleRawUrl = 'test.com';
    const fileRevisionId = 888;

    const branchId = 12;
    const branchName = 'master';
    const branchTitle = 'testTitle';
    const storageId = 123;

    const directoryName = 'folder1';
    const directoryTitle = 'testTitle';

    const directoryId = 444;

    const fileId = 321;
    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
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
            .reply(200, {
                data: {
                    id: branchId,
                    name: branchName,
                },
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
            .reply(200)
            .patch(
                `/projects/${projectId}/branches/${branchId}`,
                [
                    {
                        value: branchTitle,
                        op: PatchOperation.REPLACE,
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
                        op: PatchOperation.REPLACE,
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
            .query({
                branchId: branchId,
            })
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
                        op: PatchOperation.REPLACE,
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
            .post(
                `/projects/${projectId}/files/${fileId}/restore`,
                {
                    revisionId: fileRevisionId,
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
            .post(
                `/projects/${projectId}/files/${fileId}/update`,
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
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List project branches', async () => {
        const branches = await api.listProjectBranches(projectId, branchName);
        expect(branches.data.length).toBe(1);
        expect(branches.data[0].data.id).toBe(branchId);
        expect(branches.pagination.limit).toBe(limit);
    });

    it('Create branch', async () => {
        const branch = await api.createBranch(projectId, {
            name: branchName,
        });
        expect(branch.data.id).toBe(branchId);
        expect(branch.data.name).toBe(branchName);
    });

    it('Get branch', async () => {
        const branch = await api.getBranch(projectId, branchId);
        expect(branch.data.id).toBe(branchId);
        expect(branch.data.name).toBe(branchName);
    });

    it('Delete branch', async () => {
        await api.deleteBranch(projectId, branchId);
    });

    it('Edit branch', async () => {
        const branch = await api.editBranch(projectId, branchId, [
            {
                op: PatchOperation.REPLACE,
                path: '/title',
                value: branchTitle,
            },
        ]);
        expect(branch.data.id).toBe(branchId);
        expect(branch.data.name).toBe(branchName);
        expect(branch.data.title).toBe(branchTitle);
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
                op: PatchOperation.REPLACE,
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
        const file = await api.createFile(
            projectId,
            {
                name: fileName,
                storageId: storageId,
            },
            branchId,
        );
        expect(file.data.id).toBe(fileId);
        expect(file.data.name).toBe(fileName);
    });

    it('Get file', async () => {
        const file = await api.getFile(projectId, fileId);
        expect(file.data.id).toBe(fileId);
        expect(file.data.name).toBe(fileName);
    });

    it('Delete file', async () => {
        await api.deleteFile(projectId, fileId);
    });

    it('Edit file', async () => {
        const file = await api.editFile(projectId, fileId, [
            {
                op: PatchOperation.REPLACE,
                path: '/title',
                value: fileTitle,
            },
        ]);
        expect(file.data.id).toBe(fileId);
        expect(file.data.name).toBe(fileName);
        expect(file.data.title).toBe(fileTitle);
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

    it('Restore file to revision', async () => {
        const file = await api.restoreFileToRevision(projectId, fileId, {
            revisionId: fileRevisionId,
        });
        expect(file.data.id).toBe(fileId);
        expect(file.data.name).toBe(fileName);
    });

    it('Update file', async () => {
        const file = await api.updateFile(projectId, fileId, {
            storageId: storageId,
        });
        expect(file.data.id).toBe(fileId);
        expect(file.data.name).toBe(fileName);
    });

    it('Get file revision', async () => {
        const revision = await api.getFileRevision(projectId, fileId, fileRevisionId);
        expect(revision.data.id).toBe(fileRevisionId);
        expect(revision.data.projectId).toBe(projectId);
    });
});
