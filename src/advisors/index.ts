import { CrowdinApi, PaginationOptions, PatchRequest, ResponseList, ResponseObject } from '../core';

/**
 * Advisor runs inspectors against a project and surfaces insights with metrics and recommendations.
 *
 * Use the API to run advisor checks, list and manage insights, and report insights from advisor-inspector apps.
 */
export class Advisors extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/developer/api/v2/#tag/Advisor/operation/api.projects.advisors.checks.post
     */
    createAdvisorCheck(
        projectId: number,
        request: AdvisorsModel.CreateAdvisorCheckRequest = {},
    ): Promise<ResponseObject<AdvisorsModel.AdvisorCheck>> {
        const url = `${this.url}/projects/${projectId}/advisors/checks`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param checkId advisor check identifier
     * @see https://support.crowdin.com/developer/api/v2/#tag/Advisor/operation/api.projects.advisors.checks.get
     */
    getAdvisorCheckStatus(projectId: number, checkId: string): Promise<ResponseObject<AdvisorsModel.AdvisorCheck>> {
        const url = `${this.url}/projects/${projectId}/advisors/checks/${checkId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param options optional pagination and filter parameters for the request
     * @see https://support.crowdin.com/developer/api/v2/#tag/Advisor/operation/api.projects.advisors.insights.getMany
     */
    listAdvisorInsights(
        projectId: number,
        options?: AdvisorsModel.ListAdvisorInsightsOptions,
    ): Promise<ResponseList<AdvisorsModel.AdvisorInsight>> {
        let url = `${this.url}/projects/${projectId}/advisors/insights`;
        url = this.addQueryParam(
            url,
            'isDismissed',
            options?.isDismissed === undefined ? undefined : String(options.isDismissed),
        );
        url = this.addQueryParam(url, 'status', options?.status?.join(','));
        url = this.addQueryParam(url, 'outcome', options?.outcome?.join(','));
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param projectId project identifier
     * @param insightId insight identifier
     * @param request request body
     * @see https://support.crowdin.com/developer/api/v2/#tag/Advisor/operation/api.projects.advisors.insights.patch
     */
    editAdvisorInsight(
        projectId: number,
        insightId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<AdvisorsModel.AdvisorInsight>> {
        const url = `${this.url}/projects/${projectId}/advisors/insights/${insightId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param applicationIdentifier application identifier
     * @param moduleKey advisor-inspector module key
     * @param request request body
     * @see https://support.crowdin.com/developer/api/v2/#tag/Advisor/operation/api.projects.applications.modules.advisors.insights.put
     */
    createOrUpdateApplicationAdvisorInsight(
        projectId: number,
        applicationIdentifier: string,
        moduleKey: string,
        request: AdvisorsModel.ApplicationAdvisorInsightRequest,
    ): Promise<void> {
        const url = `${this.url}/projects/${projectId}/applications/${applicationIdentifier}/modules/${moduleKey}/advisors/insights`;
        return this.put(url, request, this.defaultConfig());
    }
}

export namespace AdvisorsModel {
    export type InsightOutcome = 'flagged' | 'clear' | 'not_applicable';

    export type InsightStatus = 'pending' | 'checking' | 'outdated' | 'done';

    export interface AiRunOptions {
        mode?: 'auto' | 'all';
        promptId?: number;
    }

    export interface CreateAdvisorCheckRequest {
        category?: string;
        inspectors?: {
            key: string;
            options?: AiRunOptions | null;
        }[];
    }

    export interface AdvisorCheck {
        identifier: string;
        status: string;
        progress: number;
        attributes: {
            category?: string | null;
            inspectors?: { key: string }[] | null;
        };
        createdAt: string;
        updatedAt: string;
        startedAt: string | null;
        finishedAt: string | null;
    }

    export interface ListAdvisorInsightsOptions extends PaginationOptions {
        isDismissed?: boolean;
        status?: InsightStatus[];
        outcome?: InsightOutcome[];
    }

    export interface InsightMetric {
        key: string;
        value: number;
        unit: 'percent' | 'count';
        threshold?: number | null;
        tone?: 'default' | 'success' | 'danger';
        source?: 'deterministic' | 'ai' | 'app';
        checkedAt?: string | null;
    }

    export interface InsightRecommendation {
        id: string;
        primary?: boolean;
        params?: Record<string, any>;
    }

    export interface AdvisorInsight {
        id: number;
        inspectorKey: string;
        category: string | null;
        isDismissed: boolean;
        status: InsightStatus;
        outcome: InsightOutcome | null;
        severity: 'high' | 'medium' | 'low' | null;
        refreshPolicy: 'hourly' | 'daily' | null;
        metrics: InsightMetric[] | null;
        recommendations: InsightRecommendation[] | null;
        checkedAt: string | null;
        lastAiRun: (AiRunOptions & { at: string }) | null;
        payload: Record<string, any> | null;
    }

    export interface ApplicationAdvisorInsightRequest {
        outcome: InsightOutcome;
        checkedAt?: string;
        metrics?: InsightMetric[];
        recommendations?: InsightRecommendation[];
        payload?: Record<string, any>;
    }
}
