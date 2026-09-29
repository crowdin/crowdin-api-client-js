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
    const kvUrl = `/applications/${applicationId}/storage/kv/records`;
    const recordKey = 'user:1';
    const storageId = 5;
    const manifestHash = 'abc123';

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
            .reply(200)
            .get(installUrl, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .query({ installedBy: 2, orderBy: 'createdAt' })
            .reply(200)
            .get(`${installUrl}/${applicationId}/update`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, { data: { manifestHash, hasChanges: true } })
            .post(
                `${installUrl}/${applicationId}/update`,
                { manifestHash },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, { data: { identifier: applicationId } })
            .post(
                `${installUrl}/${applicationId}/bundles`,
                { storageId },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(201, { data: { identifier: applicationId } })
            .get(kvUrl, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .query({ prefix: 'user', orderBy: 'key' })
            .reply(200, { data: [{ data: { key: recordKey } }], pagination: { offset: 0, limit: 25 } })
            .post(
                kvUrl,
                { key: recordKey, value: { a: 1 }, ttl: 60 },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(201, { data: { key: recordKey } })
            .get(`${kvUrl}/${encodeURIComponent(recordKey)}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, { data: { key: recordKey } })
            .patch(`${kvUrl}/${encodeURIComponent(recordKey)}`, [{ op: 'replace', path: '/value', value: 'b' }], {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, { data: { key: recordKey } })
            .delete(`${kvUrl}/${encodeURIComponent(recordKey)}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(204);
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

    it('List Application Installations with filters', async () => {
        await api.listApplicationInstallations({ installedBy: 2, orderBy: 'createdAt' });
    });

    it('Get Application Installation Update', async () => {
        const res = await api.getApplicationInstallationUpdate(applicationId);
        expect(res.data.manifestHash).toBe(manifestHash);
    });

    it('Apply Application Installation Update', async () => {
        const res = await api.applyApplicationInstallationUpdate(applicationId, { manifestHash });
        expect(res.data.identifier).toBe(applicationId);
    });

    it('Upload Application Bundle', async () => {
        const res = await api.uploadApplicationBundle(applicationId, { storageId });
        expect(res.data.identifier).toBe(applicationId);
    });

    it('List Application Storage Records', async () => {
        const res = await api.listApplicationStorageRecords(applicationId, { prefix: 'user', orderBy: 'key' });
        expect(res.data.length).toBe(1);
        expect(res.data[0].data.key).toBe(recordKey);
    });

    it('Add Application Storage Record', async () => {
        const res = await api.addApplicationStorageRecord(applicationId, { key: recordKey, value: { a: 1 }, ttl: 60 });
        expect(res.data.key).toBe(recordKey);
    });

    it('Get Application Storage Record', async () => {
        const res = await api.getApplicationStorageRecord(applicationId, recordKey);
        expect(res.data.key).toBe(recordKey);
    });

    it('Edit Application Storage Record', async () => {
        const res = await api.editApplicationStorageRecord(applicationId, recordKey, [
            { op: 'replace', path: '/value', value: 'b' },
        ]);
        expect(res.data.key).toBe(recordKey);
    });

    it('Delete Application Storage Record', async () => {
        await api.deleteApplicationStorageRecord(applicationId, recordKey);
    });
});
