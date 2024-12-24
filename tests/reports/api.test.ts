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
    const reportName = 'top-members';
    const downloadLink = 'test.com';
    const schema: ReportsModel.TopMembersSchema = {
        unit: 'chars',
        format: 'csv',
        languageId: 'fr',
    };
    const groupSchema: ReportsModel.GroupTopMembersSchema = {
        format: 'json',
        projectIds: [projectId],
    };
    const reportSettingsTemplateId = 234;
    const currency: ReportsModel.Currency = 'USD';
    const unit: ReportsModel.Unit = 'words';
    const config: ReportsModel.ReportSettinsConfig = {
        individualRates: [],
        baseRates: { fullTranslation: 0, proofread: 0 },
        netRateSchemes: [],
    };
    const isPublic = false;
    const userId = 123;
    const archiveId = 456;
    const exportId = 'qweds12';

    beforeAll(() => {
        scope = nock(api.url)
            .get('/reports/archives', undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: archiveId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: 1,
                },
            })
            .get(`/reports/archives/${archiveId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: archiveId,
                },
            })
            .delete(`/reports/archives/${archiveId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .post(
                `/reports/archives/${archiveId}/exports`,
                {},
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    identifier: exportId,
                },
            })
            .get(`/reports/archives/${archiveId}/exports/${exportId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    identifier: exportId,
                },
            })
            .get(`/reports/archives/${archiveId}/exports/${exportId}/download`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    url: downloadLink,
                },
            })
            .get(`/users/${userId}/reports/archives`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: [
                    {
                        data: {
                            id: archiveId,
                        },
                    },
                ],
                pagination: {
                    offset: 0,
                    limit: 1,
                },
            })
            .get(`/users/${userId}/reports/archives/${archiveId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    id: archiveId,
                },
            })
            .delete(`/users/${userId}/reports/archives/${archiveId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
            .post(
                `/users/${userId}/reports/archives/${archiveId}/exports`,
                {},
                {
                    reqheaders: {
                        Authorization: `Bearer ${api.token}`,
                    },
                },
            )
            .reply(200, {
                data: {
                    identifier: exportId,
                },
            })
            .get(`/users/${userId}/reports/archives/${archiveId}/exports/${exportId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200, {
                data: {
                    identifier: exportId,
                },
            })
            .get(`/users/${userId}/reports/archives/${archiveId}/exports/${exportId}/download`, undefined, {
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
            .get('/reports/settings-templates', undefined, {
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
                '/reports/settings-templates',
                {
                    name: reportName,
                    currency,
                    unit,
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
            .get(`/reports/settings-templates/${reportSettingsTemplateId}`, undefined, {
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
                `/reports/settings-templates/${reportSettingsTemplateId}`,
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
            .delete(`/reports/settings-templates/${reportSettingsTemplateId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200)
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
                    config,
                    isPublic,
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
            .reply(200)
            .get(`/users/${userId}/reports/settings-templates`, undefined, {
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
                `/users/${userId}/reports/settings-templates`,
                {
                    name: reportName,
                    currency,
                    unit,
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
            .get(`/users/${userId}/reports/settings-templates/${reportSettingsTemplateId}`, undefined, {
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
                `/users/${userId}/reports/settings-templates/${reportSettingsTemplateId}`,
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
            .delete(`/users/${userId}/reports/settings-templates/${reportSettingsTemplateId}`, undefined, {
                reqheaders: {
                    Authorization: `Bearer ${api.token}`,
                },
            })
            .reply(200);
    });

    afterAll(() => {
        scope.done();
    });

    it('List Organization Report Archives', async () => {
        const archives = await api.listOrganizationReportArchives();
        expect(archives.data.length).toBe(1);
        expect(archives.data[0].data.id).toBe(archiveId);
        expect(archives.pagination.limit).toBe(1);
    });

    it('Get Organization Report Archive', async () => {
        const archive = await api.getOrganizationReportArchive(archiveId);
        expect(archive.data.id).toBe(archiveId);
    });

    it('Delete Organization Report Archive', async () => {
        await api.deleteOrganizationReportArchive(archiveId);
    });

    it('Export Organization Report Archive', async () => {
        const status = await api.exportOrganizationReportArchive(archiveId);
        expect(status.data.identifier).toBe(exportId);
    });

    it('Check Organization Report Archive Export Status', async () => {
        const status = await api.checkOrganizationReportArchiveStatus(archiveId, exportId);
        expect(status.data.identifier).toBe(exportId);
    });

    it('Download Organization Report Archive', async () => {
        const link = await api.downloadOrganizationReportArchive(archiveId, exportId);
        expect(link.data.url).toBe(downloadLink);
    });

    it('List User Report Archives', async () => {
        const archives = await api.listUserReportArchives(userId);
        expect(archives.data.length).toBe(1);
        expect(archives.data[0].data.id).toBe(archiveId);
        expect(archives.pagination.limit).toBe(1);
    });

    it('Get User Report Archive', async () => {
        const archive = await api.getUserReportArchive(userId, archiveId);
        expect(archive.data.id).toBe(archiveId);
    });

    it('Delete User Report Archive', async () => {
        await api.deleteUserReportArchive(userId, archiveId);
    });

    it('Export User Report Archive', async () => {
        const status = await api.exportUserReportArchive(userId, archiveId);
        expect(status.data.identifier).toBe(exportId);
    });

    it('Check User Report Archive Export Status', async () => {
        const status = await api.checkUserReportArchiveStatus(userId, archiveId, exportId);
        expect(status.data.identifier).toBe(exportId);
    });

    it('Download User Report Archive', async () => {
        const link = await api.downloadUserReportArchive(userId, archiveId, exportId);
        expect(link.data.url).toBe(downloadLink);
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

    it('List Organization Report Settings Templates', async () => {
        const templates = await api.listOrganizationReportSettingsTemplates();
        expect(templates.data.length).toBe(1);
        expect(templates.data[0].data.id).toBe(reportSettingsTemplateId);
        expect(templates.pagination.limit).toBe(1);
    });

    it('Add Organization Report Settings Template', async () => {
        const template = await api.addOrganizationReportSettingsTemplate({
            config,
            currency,
            name: reportName,
            unit,
        });
        expect(template.data.id).toBe(reportSettingsTemplateId);
    });

    it('Get Organization Report Settings Template', async () => {
        const template = await api.getOrganizationReportSettingsTemplate(reportSettingsTemplateId);
        expect(template.data.id).toBe(reportSettingsTemplateId);
    });

    it('Edit Organization Report Settings Template', async () => {
        const template = await api.editOrganizationReportSettingsTemplate(reportSettingsTemplateId, [
            {
                op: 'replace',
                path: '/name',
                value: reportName,
            },
        ]);
        expect(template.data.id).toBe(reportSettingsTemplateId);
    });

    it('Delete Organization Report Settings Template', async () => {
        await api.deleteOrganizationReportSettingsTemplate(reportSettingsTemplateId);
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
            name: reportName,
            unit,
            isPublic,
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

    it('List User Report Settings Templates', async () => {
        const templates = await api.listUserReportSettingsTemplates(userId);
        expect(templates.data.length).toBe(1);
        expect(templates.data[0].data.id).toBe(reportSettingsTemplateId);
        expect(templates.pagination.limit).toBe(1);
    });

    it('Add User Report Settings Template', async () => {
        const template = await api.addUserReportSettingsTemplate(userId, {
            config,
            currency,
            name: reportName,
            unit,
        });
        expect(template.data.id).toBe(reportSettingsTemplateId);
    });

    it('Get User Report Settings Template', async () => {
        const template = await api.getUserReportSettingsTemplate(userId, reportSettingsTemplateId);
        expect(template.data.id).toBe(reportSettingsTemplateId);
    });

    it('Edit User Report Settings Template', async () => {
        const template = await api.editUserReportSettingsTemplate(userId, reportSettingsTemplateId, [
            {
                op: 'replace',
                path: '/name',
                value: reportName,
            },
        ]);
        expect(template.data.id).toBe(reportSettingsTemplateId);
    });

    it('Delete User Report Settings Template', async () => {
        await api.deleteUserReportSettingsTemplate(userId, reportSettingsTemplateId);
    });
});
