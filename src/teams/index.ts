import { CrowdinApi, Pagination, PatchRequest, ResponseList, ResponseObject } from '../core';

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
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @see https://support.crowdin.com/enterprise/api/#operation/api.teams.getMany
     */
    listTeams(limit?: number, offset?: number): Promise<ResponseList<TeamsModel.Team>> {
        const url = `${this.url}/teams`;
        return this.getList(url, limit, offset);
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
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @see https://support.crowdin.com/enterprise/api/#operation/api.teams.members.getMany
     */
    teamMembersList(teamId: number, limit?: number, offset?: number): Promise<ResponseList<TeamsModel.TeamMember>> {
        const url = `${this.url}/teams/${teamId}/members`;
        return this.getList(url, limit, offset);
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
        accessToAllWorkflowSteps?: boolean;
        managerAccess?: boolean;
        permissions?: any;
    }

    export interface ProjectTeamResources {
        skipped: ProjectTeamResource;
        added: ProjectTeamResource;
    }

    export interface ProjectTeamResource {
        id: number;
        hasManagerAccess: boolean;
        hasAccessToAllWorkflowSteps: boolean;
        permissions: any;
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
