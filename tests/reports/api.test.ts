import * as nock from 'nock';
import * as crowdin from '../../src/index';

describe('Reports API', () => {

    let scope: nock.Scope;
    const credentials: crowdin.Credentials = {
        login: 'testUser',
        accountKey: 'qwerty',
        organization: 'testOrg'
    };
    const api: crowdin.Reports.Api = new crowdin.Reports.Api(credentials);
    const projectId = 2;
    const reportId = '123';
    const reportName = 'testReport';
    const downloadLink = 'test.com';
    const schema: crowdin.Reports.Model.Schema = {
        description: 'test0',
        name: 'test1',
        type: 'test2'
    };

    const limit = 25;

    beforeAll(() => {
        scope = nock(api.url)
            .get(`/projects/${projectId}/supported-reports`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: [{
                    data: {
                        name: reportName
                    }
                }],
                pagination: {
                    offset: 0,
                    limit: limit
                }
            })
            .post(`/projects/${projectId}/reports`, {
                name: reportName,
                schema: schema
            })
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    name: reportName,
                    reportId: reportId
                }
            })
            .get(`/projects/${projectId}/reports/${reportId}/download`)
            .query({
                'account-key': api.accountKey,
                login: api.login
            })
            .reply(200, {
                data: {
                    url: downloadLink
                }
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('List supported reports', async () => {
        const reports = await api.listSupportedReports(projectId);
        expect(reports.data.length).toBe(1);
        expect(reports.data[0].data.name).toBe(reportName);
        expect(reports.pagination.limit).toBe(limit);
    });

    it('Generate a report', async () => {
        const report = await api.generateReport(projectId, {
            name: reportName,
            schema: schema
        });
        expect(report.data.reportId).toBe(reportId);
        expect(report.data.name).toBe(reportName);
    });

    it('Export project report raw', async () => {
        const downloadUrl = await api.exportProjectReportRaw(projectId, reportId);
        expect(downloadUrl.data.url).toBe(downloadLink);
    });
});