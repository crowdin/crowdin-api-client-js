import {
    CrowdinApi,
    DownloadLink,
    isOptionalNumber,
    PaginationOptions,
    PatchRequest,
    ResponseList,
    ResponseObject,
    Status,
} from '../core';

/**
 * Glossaries help to explain some specific terms or the ones often used in the project so that they can be properly and consistently translated.
 *
 * Use API to manage glossaries or specific terms.
 * Glossary export and import are asynchronous operations and shall be completed with sequence of API methods.
 */
export class Glossaries extends CrowdinApi {
    /**
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.glossaries.getMany
     */
    listGlossaries(options?: GlossariesModel.ListGlossariesOptions): Promise<ResponseList<GlossariesModel.Glossary>>;
    /**
     * @param groupId group identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @deprecated optional parameters should be passed through an object
     * @see https://developer.crowdin.com/api/v2/#operation/api.glossaries.getMany
     */
    listGlossaries(groupId?: number, limit?: number, offset?: number): Promise<ResponseList<GlossariesModel.Glossary>>;
    listGlossaries(
        options?: number | GlossariesModel.ListGlossariesOptions,
        deprecatedLimit?: number,
        deprecatedOffset?: number,
    ): Promise<ResponseList<GlossariesModel.Glossary>> {
        if (isOptionalNumber(options, '0' in arguments)) {
            options = { groupId: options, limit: deprecatedLimit, offset: deprecatedOffset };
        }
        let url = `${this.url}/glossaries`;
        url = this.addQueryParam(url, 'groupId', options.groupId);
        url = this.addQueryParam(url, 'orderBy', options.orderBy);
        url = this.addQueryParam(url, 'userId', options.userId);
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.glossaries.post
     */
    addGlossary(request: GlossariesModel.CreateGlossaryRequest): Promise<ResponseObject<GlossariesModel.Glossary>> {
        const url = `${this.url}/glossaries`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param glossaryId glossary identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.glossaries.get
     */
    getGlossary(glossaryId: number): Promise<ResponseObject<GlossariesModel.Glossary>> {
        const url = `${this.url}/glossaries/${glossaryId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param glossaryId glossary identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.glossaries.delete
     */
    deleteGlossary(glossaryId: number): Promise<void> {
        const url = `${this.url}/glossaries/${glossaryId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param glossaryId glossary identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.glossaries.patch
     */
    editGlossary(glossaryId: number, request: PatchRequest[]): Promise<ResponseObject<GlossariesModel.Glossary>> {
        const url = `${this.url}/glossaries/${glossaryId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param glossaryId glossary identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.glossaries.exports.post
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
     * @see https://developer.crowdin.com/api/v2/#operation/api.glossaries.exports.get
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
     * @see https://developer.crowdin.com/api/v2/#operation/api.glossaries.exports.download.download
     */
    downloadGlossary(glossaryId: number, exportId: string): Promise<ResponseObject<DownloadLink>> {
        const url = `${this.url}/glossaries/${glossaryId}/exports/${exportId}/download`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param glossaryId glossary identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.glossaries.imports.post
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
     * @see https://developer.crowdin.com/api/v2/#operation/api.glossaries.imports.get
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
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.glossaries.terms.getMany
     */
    listTerms(
        glossaryId: number,
        options?: GlossariesModel.ListTermsOptions,
    ): Promise<ResponseList<GlossariesModel.Term>>;
    /**
     * @param glossaryId glossary identifier
     * @param userId list user glossaries
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @param languageId term language identifier
     * @param translationOfTermId filter terms by termId
     * @param conceptId filter terms by conceptId
     * @deprecated optional parameters should be passed through an object
     * @see https://developer.crowdin.com/api/v2/#operation/api.glossaries.terms.getMany
     */
    listTerms(
        glossaryId: number,
        userId?: number,
        limit?: number,
        offset?: number,
        languageId?: string,
        translationOfTermId?: number,
        conceptId?: number,
    ): Promise<ResponseList<GlossariesModel.Term>>;
    listTerms(
        glossaryId: number,
        options?: number | GlossariesModel.ListTermsOptions,
        deprecatedLimit?: number,
        deprecatedOffset?: number,
        deprecatedLanguageId?: string,
        deprecatedTranslationOfTermId?: number,
        deprecatedConceptId?: number,
    ): Promise<ResponseList<GlossariesModel.Term>> {
        let url = `${this.url}/glossaries/${glossaryId}/terms`;
        if (isOptionalNumber(options, '1' in arguments)) {
            options = {
                userId: options,
                limit: deprecatedLimit,
                offset: deprecatedOffset,
                languageId: deprecatedLanguageId,
                translationOfTermId: deprecatedTranslationOfTermId,
                conceptId: deprecatedConceptId,
            };
        }
        url = this.addQueryParam(url, 'userId', options.userId);
        url = this.addQueryParam(url, 'languageId', options.languageId);
        url = this.addQueryParam(url, 'translationOfTermId', options.translationOfTermId);
        url = this.addQueryParam(url, 'conceptId', options.conceptId);
        url = this.addQueryParam(url, 'orderBy', options.orderBy);
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param glossaryId glossary identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.glossaries.terms.post
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
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.glossaries.terms.deleteMany
     */
    clearGlossary(
        glossaryId: number,
        options?: GlossariesModel.ClearGlossaryOptions,
    ): Promise<ResponseObject<GlossariesModel.Term>>;
    /**
     * @param glossaryId glossary identifier
     * @param languageId languageId identifier
     * @param translationOfTermId term translation identifier
     * @param conceptId concept identifier
     * @deprecated optional parameters should be passed through an object
     * @see https://developer.crowdin.com/api/v2/#operation/api.glossaries.terms.deleteMany
     */
    clearGlossary(
        glossaryId: number,
        languageId?: number,
        translationOfTermId?: number,
        conceptId?: number,
    ): Promise<ResponseObject<GlossariesModel.Term>>;
    clearGlossary(
        glossaryId: number,
        options?: number | GlossariesModel.ClearGlossaryOptions,
        deprecatedTranslationOfTermId?: number,
        deprecatedConceptId?: number,
    ): Promise<ResponseObject<GlossariesModel.Term>> {
        if (isOptionalNumber(options, '1' in arguments)) {
            options = {
                languageId: options,
                translationOfTermId: deprecatedTranslationOfTermId,
                conceptId: deprecatedConceptId,
            };
        }
        let url = `${this.url}/glossaries/${glossaryId}/terms`;
        url = this.addQueryParam(url, 'languageId', options.languageId);
        url = this.addQueryParam(url, 'translationOfTermId', options.translationOfTermId);
        url = this.addQueryParam(url, 'conceptId', options.conceptId);
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param glossaryId glossary identifier
     * @param termId term identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.glossaries.terms.get
     */
    getTerm(glossaryId: number, termId: number): Promise<ResponseObject<GlossariesModel.Term>> {
        const url = `${this.url}/glossaries/${glossaryId}/terms/${termId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param glossaryId glossary identifier
     * @param termId term identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.glossaries.terms.delete
     */
    deleteTerm(glossaryId: number, termId: number): Promise<void> {
        const url = `${this.url}/glossaries/${glossaryId}/terms/${termId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param glossaryId glossary identifier
     * @param termId term identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.glossaries.terms.patch
     */
    editTerm(
        glossaryId: number,
        termId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<GlossariesModel.Term>> {
        const url = `${this.url}/glossaries/${glossaryId}/terms/${termId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param glossaryId glossary identifier
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.glossaries.concepts.getMany
     */
    listConcepts(
        glossaryId: number,
        options?: { orderBy?: string } & PaginationOptions,
    ): Promise<ResponseList<GlossariesModel.Concept>> {
        let url = `${this.url}/glossaries/${glossaryId}/concepts`;
        url = this.addQueryParam(url, 'orderBy', options?.orderBy);
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param glossaryId glossary identifier
     * @param conceptId concept identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.glossaries.concepts.get
     */
    getConcept(glossaryId: number, conceptId: number): Promise<ResponseObject<GlossariesModel.Concept>> {
        const url = `${this.url}/glossaries/${glossaryId}/concepts/${conceptId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param glossaryId glossary identifier
     * @param conceptId concept identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.glossaries.concepts.put
     */
    updateConcept(
        glossaryId: number,
        conceptId: number,
        request: GlossariesModel.UpdateConceptRequest,
    ): Promise<ResponseObject<GlossariesModel.Concept>> {
        const url = `${this.url}/glossaries/${glossaryId}/concepts/${conceptId}`;
        return this.put(url, request, this.defaultConfig());
    }

    /**
     * @param glossaryId glossary identifier
     * @param conceptId concept identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.glossaries.concepts.delete
     */
    deleteConcept(glossaryId: number, conceptId: number): Promise<void> {
        const url = `${this.url}/glossaries/${glossaryId}/concepts/${conceptId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.glossaries.concordance.post
     */
    concordanceSearch(
        projectId: number,
        request: GlossariesModel.ConcordanceSearchRequest,
    ): Promise<ResponseList<GlossariesModel.ConcordanceSearchResponse>> {
        const url = `${this.url}/projects/${projectId}/glossaries/concordance`;
        return this.post(url, request, this.defaultConfig());
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
        defaultProjectIds: number[];
        projectIds: number[];
        webUrl: string;
        createdAt: string;
    }

    export interface CreateGlossaryRequest {
        name: string;
        languageId: string;
        groupId?: number;
    }

    export type ExportField =
        | 'term'
        | 'description'
        | 'partOfSpeech'
        | 'type'
        | 'status'
        | 'gender'
        | 'note'
        | 'url'
        | 'conceptDefinition'
        | 'conceptSubject'
        | 'conceptNote'
        | 'conceptUrl'
        | 'conceptFigure';

    export interface ExportGlossaryRequest {
        format?: GlossaryFormat;
        exportFields?: ExportField[];
    }

    export interface GlossaryExportStatusAttribute {
        format: string;
        exportFields: ExportField[];
    }

    export interface GlossaryImportStatusAttribute {
        storageId: number;
        scheme: unknown;
        firstLineContainsHeader: boolean;
    }

    export interface GlossaryFile {
        storageId: number;
        scheme?: GlossaryFileScheme;
        firstLineContainsHeader?: boolean;
    }

    export interface ListTermsOptions extends PaginationOptions {
        userId?: number;
        languageId?: string;
        conceptId?: number;
        orderBy?: string;
        /**
         * @deprecated
         */
        translationOfTermId?: number;
    }

    export interface Term {
        id: number;
        userId: number;
        glossaryId: number;
        languageId: string;
        text: string;
        description: string;
        partOfSpeech: PartOfSpeech;
        status: Status;
        type: Type;
        gender: Gender;
        note: string;
        url: string;
        conceptId: number;
        lemma: string;
        createdAt: string;
        updatedAt: string;
    }

    export interface CreateTermRequest {
        languageId: string;
        text: string;
        description?: string;
        partOfSpeech?: PartOfSpeech;
        status?: Status;
        type?: Type;
        gender?: Gender;
        note?: string;
        url?: string;
        conceptId?: number;
        /**
         * @deprecated
         */
        translationOfTermId?: number;
    }

    export interface ConcordanceSearchRequest extends PaginationOptions {
        sourceLanguageId: string;
        targetLanguageId: string;
        expressions: string[];
        /**
         * @deprecated
         */
        expression?: string;
    }

    export interface ConcordanceSearchResponse {
        glossary: Glossary;
        concept: Concept;
        sourceTerms: Term[];
        targetTerms: Term[];
    }

    export type Status = 'preferred' | 'admitted' | 'not recommended' | 'obsolete';

    export type Type = 'full form' | 'acronym' | 'abbreviation' | 'short form' | 'phrase' | 'variant';

    export type Gender = 'masculine' | 'feminine' | 'neuter' | 'other';

    export type GlossaryFormat = 'tbx' | 'tbx_v3' | 'csv' | 'xlsx';

    export interface GlossaryFileScheme {
        [key: string]: number;
    }

    export type PartOfSpeech =
        | 'adjective'
        | 'adposition'
        | 'adverb'
        | 'auxiliary'
        | 'coordinating conjunction'
        | 'determiner'
        | 'interjection'
        | 'noun'
        | 'numeral'
        | 'particle'
        | 'pronoun'
        | 'proper noun'
        | 'subordinating conjunction'
        | 'verb'
        | 'other';

    export interface ListGlossariesOptions extends PaginationOptions {
        groupId?: number;
        userId?: number;
        orderBy?: string;
    }

    export interface ClearGlossaryOptions {
        languageId?: number;
        /**
         * @deprecated
         */
        translationOfTermId?: number;
        conceptId?: number;
    }

    export interface Concept {
        id: number;
        userId: number;
        glossaryId: number;
        subject: string;
        definition: string;
        translatable: boolean;
        note: string;
        url: string;
        figure: string;
        languagesDetails: LanguageDetails[];
        createdAt: string;
        updatedAt: string;
    }

    export interface LanguageDetails {
        languageId: string;
        userId: number;
        definition: string;
        note: string;
        createdAt: string;
        updatedAt: string;
    }

    export interface UpdateConceptRequest {
        subject?: string;
        definition?: string;
        translatable?: boolean;
        note?: string;
        url?: string;
        figure?: string;
        languagesDetails?: { languageId: string; definition: string; note?: string }[];
    }
}
