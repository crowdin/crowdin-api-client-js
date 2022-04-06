import { CrowdinApi, isOptionalNumber, PaginationOptions, ResponseList } from '../core';

export class TranslationStatus extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param branchId branch identifier
     * @param options optional pagination parameters for the request
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.branches.languages.progress.getMany
     */
    getBranchProgress(
        projectId: number,
        branchId: number,
        options?: PaginationOptions,
    ): Promise<ResponseList<TranslationStatusModel.LanguageProgress>>;
    /**
     * @param projectId project identifier
     * @param branchId branch identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @deprecated optional parameters should be passed through an object
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.branches.languages.progress.getMany
     */
    getBranchProgress(
        projectId: number,
        branchId: number,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<TranslationStatusModel.LanguageProgress>>;
    getBranchProgress(
        projectId: number,
        branchId: number,
        options?: number | PaginationOptions,
        deprecatedOffset?: number,
    ): Promise<ResponseList<TranslationStatusModel.LanguageProgress>> {
        if (isOptionalNumber(options, '2' in arguments)) {
            options = { limit: options, offset: deprecatedOffset };
        }
        const url = `${this.url}/projects/${projectId}/branches/${branchId}/languages/progress`;
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param projectId project identifier
     * @param directoryId directory identifier
     * @param options optional pagination parameters for the request
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.directories.languages.progress.getMany
     */
    getDirectoryProgress(
        projectId: number,
        directoryId: number,
        options?: PaginationOptions,
    ): Promise<ResponseList<TranslationStatusModel.LanguageProgress>>;
    /**
     * @param projectId project identifier
     * @param directoryId directory identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @deprecated optional parameters should be passed through an object
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.directories.languages.progress.getMany
     */
    getDirectoryProgress(
        projectId: number,
        directoryId: number,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<TranslationStatusModel.LanguageProgress>>;
    getDirectoryProgress(
        projectId: number,
        directoryId: number,
        options?: number | PaginationOptions,
        deprecatedOffset?: number,
    ): Promise<ResponseList<TranslationStatusModel.LanguageProgress>> {
        if (isOptionalNumber(options, '2' in arguments)) {
            options = { limit: options, offset: deprecatedOffset };
        }
        const url = `${this.url}/projects/${projectId}/directories/${directoryId}/languages/progress`;
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param projectId project identifier
     * @param fileId file identifier
     * @param options optional pagination parameters for the request
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.files.languages.progress.getMany
     */
    getFileProgress(
        projectId: number,
        fileId: number,
        options?: PaginationOptions,
    ): Promise<ResponseList<TranslationStatusModel.LanguageProgress>>;
    /**
     * @param projectId project identifier
     * @param fileId file identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @deprecated optional parameters should be passed through an object
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.files.languages.progress.getMany
     */
    getFileProgress(
        projectId: number,
        fileId: number,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<TranslationStatusModel.LanguageProgress>>;
    getFileProgress(
        projectId: number,
        fileId: number,
        options?: number | PaginationOptions,
        deprecatedOffset?: number,
    ): Promise<ResponseList<TranslationStatusModel.LanguageProgress>> {
        if (isOptionalNumber(options, '2' in arguments)) {
            options = { limit: options, offset: deprecatedOffset };
        }
        const url = `${this.url}/projects/${projectId}/files/${fileId}/languages/progress`;
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param projectId project identifier
     * @param languageId language identifier
     * @param options optional pagination parameters for the request
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.languages.files.progress.getMany
     */
    getLanguageProgress(
        projectId: number,
        languageId: string,
        options?: PaginationOptions,
    ): Promise<ResponseList<TranslationStatusModel.FileProgress>>;
    /**
     * @param projectId project identifier
     * @param languageId language identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @deprecated optional parameters should be passed through an object
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.languages.files.progress.getMany
     */
    getLanguageProgress(
        projectId: number,
        languageId: string,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<TranslationStatusModel.FileProgress>>;
    getLanguageProgress(
        projectId: number,
        languageId: string,
        options?: number | PaginationOptions,
        deprecatedOffset?: number,
    ): Promise<ResponseList<TranslationStatusModel.FileProgress>> {
        if (isOptionalNumber(options, '2' in arguments)) {
            options = { limit: options, offset: deprecatedOffset };
        }
        const url = `${this.url}/projects/${projectId}/languages/${languageId}/progress`;
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param projectId project identifier
     * @param options optional parameters for the request
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.languages.progress.getMany
     */
    getProjectProgress(
        projectId: number,
        options?: PaginationOptions,
    ): Promise<ResponseList<TranslationStatusModel.LanguageProgress>>;
    /**
     * @param projectId project identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @param languageIds language identifier for filter
     * @deprecated optional parameters should be passed through an object
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.languages.progress.getMany
     */
    getProjectProgress(
        projectId: number,
        limit?: number,
        offset?: number,
        languageIds?: string,
    ): Promise<ResponseList<TranslationStatusModel.LanguageProgress>>;
    getProjectProgress(
        projectId: number,
        options?: number | TranslationStatusModel.GetProjectProgressOptions,
        deprecatedOffset?: number,
        deprecatedLanguageIds?: string,
    ): Promise<ResponseList<TranslationStatusModel.LanguageProgress>> {
        if (isOptionalNumber(options, '1' in arguments)) {
            options = { limit: options, offset: deprecatedOffset, languageIds: deprecatedLanguageIds };
        }
        let url = `${this.url}/projects/${projectId}/languages/progress`;
        url = this.addQueryParam(url, 'languageIds', options.languageIds);
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param projectId project identifier
     * @param options optional parameters for the request
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.qa-checks.getMany
     */
    listQaCheckIssues(
        projectId: number,
        options?: TranslationStatusModel.ListQaCheckIssuesOptions,
    ): Promise<ResponseList<TranslationStatusModel.QaCheck>>;
    /**
     * @param projectId project identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @param category defines the issue category
     * @param validation defines the QA check issue validation type
     * @param languageIds filter progress by languageId
     * @deprecated optional parameters should be passed through an object
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.qa-checks.getMany
     */
    listQaCheckIssues(
        projectId: number,
        limit?: number,
        offset?: number,
        category?: TranslationStatusModel.Category,
        validation?: TranslationStatusModel.Validation,
        languageIds?: string,
    ): Promise<ResponseList<TranslationStatusModel.QaCheck>>;
    listQaCheckIssues(
        projectId: number,
        options?: number | TranslationStatusModel.ListQaCheckIssuesOptions,
        deprecatedOffset?: number,
        deprecatedCategory?: TranslationStatusModel.Category,
        deprecatedValidation?: TranslationStatusModel.Validation,
        deprecatedLanguageIds?: string,
    ): Promise<ResponseList<TranslationStatusModel.QaCheck>> {
        let url = `${this.url}/projects/${projectId}/qa-checks`;
        if (isOptionalNumber(options, '1' in arguments)) {
            options = {
                limit: options,
                offset: deprecatedOffset,
                category: deprecatedCategory,
                validation: deprecatedValidation,
                languageIds: deprecatedLanguageIds,
            };
        }
        url = this.addQueryParam(url, 'category', options.category);
        url = this.addQueryParam(url, 'validation', options.validation);
        url = this.addQueryParam(url, 'languageIds', options.languageIds);
        return this.getList(url, options.limit, options.offset);
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

    export interface FileProgress {
        fileId: number;
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

    export type Category =
        | 'empty'
        | 'variables'
        | 'tags'
        | 'punctuation'
        | 'symbol_register'
        | 'spaces'
        | 'size'
        | 'special_symbols'
        | 'wrong_translation'
        | 'spellcheck'
        | 'icu';

    export type Validation =
        | 'empty_string_check'
        | 'empty_suggestion_check'
        | 'max_length_check'
        | 'tags_check'
        | 'mismatch_ids_check'
        | 'cdata_check'
        | 'specials_symbols_check'
        | 'leading_newlines_check'
        | 'trailing_newlines_check'
        | 'leading_spaces_check'
        | 'trailing_spaces_check'
        | 'multiple_spaces_check'
        | 'custom_blocked_variables_check'
        | 'highest_priority_custom_variables_check'
        | 'highest_priority_variables_check'
        | 'c_variables_check'
        | 'python_variables_check'
        | 'rails_variables_check'
        | 'java_variables_check'
        | 'dot_net_variables_check'
        | 'twig_variables_check'
        | 'php_variables_check'
        | 'freemarker_variables_check'
        | 'lowest_priority_variable_check'
        | 'lowest_priority_custom_variables_check'
        | 'punctuation_check'
        | 'spaces_before_punctuation_check'
        | 'spaces_after_punctuation_check'
        | 'non_breaking_spaces_check'
        | 'capitalize_check'
        | 'multiple_uppercase_check'
        | 'parentheses_check'
        | 'entities_check'
        | 'escaped_quotes_check'
        | 'wrong_translation_issue_check'
        | 'spellcheck'
        | 'icu_check';

    export interface ListQaCheckIssuesOptions extends PaginationOptions {
        category?: Category;
        validation?: Validation;
        languageIds?: string;
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

    export interface GetProjectProgressOptions extends PaginationOptions {
        languageIds?: string;
    }
}
