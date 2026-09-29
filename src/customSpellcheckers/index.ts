import { CrowdinApi, PaginationOptions, ResponseList, ResponseObject } from '../core';

/**
 * Custom spellcheckers are provided by Crowdin apps and replace the built-in spellchecker for selected languages.
 *
 * Use the API to list and get the custom spellcheckers available in the organization.
 */
export class CustomSpellcheckers extends CrowdinApi {
    /**
     * @param options optional pagination parameters for the request
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/Custom-Spellcheckers/operation/api.custom-spellcheckers.getMany
     */
    listCustomSpellcheckers(
        options?: PaginationOptions,
    ): Promise<ResponseList<CustomSpellcheckersModel.CustomSpellchecker>> {
        const url = `${this.url}/custom-spellcheckers`;
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param customSpellcheckerId custom spellchecker identifier
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/Custom-Spellcheckers/operation/api.custom-spellcheckers.get
     */
    getCustomSpellchecker(
        customSpellcheckerId: number,
    ): Promise<ResponseObject<CustomSpellcheckersModel.CustomSpellchecker>> {
        const url = `${this.url}/custom-spellcheckers/${customSpellcheckerId}`;
        return this.get(url, this.defaultConfig());
    }
}

export namespace CustomSpellcheckersModel {
    export interface CustomSpellchecker {
        id: number;
        name: string;
        config: {
            identifier: string;
            key: string;
            realTimeCheckEnabled: boolean;
            enabledLanguageIds: string[];
        };
        createdAt: string;
        updatedAt: string | null;
    }
}
