import * as nock from 'nock';
import { Credentials, StringComments } from '../../src/index';

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
    const type = 'comment';

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get(`/projects/${projectId}/comments`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .query({
                stringId,
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
                `/projects/${projectId}/comments`,
                {
                    text,
                    type,
                    targetLanguageId: languageId,
                    stringId,
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
            .get(`/projects/${projectId}/comments/${stringCommentId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: stringCommentId,
                },
            })
            .delete(`/projects/${projectId}/comments/${stringCommentId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .patch(
                `/projects/${projectId}/comments/${stringCommentId}`,
                [
                    {
                        value: type,
                        op: 'replace',
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
        const comments = await api.listStringComments(projectId, { stringId });
        expect(comments.data.length).toBe(1);
        expect(comments.data[0].data.id).toBe(stringCommentId);
        expect(comments.pagination.limit).toBe(limit);
    });

    it('Add string comment', async () => {
        const comment = await api.addStringComment(projectId, {
            text,
            targetLanguageId: languageId,
            type,
            stringId,
        });
        expect(comment.data.id).toBe(stringCommentId);
    });

    it('Get string comment', async () => {
        const comment = await api.getStringComment(projectId, stringCommentId);
        expect(comment.data.id).toBe(stringCommentId);
    });

    it('Delete string comment', async () => {
        await api.deleteStringComment(projectId, stringCommentId);
    });

    it('Edit string comment', async () => {
        const comment = await api.editStringComment(projectId, stringCommentId, [
            {
                op: 'replace',
                path: '/type',
                value: type,
            },
        ]);
        expect(comment.data.id).toBe(stringCommentId);
        expect(comment.data.type).toBe(type);
    });
});
