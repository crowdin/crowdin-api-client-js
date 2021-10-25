import { CrowdinApi, Pagination, ResponseList, ResponseObject } from '../core';

export class Users extends CrowdinApi {
    /**
     *
     * @param projectId project identifier
     * @param search search users by firstName, lastName or username
     * @param role defines role type
     * @param languageId language identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     */
    listProjectMembers(
        projectId: number,
        search?: string,
        role?: UsersModel.Role,
        languageId?: string,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<UsersModel.ProjectMember | UsersModel.EnterpriseProjectMember>>;

    listProjectMembers(
        projectId: number,
        searchOrRequest?: string | UsersModel.ListProjectMembersRequest,
        role?: UsersModel.Role,
        languageId?: string,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<UsersModel.ProjectMember | UsersModel.EnterpriseProjectMember>> {
        let url = `${this.url}/projects/${projectId}/members`;
        let request: UsersModel.ListProjectMembersRequest;
        if (searchOrRequest && typeof searchOrRequest === 'object') {
            request = searchOrRequest;
        } else {
            request = { search: searchOrRequest, role, languageId, limit, offset };
        }
        url = this.addQueryParam(url, 'search', request.search);
        url = this.addQueryParam(url, 'role', request.role);
        url = this.addQueryParam(url, 'languageId', request.languageId);
        return this.getList(url, request.limit, request.offset);
    }

    /**
     *
     * @param projectId project identifier
     * @param request request body
     */
    addProjectMember(
        projectId: number,
        request: UsersModel.AddProjectMemberRequest,
    ): Promise<UsersModel.AddProjectMemberResponse> {
        const url = `${this.url}/projects/${projectId}/members`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     *
     * @param projectId project identifier
     * @param memberId member identifier
     */
    getProjectMemberPermissions(
        projectId: number,
        memberId: number,
    ): Promise<ResponseObject<UsersModel.ProjectMember>> {
        const url = `${this.url}/projects/${projectId}/members/${memberId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     *
     * @param projectId project identifier
     * @param memberId member identifier
     */
    replaceProjectMemberPermissions(
        projectId: number,
        memberId: number,
        request: UsersModel.ReplaceProjectMemberRequest,
    ): Promise<ResponseObject<UsersModel.ProjectMember>> {
        const url = `${this.url}/projects/${projectId}/members/${memberId}`;
        return this.put(url, request, this.defaultConfig());
    }

    /**
     *
     * @param projectId project identifier
     * @param memberId member identifier
     */
    deleteMemberFromProject(projectId: number, memberId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/members/${memberId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param status filter users by status
     * @param search search users by firstName, lastName, username, email
     * @param twoFactor filter users by two-factor authentication status
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     */
    listUsers(
        status?: UsersModel.Status,
        search?: string,
        twoFactor?: UsersModel.TwoFactor,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<UsersModel.User>>;

    listUsers(
        statusOrRequest?: UsersModel.Status | UsersModel.ListUsersRequest,
        search?: string,
        twoFactor?: UsersModel.TwoFactor,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<UsersModel.User>> {
        let url = `${this.url}/users`;
        let request: UsersModel.ListUsersRequest;
        if (statusOrRequest && typeof statusOrRequest === 'object') {
            request = statusOrRequest;
        } else {
            request = { status: statusOrRequest, search, twoFactor, limit, offset };
        }
        url = this.addQueryParam(url, 'status', request.status);
        url = this.addQueryParam(url, 'search', request.search);
        url = this.addQueryParam(url, 'twoFactor', request.twoFactor);
        return this.getList(url, request.limit, request.offset);
    }

    /**
     * @param userId user identifier
     */
    getUserInfo(userId: number): Promise<ResponseObject<UsersModel.User>> {
        const url = `${this.url}/users/${userId}`;
        return this.get(url, this.defaultConfig());
    }

    getAuthenticatedUser(): Promise<ResponseObject<UsersModel.User>> {
        const url = `${this.url}/user`;
        return this.get(url, this.defaultConfig());
    }
}

export namespace UsersModel {
    export interface ListProjectMembersRequest {
        search?: string;
        role?: Role;
        languageId?: string;
        limit?: number;
        offset?: number;
    }

    export interface ListUsersRequest {
        status?: Status;
        search?: string;
        twoFactor?: TwoFactor;
        limit?: number;
        offset?: number;
    }

    export interface User {
        id: number;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        status: Status;
        avatarUrl: string;
        createdAt: string;
        lastSeen: string;
        twoFactor: string;
        isAdmin: boolean;
        timezone: string;
    }

    export enum Status {
        ACTIVE = 'active',
        PENDING = 'pending',
        BLOCKED = 'blocked',
    }

    export enum TwoFactor {
        ENABLED = 'enabled',
        DISABLED = 'disabled',
    }

    export interface ProjectMember {
        id: number;
        username: string;
        fullName: string;
        role: Role;
        permissions: {
            [key: string]: LanguageRole | string;
        };
        avatarUrl: string;
        joinedAt: string;
        timezone: string;
    }

    export interface EnterpriseProjectMember {
        id: number;
        username: string;
        firstName: string;
        lastName: string;
        isManager: boolean;
        managerOfGroup: Group;
        accessToAllWorkflowSteps: boolean;
        permissions: {
            [key: string]: {
                workflowStepIds: number[];
            };
        };
        givenAccessAt: string;
    }

    export interface Group {
        id: number;
        name: string;
    }

    export enum Role {
        ALL = 'all',
        OWNER = 'owner',
        MANAGER = 'manager',
        PROOFREADER = 'proofreader',
        TRANSLATOR = 'translator',
        BLOCKED = 'blocked',
    }

    export enum LanguageRole {
        PROOFREADER = 'proofreader',
        TRANSLATOR = 'translator',
        DENIED = 'denied',
    }

    export interface AddProjectMemberRequest {
        userIds: number[];
        accessToAllWorkflowSteps?: boolean;
        managerAccess?: boolean;
        permissions?: any;
    }

    export interface AddProjectMemberResponse {
        skipped: ResponseObject<ProjectMember>[];
        added: ResponseObject<ProjectMember>[];
        pagination: Pagination;
    }

    export interface ReplaceProjectMemberRequest {
        accessToAllWorkflowSteps?: boolean;
        managerAccess?: boolean;
        permissions?: any;
    }
}
