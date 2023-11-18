import {
    CrowdinApi,
    isOptionalNumber,
    Pagination,
    PaginationOptions,
    PatchRequest,
    ProjectRole,
    ResponseList,
    ResponseObject,
} from '../core';

export class Teams extends CrowdinApi {
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
    listTeams(options?: PaginationOptions): Promise<ResponseList<TeamsModel.Team>>;
    /**
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @deprecated optional parameters should be passed through an object
     * @see https://support.crowdin.com/enterprise/api/#operation/api.teams.getMany
     */
    listTeams(limit?: number, offset?: number): Promise<ResponseList<TeamsModel.Team>>;
    listTeams(options?: number | PaginationOptions, deprecatedOffset?: number): Promise<ResponseList<TeamsModel.Team>> {
        if (isOptionalNumber(options, '0' in arguments)) {
            options = { limit: options, offset: deprecatedOffset };
        }
        const url = `${this.url}/teams`;
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
    export interface AddTeamToProjectRequest {
        teamId: number;
        /**
         * @deprecated
         */
        accessToAllWorkflowSteps?: boolean;
        managerAccess?: boolean;
        developerAccess?: boolean;
        /**
         * @deprecated
         */
        permissions?: Permissions;
        roles?: ProjectRole[];
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
        createdAt: string;
        updatedAt: string;
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
