import * as nock from 'nock';
import { Credentials, Applications } from '../../src';

describe('Applications API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: Applications = new Applications(credentials);
    const applicationId = 'abc';
    const path = 'test';
    const url = `/applications/${applicationId}/api/${path}`;
    const installUrl = '/applications/installations';

    beforeAll(() => {
        scope = nock(api.url)
            .post(installUrl, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .get(installUrl + `/${applicationId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .get(installUrl, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .patch(
                installUrl + `/${applicationId}`,
                [
                    {
                        op: 'replace',
                        path: '/permissions',
                    },
                ],
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200)
            .delete(installUrl + `/${applicationId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .post(
                url,
                {},
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200)
            .get(url, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .put(
                url,
                { key1: 1 },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200)
            .patch(
                url,
                { key2: 2 },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200)
            .delete(url, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200);
    });

    afterAll(() => {
        scope.done();
    });

    it('List Application Installations', async () => {
        await api.listApplicationInstallations();
    });

    it('Install Application', async () => {
        await api.installApplication('https://localhost.dev/crowdin.json');
    });

    it('Get Application Installation', async () => {
        await api.getApplicationInstallation(applicationId);
    });

    it('Edit Application Installation', async () => {
        await api.editApplicationInstallation(applicationId, [
            {
                op: 'replace',
                path: '/permissions',
            },
        ]);
    });

    it('Delete Application Installation', async () => {
        await api.deleteApplicationInstallation(applicationId);
    });

    it('Add Application Data', async () => {
        await api.addApplicationData(applicationId, path, {});
    });

    it('Get Application Data', async () => {
        await api.getApplicationData(applicationId, path);
    });

    it('Update or Restore Application Data', async () => {
        await api.updateOrRestoreApplicationData(applicationId, path, { key1: 1 });
    });

    it('Edit Application Data', async () => {
        await api.editApplicationData(applicationId, path, { key2: 2 });
    });

    it('Delete Application Data', async () => {
        await api.deleteApplicationData(applicationId, path);
    });
});
