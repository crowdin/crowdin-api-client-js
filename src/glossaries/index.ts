import { CrowdinApi, DownloadLink, PatchRequest, ResponseList, ResponseObject, Status } from '../core';

export class Glossaries extends CrowdinApi {
    /**
     * @param groupId group identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @param fetchAll fetch all without pagination
     */
    listGlossaries(
        groupId: number,
        limit?: number,
        offset?: number,
        fetchAll?: boolean,
    ): Promise<ResponseList<GlossariesModel.Glossary>> {
        let url = `${this.url}/glossaries`;
        url = this.addQueryParam(url, 'groupId', groupId);
        return this.getList(url, limit, offset, fetchAll);
    }

    /**
     * @param request request body
     */
    addGlossary(request: GlossariesModel.CreateGlossaryRequest): Promise<ResponseObject<GlossariesModel.Glossary>> {
        const url = `${this.url}/glossaries`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param glossaryId glossary identifier
     */
    getGlossary(glossaryId: number): Promise<ResponseObject<GlossariesModel.Glossary>> {
        const url = `${this.url}/glossaries/${glossaryId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param glossaryId glossary identifier
     */
    deleteGlossary(glossaryId: number): Promise<void> {
        const url = `${this.url}/glossaries/${glossaryId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param glossaryId glossary identifier
     * @param request request body
     */
    editGlossary(glossaryId: number, request: PatchRequest[]): Promise<ResponseObject<GlossariesModel.Glossary>> {
        const url = `${this.url}/glossaries/${glossaryId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param glossaryId glossary identifier
     * @param request request body
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
     * @param format defines download format (default is tbx)
     */
    downloadGlossary(
        glossaryId: number,
        format?: GlossariesModel.GlossaryFormat,
    ): Promise<ResponseObject<DownloadLink>> {
        let url = `${this.url}/glossaries/${glossaryId}/exports/download`;
        url = this.addQueryParam(url, 'format', format);
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param glossaryId glossary identifier
     * @param exportId export identifier
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
     * @param request request body
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
     * @param userId list user glossaries
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @param fetchAll fetch all without pagination
     */
    listTerms(
        glossaryId: number,
        userId?: number,
        limit?: number,
        offset?: number,
        fetchAll?: boolean,
    ): Promise<ResponseList<GlossariesModel.Term>> {
        let url = `${this.url}/glossaries/${glossaryId}/terms`;
        url = this.addQueryParam(url, 'userId', userId);
        return this.getList(url, limit, offset, fetchAll);
    }

    /**
     * @param glossaryId glossary identifier
     * @param request request body
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
     */
    getTerm(glossaryId: number, termId: number): Promise<ResponseObject<GlossariesModel.Term>> {
        const url = `${this.url}/glossaries/${glossaryId}/terms/${termId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param glossaryId glossary identifier
     * @param termId term identifier
     */
    deleteTerm(glossaryId: number, termId: number): Promise<void> {
        const url = `${this.url}/glossaries/${glossaryId}/terms/${termId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param glossaryId glossary identifier
     * @param termId term identifier
     * @param request request body
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
        languageIds: string[];
        projectIds: number[];
        createdAt: string;
    }

    export interface CreateGlossaryRequest {
        name: string;
        groupId?: number;
    }

    export interface ExportGlossaryRequest {
        format: GlossaryFormat;
    }

    export interface GlossaryExportStatusAttribute {
        format: string;
        organizationId: number;
        glossaryId: number;
    }

    export interface GlossaryImportStatusAttribute {
        storageId: number;
        scheme: any;
        firstLineContainsHeader: boolean;
        organizationId: number;
        userId: number;
        glossaryId: number;
    }

    export interface GlossaryFile {
        storageId: number;
        scheme?: GlossaryFileScheme;
        firstLineContainsHeader?: boolean;
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
