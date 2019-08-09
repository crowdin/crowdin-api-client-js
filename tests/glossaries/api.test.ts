import * as nock from 'nock';
import * as crowdin from '../../src/index';

describe('Glossaries API', () => {

    let scope: nock.Scope;
    const api: crowdin.Glossaries.Api = new crowdin.Glossaries.Api('testUser', 'qwerty', 'testOrg');
    const glossaryId = 112;
    const glossaryName = 'test';
    const glossaryTerms = 4;
    const glossaryFormat = crowdin.Glossaries.Model.GlossaryFormat.CSV;
    const glossaryLink = 'test.com';
    const exportId = '1111';
    const importId = '2222';
    const storageId = 1232131;
    const termId = 5555;
    const termText = 'en';
    const termLanguageId = 90;
    const limit = 25;
    const groupId = 111;

    beforeAll(() => {
        scope = nock(api.url)
            .get('/glossaries')
            .query({
                'account-key': api.accountKey,
                login: api.login,
                groupId: groupId
            })
            .reply(200, {
                data: [{
                    data: {
                        id: glossaryId,
                        name: glossaryName
                    }
                }],
                pagination: {
                    offset: 0,
                    limit: limit
                }
            })
            .post('/glossaries', {
                name: glossaryName,
                groupId: groupId
            })
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: glossaryId,
                    name: glossaryName
                }
            })
            .get(`/glossaries/${glossaryId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: glossaryId,
                    name: glossaryName
                }
            })
            .delete(`/glossaries/${glossaryId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200)
            .patch(`/glossaries/${glossaryId}`, [{
                value: glossaryTerms,
                op: crowdin.PatchOperation.REPLACE,
                path: '/term'
            }])
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: glossaryId,
                    name: glossaryName,
                    terms: glossaryTerms
                }
            })
            .post(`/glossaries/${glossaryId}/exports`, {
                format: glossaryFormat
            })
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    identifier: exportId
                }
            })
            .get(`/glossaries/${glossaryId}/exports/download`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    url: glossaryLink
                }
            })
            .get(`/glossaries/${glossaryId}/exports/${exportId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    identifier: exportId
                }
            })
            .post(`/glossaries/${glossaryId}/imports`, {
                storageId: storageId
            })
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    identifier: importId
                }
            })
            .get(`/glossaries/${glossaryId}/imports/${importId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    identifier: importId
                }
            })



            .get(`/glossaries/${glossaryId}/terms`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: [{
                    data: {
                        id: termId,
                        glossaryId: glossaryId
                    }
                }],
                pagination: {
                    offset: 0,
                    limit: limit
                }
            })
            .post(`/glossaries/${glossaryId}/terms`, {
                languageId: termLanguageId,
                text: termText
            })
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: termId,
                    glossaryId: glossaryId
                }
            })
            .get(`/glossaries/${glossaryId}/terms/${termId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: termId,
                    glossaryId: glossaryId
                }
            })
            .delete(`/glossaries/${glossaryId}/terms/${termId}`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200)
            .patch(`/glossaries/${glossaryId}/terms/${termId}`, [{
                value: termText,
                op: crowdin.PatchOperation.REPLACE,
                path: '/text'
            }])
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    id: termId,
                    glossaryId: glossaryId,
                    text: termText
                }
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
            groupId: groupId
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
        const glossary = await api.editGlossary(glossaryId, [{
            op: crowdin.PatchOperation.REPLACE,
            path: '/term',
            value: glossaryTerms
        }]);
        expect(glossary.data.id).toBe(glossaryId);
        expect(glossary.data.name).toBe(glossaryName);
        expect(glossary.data.terms).toBe(glossaryTerms);
    });

    it('Export glossary', async () => {
        const exportStatus = await api.exportGlossary(glossaryId, {
            format: glossaryFormat
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
            storageId: storageId
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
            text: termText
        });
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
        const term = await api.editTerm(glossaryId, termId, [{
            op: crowdin.PatchOperation.REPLACE,
            path: '/text',
            value: termText
        }]);
        expect(term.data.id).toBe(termId);
        expect(term.data.glossaryId).toBe(glossaryId);
        expect(term.data.text).toBe(termText);
    });
});