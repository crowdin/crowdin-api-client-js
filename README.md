# Node SDK for Crowdin API v2

Node.js client for integration with Crowdin API v2.

For more about Crowdin API v2 see [Crowdin API](https://support.crowdin.com/enterprise/api/)

## Installation

## Usage

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

### List of projects with Fetch API

In addition if you use client in non-Node.js environment you might have a troubles with http calls.
This client uses [axios](https://github.com/axios/axios) which internally uses `http` and `https` Node modules.
So there is an option to use http client based on [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

```typescript
const projectsGroupsApi = new crowdin.ProjectsGroups.Api(credentials, {
    httpClient: crowdin.HttpClientType.FETCH
});

const projects = await projectsGroupsApi.listProjects();
```

## Contributing

1. Fork it
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Added some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request
