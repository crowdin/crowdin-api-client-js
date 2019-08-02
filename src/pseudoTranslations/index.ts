import { CrowdinApi, ResponseObject, DownloadLink } from '../core';

export namespace PseudoTranslations {

    export class Api extends CrowdinApi {

        /**
         * @param projectId project identifier
         * @param request request body
         */
        buildPseudoTranslationFiles(projectId: number, request: Model.BuildPseudoTranslationFilesRequest): Promise<ResponseObject<Model.PseudoTranslation>> {
            let url = `${this.url}/projects/${projectId}/pseudo-translations/builds?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.post(url, request);
        }

        /**
         * @param projectId project identifier
         * @param pseudoTranslationBuildId pseudo translation build identifier, consists of 36 characters
         */
        viewPseudoTranslationBuildStatus(projectId: number, pseudoTranslationBuildId: string): Promise<ResponseObject<Model.PseudoTranslation>> {
            let url = `${this.url}/projects/${projectId}/pseudo-translations/builds/${pseudoTranslationBuildId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

        /**
         * @param projectId project identifier
         */
        getPseudoTranslationLastBuildDownloadLink(projectId: number): Promise<ResponseObject<DownloadLink>> {
            let url = `${this.url}/projects/${projectId}/pseudo-translations/builds/download?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }
    }

    export namespace Model {
        export interface BuildPseudoTranslationFilesRequest {
            prefix?: string;
            suffix?: string;
            lengthTransformation?: number;
            charTransformation?: CharTransformation;
        }

        export interface PseudoTranslation {
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

        export enum CharTransformation {
            ASIAN = 'asian',
            EUROPEAN = 'european',
            ARABIC = 'arabic',
        }

        export interface Attribute {
            [key: string]: string;
        }
    }
}