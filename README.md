# Node SDK for Crowdin API v2

Node.js client for integration with Crowdin API v2.

For more about Crowdin API v2 see [Crowdin API](https://support.crowdin.com/enterprise/api/)

## Installation

```
npm install ...
```

## Usage

<details>
<summary>Typescript</summary>
```typescript
import crowdin, { Credentials } from "crowdin-sdk-2";

// credentials
const credentials: Credentials = {
token: "testToken",
organization: "organizationName"
};

// initialization of crowdin client
const { projectsGroupsApi } = new crowdin(credentials);

// get project list
const projects = await projectsGroupsApi.listProjects();

````

Or specific API instances:

```typescript
import { Credentials, ProjectsGroups } from "crowdin-sdk-2";

// credentials
const credentials: Credentials = {
  token: "testToken",
  organization: "organizationName"
};

// initialization of ProjectsGroups
const projectsGroupsApi = new ProjectsGroups.Api(credentials);

// get project list
const projects = await projectsGroupsApi.listProjects();
````

</details>

<details>
<summary>Javascript</summary>

```javascript
import crowdin from "crowdin-sdk-2";

// initialization of crowdin client
const { projectsGroupsApi } = new crowdin({
  token: "testToken",
  organization: "organizationName"
});

// get project list
const projects = await projectsGroupsApi.listProjects();
```

Or specific API instances:

```javascript
import { ProjectsGroups } from "crowdin-sdk-2";

// initialization of ProjectsGroups
const projectsGroupsApi = new ProjectsGroups.Api({
  token: "testToken",
  organization: "organizationName"
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
const projectsGroupsApi = new crowdin.ProjectsGroups.Api(credentials, {
  httpClientType: crowdin.HttpClientType.FETCH
});

const projects = await projectsGroupsApi.listProjects();
```

Or even pass your own http client as `httpClient` property which should implement `crowdin.HttpClient` interface.

## Contributing

1. Fork it
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Added some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request
