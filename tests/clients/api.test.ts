import * as nock from 'nock';
import { Clients, Credentials } from '../../src';

describe('Clients API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: Clients = new Clients(credentials);
    const id = 2;

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get('/clients', undefined, {
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

    it('List Clients', async () => {
        const clients = await api.listClients();
        expect(clients.data.length).toBe(1);
        expect(clients.data[0].data.id).toBe(id);
        expect(clients.pagination.limit).toBe(limit);
    });
});
