import { ClientConfig, Credentials } from './core';
import { Dictionaries } from './dictionaries';
import { Distributions } from './distributions';
import { Glossaries } from './glossaries';
import { Issues } from './issues';
import { Labels } from './labels';
import { Languages } from './languages';
import { MachineTranslation } from './machineTranslation';
import { ProjectsGroups } from './projectsGroups';
import { Reports } from './reports';
import { Screenshots } from './screenshots';
import { SourceFiles } from './sourceFiles';
import { SourceStrings } from './sourceStrings';
import { StringComments } from './stringComments';
import { StringTranslations } from './stringTranslations';
import { Tasks } from './tasks';
import { Teams } from './teams';
import { TranslationMemory } from './translationMemory';
import { Translations } from './translations';
import { TranslationStatus } from './translationStatus';
import { UploadStorage } from './uploadStorage';
import { Users } from './users';
import { Vendors } from './vendors';
import { Webhooks } from './webhooks';
import { Workflows } from './workflows';

export * from './core';
export * from './dictionaries';
export * from './distributions';
export * from './glossaries';
export * from './issues';
export * from './labels';
export * from './languages';
export * from './machineTranslation';
export * from './projectsGroups';
export * from './reports';
export * from './screenshots';
export * from './sourceFiles';
export * from './sourceStrings';
export * from './stringComments';
export * from './stringTranslations';
export * from './tasks';
export * from './teams';
export * from './translationMemory';
export * from './translations';
export * from './translationStatus';
export * from './uploadStorage';
export * from './users';
export * from './vendors';
export * from './webhooks';
export * from './workflows';

/**
 * @internal
 */
export default class Client {
    readonly sourceFilesApi: SourceFiles;
    readonly glossariesApi: Glossaries;
    readonly languagesApi: Languages;
    readonly translationsApi: Translations;
    readonly translationStatusApi: TranslationStatus;
    readonly projectsGroupsApi: ProjectsGroups;
    readonly reportsApi: Reports;
    readonly screenshotsApi: Screenshots;
    readonly sourceStringsApi: SourceStrings;
    readonly uploadStorageApi: UploadStorage;
    readonly tasksApi: Tasks;
    readonly translationMemoryApi: TranslationMemory;
    readonly webhooksApi: Webhooks;
    readonly machineTranslationApi: MachineTranslation;
    readonly stringTranslationsApi: StringTranslations;
    readonly workflowsApi: Workflows;
    readonly usersApi: Users;
    readonly vendorsApi: Vendors;
    /**
     * @deprecated use stringCommentsApi instead
     */
    readonly issuesApi: Issues;
    readonly teamsApi: Teams;
    readonly distributionsApi: Distributions;
    readonly dictionariesApi: Dictionaries;
    readonly labelsApi: Labels;
    readonly stringCommentsApi: StringComments;

    constructor(credentials: Credentials, config?: ClientConfig) {
        this.sourceFilesApi = new SourceFiles(credentials, config);
        this.glossariesApi = new Glossaries(credentials, config);
        this.languagesApi = new Languages(credentials, config);
        this.translationsApi = new Translations(credentials, config);
        this.translationStatusApi = new TranslationStatus(credentials, config);
        this.projectsGroupsApi = new ProjectsGroups(credentials, config);
        this.reportsApi = new Reports(credentials, config);
        this.screenshotsApi = new Screenshots(credentials, config);
        this.sourceStringsApi = new SourceStrings(credentials, config);
        this.uploadStorageApi = new UploadStorage(credentials, config);
        this.tasksApi = new Tasks(credentials, config);
        this.translationMemoryApi = new TranslationMemory(credentials, config);
        this.webhooksApi = new Webhooks(credentials, config);
        this.machineTranslationApi = new MachineTranslation(credentials, config);
        this.stringTranslationsApi = new StringTranslations(credentials, config);
        this.workflowsApi = new Workflows(credentials, config);
        this.usersApi = new Users(credentials, config);
        this.vendorsApi = new Vendors(credentials, config);
        this.issuesApi = new Issues(credentials, config);
        this.teamsApi = new Teams(credentials, config);
        this.distributionsApi = new Distributions(credentials, config);
        this.dictionariesApi = new Dictionaries(credentials, config);
        this.labelsApi = new Labels(credentials, config);
        this.stringCommentsApi = new StringComments(credentials, config);
    }
}
