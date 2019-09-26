[<p align='center'><img src='https://support.crowdin.com/assets/logos/crowdin-dark-symbol.png' data-canonical-src='https://support.crowdin.com/assets/logos/crowdin-dark-symbol.png' width='200' height='200' align='center'/></p>](https://crowdin.com)

# Crowdin JavaScript client

The Crowdin JavaScript client is a lightweight interface to the Crowdin API v2 that works in any JavaScript environment, including web browsers, workers in web browsers, extensions in web browsers or desktop applications, Node.js etc. It provides common services for making API requests.

For more about Crowdin API v2 see [Crowdin API v2](https://support.crowdin.com/enterprise/api/) documentation.


## Table of Contents
* [Dependencies](#dependencies)
* [Installation](#installation)
* [Quick Start](#quick-start)
* [Contribution](#contribution)
* [Seeking Assistance](#seeking-assistance)
* [License](#license)

## Dependencies
* Axios 0.19

## Installation
npm [TBA]

## Quick Start

<details>
<summary>Typescript</summary>

```typescript
import crowdin, { Credentials } from 'crowdin-api-client';

// credentials
const credentials: Credentials = {
  token: 'testToken',
  organization: 'organizationName'
};

// initialization of crowdin client
const { projectsGroupsApi } = new crowdin(credentials);

// get project list
const projects = await projectsGroupsApi.listProjects();
```

Or specific API instances:

```typescript
import { Credentials, ProjectsGroups } from 'crowdin-api-client';

// credentials
const credentials: Credentials = {
  token: 'testToken',
  organization: 'organizationName'
};

// initialization of ProjectsGroups
const projectsGroupsApi = new ProjectsGroups(credentials);

// get project list
const projects = await projectsGroupsApi.listProjects();
```

</details>

<details>
<summary>Javascript</summary>

```javascript
import crowdin from 'crowdin-api-client';

// initialization of crowdin client
const { projectsGroupsApi } = new crowdin({
  token: 'testToken',
  organization: 'organizationName'
});

// get project list
const projects = await projectsGroupsApi.listProjects();
```

Or specific API instances:

```javascript
import { ProjectsGroups } from 'crowdin-api-client';

// initialization of ProjectsGroups
const projectsGroupsApi = new ProjectsGroups({
  token: 'testToken',
  organization: 'organizationName'
});

// get project list
const projects = await projectsGroupsApi.listProjects();
```

</details>

### List of projects with Fetch API

In addition if you use client in non-Node.js environment you might have a troubles with http calls.
This client uses [axios](https://github.com/axios/axios) which internally uses `http` and `https` Node modules.
So there is an option to use http client based on [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

```typescript
import { ProjectsGroups, HttpClientType } from 'crowdin-api-client';

const projectsGroupsApi = new ProjectsGroups(credentials, {
  httpClientType: HttpClientType.FETCH
});

const projects = await projectsGroupsApi.listProjects();
```

Or even pass your own http client as `httpClient` property which should implement `HttpClient` interface.

## Contribution
We are happy to accept contributions to the Crowdin JavaScript client. To contribute please do the following:
1. Fork the repository on GitHub.
2. Decide which code you want to submit. Commit your changes and push to the new branch.
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
