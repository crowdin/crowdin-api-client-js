import * as nock from 'nock';
import { Credentials, Reports, ReportsModel } from '../../src';

describe('Reports API', () => {
    let scope: nock.Scope;
    const credentials: Credentials = {
        token: 'testToken',
        organization: 'testOrg',
    };
    const api: Reports = new Reports(credentials);
    const projectId = 2;
    const reportId = '123';
    const reportName = 'testReport';
    const downloadLink = 'test.com';
    const schema: ReportsModel.TopMembersSchema = {
        unit: ReportsModel.Unit.CHARS,
        format: ReportsModel.Format.CSV,
        languageId: 'fr',
    };

    beforeAll(() => {
        scope = nock(api.url)
            .post(
                `/projects/${projectId}/reports`,
                {
                    name: reportName,
                    schema: schema,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    name: reportName,
                    reportId: reportId,
                },
            })
            .get(`/projects/${projectId}/reports/${reportId}/download`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    url: downloadLink,
                },
            });
    });

    afterAll(() => {
        scope.done();
    });

    it('Generate a report', async () => {
        const report = await api.generateReport(projectId, {
            name: reportName,
            schema: schema,
        });
        expect(report.data.reportId).toBe(reportId);
        expect(report.data.name).toBe(reportName);
    });

    it('Download report', async () => {
        const downloadUrl = await api.downloadReport(projectId, reportId);
        expect(downloadUrl.data.url).toBe(downloadLink);
    });
});
