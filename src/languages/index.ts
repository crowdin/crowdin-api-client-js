import { CrowdinApi, isOptionalNumber, PaginationOptions, PatchRequest, ResponseList, ResponseObject } from '../core';

/**
 * Crowdin supports more than 300 world languages and custom languages created in the system.
 *
 * Use API to get the list of all supported languages and retrieve additional details (e.g. text direction, internal code) on specific language.
 */
export class Languages extends CrowdinApi {
    /**
     * @param options optional pagination parameters for the request
     * @see https://support.crowdin.com/api/v2/#operation/api.languages.getMany
     */
    listSupportedLanguages(options?: PaginationOptions): Promise<ResponseList<LanguagesModel.Language>>;
    /**
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @deprecated optional parameters should be passed through an object
     * @see https://support.crowdin.com/api/v2/#operation/api.languages.getMany
     */
    listSupportedLanguages(limit?: number, offset?: number): Promise<ResponseList<LanguagesModel.Language>>;
    listSupportedLanguages(
        options?: number | PaginationOptions,
        deprecatedOffset?: number,
    ): Promise<ResponseList<LanguagesModel.Language>> {
        if (isOptionalNumber(options, '0' in arguments)) {
            options = { limit: options, offset: deprecatedOffset };
        }
        const url = `${this.url}/languages`;
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.languages.post
     */
    addCustomLanguage(request: LanguagesModel.AddLanguageRequest): Promise<ResponseObject<LanguagesModel.Language>> {
        const url = `${this.url}/languages`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param languageId language identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.languages.get
     */
    getLanguage(languageId: string): Promise<ResponseObject<LanguagesModel.Language>> {
        const url = `${this.url}/languages/${languageId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param languageId language identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.languages.delete
     */
    deleteCustomLanguage(languageId: string): Promise<void> {
        const url = `${this.url}/languages/${languageId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param languageId language identifier
     * @param request request body
     * @see https://support.crowdin.com/api/v2/#operation/api.languages.patch
     */
    editCustomLanguage(languageId: string, request: PatchRequest[]): Promise<ResponseObject<LanguagesModel.Language>> {
        const url = `${this.url}/languages/${languageId}`;
        return this.patch(url, request, this.defaultConfig());
    }
}

export namespace LanguagesModel {
    export interface Language {
        id: string;
        name: string;
        editorCode: string;
        twoLettersCode: string;
        threeLettersCode: string;
        locale: string;
        androidCode: string;
        osxCode: string;
        osxLocale: string;
        pluralCategoryNames: string[];
        pluralRules: string;
        pluralExamples: string[];
        textDirection: TextDirection;
        dialectOf: number;
    }

    export interface AddLanguageRequest {
        name: string;
        dialectOf?: number;
        code: string;
        localeCode: string;
        twoLettersCode?: string;
        threeLettersCode: string;
        textDirection: TextDirection;
        pluralCategoryNames: string[];
    }

    export type TextDirection = 'ltr' | 'rtl';
}
