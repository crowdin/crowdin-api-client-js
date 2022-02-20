import { CrowdinApi, PatchRequest, ResponseList, ResponseObject } from '../core';

export class Languages extends CrowdinApi {
    /**
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @see https://support.crowdin.com/api/v2/#operation/api.languages.getMany
     */
    listSupportedLanguages(limit?: number, offset?: number): Promise<ResponseList<LanguagesModel.Language>> {
        const url = `${this.url}/languages`;
        return this.getList(url, limit, offset);
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

    export enum TextDirection {
        LTR = 'ltr',
        RTL = 'rtl',
    }
}
