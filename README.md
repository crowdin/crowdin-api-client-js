# Node SDK for Crowdin API v2

Node.js client for integration with Crowdin API v2.

For more about Crowdin API v2 see [Crowdin API](https://support.crowdin.com/enterprise/api/)

## Installation

`npm install crowdin-sdk-2`

## Usage

Start using client by creating `Credentials` object:

```typescript
import * as crowdin from 'crowdin-node-sdk-2';

const credentials: crowdin.Credentials = {
    login: 'yourLogin',
    accountKey: 'yourAccountKey',
    organization: 'organizationName'
};
```

Later on this object will be used to initialize specific API class.

### List of projects

```typescript
const projectsGroupsApi = new crowdin.ProjectsGroups.Api(credentials);

const projects = await projectsGroupsApi.listProjects();
```

## Contributing

1. Fork it
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Added some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request
