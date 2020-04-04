import { CrowdinApi, ResponseList } from '../core';

export class TranslationStatus extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param branchId branch identifier
     */
    getBranchProgress(
        projectId: number,
        branchId: number,
    ): Promise<ResponseList<TranslationStatusModel.LanguageProgress>> {
        const url = `${this.url}/projects/${projectId}/branches/${branchId}/languages/progress`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param directoryId directory identifier
     */
    getDirectoryProgress(
        projectId: number,
        directoryId: number,
    ): Promise<ResponseList<TranslationStatusModel.LanguageProgress>> {
        const url = `${this.url}/projects/${projectId}/directories/${directoryId}/languages/progress`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param languageIds language identifier for filter
     */
    getProjectProgress(
        projectId: number,
        languageIds?: string,
    ): Promise<ResponseList<TranslationStatusModel.LanguageProgress>> {
        let url = `${this.url}/projects/${projectId}/languages/progress`;
        url = this.addQueryParam(url, 'languageIds', languageIds);
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param fileId file identifier
     */
    getFileProgress(projectId: number, fileId: number): Promise<ResponseList<TranslationStatusModel.LanguageProgress>> {
        const url = `${this.url}/projects/${projectId}/files/${fileId}/languages/progress`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @param category defines the issue category
     * @param validation defines the QA check issue validation type
     * @param languageIds filter progress by languageId
     */
    listQaCheckIssues(
        projectId: number,
        limit?: number,
        offset?: number,
        category?: TranslationStatusModel.Category,
        validation?: TranslationStatusModel.Validation,
        languageIds?: string,
    ): Promise<ResponseList<TranslationStatusModel.QaCheck>> {
        let url = `${this.url}/projects/${projectId}/qa-check`;
        url = this.addQueryParam(url, 'limit', limit);
        url = this.addQueryParam(url, 'offset', offset);
        url = this.addQueryParam(url, 'category', category);
        url = this.addQueryParam(url, 'validation', validation);
        url = this.addQueryParam(url, 'languageIds', languageIds);
        return this.get(url, this.defaultConfig());
    }
}

export namespace TranslationStatusModel {
    export interface LanguageProgress {
        languageId: string;
        words: Words;
        phrases: Words;
        translationProgress: number;
        approvalProgress: number;
        eTag: string;
    }

    export interface Words {
        total: number;
        translated: number;
        approved: number;
    }

    export enum Category {
        EMPTY = 'empty',
        VARIABLES = 'variables',
        TAGS = 'tags',
        PUNCTUATION = 'punctuation',
        SYMBOL_REGISTER = 'symbol_register',
        SPACES = 'spaces',
        SIZE = 'size',
        SPECIAL_SYMBOLS = 'special_symbols',
        WRONG_TRANSLATION = 'wrong_translation',
        SPELLCHECK = 'spellcheck',
        ICU = 'icu',
    }

    export enum Validation {
        EMPTY_STRING_CHECK = 'empty_string_check',
        EMPTY_SUGGESTION_CHECK = 'empty_suggestion_check',
        MAX_LENGTH_CHECK = 'max_length_check',
        TAGS_CHECK = 'tags_check',
        MISMATCH_IDS_CHECK = 'mismatch_ids_check',
        CDATA_CHECK = 'cdata_check',
        SPECIALS_SYMBOLS_CHECK = 'specials_symbols_check',
        LEADING_NEWLINES_CHECK = 'leading_newlines_check',
        TRAILING_NEWLINES_CHECK = 'trailing_newlines_check',
        LEADING_SPACES_CHECK = 'leading_spaces_check',
        TRAILING_SPACES_CHECK = 'trailing_spaces_check',
        MULTIPLE_SPACES_CHECK = 'multiple_spaces_check',
        CUSTOM_BLOCKED_VARIABLES_CHECK = 'custom_blocked_variables_check',
        HIGHEST_PRIORITY_CUSTOM_VARIABLES_CHECK = 'highest_priority_custom_variables_check',
        HIGHEST_PRIORITY_VARIABLES_CHECK = 'highest_priority_variables_check',
        C_VARIABLES_CHECK = 'c_variables_check',
        PYTHON_VARIABLES_CHECK = 'python_variables_check',
        RAILS_VARIABLES_CHECK = 'rails_variables_check',
        JAVA_VARIABLES_CHECK = 'java_variables_check',
        DOT_NET_VARIABLES_CHECK = 'dot_net_variables_check',
        TWIG_VARIABLES_CHECK = 'twig_variables_check',
        PHP_VARIABLES_CHECK = 'php_variables_check',
        FREEMARKER_VARIABLES_CHECK = 'freemarker_variables_check',
        LOWEST_PRIORITY_VARIABLE_CHECK = 'lowest_priority_variable_check',
        LOWEST_PRIORITY_CUSTOM_VARIABLES_CHECK = 'lowest_priority_custom_variables_check',
        PUNCTUATION_CHECK = 'punctuation_check',
        SPACES_BEFORE_PUNCTUATION_CHECK = 'spaces_before_punctuation_check',
        SPACES_AFTER_PUNCTUATION_CHECK = 'spaces_after_punctuation_check',
        NON_BREAKING_SPACES_CHECK = 'non_breaking_spaces_check',
        CAPITALIZE_CHECK = 'capitalize_check',
        MULTIPLE_UPPERCASE_CHECK = 'multiple_uppercase_check',
        PARENTHESES_CHECK = 'parentheses_check',
        ENTITIES_CHECK = 'entities_check',
        ESCAPED_QUOTES_CHECK = 'escaped_quotes_check',
        WRONG_TRANSLATION_ISSUE_CHECK = 'wrong_translation_issue_check',
        SPELLCHECK = 'spellcheck',
        ICU_CHECK = 'icu_check',
    }

    export interface QaCheck {
        stringId: number;
        languageId: string;
        category: Category;
        categoryDescription: string;
        validation: Validation;
        validationDescription: string;
        pluralId: number;
        text: string;
    }
}
