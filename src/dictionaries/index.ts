import { CrowdinApi, PatchRequest, ResponseList, ResponseObject } from '../core';

export class Dictionaries extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param languageIds filter progress by Language Identifiers
     */
    listDictionaries(projectId: number, languageIds?: string): Promise<ResponseList<DictionariesModel.Dictionary>> {
        let url = `${this.url}/projects/${projectId}/dictionaries`;
        url = this.addQueryParam(url, 'languageIds', languageIds);
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param languageId language identifier
     * @param request request body
     */
    editDictionary(
        projectId: number,
        languageId: string,
        request: PatchRequest[],
    ): Promise<ResponseObject<DictionariesModel.Dictionary>> {
        const url = `${this.url}/projects/${projectId}/dictionaries/${languageId}`;
        return this.patch(url, request, this.defaultConfig());
    }
}

export namespace DictionariesModel {
    export interface Dictionary {
        languageId: string;
        words: string[];
    }
}
