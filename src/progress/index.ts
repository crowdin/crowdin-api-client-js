import { CrowdinApi, ResponseList } from '../core';

export namespace Progress {

    export class Api extends CrowdinApi {

        /**
         * @param projectId project identifier
         * @param branchId branch identifier
         */
        getBranchTranslationProgress(projectId: number, branchId: number): Promise<ResponseList<Model.Progress>> {
            let url = `${this.url}/projects/${projectId}/branches/${branchId}/languages/progress?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

        /**
         * @param projectId project identifier
         * @param directoryId directory identifier
         */
        getDirectoryTranslationProgress(projectId: number, directoryId: number): Promise<ResponseList<Model.Progress>> {
            let url = `${this.url}/projects/${projectId}/directories/${directoryId}/languages/progress?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

        /**
         * @param projectId project identifier
         * @param fileId file identifier
         */
        getFileTranslationProgress(projectId: number, fileId: number): Promise<ResponseList<Model.Progress>> {
            let url = `${this.url}/projects/${projectId}/files/${fileId}/languages/progress?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

        /**
         * @param projectId project identifier
         */
        getProjectTranslationProgress(projectId: number): Promise<ResponseList<Model.Progress>> {
            let url = `${this.url}/projects/${projectId}/languages/progress?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

    }

    export namespace Model {
        export interface Progress {
            languageId: number;
            phrasesCount: number;
            phrasesTranslatedCount: number;
            phrasesApprovedCount: number;
            phrasesTranslatedProgress: number;
            phrasesApprovedProgress: number;
        }
    }
}