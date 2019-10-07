import { CrowdinApi, ResponseList, ResponseObject, PatchRequest } from '../core';

export class Languages extends CrowdinApi {
    /**
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     */
    listSupportedLanguages(limit?: number, offset?: number): Promise<ResponseList<LanguagesModel.Language>> {
        let url = `${this.url}/languages`;
        url = this.addQueryParam(url, 'limit', limit);
        url = this.addQueryParam(url, 'offset', offset);
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param request request body
     */
    addCustomLanguage(request: LanguagesModel.AddLanguageRequest): Promise<ResponseObject<LanguagesModel.Language>> {
        const url = `${this.url}/languages`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param languageId language identifier
     */
    getLanguage(languageId: number): Promise<ResponseObject<LanguagesModel.Language>> {
        const url = `${this.url}/languages/${languageId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param languageId language identifier
     */
    deleteCustomLanguage(languageId: number): Promise<void> {
        const url = `${this.url}/languages/${languageId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param languageId language identifier
     * @param request request body
     */
    editCustomLanguage(languageId: number, request: PatchRequest[]): Promise<ResponseObject<LanguagesModel.Language>> {
        const url = `${this.url}/languages/${languageId}`;
        return this.patch(url, request, this.defaultConfig());
    }
}

export namespace LanguagesModel {
    export interface Language {
        id: number;
        organizationId: number;
        name: string;
        dialectOf: number;
        textDirection: TextDirection;
        internalCode: string;
        editorCode: string;
        crowdinCode: string;
        code: string;
        pluralCategoryNames: string[];
        pluralRules: string;
        pluralExamples: string[];
        iso6391: string;
        twoLettersCode: string;
        iso6393: string;
        threeLettersCode: string;
        locale: string;
        androidCode: string;
        osxCode: string;
        osxLocale: string;
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
