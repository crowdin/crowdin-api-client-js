import * as nock from 'nock';
import { Credentials, Vendors } from '../../src';

describe('Vendors API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: Vendors = new Vendors(credentials);
    const id = 2;

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .persist()
            .intercept(/.*/, 'OPTIONS')
            .reply(200, (undefined as unknown) as string, {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application:json',
                'Access-Control-Allow-Headers': 'Authorization',
            })
            .get('/vendors', undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: id,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: limit,
                },
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List Vendors', async () => {
        const vendors = await api.listVendors();
        expect(vendors.data.length).toBe(1);
        expect(vendors.data[0].data.id).toBe(id);
        expect(vendors.pagination.limit).toBe(limit);
    });
});
