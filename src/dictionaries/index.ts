import { CrowdinApi, isOptionalString, PatchRequest, ResponseList, ResponseObject } from '../core';

export class Dictionaries extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param options optional parameters for listing dictionaries
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.dictionaries.getMany
     */
    listDictionaries(
        projectId: number,
        options?: DictionariesModel.ListDictionariesOptions,
    ): Promise<ResponseList<DictionariesModel.Dictionary>>;
    /**
     * @param projectId project identifier
     * @param languageIds filter progress by Language Identifiers
     * @deprecated optional parameters should be passed through an object
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.dictionaries.getMany
     */
    listDictionaries(projectId: number, languageIds?: string): Promise<ResponseList<DictionariesModel.Dictionary>>;
    listDictionaries(
        projectId: number,
        options?: string | DictionariesModel.ListDictionariesOptions,
    ): Promise<ResponseList<DictionariesModel.Dictionary>> {
        if (isOptionalString(options)) {
            options = { languageIds: options };
        }
        let url = `${this.url}/projects/${projectId}/dictionaries`;
        url = this.addQueryParam(url, 'languageIds', options.languageIds);
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param languageId language identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.dictionaries.patch
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

    export interface ListDictionariesOptions {
        languageIds?: string;
    }
}
