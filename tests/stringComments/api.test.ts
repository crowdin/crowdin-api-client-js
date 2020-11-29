import * as nock from 'nock';
import { Credentials, PatchOperation, StringComments, StringCommentsModel } from '../../src/index';

describe('String Comments API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: StringComments = new StringComments(credentials);
    const projectId = 2;
    const stringId = 3;
    const stringCommentId = 4;
    const text = 'test';
    const languageId = 'uk';
    const type = StringCommentsModel.Type.COMMENT;

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get(`/projects/${projectId}/strings/${stringId}/comments`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: stringCommentId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                `/projects/${projectId}/strings/${stringId}/comments`,
                {
                    text,
                    type,
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
                    id: stringCommentId,
                },
            })
            .get(`/projects/${projectId}/strings/${stringId}/comments/${stringCommentId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: stringCommentId,
                },
            })
            .delete(`/projects/${projectId}/strings/${stringId}/comments/${stringCommentId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .patch(
                `/projects/${projectId}/strings/${stringId}/comments/${stringCommentId}`,
                [
                    {
                        value: type,
                        op: PatchOperation.REPLACE,
                        path: '/type',
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
                    id: stringCommentId,
                    type,
                },
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List string comment', async () => {
        const comments = await api.listStringComments(projectId, stringId);
        expect(comments.data.length).toBe(1);
        expect(comments.data[0].data.id).toBe(stringCommentId);
        expect(comments.pagination.limit).toBe(limit);
    });

    it('Add string comment', async () => {
        const comment = await api.addStringComment(projectId, stringId, {
            text,
            targetLanguageId: languageId,
            type,
        });
        expect(comment.data.id).toBe(stringCommentId);
    });

    it('Get string comment', async () => {
        const comment = await api.getStringComment(projectId, stringId, stringCommentId);
        expect(comment.data.id).toBe(stringCommentId);
    });

    it('Delete string comment', async () => {
        await api.deleteStringComment(projectId, stringId, stringCommentId);
    });

    it('Edit string comment', async () => {
        const comment = await api.editStringComment(projectId, stringId, stringCommentId, [
            {
                op: PatchOperation.REPLACE,
                path: '/type',
                value: type,
            },
        ]);
        expect(comment.data.id).toBe(stringCommentId);
        expect(comment.data.type).toBe(type);
    });
});
