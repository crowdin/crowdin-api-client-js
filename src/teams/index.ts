import {
    CrowdinApi,
    isOptionalNumber,
    Pagination,
    PaginationOptions,
    PatchRequest,
    ProjectRole,
    ProjectRoles,
    ResponseList,
    ResponseObject,
} from '../core';
import { ProjectsGroupsModel } from '../projectsGroups';

export class Teams extends CrowdinApi {
    /**
     * @param groupId group identifier
     * @param options request options
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/Teams/operation/api.groups.teams.getMany
     */
    listGroupTeams(
        groupId: number,
        options?: TeamsModel.ListGroupTeamsOptions,
    ): Promise<ResponseList<TeamsModel.TeamGroup>> {
        let url = `${this.url}/groups/${groupId}/teams`;
        url = this.addQueryParam(url, 'orderBy', options?.orderBy);
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param groupId group identifier
     * @param request request body
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/Teams/operation/api.groups.teams.patch
     */
    updateGroupTeams(groupId: number, request: PatchRequest[]): Promise<ResponseList<TeamsModel.TeamGroup>> {
        const url = `${this.url}/groups/${groupId}/teams`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param groupId group identifier
     * @param teamId team identifier
     * @see https://support.crowdin.com/developer/enterprise/api/v2/#tag/Teams/operation/api.groups.teams.get
     */
    getGroupTeam(groupId: number, teamId: number): Promise<ResponseObject<TeamsModel.TeamGroup>> {
        const url = `${this.url}/groups/${groupId}/teams/${teamId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param teamId team identifier
     * @param options request options
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.teams.projects.permissions.getMany
     */
    listTeamProjectPermissions(
        teamId: number,
        options?: PaginationOptions,
    ): Promise<ResponseList<TeamsModel.ProjectPermissions>> {
        const url = `${this.url}/teams/${teamId}/projects/permissions`;
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param teamId team identifier
     * @param request request body
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.teams.projects.permissions.patch
     */
    editTeamProjectPermissions(
        teamId: number,
        request: PatchRequest[],
    ): Promise<ResponseList<TeamsModel.ProjectPermissions>> {
        const url = `${this.url}/teams/${teamId}/projects/permissions`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/enterprise/api/#operation/api.projects.teams.post
     */
    addTeamToProject(
        projectId: number,
        request: TeamsModel.AddTeamToProjectRequest,
    ): Promise<TeamsModel.ProjectTeamResources> {
        const url = `${this.url}/projects/${projectId}/teams`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param options optional pagination parameters for the request
     * @see https://support.crowdin.com/enterprise/api/#operation/api.teams.getMany
     */
    listTeams(options?: TeamsModel.ListTeamsOptions): Promise<ResponseList<TeamsModel.Team>>;
    /**
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @deprecated optional parameters should be passed through an object
     * @see https://support.crowdin.com/enterprise/api/#operation/api.teams.getMany
     */
    listTeams(limit?: number, offset?: number): Promise<ResponseList<TeamsModel.Team>>;
    listTeams(
        options?: number | ({ orderBy?: string } & TeamsModel.ListTeamsOptions),
        deprecatedOffset?: number,
    ): Promise<ResponseList<TeamsModel.Team>> {
        if (isOptionalNumber(options, '0' in arguments)) {
            options = { limit: options, offset: deprecatedOffset };
        }
        let url = `${this.url}/teams`;
        url = this.addQueryParam(url, 'orderBy', options.orderBy);
        url = this.addQueryParam(url, 'search', options?.search);
        url = this.addQueryParam(url, 'projectIds', options?.projectIds);
        url = this.addQueryParam(url, 'projectRoles', options?.projectRoles?.toString());
        url = this.addQueryParam(url, 'languageIds', options?.languageIds);
        url = this.addQueryParam(url, 'groupIds', options?.groupIds);
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param request request body
     * @see https://support.crowdin.com/enterprise/api/#operation/api.teams.post
     */
    addTeam(request: TeamsModel.AddTeamRequest): Promise<ResponseObject<TeamsModel.Team>> {
        const url = `${this.url}/teams`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param teamId team identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.teams.get
     */
    getTeam(teamId: number): Promise<ResponseObject<TeamsModel.Team>> {
        const url = `${this.url}/teams/${teamId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param teamId team identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.teams.delete
     */
    deleteTeam(teamId: number): Promise<void> {
        const url = `${this.url}/teams/${teamId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param teamId team identifier
     * @param request request body
     * @see https://support.crowdin.com/enterprise/api/#operation/api.teams.patch
     */
    editTeam(teamId: number, request: PatchRequest[]): Promise<ResponseObject<TeamsModel.Team>> {
        const url = `${this.url}/teams/${teamId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param teamId team identifier
     * @param options optional pagination parameters for the request
     * @see https://support.crowdin.com/enterprise/api/#operation/api.teams.members.getMany
     */
    teamMembersList(teamId: number, options?: PaginationOptions): Promise<ResponseList<TeamsModel.TeamMember>>;
    /**
     * @param teamId team identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @deprecated optional parameters should be passed through an object
     * @see https://support.crowdin.com/enterprise/api/#operation/api.teams.members.getMany
     */
    teamMembersList(teamId: number, limit?: number, offset?: number): Promise<ResponseList<TeamsModel.TeamMember>>;
    teamMembersList(
        teamId: number,
        options?: number | PaginationOptions,
        deprecatedOffset?: number,
    ): Promise<ResponseList<TeamsModel.TeamMember>> {
        if (isOptionalNumber(options, '1' in arguments)) {
            options = { limit: options, offset: deprecatedOffset };
        }
        const url = `${this.url}/teams/${teamId}/members`;
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param teamId team identifier
     * @param request request body
     * @see https://support.crowdin.com/enterprise/api/#operation/api.teams.members.post
     */
    addTeamMembers(
        teamId: number,
        request: TeamsModel.AddTeamMembersRequest,
    ): Promise<TeamsModel.AddTeamMembersResponse> {
        const url = `${this.url}/teams/${teamId}/members`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param teamId team identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.teams.members.deleteMany
     */
    deleteAllTeamMembers(teamId: number): Promise<void> {
        const url = `${this.url}/teams/${teamId}/members`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param teamId team identifier
     * @param memberId member identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.teams.members.delete
     */
    deleteTeamMember(teamId: number, memberId: number): Promise<void> {
        const url = `${this.url}/teams/${teamId}/members/${memberId}`;
        return this.delete(url, this.defaultConfig());
    }
}

export namespace TeamsModel {
    export interface ListGroupTeamsOptions {
        orderBy?: string;
    }

    export interface ProjectPermissions {
        id: number;
        roles: ProjectRole[];
        project: ProjectsGroupsModel.Project | ProjectsGroupsModel.ProjectSettings;
    }

    export interface AddTeamToProjectRequest {
        teamId: number;
        managerAccess?: boolean;
        developerAccess?: boolean;
        roles?: ProjectRole[];
        /**
         * @deprecated
         */
        accessToAllWorkflowSteps?: boolean;
        /**
         * @deprecated
         */
        permissions?: Permissions;
    }

    export interface ListTeamsOptions extends PaginationOptions {
        search?: string;
        projectIds?: string;
        projectRoles?: ProjectRoles[];
        languageIds?: string;
        groupIds?: string;
        orderBy?: string;
    }

    export interface ProjectTeamResources {
        skipped: ProjectTeamResource;
        added: ProjectTeamResource;
    }

    export interface ProjectTeamResource {
        id: number;
        hasManagerAccess: boolean;
        hasDeveloperAccess: boolean;
        /**
         * @deprecated
         */
        hasAccessToAllWorkflowSteps: boolean;
        /**
         * @deprecated
         */
        permissions: Permissions;
        roles: ProjectRole[];
    }

    export interface Permissions {
        [lang: string]: { workflowStepIds: number[] | 'all' };
    }

    export interface Team {
        id: number;
        name: string;
        totalMembers: number;
        webUrl: string;
        createdAt: string;
        updatedAt: string;
    }

    export interface TeamGroup {
        id: number;
        team: Team;
    }

    export interface AddTeamRequest {
        name: string;
    }

    export interface TeamMember {
        id: number;
        username: string;
        firstName: string;
        lastName: string;
        avatarUrl: string;
        addedAt: string;
    }

    export interface AddTeamMembersRequest {
        userIds: number[];
    }

    export interface AddTeamMembersResponse {
        skipped: ResponseObject<TeamMember>[];
        added: ResponseObject<TeamMember>[];
        pagination: Pagination;
    }
}
