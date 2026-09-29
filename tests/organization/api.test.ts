import nock from 'nock';
import { Credentials, Organization } from '../../src/index';

describe('Organization API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: Organization = new Organization(credentials);
    const organizationId = 2;

    beforeAll(() => {
        scope = nock(api.url)
            .get('/organization', undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: organizationId,
                },
            })
            .get('/organization/auth-settings', undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    allowSignUp: true,
                },
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('Get organization', async () => {
        const organization = await api.getOrganization();
        expect(organization.data.id).toBe(organizationId);
    });

    it('Get organization auth settings', async () => {
        const settings = await api.getOrganizationAuthSettings();
        expect(settings.data.allowSignUp).toBe(true);
    });
});
