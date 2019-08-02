import { CrowdinApi, ResponseList, ResponseObject, PatchRequest, DownloadLink } from '../core';

export namespace Glossaries {

    export class Api extends CrowdinApi {

        /**
         * @param userId list user glossaries
         * @param limit maximum number of items to retrieve (default 25)
         * @param offset starting offset in the collection (default 0)
         */
        listGlossaries(userId?: number, limit?: number, offset?: number): Promise<ResponseList<Model.Glossary>> {
            let url = `${this.url}/glossaries?account-key=${this.accountKey}&login=${this.login}`;
            url = this.addQueryParam(url, 'userId', userId);
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            return this.axios.get(url);
        }

        /**
         * @param request request body
         */
        createGlossary(request: Model.CreateGlossaryRequest): Promise<ResponseObject<Model.Glossary>> {
            let url = `${this.url}/glossaries?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.post(url, request);
        }

        /**
         * @param glossaryId glossary identifier
         */
        getGlossary(glossaryId: number): Promise<ResponseObject<Model.Glossary>> {
            let url = `${this.url}/glossaries/${glossaryId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

        /**
         * @param glossaryId glossary identifier
         */
        deleteGlossary(glossaryId: number): Promise<void> {
            let url = `${this.url}/glossaries/${glossaryId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.delete(url);
        }

        /**
         * @param glossaryId glossary identifier
         * @param request request body
         */
        updateGlossary(glossaryId: number, request: PatchRequest[]): Promise<ResponseObject<Model.Glossary>> {
            let url = `${this.url}/glossaries/${glossaryId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.patch(url, request);
        }

        /**
         * @param glossaryId glossary identifier
         * @param request request body
         */
        startGlossaryExport(glossaryId: number, request: Model.StartGlossaryExportRequest): Promise<ResponseObject<Model.GlossaryStatus>> {
            let url = `${this.url}/glossaries/${glossaryId}/exports?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.post(url, request);
        }

        /**
         * @param glossaryId glossary identifier
         */
        getGlossaryDownloadLink(glossaryId: number): Promise<ResponseObject<DownloadLink>> {
            let url = `${this.url}/glossaries/${glossaryId}/exports/download?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

        /**
         * @param glossaryId glossary identifier
         * @param exportId export identifier
         */
        getGlossaryExportStatus(glossaryId: number, exportId: number): Promise<ResponseObject<Model.GlossaryStatus>> {
            let url = `${this.url}/glossaries/${glossaryId}/exports/${exportId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

        /**
         * @param glossaryId glossary identifier
         * @param request request body
         */
        importGlossaryFile(glossaryId: number, request: Model.GlossaryFile): Promise<ResponseObject<Model.GlossaryStatus>> {
            let url = `${this.url}/glossaries/${glossaryId}/imports?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.post(url, request);
        }

        /**
         * @param glossaryId glossary identifier
         * @param importId import identifier
         */
        getGlossaryImportStatus(glossaryId: number, importId: number): Promise<ResponseObject<Model.GlossaryStatus>> {
            let url = `${this.url}/glossaries/${glossaryId}/imports/${importId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

        /**
         * @param glossaryId glossary identifier
         * @param userId list user glossaries
         * @param limit maximum number of items to retrieve (default 25)
         * @param offset starting offset in the collection (default 0)
         */
        listTerms(glossaryId: number, userId?: number, limit?: number, offset?: number): Promise<ResponseList<Model.Term>> {
            let url = `${this.url}/glossaries/${glossaryId}/terms?account-key=${this.accountKey}&login=${this.login}`;
            url = this.addQueryParam(url, 'userId', userId);
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            return this.axios.get(url);
        }

        /**
         * @param glossaryId glossary identifier
         * @param request request body
         */
        createTerm(glossaryId: number, request: Model.CreateTermRequest): Promise<ResponseObject<Model.Term>> {
            let url = `${this.url}/glossaries/${glossaryId}/terms?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.post(url, request);
        }

        /**
         * @param glossaryId glossary identifier
         * @param termId term identifier
         */
        getTerm(glossaryId: number, termId: number): Promise<ResponseObject<Model.Term>> {
            let url = `${this.url}/glossaries/${glossaryId}/terms/${termId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

        /**
         * @param glossaryId glossary identifier
         * @param termId term identifier
         */
        deleteTerm(glossaryId: number, termId: number): Promise<void> {
            let url = `${this.url}/glossaries/${glossaryId}/terms/${termId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.delete(url);
        }

        /**
         * @param glossaryId glossary identifier
         * @param termId term identifier
         * @param request request body
         */
        updateTerm(glossaryId: number, termId: number, request: PatchRequest[]): Promise<ResponseObject<Model.Term>> {
            let url = `${this.url}/glossaries/${glossaryId}/terms/${termId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.patch(url, request);
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
        }

        export interface StartGlossaryExportRequest {
            format: GlossaryFormat;
        }

        export interface GlossaryStatus {
            identifier: string;
            status: string;
            progress: number;
            attributes: GlossaryStatusAttribute[];
            createdAt: string;
            updatedAt: string;
            startedAt: string;
            finishedAt: string;
            eta: string;
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

        export interface GlossaryStatusAttribute {
            [key: string]: string;
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