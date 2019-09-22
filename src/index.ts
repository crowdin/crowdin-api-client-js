import { ClientConfig, Credentials } from './core';
import { SourceFiles } from './sourceFiles';
import { Glossaries } from './glossaries';
import { Languages } from './languages';
import { Translations } from './translations';
import { TranslationStatus } from './translationStatus';
import { ProjectsGroups } from './projectsGroups';
import { Reports } from './reports';
import { Screenshots } from './screenshots';
import { SourceStrings } from './sourceStrings';
import { UploadStorage } from './uploadStorage';
import { Tasks } from './tasks';
import { TranslationMemory } from './translationMemory';
import { Webhooks } from './webhooks';
import { MachineTranslation } from './machineTranslation';
import { Notifications } from './notifications';

export * from './core';
export * from './sourceFiles';
export * from './glossaries';
export * from './languages';
export * from './translations';
export * from './translationStatus';
export * from './projectsGroups';
export * from './reports';
export * from './screenshots';
export * from './sourceStrings';
export * from './uploadStorage';
export * from './tasks';
export * from './translationMemory';
export * from './webhooks';
export * from './machineTranslation';
export * from './notifications';

export class Client {

    readonly sourceFilesApi: SourceFiles.Api;
    readonly glossariesApi: Glossaries.Api;
    readonly languagesApi: Languages.Api;
    readonly translationsApi: Translations.Api;
    readonly translationStatusApi: TranslationStatus.Api;
    readonly projectsGroupsApi: ProjectsGroups.Api;
    readonly reportsApi: Reports.Api;
    readonly screenshotsApi: Screenshots.Api;
    readonly sourceStringsApi: SourceStrings.Api;
    readonly uploadStorageApi: UploadStorage.Api;
    readonly tasksApi: Tasks.Api;
    readonly translationMemoryApi: TranslationMemory.Api;
    readonly webhooksApi: Webhooks.Api;
    readonly machineTranslationApi: MachineTranslation.Api;
    readonly notificationsApi: Notifications.Api;

    constructor(credentials: Credentials, config?: ClientConfig) {
        this.sourceFilesApi = new SourceFiles.Api(credentials, config);
        this.glossariesApi = new Glossaries.Api(credentials, config);
        this.languagesApi = new Languages.Api(credentials, config);
        this.translationsApi = new Translations.Api(credentials, config);
        this.translationStatusApi = new TranslationStatus.Api(credentials, config);
        this.projectsGroupsApi = new ProjectsGroups.Api(credentials, config);
        this.reportsApi = new Reports.Api(credentials, config);
        this.screenshotsApi = new Screenshots.Api(credentials, config);
        this.sourceStringsApi = new SourceStrings.Api(credentials, config);
        this.uploadStorageApi = new UploadStorage.Api(credentials, config);
        this.tasksApi = new Tasks.Api(credentials, config);
        this.translationMemoryApi = new TranslationMemory.Api(credentials, config);
        this.webhooksApi = new Webhooks.Api(credentials, config);
        this.machineTranslationApi = new MachineTranslation.Api(credentials, config);
        this.notificationsApi = new Notifications.Api(credentials, config);
    }
}
