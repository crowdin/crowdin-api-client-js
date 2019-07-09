import * as nock from 'nock';
import * as crowdin from '../../src/index';

describe('Files API', () => {

    let scope: nock.Scope;
    const api: crowdin.Files.Api = new crowdin.Files.Api('testUser', 'qwerty', 'testOrg');
    const projectId = 2;
    const fileName = '1.txt';
    const fileTitle = 'Test file';
    const fileMimeType = 'application/xml';
    const fileSize = 300;

    const filleRawUrl = 'google.com';
    const fileRevisionId = 888;

    const branchId = 12;
    const storageId = 123;

    const fileId = 321;
    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get(`/projects/${projectId}/files`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: [{
                    data: {
                        id: fileId,
                        name: fileName,
                        attributes: {
                            mimeType: fileMimeType,
                            fileSize: fileSize
                        }
                    }
                }],
                pagination: {
                    offset: 0,
                    limit: limit
                }
            })
            .post(`/projects/${projectId}/files`, {
                name: fileName,
                storageId: storageId
            })
            .query({
                'account-key': api.accountKey,
                login: api.login,
                branchId: branchId
            })
            .reply(200, {
                data: {
                    id: fileId,
                    name: fileName,
                    attributes: {
                        mimeType: fileMimeType,
                        fileSize: fileSize
                    }
                }
            })
            .get(`/projects/${projectId}/files/${fileId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: fileId,
                    name: fileName,
                    attributes: {
                        mimeType: fileMimeType,
                        fileSize: fileSize
                    }
                }
            })
            .delete(`/projects/${projectId}/files/${fileId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200)
            .patch(`/projects/${projectId}/files/${fileId}`, [{
                value: fileTitle,
                op: crowdin.PatchOperation.REPLACE,
                path: '/title'
            }])
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: fileId,
                    name: fileName,
                    title: fileTitle,
                    attributes: {
                        mimeType: fileMimeType,
                        fileSize: fileSize
                    }
                }
            })
            .get(`/projects/${projectId}/files/${fileId}/download`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    url: filleRawUrl
                }
            })
            .get(`/projects/${projectId}/files/${fileId}/revisions`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: [{
                    data: {
                        id: fileRevisionId,
                        projectId: projectId
                    }
                }],
                pagination: {
                    offset: 0,
                    limit: limit
                }
            })
            .post(`/projects/${projectId}/files/${fileId}/revisions`, {
                storageId: storageId
            })
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: [{
                    data: {
                        id: fileRevisionId,
                        projectId: projectId
                    }
                }],
                pagination: {
                    offset: 0,
                    limit: limit
                }
            })
            .get(`/projects/${projectId}/files/${fileId}/revisions/${fileRevisionId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: fileRevisionId,
                    projectId: projectId
                }
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List project files', async () => {
        const files = await api.listProjectFiles(projectId);
        expect(files.data.length).toBe(1);
        expect(files.data[0].data.id).toBe(fileId);
        expect(files.data[0].data.name).toBe(fileName);
        expect(files.data[0].data.attributes.fileSize).toBe(fileSize);
        expect(files.data[0].data.attributes.mimeType).toBe(fileMimeType);
        expect(files.pagination.limit).toBe(limit);
    });

    it('Create file', async () => {
        const file = await api.createFile(projectId, {
            name: fileName,
            storageId: storageId
        }, branchId);
        expect(file.data.id).toBe(fileId);
        expect(file.data.name).toBe(fileName);
        expect(file.data.attributes.fileSize).toBe(fileSize);
        expect(file.data.attributes.mimeType).toBe(fileMimeType);
    });

    it('Get file', async () => {
        const file = await api.getFile(projectId, fileId);
        expect(file.data.id).toBe(fileId);
        expect(file.data.name).toBe(fileName);
        expect(file.data.attributes.fileSize).toBe(fileSize);
        expect(file.data.attributes.mimeType).toBe(fileMimeType);
    });

    it('Delete file', async () => {
        await api.deleteFile(projectId, fileId);
    });

    it('Update file', async () => {
        const file = await api.updateFile(projectId, fileId, [{
            op: crowdin.PatchOperation.REPLACE,
            path: '/title',
            value: fileTitle
        }]);
        expect(file.data.id).toBe(fileId);
        expect(file.data.name).toBe(fileName);
        expect(file.data.title).toBe(fileTitle);
        expect(file.data.attributes.fileSize).toBe(fileSize);
        expect(file.data.attributes.mimeType).toBe(fileMimeType);
    });

    it('Export raw file', async () => {
        const file = await api.exportFileRaw(projectId, fileId);
        expect(file.data.url).toBe(filleRawUrl);
    });

    it('List file revisions', async () => {
        const revisions = await api.listFileRevisions(projectId, fileId);
        expect(revisions.data.length).toBe(1);
        expect(revisions.data[0].data.id).toBe(fileRevisionId);
        expect(revisions.data[0].data.projectId).toBe(projectId);
        expect(revisions.pagination.limit).toBe(limit);
    });

    it('Create file revision', async () => {
        const revisions = await api.createFileRevision(projectId, fileId, {
            storageId: storageId
        });
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
});