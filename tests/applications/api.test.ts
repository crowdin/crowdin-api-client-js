import nock from 'nock';
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
    const consentsUrl = '/applications/consents';
    const consentId = 1;

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
            .delete(installUrl + `/${applicationId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .query({ force: 'true' })
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
            .reply(200)
            .get(consentsUrl, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .post(
                consentsUrl,
                { identifier: 'test-app', installedBy: 2, status: 'granted' },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(201)
            .patch(`${consentsUrl}/${consentId}`, [{ op: 'replace', path: '/status', value: 'denied' }], {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .delete(`${consentsUrl}/${consentId}`, undefined, {
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
        await api.installApplication({
            url: 'https://localhost.dev/crowdin.json',
        });
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

    it('Delete Application Installation with force', async () => {
        await api.deleteApplicationInstallation(applicationId, true);
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

    it('List Application Consent Decisions', async () => {
        await api.listApplicationConsentDecisions();
    });

    it('Create Application Consent Decision', async () => {
        await api.createApplicationConsentDecision({
            identifier: 'test-app',
            installedBy: 2,
            status: 'granted',
        });
    });

    it('Edit Application Consent Decision', async () => {
        await api.editApplicationConsentDecision(consentId, [{ op: 'replace', path: '/status', value: 'denied' }]);
    });

    it('Delete Application Consent Decision', async () => {
        await api.deleteApplicationConsentDecision(consentId);
    });
});
