import { CrowdinApi, ResponseList, ResponseObject } from '../core';

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
     * @param languageId language identifier
     */
    getLanguage(languageId: number): Promise<ResponseObject<LanguagesModel.Language>> {
        const url = `${this.url}/languages/${languageId}`;
        return this.get(url, this.defaultConfig());
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

    export enum TextDirection {
        LTR = 'ltr',
        RTL = 'rtl',
    }
}
