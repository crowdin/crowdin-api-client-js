import nock from 'nock';
import { Credentials, Discussions } from '../../src/index';

describe('Discussions API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
    };
    const api: Discussions = new Discussions(credentials);
    const projectId = 2;
    const discussionId = 3;
    const replyId = 4;
    const userId = 5;
    const title = 'Glossary for release';
    const text = 'Let us agree on terms';

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get(`/projects/${projectId}/discussions`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .query({
                status: 'open,closed',
                userIds: `${userId}`,
                orderBy: 'repliesCount desc',
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: discussionId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                `/projects/${projectId}/discussions`,
                {
                    title,
                    text,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(201, {
                data: {
                    id: discussionId,
                    title,
                },
            })
            .get(`/projects/${projectId}/discussions/${discussionId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: discussionId,
                },
            })
            .patch(
                `/projects/${projectId}/discussions/${discussionId}`,
                [
                    {
                        op: 'replace',
                        path: '/status',
                        value: 'closed',
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
                    id: discussionId,
                    status: 'closed',
                },
            })
            .delete(`/projects/${projectId}/discussions/${discussionId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(204)
            .get(`/projects/${projectId}/discussions`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: discussionId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .get(`/projects/${projectId}/discussions/${discussionId}/replies`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: replyId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .get(`/projects/${projectId}/discussions/${discussionId}/replies`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .query({
                limit,
                offset: 0,
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: replyId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                `/projects/${projectId}/discussions/${discussionId}/replies`,
                {
                    text,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(201, {
                data: {
                    id: replyId,
                    text,
                },
            })
            .get(`/projects/${projectId}/discussions/${discussionId}/replies/${replyId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: replyId,
                },
            })
            .patch(
                `/projects/${projectId}/discussions/${discussionId}/replies/${replyId}`,
                [
                    {
                        op: 'replace',
                        path: '/text',
                        value: text,
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
                    id: replyId,
                    text,
                },
            })
            .delete(`/projects/${projectId}/discussions/${discussionId}/replies/${replyId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(204);
    });

    afterAll(() => {
        scope.done();
    });

    it('List Discussions', async () => {
        const discussions = await api.listDiscussions(projectId, {
            status: 'open,closed',
            userIds: `${userId}`,
            orderBy: 'repliesCount desc',
        });
        expect(discussions.data.length).toBe(1);
        expect(discussions.data[0].data.id).toBe(discussionId);
        expect(discussions.pagination.limit).toBe(limit);
    });

    it('List Discussions without filters', async () => {
        const discussions = await api.listDiscussions(projectId);
        expect(discussions.data[0].data.id).toBe(discussionId);
    });

    it('Add Discussion', async () => {
        const discussion = await api.addDiscussion(projectId, { title, text });
        expect(discussion.data.id).toBe(discussionId);
        expect(discussion.data.title).toBe(title);
    });

    it('Get Discussion', async () => {
        const discussion = await api.getDiscussion(projectId, discussionId);
        expect(discussion.data.id).toBe(discussionId);
    });

    it('Edit Discussion', async () => {
        const discussion = await api.editDiscussion(projectId, discussionId, [
            {
                op: 'replace',
                path: '/status',
                value: 'closed',
            },
        ]);
        expect(discussion.data.id).toBe(discussionId);
        expect(discussion.data.status).toBe('closed');
    });

    it('Delete Discussion', async () => {
        await api.deleteDiscussion(projectId, discussionId);
    });

    it('List Discussion Replies without options', async () => {
        const replies = await api.listDiscussionReplies(projectId, discussionId);
        expect(replies.data[0].data.id).toBe(replyId);
    });

    it('List Discussion Replies', async () => {
        const replies = await api.listDiscussionReplies(projectId, discussionId, { limit, offset: 0 });
        expect(replies.data.length).toBe(1);
        expect(replies.data[0].data.id).toBe(replyId);
        expect(replies.pagination.limit).toBe(limit);
    });

    it('Add Discussion Reply', async () => {
        const reply = await api.addDiscussionReply(projectId, discussionId, { text });
        expect(reply.data.id).toBe(replyId);
        expect(reply.data.text).toBe(text);
    });

    it('Get Discussion Reply', async () => {
        const reply = await api.getDiscussionReply(projectId, discussionId, replyId);
        expect(reply.data.id).toBe(replyId);
    });

    it('Edit Discussion Reply', async () => {
        const reply = await api.editDiscussionReply(projectId, discussionId, replyId, [
            {
                op: 'replace',
                path: '/text',
                value: text,
            },
        ]);
        expect(reply.data.id).toBe(replyId);
        expect(reply.data.text).toBe(text);
    });

    it('Delete Discussion Reply', async () => {
        await api.deleteDiscussionReply(projectId, discussionId, replyId);
    });
});
