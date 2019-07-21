import { CrowdinApi, ResponseObject } from '../core';

export namespace PreTranslation {

    export class Api extends CrowdinApi {

        /**
         * @param projectId project identifier
         * @param request request body
         */
        preTranslateProjectFiles(projectId: number, request: Model.PreTranslateRequest): Promise<ResponseObject<Model.PreTranslation>> {
            let url = `${this.url}/projects/${projectId}/pre-translations?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.post(url, request);
        }

        /**
         * @param projectId project identifier
         * @param preTranslationId pre translation identifier
         */
        getStatusOfPreTranslation(projectId: number, preTranslationId: string): Promise<ResponseObject<Model.PreTranslation>> {
            let url = `${this.url}/projects/${projectId}/pre-translations/${preTranslationId}?account-key=${this.accountKey}&login=${this.login}`;
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

        export interface PreTranslation {
            identifier: string;
            status: string;
            progress: number;
            attributes: Attribute[];
            createdAt: string;
            updatedAt: string;
            startedAt: string;
            finishedAt: string;
            eta: string;
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

        export interface Attribute {
            [key: string]: string;
        }
    }
}