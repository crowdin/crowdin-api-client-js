import * as nock from 'nock';
import { Credentials, Glossaries, GlossariesModel, PatchOperation } from '../../src/index';

describe('Glossaries API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: Glossaries = new Glossaries(credentials);
    const glossaryId = 112;
    const glossaryName = 'test';
    const glossaryTerms = 4;
    const glossaryFormat = GlossariesModel.GlossaryFormat.CSV;
    const glossaryLink = 'test.com';
    const exportId = '1111';
    const importId = '2222';
    const storageId = 1232131;
    const termId = 5555;
    const termText = 'en';
    const termLanguageId = 'fr';
    const limit = 25;
    const groupId = 111;

    beforeAll(() => {
        scope = nock(api.url)
            .get('/glossaries', undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .query({
                groupId: groupId,
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: glossaryId,
                            name: glossaryName,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                '/glossaries',
                {
                    name: glossaryName,
                    groupId: groupId,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: glossaryId,
                    name: glossaryName,
                },
            })
            .get(`/glossaries/${glossaryId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: glossaryId,
                    name: glossaryName,
                },
            })
            .delete(`/glossaries/${glossaryId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .patch(
                `/glossaries/${glossaryId}`,
                [
                    {
                        value: glossaryTerms,
                        op: PatchOperation.REPLACE,
                        path: '/term',
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
                    id: glossaryId,
                    name: glossaryName,
                    terms: glossaryTerms,
                },
            })
            .post(
                `/glossaries/${glossaryId}/exports`,
                {
                    format: glossaryFormat,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    identifier: exportId,
                },
            })
            .get(`/glossaries/${glossaryId}/exports/download`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    url: glossaryLink,
                },
            })
            .get(`/glossaries/${glossaryId}/exports/${exportId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    identifier: exportId,
                },
            })
            .post(
                `/glossaries/${glossaryId}/imports`,
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
                    identifier: importId,
                },
            })
            .get(`/glossaries/${glossaryId}/imports/${importId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    identifier: importId,
                },
            })
            .get(`/glossaries/${glossaryId}/terms`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: termId,
                            glossaryId: glossaryId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .post(
                `/glossaries/${glossaryId}/terms`,
                {
                    languageId: termLanguageId,
                    text: termText,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: termId,
                    glossaryId: glossaryId,
                },
            })
            .delete(`/glossaries/${glossaryId}/terms`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(204, {
                data: {
                    id: termId,
                    glossaryId: glossaryId,
                },
            })
            .get(`/glossaries/${glossaryId}/terms/${termId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: termId,
                    glossaryId: glossaryId,
                },
            })
            .delete(`/glossaries/${glossaryId}/terms/${termId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .patch(
                `/glossaries/${glossaryId}/terms/${termId}`,
                [
                    {
                        value: termText,
                        op: PatchOperation.REPLACE,
                        path: '/text',
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
                    id: termId,
                    glossaryId: glossaryId,
                    text: termText,
                },
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List glossaries', async () => {
        const glossaries = await api.listGlossaries(groupId);
        expect(glossaries.data.length).toBe(1);
        expect(glossaries.data[0].data.id).toBe(glossaryId);
        expect(glossaries.data[0].data.name).toBe(glossaryName);
        expect(glossaries.pagination.limit).toBe(limit);
    });

    it('Add glossary', async () => {
        const glossary = await api.addGlossary({
            name: glossaryName,
            groupId: groupId,
        });
        expect(glossary.data.id).toBe(glossaryId);
        expect(glossary.data.name).toBe(glossaryName);
    });

    it('Get glossary', async () => {
        const glossary = await api.getGlossary(glossaryId);
        expect(glossary.data.id).toBe(glossaryId);
        expect(glossary.data.name).toBe(glossaryName);
    });

    it('Delete glossary', async () => {
        await api.deleteGlossary(glossaryId);
    });

    it('Edit glossary', async () => {
        const glossary = await api.editGlossary(glossaryId, [
            {
                op: PatchOperation.REPLACE,
                path: '/term',
                value: glossaryTerms,
            },
        ]);
        expect(glossary.data.id).toBe(glossaryId);
        expect(glossary.data.name).toBe(glossaryName);
        expect(glossary.data.terms).toBe(glossaryTerms);
    });

    it('Export glossary', async () => {
        const exportStatus = await api.exportGlossary(glossaryId, {
            format: glossaryFormat,
        });
        expect(exportStatus.data.identifier).toBe(exportId);
    });

    it('Download glossary', async () => {
        const link = await api.downloadGlossary(glossaryId);
        expect(link.data.url).toBe(glossaryLink);
    });

    it('Check glossary export status', async () => {
        const exportStatus = await api.checkGlossaryExportStatus(glossaryId, exportId);
        expect(exportStatus.data.identifier).toBe(exportId);
    });

    it('Import glossary file', async () => {
        const importStatus = await api.importGlossaryFile(glossaryId, {
            storageId: storageId,
        });
        expect(importStatus.data.identifier).toBe(importId);
    });

    it('Check glossary import status', async () => {
        const importStatus = await api.checkGlossaryImportStatus(glossaryId, importId);
        expect(importStatus.data.identifier).toBe(importId);
    });

    it('List terms', async () => {
        const terms = await api.listTerms(glossaryId);
        expect(terms.data.length).toBe(1);
        expect(terms.data[0].data.id).toBe(termId);
        expect(terms.data[0].data.glossaryId).toBe(glossaryId);
    });

    it('Add term', async () => {
        const term = await api.addTerm(glossaryId, {
            languageId: termLanguageId,
            text: termText,
        });
        expect(term.data.id).toBe(termId);
        expect(term.data.glossaryId).toBe(glossaryId);
    });

    it('Clear glossary', async () => {
        const term = await api.clearGlossary(glossaryId);
        expect(term.data.id).toBe(termId);
        expect(term.data.glossaryId).toBe(glossaryId);
    });

    it('Get term', async () => {
        const term = await api.getTerm(glossaryId, termId);
        expect(term.data.id).toBe(termId);
        expect(term.data.glossaryId).toBe(glossaryId);
    });

    it('Delete term', async () => {
        await api.deleteTerm(glossaryId, termId);
    });

    it('Edit term', async () => {
        const term = await api.editTerm(glossaryId, termId, [
            {
                op: PatchOperation.REPLACE,
                path: '/text',
                value: termText,
            },
        ]);
        expect(term.data.id).toBe(termId);
        expect(term.data.glossaryId).toBe(glossaryId);
        expect(term.data.text).toBe(termText);
    });
});
