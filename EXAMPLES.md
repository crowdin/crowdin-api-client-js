# Crowdin API client usage examples

- [Create a file in a Crowdin project](#create-a-file-in-a-crowdin-project)
- [Update file](#update-file)
- [Create TM](#create-tm)

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

async function addTm(languageId: string, name: string, fileName: string, fileContent: any, scheme: TranslationMemoryModel.Scheme): Promise<void> {
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

addTm('uk', 'test', file, fileContent, schema);

```
