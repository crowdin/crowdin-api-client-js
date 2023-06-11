# Crowdin API client usage examples

- [Create a file in a Crowdin project](#create-a-file-in-a-crowdin-project)
- [Update file](#update-file)
- [Create TM](#create-tm)
- [Create Glossary](#create-glossary)
- [Pre-Translate project](#pre-translate-project)

---

## Create a file in a Crowdin project

```typescript
import * as fs from 'fs';
import crowdin from '@crowdin/crowdin-api-client';

const { uploadStorageApi, sourceFilesApi } = new crowdin({
    token: 'token',
    organization: 'org'
});

async function createFile(crowdinProjectId: number, fileName: string, fileContent: any): Promise<number> {
    const storageResponse = await uploadStorageApi.addStorage(fileName, fileContent);
    const file = await sourceFilesApi.createFile(crowdinProjectId, {
        storageId: storageResponse.data.id,
        name: fileName,
    });
    return file.data.id;
}

const file = 'test.json';
const fileContent = fs.readFileSync(file);

createFile(123, file, fileContent);

```

## Update file

```typescript
import * as fs from 'fs';
import crowdin from '@crowdin/crowdin-api-client';

const { uploadStorageApi, sourceFilesApi } = new crowdin({
    token: 'token',
    organization: 'org'
});

async function updateFile(projectId: number, fileId: number, fileName: string, fileContent: any): Promise<void> {
    const storageResponse = await uploadStorageApi.addStorage(fileName, fileContent);
    await sourceFilesApi.updateOrRestoreFile(projectId, fileId, {
        storageId: storageResponse.data.id,
    });
}

const file = 'test.json';
const fileContent = fs.readFileSync(file);

updateFile(123, 456, file, fileContent);

```

## Create TM

```typescript
import * as fs from 'fs';
import crowdin, { TranslationMemoryModel } from '@crowdin/crowdin-api-client';

const { uploadStorageApi, translationMemoryApi } = new crowdin({
    token: 'token',
    organization: 'org'
});

async function createTm(languageId: string, name: string, fileName: string, fileContent: any, scheme: TranslationMemoryModel.Scheme): Promise<void> {
    const tm = await translationMemoryApi.addTm({ languageId, name });
    const storage = await uploadStorageApi.addStorage(fileName, fileContent);
    const importTm = await translationMemoryApi.importTm(tm.data.id, {
        storageId: storage.data.id,
        scheme
    });

    let status = importTm.data.status;
    while (status !== 'finished') {
        const progress = await translationMemoryApi.checkImportStatus(tm.data.id, importTm.data.identifier);
        status = progress.data.status;
    }
}

const file = 'test.csv';
const fileContent = fs.readFileSync(file);
const schema = {
    en: 0,
    uk: 1
};

createTm('uk', 'test', file, fileContent, schema);

```

## Create Glossary

```typescript
import * as fs from 'fs';
import crowdin, { GlossariesModel } from '@crowdin/crowdin-api-client';

const { uploadStorageApi, glossariesApi } = new crowdin({
    token: 'token',
    organization: 'org'
});

async function createGlossary(languageId: string, name: string, fileName: string, fileContent: any, scheme: GlossariesModel.GlossaryFileScheme): Promise<void> {
    const glossary = await glossariesApi.addGlossary({ languageId, name });
    const storage = await uploadStorageApi.addStorage(fileName, fileContent);
    const importGlossary = await glossariesApi.importGlossaryFile(glossary.data.id, {
        storageId: storage.data.id,
        scheme
    });

    let status = importGlossary.data.status;
    while (status !== 'finished') {
        const progress = await glossariesApi.checkGlossaryImportStatus(glossary.data.id, importGlossary.data.identifier);
        status = progress.data.status;
    }
}

const file = 'test.csv';
const fileContent = fs.readFileSync(file);
const schema = {
    term_en: 0,
    description_en: 1
};

createGlossary('uk', 'test', file, fileContent, schema);

```

## Pre-Translate project

```typescript
import crowdin from '@crowdin/crowdin-api-client';

const { translationsApi } = new crowdin({
    token: 'token',
    organization: 'org'
});

async function preTranslateProject(projectId: number, languageIds: string[], fileIds: number[]): Promise<string> {
    const result = await translationsApi.applyPreTranslation(projectId, {
        languageIds,
        fileIds,
    });

    let status = result.data.status;
    while (status !== 'finished') {
        const progress = await translationsApi.preTranslationStatus(projectId, result.data.identifier);
        status = progress.data.status;
    }

    //as an example we export translations for 1 file and 1 language
    const translations = await translationsApi.exportProjectTranslation(projectId, {
        targetLanguageId: languageIds[0],
        fileIds: [fileIds[0]],
    });

    return translations.data.url;
}

preTranslateProject(123, ['uk'], [456]);

```
