import { CrowdinApi, ResponseObject, DownloadLink, Status } from '../core';

//TODO add rest of the end points
export namespace Translations {

    export class Api extends CrowdinApi {

        /**
         * @param projectId project identifier
         * @param request request body
         */
        preTranslate(projectId: number, request: Model.PreTranslateRequest): Promise<ResponseObject<Status>> {
            let url = `${this.url}/projects/${projectId}/pre-translations?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.post(url, request);
        }

        /**
         * @param projectId project identifier
         * @param preTranslationId pre translation identifier
         */
        preTranslationStatus(projectId: number, preTranslationId: string): Promise<ResponseObject<Status>> {
            let url = `${this.url}/projects/${projectId}/pre-translations/${preTranslationId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

        /**
         * @param projectId project identifier
         * @param request request body
         */
        buildPseudoTranslation(projectId: number, request: Model.BuildPseudoTranslationFilesRequest): Promise<ResponseObject<Status>> {
            let url = `${this.url}/projects/${projectId}/pseudo-translations/builds?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.post(url, request);
        }

        /**
         * @param projectId project identifier
         * @param pseudoTranslationBuildId pseudo translation build identifier, consists of 36 characters
         */
        checkPseudoTranslationBuildStatus(projectId: number, pseudoTranslationBuildId: string): Promise<ResponseObject<Status>> {
            let url = `${this.url}/projects/${projectId}/pseudo-translations/builds/${pseudoTranslationBuildId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

        /**
         * @param projectId project identifier
         */
        downloadPseudoTranslation(projectId: number): Promise<ResponseObject<DownloadLink>> {
            let url = `${this.url}/projects/${projectId}/pseudo-translations/builds/download?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }
    }

    export namespace Model {
        export interface PreTranslateRequest {
            languageIds: number[];
            fileIds: number[];
            method?: Method;
            engineId?: number;
            autoApproveOption?: AutoApproveOption;
            duplicateTranslations?: boolean;
            translateUntranslatedOnly?: boolean;
            translateWithPerfectMatchOnly?: boolean;
        }

        export enum Method {
            TM = 'tm',
            MT = 'mt',
        }

        export enum AutoApproveOption {
            ALL = 'all',
            EXCEPT_AUTO_SUBSTITUTED = 'exceptAutoSubstituted',
            PERFECT_MATCH_ONLY = 'perfectMatchOnly',
            NONE = 'none',
        }

        export interface BuildPseudoTranslationFilesRequest {
            prefix?: string;
            suffix?: string;
            lengthTransformation?: number;
            charTransformation?: CharTransformation;
        }

        export enum CharTransformation {
            ASIAN = 'asian',
            EUROPEAN = 'european',
            ARABIC = 'arabic',
        }
    }
}