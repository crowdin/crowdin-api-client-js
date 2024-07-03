import * as nock from 'nock';
import { Credentials, Glossaries } from '../../src/index';

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
    const glossaryFormat = 'csv';
    const glossaryLink = 'test.com';
    const exportId = '1111';
    const importId = '2222';
    const storageId = 1232131;
    const termId = 5555;
    const termText = 'en';
    const termLanguageId = 'fr';
    const limit = 25;
    const groupId = 111;
    const projectId = 123;

    const conceptId = 983;
    const subject = 'test';

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
                    languageId: termLanguageId,
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
                        op: 'replace',
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
            .get(`/glossaries/${glossaryId}/exports/${exportId}/download`, undefined, {
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
                        op: 'replace',
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
            })
            .get(`/glossaries/${glossaryId}/concepts`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: conceptId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            })
            .get(`/glossaries/${glossaryId}/concepts/${conceptId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: conceptId,
                },
            })
            .put(
                `/glossaries/${glossaryId}/concepts/${conceptId}`,
                {
                    subject,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: conceptId,
                },
            })
            .delete(`/glossaries/${glossaryId}/concepts/${conceptId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .post(
                `/projects/${projectId}/glossaries/concordance`,
                {
                    sourceLanguageId: termLanguageId,
                    targetLanguageId: termLanguageId,
                    expressions: ['Welcome!'],
                },
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
                            glossary: {
                                id: glossaryId,
                            },
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List glossaries', async () => {
        const glossaries = await api.listGlossaries({ groupId });
        expect(glossaries.data.length).toBe(1);
        expect(glossaries.data[0].data.id).toBe(glossaryId);
        expect(glossaries.data[0].data.name).toBe(glossaryName);
        expect(glossaries.pagination.limit).toBe(limit);
    });

    it('Add glossary', async () => {
        const glossary = await api.addGlossary({
            name: glossaryName,
            groupId: groupId,
            languageId: termLanguageId,
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
                op: 'replace',
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
        const link = await api.downloadGlossary(glossaryId, exportId);
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
                op: 'replace',
                path: '/text',
                value: termText,
            },
        ]);
        expect(term.data.id).toBe(termId);
        expect(term.data.glossaryId).toBe(glossaryId);
        expect(term.data.text).toBe(termText);
    });

    it('List concepts', async () => {
        const concepts = await api.listConcepts(glossaryId);
        expect(concepts.data.length).toBe(1);
        expect(concepts.data[0].data.id).toBe(conceptId);
    });

    it('Get concept', async () => {
        const concept = await api.getConcept(glossaryId, conceptId);
        expect(concept.data.id).toBe(conceptId);
    });

    it('Update concept', async () => {
        const concept = await api.updateConcept(glossaryId, conceptId, {
            subject,
        });
        expect(concept.data.id).toBe(conceptId);
    });

    it('Delete concept', async () => {
        await api.deleteConcept(glossaryId, conceptId);
    });

    it('Concordance search', async () => {
        const res = await api.concordanceSearch(projectId, {
            sourceLanguageId: termLanguageId,
            targetLanguageId: termLanguageId,
            expressions: ['Welcome!'],
        });
        expect(res.data.length).toBe(1);
        expect(res.data[0].data.glossary.id).toBe(glossaryId);
    });
});
