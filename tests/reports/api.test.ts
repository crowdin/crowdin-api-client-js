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
    const groupId = 23;
    const reportId = '123';
    const reportName = 'testReport';
    const downloadLink = 'test.com';
    const schema: ReportsModel.TopMembersSchema = {
        unit: 'chars',
        format: 'csv',
        languageId: 'fr',
    };
    const groupSchema: ReportsModel.GroupTopMembersSchema = {
        format: 'json',
        groupBy: 'language',
        projectIds: [projectId],
    };
    const reportSettingsTemplateId = 234;
    const currency: ReportsModel.Currency = 'USD';
    const unit: ReportsModel.Unit = 'words';
    const config: ReportsModel.ReportSettinsConfig = {
        individualRates: [],
        regularRates: [],
    };

    beforeAll(() => {
        scope = nock(api.url)
            .post(
                `/groups/${groupId}/reports`,
                {
                    name: reportName,
                    schema: groupSchema,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    identifier: reportId,
                },
            })
            .get(`/groups/${groupId}/reports/${reportId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    identifier: reportId,
                },
            })
            .get(`/groups/${groupId}/reports/${reportId}/download`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    url: downloadLink,
                },
            })
            .post(
                '/reports',
                {
                    name: reportName,
                    schema: groupSchema,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    identifier: reportId,
                },
            })
            .get(`/reports/${reportId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    identifier: reportId,
                },
            })
            .get(`/reports/${reportId}/download`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    url: downloadLink,
                },
            })
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
                    identifier: reportId,
                },
            })
            .get(`/projects/${projectId}/reports/${reportId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    identifier: reportId,
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
            })
            .get(`/projects/${projectId}/reports/settings-templates`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: reportSettingsTemplateId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: 1,
                },
            })
            .post(
                `/projects/${projectId}/reports/settings-templates`,
                {
                    name: reportName,
                    currency,
                    unit,
                    mode: 'simple',
                    config,
                },
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: reportSettingsTemplateId,
                },
            })
            .get(`/projects/${projectId}/reports/settings-templates/${reportSettingsTemplateId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: reportSettingsTemplateId,
                },
            })
            .patch(
                `/projects/${projectId}/reports/settings-templates/${reportSettingsTemplateId}`,
                [
                    {
                        value: reportName,
                        op: 'replace',
                        path: '/name',
                    },
                ],
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    id: reportSettingsTemplateId,
                },
            })
            .delete(`/projects/${projectId}/reports/settings-templates/${reportSettingsTemplateId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200);
    });

    afterAll(() => {
        scope.done();
    });

    it('Generate Group Report', async () => {
        const report = await api.generateGroupReport(groupId, {
            name: reportName,
            schema: groupSchema,
        });
        expect(report.data.identifier).toBe(reportId);
    });

    it('Check Group Report Generation Status', async () => {
        const report = await api.checkGroupReportStatus(groupId, reportId);
        expect(report.data.identifier).toBe(reportId);
    });

    it('Download Group Report', async () => {
        const downloadUrl = await api.downloadGroupReport(groupId, reportId);
        expect(downloadUrl.data.url).toBe(downloadLink);
    });

    it('Generate Organization Report', async () => {
        const report = await api.generateOrganizationReport({
            name: reportName,
            schema: groupSchema,
        });
        expect(report.data.identifier).toBe(reportId);
    });

    it('Check Organization Report Generation Status', async () => {
        const report = await api.checkOrganizationReportStatus(reportId);
        expect(report.data.identifier).toBe(reportId);
    });

    it('Download Organization Report', async () => {
        const downloadUrl = await api.downloadOrganizationReport(reportId);
        expect(downloadUrl.data.url).toBe(downloadLink);
    });

    it('Generate Report', async () => {
        const report = await api.generateReport(projectId, {
            name: reportName,
            schema: schema,
        });
        expect(report.data.identifier).toBe(reportId);
    });

    it('Check Report Generation Status', async () => {
        const report = await api.checkReportStatus(projectId, reportId);
        expect(report.data.identifier).toBe(reportId);
    });

    it('Download Report', async () => {
        const downloadUrl = await api.downloadReport(projectId, reportId);
        expect(downloadUrl.data.url).toBe(downloadLink);
    });

    it('List Report Settings Templates', async () => {
        const templates = await api.listReportSettingsTemplates(projectId);
        expect(templates.data.length).toBe(1);
        expect(templates.data[0].data.id).toBe(reportSettingsTemplateId);
        expect(templates.pagination.limit).toBe(1);
    });

    it('Add Report Settings Template', async () => {
        const template = await api.addReportSettingsTemplate(projectId, {
            config,
            currency,
            mode: 'simple',
            name: reportName,
            unit,
        });
        expect(template.data.id).toBe(reportSettingsTemplateId);
    });

    it('Get Report Settings Template', async () => {
        const template = await api.getReportSettingsTemplate(projectId, reportSettingsTemplateId);
        expect(template.data.id).toBe(reportSettingsTemplateId);
    });

    it('Edit Report Settings Template', async () => {
        const template = await api.editReportSettingsTemplate(projectId, reportSettingsTemplateId, [
            {
                op: 'replace',
                path: '/name',
                value: reportName,
            },
        ]);
        expect(template.data.id).toBe(reportSettingsTemplateId);
    });

    it('Delete Report Settings Template', async () => {
        await api.deleteReportSettingsTemplate(projectId, reportSettingsTemplateId);
    });
});
