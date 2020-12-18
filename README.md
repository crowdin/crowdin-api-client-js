[<p align='center'><img src='https://support.crowdin.com/assets/logos/crowdin-dark-symbol.png' data-canonical-src='https://support.crowdin.com/assets/logos/crowdin-dark-symbol.png' width='200' height='200' align='center'/></p>](https://crowdin.com)

# Crowdin JavaScript client

The Crowdin JavaScript client is a lightweight interface to the Crowdin API v2 that works in any JavaScript environment, including web browsers, workers in web browsers, extensions in web browsers or desktop applications, Node.js etc. It provides common services for making API requests.

Our API is a full-featured RESTful API that helps you to integrate localization into your development process. The endpoints that we use allow you to easily make calls to retrieve information and to execute actions needed.

For more about Crowdin API v2 see the documentation:
- [Crowdin](https://support.crowdin.com/api/v2/)
- [Crowdin Enterprise](https://support.crowdin.com/enterprise/api/)

## Status

[![npm](https://img.shields.io/npm/v/@crowdin/crowdin-api-client?logo=npm&cacheSeconds=1800)](https://www.npmjs.com/package/@crowdin/crowdin-api-client)
[![npm](https://img.shields.io/npm/dt/@crowdin/crowdin-api-client?cacheSeconds=1800)](https://www.npmjs.com/package/@crowdin/crowdin-api-client)
[![GitHub issues](https://img.shields.io/github/issues/crowdin/crowdin-api-client-js?cacheSeconds=3600)](https://github.com/crowdin/crowdin-api-client-js/issues)
[![License](https://img.shields.io/github/license/crowdin/crowdin-api-client-js?cacheSeconds=3600)](https://github.com/crowdin/crowdin-api-client-js/blob/master/LICENSE)

[![codecov](https://codecov.io/gh/crowdin/crowdin-api-client-js/branch/master/graph/badge.svg)](https://codecov.io/gh/crowdin/crowdin-api-client-js)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/m/crowdin/crowdin-api-client-js?cacheSeconds=3600)](https://github.com/crowdin/crowdin-api-client-js/pulse)
[![GitHub Release Date](https://img.shields.io/github/release-date/crowdin/crowdin-api-client-js?cacheSeconds=3600)](https://github.com/crowdin/crowdin-api-client-js/releases)
[![GitHub contributors](https://img.shields.io/github/contributors/crowdin/crowdin-api-client-js?cacheSeconds=3600)](https://github.com/crowdin/crowdin-api-client-js/graphs/contributors)

## Build Status

| Azure CI (Linux) | Azure CI (Windows) | Azure CI (MacOS) |
|--------------------|------------------|------------------|
|[![Build Status](https://dev.azure.com/crowdin/crowdin-api-client-js/_apis/build/status/crowdin-api-client-js%20(Ubuntu)?branchName=master)](https://dev.azure.com/crowdin/crowdin-api-client-js/_build/latest?definitionId=6&branchName=master)|[![Build Status](https://dev.azure.com/crowdin/crowdin-api-client-js/_apis/build/status/crowdin-api-client-js%20(Windows)?branchName=master)](https://dev.azure.com/crowdin/crowdin-api-client-js/_build/latest?definitionId=8&branchName=master)|[![Build Status](https://dev.azure.com/crowdin/crowdin-api-client-js/_apis/build/status/crowdin-api-client-js%20(MacOS)?branchName=master)](https://dev.azure.com/crowdin/crowdin-api-client-js/_build/latest?definitionId=7&branchName=master)
|[![Azure DevOps tests (branch)](https://img.shields.io/azure-devops/tests/crowdin/crowdin-api-client-js/6/master?cacheSeconds=1800)](https://dev.azure.com/crowdin/crowdin-api-client-js/_build/latest?definitionId=6&branchName=master)|[![Azure DevOps tests (branch)](https://img.shields.io/azure-devops/tests/crowdin/crowdin-api-client-js/8/master?cacheSeconds=1800)](https://dev.azure.com/crowdin/crowdin-api-client-js/_build/latest?definitionId=8&branchName=master)|[![Azure DevOps tests (branch)](https://img.shields.io/azure-devops/tests/crowdin/crowdin-api-client-js/7/master?cacheSeconds=1800)](https://dev.azure.com/crowdin/crowdin-api-client-js/_build/latest?definitionId=7&branchName=master)

## Table of Contents
* [Installation](#installation)
* [Quick Start](#quick-start)
* [Seeking Assistance](#seeking-assistance)
* [Contributing](#contributing)
* [License](#license)

## Installation

### npm
  `npm i @crowdin/crowdin-api-client`

### yarn
  `yarn add @crowdin/crowdin-api-client`

## Quick Start

<details>
<summary>Typescript</summary>

```typescript
import crowdin, { Credentials } from '@crowdin/crowdin-api-client';

// credentials
const credentials: Credentials = {
  token: 'personalAccessToken',
  organization: 'organizationName' // optional
};

// initialization of crowdin client
const { projectsGroupsApi } = new crowdin(credentials);

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
<summary>Javascript</summary>

```javascript
import crowdin from '@crowdin/crowdin-api-client';

// initialization of crowdin client
const { projectsGroupsApi } = new crowdin({
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

You can generate Personal Access Token in your Crowdin Account Settings.

### List of projects with Fetch API

In addition if you use client in non-Node.js environment you might have a troubles with http calls.
This client uses [axios](https://github.com/axios/axios) which internally uses `http` and `https` Node modules.
So there is an option to use http client based on [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

```typescript
import { ProjectsGroups, HttpClientType } from '@crowdin/crowdin-api-client';

const projectsGroupsApi = new ProjectsGroups(credentials, {
  httpClientType: HttpClientType.FETCH
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
import { ProjectsGroups, HttpClientType } from '@crowdin/crowdin-api-client';

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
