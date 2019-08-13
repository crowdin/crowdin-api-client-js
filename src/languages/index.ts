import { CrowdinApi, ResponseList, ResponseObject, PatchRequest } from '../core';

export namespace Languages {

    export class Api extends CrowdinApi {

        /**
         * @param limit maximum number of items to retrieve (default 25)
         * @param offset starting offset in the collection (default 0)
         */
        listSupportedLanguages(limit?: number, offset?: number): Promise<ResponseList<Model.Language>> {
            let url = `${this.url}/languages?account-key=${this.accountKey}&login=${this.login}`;
            url = this.addQueryParam(url, 'limit', limit);
            url = this.addQueryParam(url, 'offset', offset);
            return this.axios.get(url);
        }

        /**
         * @param languageId language identifier
         */
        getLanguage(languageId: number): Promise<ResponseObject<Model.Language>> {
            let url = `${this.url}/languages/${languageId}?account-key=${this.accountKey}&login=${this.login}`;
            return this.axios.get(url);
        }

    }

    export namespace Model {
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
}