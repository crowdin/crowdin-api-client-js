[<p align='center'><img src='https://support.crowdin.com/assets/logos/crowdin-dark-symbol.png' data-canonical-src='https://support.crowdin.com/assets/logos/crowdin-dark-symbol.png' width='150' height='150' align='center'/></p>](https://crowdin.com)

# Crowdin JavaScript client [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fcrowdin%2Fcrowdin-api-client-js&text=The%20Crowdin%20JavaScript%20client%20is%20a%20lightweight%20interface%20to%20the%20Crowdin%20API%20that%20works%20in%20any%20JavaScript%20environment)&nbsp;[![GitHub Repo stars](https://img.shields.io/github/stars/crowdin/crowdin-api-client-js?style=social&cacheSeconds=1800)](https://github.com/crowdin/crowdin-api-client-js/stargazers)

The Crowdin JavaScript client is a lightweight interface to the Crowdin API that works in any JavaScript environment, including web browsers, workers in web browsers, extensions in web browsers or desktop applications, Node.js etc. It provides common services for making API requests.

Our API is a full-featured RESTful API that helps you to integrate localization into your development process. The endpoints that we use allow you to easily make calls to retrieve information and to execute actions needed.

<div align="center">

[**`Live Demo`**](https://runkit.com/andrii-bodnar/crowdin-js-api-client-live-demo) &nbsp;|&nbsp;
[**`API Client Docs`**](https://crowdin.github.io/crowdin-api-client-js/modules.html) &nbsp;|&nbsp;
[**`Crowdin API`**](https://developer.crowdin.com/api/v2/) &nbsp;|&nbsp;
[**`Crowdin Enterprise API`**](https://developer.crowdin.com/enterprise/api/v2/)

[![npm](https://img.shields.io/npm/v/@crowdin/crowdin-api-client?logo=npm&cacheSeconds=1800)](https://www.npmjs.com/package/@crowdin/crowdin-api-client)
[![npm](https://img.shields.io/npm/dt/@crowdin/crowdin-api-client?cacheSeconds=1800)](https://www.npmjs.com/package/@crowdin/crowdin-api-client)
[![Tests](https://github.com/crowdin/crowdin-api-client-js/actions/workflows/basic.yml/badge.svg)](https://github.com/crowdin/crowdin-api-client-js/actions/workflows/basic.yml)
[![codecov](https://codecov.io/gh/crowdin/crowdin-api-client-js/branch/master/graph/badge.svg)](https://codecov.io/gh/crowdin/crowdin-api-client-js)
[![GitHub Release Date](https://img.shields.io/github/release-date/crowdin/crowdin-api-client-js?cacheSeconds=3600)](https://github.com/crowdin/crowdin-api-client-js/releases)
[![GitHub contributors](https://img.shields.io/github/contributors/crowdin/crowdin-api-client-js?cacheSeconds=3600)](https://github.com/crowdin/crowdin-api-client-js/graphs/contributors)
[![License](https://img.shields.io/github/license/crowdin/crowdin-api-client-js?cacheSeconds=3600)](https://github.com/crowdin/crowdin-api-client-js/blob/master/LICENSE)
  
</div>

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Over-The-Air Content Delivery](#over-the-air-content-delivery)
- [GraphQL API](#graphql-api)
- [Seeking Assistance](#seeking-assistance)
- [Contributing](#contributing)
- [License](#license)

## Installation

### npm

  `npm i @crowdin/crowdin-api-client`

### yarn

  `yarn add @crowdin/crowdin-api-client`

## Quick Start

<details>
<summary>Typescript</summary>

```typescript
import crowdin, { Credentials, SourceFilesModel } from '@crowdin/crowdin-api-client';

// credentials
const credentials: Credentials = {
  token: 'personalAccessToken',
  organization: 'organizationName' // optional
};

// initialization of crowdin client
const {
  projectsGroupsApi,
  uploadStorageApi,
  sourceFilesApi,
  translationsApi
} = new crowdin(credentials);

// get project list
projectsGroupsApi.listProjects()
  .then(projects => console.log(projects))
  .catch(error => console.error(error));

// You can also use async/wait. Add `async` keyword to your outer function/method
async function getProjects() {
  try {
    const projects = await projectsGroupsApi.listProjects();
    console.log(projects);
  } catch (error) {
    console.error(error);
  }
}

// Create file with json content to translate
async function createFile() {
  const projectId = 123;
  const fileData = {
    title: 'Example',
    description: 'Some Text'
  };
  const storage = await uploadStorageApi.addStorage('file1.json', fileData);
  const file = await sourceFilesApi.createFile(projectId, {
    name: 'file1.json',
    title: 'Sample file',
    storageId: storage.data.id,
    type: 'json'
  });
  console.log(file);
}

// Download translations
async function downloadTranslations() {
  const projectId = 123;
  const fileId = 456;
  const language = 'de';
  const downloadLink = await translationsApi.buildProjectFileTranslation(
    projectId,
    fileId,
    {
      targetLanguageId: language
    }
  );
  const response = await fetch(downloadLink.data.url);
  const translations = await response.json();
  console.log(translations);
}
```

Or specific API instances:

```typescript
import { Credentials, ProjectsGroups } from '@crowdin/crowdin-api-client';

// credentials
const credentials: Credentials = {
  token: 'personalAccessToken',
  organization: 'organizationName' // optional
};

// initialization of ProjectsGroups
const projectsGroupsApi = new ProjectsGroups(credentials);

// get project list
projectsGroupsApi.listProjects()
  .then(projects => console.log(projects))
  .catch(error => console.error(error));
```

</details>

<details>
<summary>Javascript ES6 modules</summary>

```javascript
import crowdin, { SourceFilesModel } from '@crowdin/crowdin-api-client';

// initialization of crowdin client
const {
  projectsGroupsApi,
  uploadStorageApi,
  sourceFilesApi,
  translationsApi
} = new crowdin({
  token: 'personalAccessToken',
  organization: 'organizationName' // optional
});

// get project list
projectsGroupsApi.listProjects()
  .then(projects => console.log(projects))
  .catch(error => console.error(error));

// You can also use async/wait. Add `async` keyword to your outer function/method
async function getProjects() {
  try {
    const projects = await projectsGroupsApi.listProjects();
    console.log(projects);
  } catch (error) {
    console.error(error);
  }
}

// Create file with json content to translate
async function createFile() {
  const projectId = 123;
  const fileData = {
    title: 'Example',
    description: 'Some Text'
  };
  const storage = await uploadStorageApi.addStorage('file1.json', fileData);
  const file = await sourceFilesApi.createFile(projectId, {
    name: 'file1.json',
    title: 'Sample file',
    storageId: storage.data.id,
    type: 'json'
  });
  console.log(file);
}

// Download translations
async function downloadTranslations() {
  const projectId = 123;
  const fileId = 456;
  const language = 'de';
  const downloadLink = await translationsApi.buildProjectFileTranslation(
    projectId,
    fileId,
    {
      targetLanguageId: language
    }
  );
  const response = await fetch(downloadLink.data.url);
  const translations = await response.json();
  console.log(translations);
}
```

Or specific API instances:

```javascript
import { ProjectsGroups } from '@crowdin/crowdin-api-client';

// initialization of ProjectsGroups
const projectsGroupsApi = new ProjectsGroups({
  token: 'personalAccessToken',
  organization: 'organizationName' // optional
});

// get project list
projectsGroupsApi.listProjects()
  .then(projects => console.log(projects))
  .catch(error => console.error(error));
```

</details>

<details>
<summary>Javascript CommonJS</summary>

```javascript
const crowdin = require('@crowdin/crowdin-api-client');

// initialization of crowdin client
const {
  projectsGroupsApi,
  uploadStorageApi,
  sourceFilesApi,
  translationsApi
} = new crowdin.default({
  token: 'personalAccessToken',
  organization: 'organizationName' // optional
});

// get project list
projectsGroupsApi.listProjects()
  .then(projects => console.log(projects))
  .catch(error => console.error(error));

// You can also use async/wait. Add `async` keyword to your outer function/method
async function getProjects() {
  try {
    const projects = await projectsGroupsApi.listProjects();
    console.log(projects);
  } catch (error) {
    console.error(error);
  }
}

// Create file with json content to translate
async function createFile() {
  const projectId = 123;
  const fileData = {
    title: 'Example',
    description: 'Some Text'
  };
  const storage = await uploadStorageApi.addStorage('file1.json', fileData);
  const file = await sourceFilesApi.createFile(projectId, {
    name: 'file1.json',
    title: 'Sample file',
    storageId: storage.data.id,
    type: 'json'
  });
  console.log(file);
}

// Download translations
async function downloadTranslations() {
  const projectId = 123;
  const fileId = 456;
  const language = 'de';
  const downloadLink = await translationsApi.buildProjectFileTranslation(
    projectId,
    fileId,
    {
      targetLanguageId: language
    }
  );
  const response = await fetch(downloadLink.data.url);
  const translations = await response.json();
  console.log(translations);
}
```

Or specific API instances:

```javascript
const ProjectsGroups = require('@crowdin/crowdin-api-client').ProjectsGroups;

// initialization of ProjectsGroups
const projectsGroupsApi = new ProjectsGroups({
  token: 'personalAccessToken',
  organization: 'organizationName' // optional
});

// get project list
projectsGroupsApi.listProjects()
  .then(projects => console.log(projects))
  .catch(error => console.error(error));
```

</details>

You can generate Personal Access Token in your Crowdin Account Settings.

### List of projects with Fetch API

In addition if you use client in non-Node.js environment you might have a troubles with http calls.
This client uses [axios](https://github.com/axios/axios) which internally uses `http` and `https` Node modules.
So there is an option to use http client based on [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) (keep in mind that `fetch` should be available in global scope).

```typescript
import { ProjectsGroups } from '@crowdin/crowdin-api-client';

const projectsGroupsApi = new ProjectsGroups(credentials, {
  httpClientType: 'fetch'
});
```

Or even pass your own http client as `httpClient` property which should implement `HttpClient` interface.

### Fetch all records

It is possible to fetch all records from paginatable methods (where we have limit and offset in arguments).

```javascript
import { ProjectsGroups } from '@crowdin/crowdin-api-client';

// initialization of ProjectsGroups
const projectsGroupsApi = new ProjectsGroups({
  token: 'personalAccessToken',
  organization: 'organizationName' // optional
});

// get all projects
projectsGroupsApi
  .withFetchAll()
  .listProjects()
  .then(projects => console.log(projects))
  .catch(error => console.error(error));

// get projects but not more than 1000
projectsGroupsApi
  .withFetchAll(1000)
  .listProjects()
  .then(projects => console.log(projects))
  .catch(error => console.error(error));
```

### Retry configuration

There is a possibility to configure client invoke http calls with retry mechanism.

```typescript
import { ProjectsGroups } from '@crowdin/crowdin-api-client';

const projectsGroupsApi = new ProjectsGroups(credentials, {
  retryConfig: {
    retries: 2, // amount of retries (gte 0)
    waitInterval: 100, // wait interval in ms between retries
    conditions: [ // array of conditions which will check if retry should not be applied
      {
        test(error) {
          return error.code === 40
        }
      }
    ]
  }
});
```

### Exception handling

In case of error library will throw an `Error` based exception. This can either be a generic error with an error message and a code, or a validation error that additionally contains validation error codes.

```javascript
const crowdin = require('@crowdin/crowdin-api-client');

const token = '';

const { translationsApi } = new crowdin.default({ token });

async function test() {
  const project = 123;
  const dir = 456;
  try {
    const res = await translationsApi.buildProjectDirectoryTranslation(project, dir);
    console.log(JSON.stringify(res));
  } catch (e) {
    if (e instanceof crowdin.CrowdinValidationError) {
      console.log('Validation error');
    } else if (e instanceof crowdin.CrowdinError) {
      console.log('Generic error');
    }
    console.error(e);
  }
}

test();
```

### Http request timeout

By default request timeout will vary on http client implementation and/or environment (e.g. `fetch` uses timeout configured by the browser).  
But there is an option to set constant value:

```javascript
const crowdin = require('@crowdin/crowdin-api-client');

const credentials = { token: 'token' };

const httpRequestTimeout = 60 * 1000; // 60 seconds

const client = new crowdin.default(credentials, { httpRequestTimeout });
```

## Over-The-Air Content Delivery

:dizzy: Recommended for translations delivery to your website or mobile application.

You can also use the [Crowdin OTA Client JS](https://github.com/crowdin/ota-client-js) library to send the translated content to your web apps via content delivery. Crowdin Content Delivery uses a CDN vault that mirrors your project’s translated content. The updated translations will become available to users much faster.

## GraphQL API

This library also provides possibility to use [GraphQL API](https://developer.crowdin.com/graphql-api/) (only for Crowdin Enterprise).

```javascript
const crowdin = require('@crowdin/crowdin-api-client');

const client = new crowdin.default({
  token: '{token}',
  organization: '{organization}'
});

const query = `
query {
  viewer {
    projects(first: 50) {
      edges {
        node {
          name
  
          files(first: 10) {
            totalCount
            edges {
              node {
                name
                type
              }
            }
          }
        }
      }
    }
  }
}
`;

client
  .graphql({ query })
  .then(res => console.log(JSON.stringify(res, null, 2)));
```

## Seeking Assistance

If you find any problems or would like to suggest a feature, please read the [How can I contribute](/CONTRIBUTING.md#how-can-i-contribute) section in our contributing guidelines.

Need help working with Crowdin JavaScript client or have any questions? [Contact](https://crowdin.com/contacts) Customer Success Service.

## Contributing

If you want to contribute please read the [Contributing](/CONTRIBUTING.md) guidelines.

## License

<pre>
The Crowdin JavaScript client is licensed under the MIT License.
See the LICENSE.md file distributed with this work for additional
information regarding copyright ownership.

Except as contained in the LICENSE file, the name(s) of the above copyright
holders shall not be used in advertising or otherwise to promote the sale,
use or other dealings in this Software without prior written authorization.
</pre>
