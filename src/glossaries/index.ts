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

export class Glossaries extends CrowdinApi {
    /**
     * @param options optional parameters for the request
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.getMany
     */
    listGlossaries(options?: GlossariesModel.ListGlossariesOptions): Promise<ResponseList<GlossariesModel.Glossary>>;
    /**
     * @param groupId group identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @deprecated optional parameters should be passed through an object
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.getMany
     */
    listGlossaries(groupId?: number, limit?: number, offset?: number): Promise<ResponseList<GlossariesModel.Glossary>>;
    listGlossaries(
        options?: number | GlossariesModel.ListGlossariesOptions,
        deprecatedLimit?: number,
        deprecatedOffset?: number,
    ): Promise<ResponseList<GlossariesModel.Glossary>> {
        if (isOptionalNumber(options)) {
            options = { groupId: options, limit: deprecatedLimit, offset: deprecatedOffset };
        }
        let url = `${this.url}/glossaries`;
        url = this.addQueryParam(url, 'groupId', options.groupId);
        return this.getList(url, options.limit, options.offset);
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
     * @param options optional parameters for the request
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.terms.getMany
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
     * @deprecated optional parameters should be passed through an object
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
        options?: number | GlossariesModel.ListTermsOptions,
        deprecatedLimit?: number,
        deprecatedOffset?: number,
        deprecatedLanguageId?: string,
        deprecatedTranslationOfTermId?: number,
    ): Promise<ResponseList<GlossariesModel.Term>> {
        let url = `${this.url}/glossaries/${glossaryId}/terms`;
        if (isOptionalNumber(options)) {
            options = {
                userId: options,
                limit: deprecatedLimit,
                offset: deprecatedOffset,
                languageId: deprecatedLanguageId,
                translationOfTermId: deprecatedTranslationOfTermId,
            };
        }
        url = this.addQueryParam(url, 'userId', options.userId);
        url = this.addQueryParam(url, 'languageId', options.languageId);
        url = this.addQueryParam(url, 'translationOfTermId', options.translationOfTermId);
        return this.getList(url, options.limit, options.offset);
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
     * @param options optional parameters for the request
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.terms.deleteMany
     */
    clearGlossary(
        glossaryId: number,
        options?: GlossariesModel.ClearGlossaryOptions,
    ): Promise<ResponseObject<GlossariesModel.Term>>;
    /**
     * @param glossaryId glossary identifier
     * @param languageId languageId identifier
     * @param translationOfTermId term translation identifier
     * @deprecated optional parameters should be passed through an object
     * @see https://support.crowdin.com/api/v2/#operation/api.glossaries.terms.deleteMany
     */
    clearGlossary(
        glossaryId: number,
        languageId?: number,
        translationOfTermId?: number,
    ): Promise<ResponseObject<GlossariesModel.Term>>;
    clearGlossary(
        glossaryId: number,
        options?: number | GlossariesModel.ClearGlossaryOptions,
        deprecatedTranslationOfTermId?: number,
    ): Promise<ResponseObject<GlossariesModel.Term>> {
        if (isOptionalNumber(options)) {
            options = { languageId: options, translationOfTermId: deprecatedTranslationOfTermId };
        }
        let url = `${this.url}/glossaries/${glossaryId}/terms`;
        url = this.addQueryParam(url, 'languageId', options.languageId);
        url = this.addQueryParam(url, 'translationOfTermId', options.translationOfTermId);
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

    export interface ListGlossariesOptions extends PaginationOptions {
        groupId?: number;
    }

    export interface ClearGlossaryOptions {
        languageId?: number;
        translationOfTermId?: number;
    }
}
