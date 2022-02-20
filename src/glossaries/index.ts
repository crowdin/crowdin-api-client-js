import { CrowdinApi, DownloadLink, PatchRequest, ResponseList, ResponseObject, Status } from '../core';

export class Glossaries extends CrowdinApi {
    /**
     * @param groupId group identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.getMany
     */
    listGlossaries(groupId?: number, limit?: number, offset?: number): Promise<ResponseList<GlossariesModel.Glossary>> {
        let url = `${this.url}/glossaries`;
        url = this.addQueryParam(url, 'groupId', groupId);
        return this.getList(url, limit, offset);
    }

    /**
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.post
     */
    addGlossary(request: GlossariesModel.CreateGlossaryRequest): Promise<ResponseObject<GlossariesModel.Glossary>> {
        const url = `${this.url}/glossaries`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param glossaryId glossary identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.get
     */
    getGlossary(glossaryId: number): Promise<ResponseObject<GlossariesModel.Glossary>> {
        const url = `${this.url}/glossaries/${glossaryId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param glossaryId glossary identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.delete
     */
    deleteGlossary(glossaryId: number): Promise<void> {
        const url = `${this.url}/glossaries/${glossaryId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param glossaryId glossary identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.patch
     */
    editGlossary(glossaryId: number, request: PatchRequest[]): Promise<ResponseObject<GlossariesModel.Glossary>> {
        const url = `${this.url}/glossaries/${glossaryId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param glossaryId glossary identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.exports.post
     */
    exportGlossary(
        glossaryId: number,
        request: GlossariesModel.ExportGlossaryRequest,
    ): Promise<ResponseObject<Status<GlossariesModel.GlossaryExportStatusAttribute>>> {
        const url = `${this.url}/glossaries/${glossaryId}/exports`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param glossaryId glossary identifier
     * @param exportId export identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.exports.get
     */
    checkGlossaryExportStatus(
        glossaryId: number,
        exportId: string,
    ): Promise<ResponseObject<Status<GlossariesModel.GlossaryExportStatusAttribute>>> {
        const url = `${this.url}/glossaries/${glossaryId}/exports/${exportId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param glossaryId glossary identifier
     * @param exportId export identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.exports.download.download
     */
    downloadGlossary(glossaryId: number, exportId: string): Promise<ResponseObject<DownloadLink>> {
        const url = `${this.url}/glossaries/${glossaryId}/exports/${exportId}/download`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param glossaryId glossary identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.imports.post
     */
    importGlossaryFile(
        glossaryId: number,
        request: GlossariesModel.GlossaryFile,
    ): Promise<ResponseObject<Status<GlossariesModel.GlossaryImportStatusAttribute>>> {
        const url = `${this.url}/glossaries/${glossaryId}/imports`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param glossaryId glossary identifier
     * @param importId import identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.imports.get
     */
    checkGlossaryImportStatus(
        glossaryId: number,
        importId: string,
    ): Promise<ResponseObject<Status<GlossariesModel.GlossaryImportStatusAttribute>>> {
        const url = `${this.url}/glossaries/${glossaryId}/imports/${importId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param glossaryId glossary identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.terms.getMany
     */
    listTerms(
        glossaryId: number,
        request: GlossariesModel.ListTermsRequest,
    ): Promise<ResponseList<GlossariesModel.Term>>;
    /**
     * @param glossaryId glossary identifier
     * @param userId list user glossaries
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @param languageId term language identifier
     * @param translationOfTermId filter terms by termId
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.terms.getMany
     */
    listTerms(
        glossaryId: number,
        userId?: number,
        limit?: number,
        offset?: number,
        languageId?: string,
        translationOfTermId?: number,
    ): Promise<ResponseList<GlossariesModel.Term>>;
    listTerms(
        glossaryId: number,
        userIdOrRequest?: number | GlossariesModel.ListTermsRequest,
        limit?: number,
        offset?: number,
        languageId?: string,
        translationOfTermId?: number,
    ): Promise<ResponseList<GlossariesModel.Term>> {
        let url = `${this.url}/glossaries/${glossaryId}/terms`;
        let request: GlossariesModel.ListTermsRequest;
        if (userIdOrRequest && typeof userIdOrRequest === 'object') {
            request = userIdOrRequest;
        } else {
            request = { userId: userIdOrRequest, limit, offset, languageId, translationOfTermId };
        }
        url = this.addQueryParam(url, 'userId', request.userId);
        url = this.addQueryParam(url, 'languageId', request.languageId);
        url = this.addQueryParam(url, 'translationOfTermId', request.translationOfTermId);
        return this.getList(url, request.limit, request.offset);
    }

    /**
     * @param glossaryId glossary identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.terms.post
     */
    addTerm(
        glossaryId: number,
        request: GlossariesModel.CreateTermRequest,
    ): Promise<ResponseObject<GlossariesModel.Term>> {
        const url = `${this.url}/glossaries/${glossaryId}/terms`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param glossaryId glossary identifier
     * @param languageId languageId identifier
     * @param translationOfTermId term translation identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.terms.deleteMany
     */
    clearGlossary(
        glossaryId: number,
        languageId?: number,
        translationOfTermId?: number,
    ): Promise<ResponseObject<GlossariesModel.Term>> {
        let url = `${this.url}/glossaries/${glossaryId}/terms`;
        url = this.addQueryParam(url, 'languageId', languageId);
        url = this.addQueryParam(url, 'translationOfTermId', translationOfTermId);
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param glossaryId glossary identifier
     * @param termId term identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.terms.get
     */
    getTerm(glossaryId: number, termId: number): Promise<ResponseObject<GlossariesModel.Term>> {
        const url = `${this.url}/glossaries/${glossaryId}/terms/${termId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param glossaryId glossary identifier
     * @param termId term identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.terms.delete
     */
    deleteTerm(glossaryId: number, termId: number): Promise<void> {
        const url = `${this.url}/glossaries/${glossaryId}/terms/${termId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param glossaryId glossary identifier
     * @param termId term identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.terms.patch
     */
    editTerm(
        glossaryId: number,
        termId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<GlossariesModel.Term>> {
        const url = `${this.url}/glossaries/${glossaryId}/terms/${termId}`;
        return this.patch(url, request, this.defaultConfig());
    }
}

export namespace GlossariesModel {
    export interface Glossary {
        id: number;
        name: string;
        groupId: number;
        userId: number;
        terms: number;
        languageId: string;
        languageIds: string[];
        projectIds: number[];
        createdAt: string;
    }

    export interface CreateGlossaryRequest {
        name: string;
        languageId: string;
        groupId?: number;
    }

    export interface ExportGlossaryRequest {
        format: GlossaryFormat;
    }

    export interface GlossaryExportStatusAttribute {
        format: string;
    }

    export interface GlossaryImportStatusAttribute {
        storageId: number;
        scheme: any;
        firstLineContainsHeader: boolean;
    }

    export interface GlossaryFile {
        storageId: number;
        scheme?: GlossaryFileScheme;
        firstLineContainsHeader?: boolean;
    }

    export interface ListTermsRequest {
        userId?: number;
        limit?: number;
        offset?: number;
        languageId?: string;
        translationOfTermId?: number;
    }

    export interface Term {
        id: number;
        userId: number;
        glossaryId: number;
        languageId: string;
        text: string;
        description: string;
        partOfSpeech: string;
        lemma: string;
        createdAt: string;
        updatedAt: string;
    }

    export interface CreateTermRequest {
        languageId: string;
        text: string;
        description?: string;
        partOfSpeech?: PartOfSpeech;
        translationOfTermId?: number;
    }

    export enum GlossaryFormat {
        TBX = 'tbx',
        CSV = 'csv',
        XLSX = 'xlsx',
    }

    export interface GlossaryFileScheme {
        [key: string]: number;
    }

    export enum PartOfSpeech {
        ADJECTIVE = 'adjective',
        ADPOSITION = 'adposition',
        ADVERB = 'adverb',
        AUXILIARY = 'auxiliary',
        COORDINATING_CONJUNCTION = 'coordinating conjunction',
        DETERMINER = 'determiner',
        INTERJECTION = 'interjection',
        NOUN = 'noun',
        NUMERAL = 'numeral',
        PARTICLE = 'particle',
        PRONOUN = 'pronoun',
        PROPER_NOUN = 'proper noun',
        SUBORDINATING_CONJUNCTION = 'subordinating conjunction',
        VERB = 'verb',
        OTHER = 'other',
    }
}
