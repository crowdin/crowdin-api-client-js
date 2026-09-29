import nock from 'nock';
import { Credentials, StringTranslations } from '../../src';

describe('String Translations API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: StringTranslations = new StringTranslations(credentials);
    const projectId = 12;
    const translationId = 23;
    const approvalId = 45;
    const stringId = 156;
    const languageId = 'fr';
    const text = 'test';
    const voteId = 1234;
    const mark = 'down';
    const fileId = 78;
    const correctionId = 91;

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get(`/projects/${projectId}/approvals`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: approvalId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                `/projects/${projectId}/approvals`,
                {
                    translationId: translationId,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: approvalId,
                },
            })
            .patch(
                `/projects/${projectId}/approvals`,
                [
                    {
                        op: 'add',
                        path: '/-',
                        value: {
                            translationId: translationId,
                        },
                    },
                ],
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: [
                    {
                        data: {
                            id: translationId,
                        },
                    },
                ],
            })
            .delete(`/projects/${projectId}/approvals`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .query({
                stringId: stringId,
            })
            .reply(200)
            .get(`/projects/${projectId}/approvals/${approvalId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: approvalId,
                },
            })
            .delete(`/projects/${projectId}/approvals/${approvalId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .get(`/projects/${projectId}/languages/${languageId}/translations`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            stringId: stringId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(`/projects/${projectId}/translations/alignment`, {
                sourceLanguageId: languageId,
                targetLanguageId: languageId,
                text: 'test',
            })
            .reply(200, {
                data: {
                    words: [
                        {
                            text: 'test',
                        },
                    ],
                },
            })
            .get(`/projects/${projectId}/translations`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .query({
                stringId: stringId,
                languageId: languageId,
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: translationId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                `/projects/${projectId}/translations`,
                {
                    stringId: stringId,
                    languageId: languageId,
                    text: text,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: translationId,
                },
            })
            .delete(`/projects/${projectId}/translations`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .query({
                stringId: stringId,
            })
            .reply(200)
            .get(`/projects/${projectId}/translations/${translationId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: translationId,
                },
            })
            .delete(`/projects/${projectId}/translations/${translationId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .put(
                `/projects/${projectId}/translations/${translationId}`,
                {},
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: translationId,
                },
            })
            .patch(
                `/projects/${projectId}/translations`,
                [
                    {
                        op: 'add',
                        path: '/-',
                        value: {
                            stringId: stringId,
                            languageId: languageId,
                            text: text,
                            pluralCategoryName: 'one',
                            addToTm: false,
                        },
                    },
                ],
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: [
                    {
                        data: {
                            id: stringId,
                            text: text,
                        },
                    },
                ],
            })
            .get(`/projects/${projectId}/votes`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: voteId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                `/projects/${projectId}/votes`,
                {
                    mark: mark,
                    translationId: translationId,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: voteId,
                },
            })
            .get(`/projects/${projectId}/votes/${voteId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: voteId,
                },
            })
            .delete(`/projects/${projectId}/votes/${voteId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .get(`/projects/${projectId}/approvals`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .query({ correctionId })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: approvalId,
                            correctionId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                `/projects/${projectId}/approvals`,
                { correctionId },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: approvalId,
                    correctionId,
                },
            })
            .delete(`/projects/${projectId}/approvals`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .query({ fileId })
            .reply(200)
            .delete(`/projects/${projectId}/translations`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .query({ fileId, languageId })
            .reply(200)
            .get(`/projects/${projectId}/translations/${translationId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .query({ denormalizePlaceholders: 1 })
            .reply(200, {
                data: {
                    id: translationId,
                    matchType: 'perfect',
                },
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List Translation Approvals', async () => {
        const approvals = await api.listTranslationApprovals(projectId);
        expect(approvals.data.length).toBe(1);
        expect(approvals.data[0].data.id).toBe(approvalId);
        expect(approvals.pagination.limit).toBe(limit);
    });

    it('Add Approval', async () => {
        const approval = await api.addApproval(projectId, {
            translationId: translationId,
        });
        expect(approval.data.id).toBe(approvalId);
    });

    it('Approval Batch Operations', async () => {
        const approvals = await api.approvalBatchOperations(projectId, [
            {
                op: 'add',
                path: '/-',
                value: {
                    translationId: translationId,
                },
            },
        ]);
        expect(approvals.data.length).toBe(1);
        expect(approvals.data[0].data.id).toBe(translationId);
    });

    it('Remove String Approvals', async () => {
        await api.removeStringApprovals(projectId, stringId);
    });

    it('Approval Info', async () => {
        const approval = await api.approvalInfo(projectId, approvalId);
        expect(approval.data.id).toBe(approvalId);
    });

    it('Remove Approval', async () => {
        await api.removeApproval(projectId, approvalId);
    });

    it('List Language Translations', async () => {
        const translations = await api.listLanguageTranslations(projectId, languageId);
        expect(translations.data.length).toBe(1);
        expect(translations.data[0].data.stringId).toBe(stringId);
        expect(translations.pagination.limit).toBe(limit);
    });

    it('Translation Alignment', async () => {
        const res = await api.translationAlignment(projectId, {
            sourceLanguageId: languageId,
            targetLanguageId: languageId,
            text: 'test',
        });
        expect(res.data.words.length).toBe(1);
        expect(res.data.words[0].text).toBe('test');
    });

    it('List String Translations', async () => {
        const translations = await api.listStringTranslations(projectId, stringId, languageId);
        expect(translations.data.length).toBe(1);
        expect(translations.data[0].data.id).toBe(translationId);
        expect(translations.pagination.limit).toBe(limit);
    });

    it('Add Translation', async () => {
        const translation = await api.addTranslation(projectId, {
            languageId: languageId,
            stringId: stringId,
            text: text,
        });
        expect(translation.data.id).toBe(translationId);
    });

    it('Delete All Translations', async () => {
        await api.deleteAllTranslations(projectId, stringId);
    });

    it('Translation Info', async () => {
        const translation = await api.translationInfo(projectId, translationId);
        expect(translation.data.id).toBe(translationId);
    });

    it('Delete Translation', async () => {
        await api.deleteTranslation(projectId, translationId);
    });

    it('Restore Translation', async () => {
        const translation = await api.restoreTranslation(projectId, translationId);
        expect(translation.data.id).toBe(translationId);
    });

    it('Translation Batch Operations', async () => {
        const translations = await api.translationBatchOperations(projectId, [
            {
                op: 'add',
                path: '/-',
                value: {
                    stringId: stringId,
                    languageId: languageId,
                    text: text,
                    pluralCategoryName: 'one',
                    addToTm: false,
                },
            },
        ]);

        expect(translations.data.length).toBe(1);
        expect(translations.data[0].data.id).toBe(stringId);
        expect(translations.data[0].data.text).toBe(text);
    });

    it('List Translation Votes', async () => {
        const votes = await api.listTranslationVotes(projectId);
        expect(votes.data.length).toBe(1);
        expect(votes.data[0].data.id).toBe(voteId);
        expect(votes.pagination.limit).toBe(limit);
    });

    it('Add Vote', async () => {
        const vote = await api.addVote(projectId, {
            translationId: translationId,
            mark: mark,
        });
        expect(vote.data.id).toBe(voteId);
    });

    it('Vote Info', async () => {
        const vote = await api.voteInfo(projectId, voteId);
        expect(vote.data.id).toBe(voteId);
    });

    it('Cancel Vote', async () => {
        await api.cancelVote(projectId, voteId);
    });

    it('List Translation Approvals by correction', async () => {
        const approvals = await api.listTranslationApprovals(projectId, { correctionId });
        expect(approvals.data.length).toBe(1);
        expect(approvals.data[0].data.correctionId).toBe(correctionId);
    });

    it('Add Correction Approval', async () => {
        const approval = await api.addApproval(projectId, { correctionId });
        expect(approval.data.correctionId).toBe(correctionId);
    });

    it('Remove Asset Approvals', async () => {
        await api.removeStringApprovals(projectId, { fileId });
    });

    it('Delete All Translations by file', async () => {
        await api.deleteAllTranslations(projectId, { fileId, languageId });
    });

    it('Translation Info with denormalized placeholders', async () => {
        const translation = await api.translationInfo(projectId, translationId, { denormalizePlaceholders: 1 });
        expect(translation.data.id).toBe(translationId);
        expect(translation.data.matchType).toBe('perfect');
    });
});
