import { CrowdinApi, ResponseList, ResponseObject, PatchRequest, Pagination } from '../core';

export class Teams extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param request request body
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
     */
    listTeams(limit?: number, offset?: number): Promise<ResponseList<TeamsModel.Team>> {
        let url = `${this.url}/teams`;
        url = this.addQueryParam(url, 'limit', limit);
        url = this.addQueryParam(url, 'offset', offset);
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param request request body
     */
    addTeam(request: TeamsModel.AddTeamRequest): Promise<ResponseObject<TeamsModel.Team>> {
        const url = `${this.url}/teams`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param teamId team identifier
     */
    getTeam(teamId: number): Promise<ResponseObject<TeamsModel.Team>> {
        const url = `${this.url}/teams/${teamId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param teamId team identifier
     */
    deleteTeam(teamId: number): Promise<void> {
        const url = `${this.url}/teams/${teamId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param teamId team identifier
     * @param request request body
     */
    editTeam(teamId: number, request: PatchRequest[]): Promise<ResponseObject<TeamsModel.Team>> {
        const url = `${this.url}/teams/${teamId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param teamId team identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     */
    teamMembersList(teamId: number, limit?: number, offset?: number): Promise<ResponseList<TeamsModel.TeamMember>> {
        let url = `${this.url}/teams/${teamId}/members`;
        url = this.addQueryParam(url, 'limit', limit);
        url = this.addQueryParam(url, 'offset', offset);
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param teamId team identifier
     * @param request request body
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
     */
    deleteAllTeamMembers(teamId: number): Promise<void> {
        const url = `${this.url}/teams/${teamId}/members`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param teamId team identifier
     * @param memberId member identifier
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
        permissions: number;
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
