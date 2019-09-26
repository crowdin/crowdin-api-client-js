[<p align="center"><img src="https://support.crowdin.com/assets/logos/crowdin-dark-symbol.png" data-canonical-src="https://support.crowdin.com/assets/logos/crowdin-dark-symbol.png" width="200" height="200" align="center"/></p>](https://crowdin.com)

# Crowdin JavaScript client

The Crowdin JavaScript client is a lightweight interface to the Crowdin API v2 that works in both Node.js and browser environments. It provides common services for making API requests.

For more about Crowdin API v2 see [Crowdin API v2](https://support.crowdin.com/enterprise/api/) documentation.


## Table of Contents
* [Requirements](#requirements)
* [Dependencies](#dependencies)
* [Installation](#installation)
* [Quick Start](#quick-start)
* [Contribution](#contribution)
* [Seeking Assistance](#seeking-assistance)
* [License](#license)

## Requirements
* typescript 3.5.2
* tslint 5.18.0
* ts-jest 24.0.2
* (optional) jest 24.8.0
* (optional) jest-circus 24.8.0

## Dependencies
* Axios 0.19

## Installation
npm [TBA]

## Quick Start

Start using client by creating `Credentials` object:

```typescript
import * as crowdin from 'crowdin-sdk-2';

const credentials: crowdin.Credentials = {
    token: 'testToken',
    organization: 'organizationName'
};
```

### List of projects

```typescript
const projectsGroupsApi = new crowdin.ProjectsGroups.Api(credentials);

const projects = await projectsGroupsApi.listProjects();
```

Or you can create whole client and use needed APIs:

```typescript
const client = new crowdin.Client(credentials);

const { projectsGroupsApi } = client;

const projects = await projectsGroupsApi.listProjects();
```

### List of projects with Fetch API

In addition if you use client in non-Node.js environment you might have a troubles with http calls.
This client uses [axios](https://github.com/axios/axios) which internally uses `http` and `https` Node modules.
So there is an option to use http client based on [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

```typescript
const projectsGroupsApi = new crowdin.ProjectsGroups.Api(credentials, {
    httpClientType: crowdin.HttpClientType.FETCH
});

const projects = await projectsGroupsApi.listProjects();
```

Or even pass your own http client as `httpClient` property which should implement `crowdin.HttpClient` interface.

## Contribution
We are happy to accept contributions to the Crowdin JavaScript client. To contribute please do the following:
1. Fork the repository on GitHub.
2. Decide which code you want to submit. A submission should be a set of changes that addresses one issue in the issue tracker. Please file one change per issue, and address one issue per change. If you want to make a change that doesn't have a corresponding issue in the issue tracker, please file a new ticket!
3. Ensure that your code adheres to standard conventions, as used in the rest of the library.
4. Ensure that there are unit tests for your code.
5. Submit a pull request with your patch on Github.

## Seeking Assistance
If you find any problems or would like to suggest a feature, please feel free to file an issue on Github at [Issues Page](https://github.com/crowdin/crowdin-api-client-js/issues).

If you've found an error in these samples, please [contact](https://crowdin.com/contacts) our Support Team.

## License
<pre>
Copyright © 2019 Crowdin

The Crowdin JavaScript client is licensed under the MIT License. 
See the LICENSE.md file distributed with this work for additional 
information regarding copyright ownership.
</pre>
