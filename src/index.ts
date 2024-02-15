import { Applications } from './applications';
import { Bundles } from './bundles';
import { ClientConfig, Credentials, CrowdinApi } from './core';
import { Dictionaries } from './dictionaries';
import { Distributions } from './distributions';
import { Glossaries } from './glossaries';
import { Issues } from './issues';
import { Labels } from './labels';
import { Languages } from './languages';
import { MachineTranslation } from './machineTranslation';
import { Notifications } from './notifications';
import { OrganizationWebhooks } from './organizationWebhooks';
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
import { TranslationStatus } from './translationStatus';
import { Translations } from './translations';
import { UploadStorage } from './uploadStorage';
import { Users } from './users';
import { Vendors } from './vendors';
import { Webhooks } from './webhooks';
import { Workflows } from './workflows';
import { SecurityLogs } from './securityLogs';

export * from './applications';
export * from './bundles';
export * from './core';
export * from './dictionaries';
export * from './distributions';
export * from './glossaries';
export * from './issues';
export * from './labels';
export * from './languages';
export * from './machineTranslation';
export * from './notifications';
export * from './organizationWebhooks';
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
export * from './translationStatus';
export * from './translations';
export * from './uploadStorage';
export * from './users';
export * from './vendors';
export * from './webhooks';
export * from './workflows';
export * from './securityLogs';

/**
 * @internal
 */
export default class Client extends CrowdinApi {
    readonly applicationsApi: Applications;
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
    readonly organizationWebhooksApi: OrganizationWebhooks;
    readonly machineTranslationApi: MachineTranslation;
    readonly stringTranslationsApi: StringTranslations;
    readonly workflowsApi: Workflows;
    readonly usersApi: Users;
    readonly vendorsApi: Vendors;
    readonly securityLogs: SecurityLogs;
    /**
     * @deprecated use stringCommentsApi instead
     */
    readonly issuesApi: Issues;
    readonly teamsApi: Teams;
    readonly distributionsApi: Distributions;
    readonly dictionariesApi: Dictionaries;
    readonly labelsApi: Labels;
    readonly stringCommentsApi: StringComments;
    readonly bundlesApi: Bundles;
    readonly notificationsApi: Notifications;

    constructor(credentials: Credentials, config?: ClientConfig) {
        super(credentials, config);
        this.applicationsApi = new Applications(credentials, config);
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
        this.organizationWebhooksApi = new OrganizationWebhooks(credentials, config);
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
        this.bundlesApi = new Bundles(credentials, config);
        this.notificationsApi = new Notifications(credentials, config);
        this.securityLogs = new SecurityLogs(credentials, config);
    }
}
