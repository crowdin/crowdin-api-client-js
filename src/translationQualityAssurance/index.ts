import { CrowdinApi, ResponseList } from '../core';

export namespace TranslationQualityAssurance {

    export class Api extends CrowdinApi {

        /**
         * @param projectId project identifier
         * @param limit maximum number of items to retrieve (default 25)
         * @param offset starting offset in the collection (default 0)
         * @param languageIds language identifier for filter
         */
        listQaCheckStatistics(projectId: number, limit?: number, offset?: number, languageIds?: string): Promise<ResponseList<Model.QaStatistic>> {
            let url = `${this.url}/projects/${projectId}/qa-check?account-key=${this.accountKey}&login=${this.login}`;
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            url = this.addQueryParam(url, 'languageIds', languageIds);
            return this.axios.get(url);
        }
    }

    export namespace Model {
        export interface QaStatistic {
            total: number;
            languageId: number;
        }
    }
}