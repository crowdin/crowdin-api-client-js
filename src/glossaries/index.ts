import { CrowdinApi, ResponseList, ResponseObject, PatchRequest, DownloadLink, Status } from '../core';

export namespace Glossaries {

    export class Api extends CrowdinApi {

        /**
         * @param groupId group identifier
         * @param limit maximum number of items to retrieve (default 25)
         * @param offset starting offset in the collection (default 0)
         */
        listGlossaries(groupId: number, limit?: number, offset?: number): Promise<ResponseList<Model.Glossary>> {
            let url = `${this.url}/glossaries`;
            url = this.addQueryParam(url, 'groupId', groupId);
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            return this.get(url, this.defaultConfig());
        }

        /**
         * @param request request body
         */
        addGlossary(request: Model.CreateGlossaryRequest): Promise<ResponseObject<Model.Glossary>> {
            let url = `${this.url}/glossaries`;
            return this.post(url, request, this.defaultConfig());
        }

        /**
         * @param glossaryId glossary identifier
         */
        getGlossary(glossaryId: number): Promise<ResponseObject<Model.Glossary>> {
            let url = `${this.url}/glossaries/${glossaryId}`;
            return this.get(url, this.defaultConfig());
        }

        /**
         * @param glossaryId glossary identifier
         */
        deleteGlossary(glossaryId: number): Promise<void> {
            let url = `${this.url}/glossaries/${glossaryId}`;
            return this.delete(url, this.defaultConfig());
        }

        /**
         * @param glossaryId glossary identifier
         * @param request request body
         */
        editGlossary(glossaryId: number, request: PatchRequest[]): Promise<ResponseObject<Model.Glossary>> {
            let url = `${this.url}/glossaries/${glossaryId}`;
            return this.patch(url, request, this.defaultConfig());
        }

        /**
         * @param glossaryId glossary identifier
         * @param request request body
         */
        exportGlossary(glossaryId: number, request: Model.ExportGlossaryRequest): Promise<ResponseObject<Status>> {
            let url = `${this.url}/glossaries/${glossaryId}/exports`;
            return this.post(url, request, this.defaultConfig());
        }

        /**
         * @param glossaryId glossary identifier
         * @param format defines download format (default is tbx)
         */
        downloadGlossary(glossaryId: number, format?: Model.GlossaryFormat): Promise<ResponseObject<DownloadLink>> {
            let url = `${this.url}/glossaries/${glossaryId}/exports/download`;
            url = this.addQueryParam(url, 'format', format);
            return this.get(url, this.defaultConfig());
        }

        /**
         * @param glossaryId glossary identifier
         * @param exportId export identifier
         */
        checkGlossaryExportStatus(glossaryId: number, exportId: string): Promise<ResponseObject<Status>> {
            let url = `${this.url}/glossaries/${glossaryId}/exports/${exportId}`;
            return this.get(url, this.defaultConfig());
        }

        /**
         * @param glossaryId glossary identifier
         * @param request request body
         */
        importGlossaryFile(glossaryId: number, request: Model.GlossaryFile): Promise<ResponseObject<Status>> {
            let url = `${this.url}/glossaries/${glossaryId}/imports`;
            return this.post(url, request, this.defaultConfig());
        }

        /**
         * @param glossaryId glossary identifier
         * @param importId import identifier
         */
        checkGlossaryImportStatus(glossaryId: number, importId: string): Promise<ResponseObject<Status>> {
            let url = `${this.url}/glossaries/${glossaryId}/imports/${importId}`;
            return this.get(url, this.defaultConfig());
        }

        /**
         * @param glossaryId glossary identifier
         * @param userId list user glossaries
         * @param limit maximum number of items to retrieve (default 25)
         * @param offset starting offset in the collection (default 0)
         */
        listTerms(glossaryId: number, userId?: number, limit?: number, offset?: number): Promise<ResponseList<Model.Term>> {
            let url = `${this.url}/glossaries/${glossaryId}/terms`;
            url = this.addQueryParam(url, 'userId', userId);
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            return this.get(url, this.defaultConfig());
        }

        /**
         * @param glossaryId glossary identifier
         * @param request request body
         */
        addTerm(glossaryId: number, request: Model.CreateTermRequest): Promise<ResponseObject<Model.Term>> {
            let url = `${this.url}/glossaries/${glossaryId}/terms`;
            return this.post(url, request, this.defaultConfig());
        }

        /**
         * @param glossaryId glossary identifier
         * @param termId term identifier
         */
        getTerm(glossaryId: number, termId: number): Promise<ResponseObject<Model.Term>> {
            let url = `${this.url}/glossaries/${glossaryId}/terms/${termId}`;
            return this.get(url, this.defaultConfig());
        }

        /**
         * @param glossaryId glossary identifier
         * @param termId term identifier
         */
        deleteTerm(glossaryId: number, termId: number): Promise<void> {
            let url = `${this.url}/glossaries/${glossaryId}/terms/${termId}`;
            return this.delete(url, this.defaultConfig());
        }

        /**
         * @param glossaryId glossary identifier
         * @param termId term identifier
         * @param request request body
         */
        editTerm(glossaryId: number, termId: number, request: PatchRequest[]): Promise<ResponseObject<Model.Term>> {
            let url = `${this.url}/glossaries/${glossaryId}/terms/${termId}`;
            return this.patch(url, request, this.defaultConfig());
        }
    }

    export namespace Model {
        export interface Glossary {
            id: number;
            name: string;
            groupId: number;
            userId: number;
            terms: number;
            languageIds: number[];
            projectIds: number[];
            createdAt: string;
        }

        export interface CreateGlossaryRequest {
            name: string;
            groupId: number;
        }

        export interface ExportGlossaryRequest {
            format: GlossaryFormat;
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
            languageId: number;
            text: string;
            description: string;
            partOfSpeech: string;
            lemma: string;
            createdAt: string;
            updatedAt: string;
        }

        export interface CreateTermRequest {
            languageId: number;
            text: string;
            description?: string;
            partOfSpeech?: PartOfSpeech;
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
}