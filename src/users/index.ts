import { CrowdinApi, Pagination, PaginationOptions, ResponseList, ResponseObject } from '../core';

export class Users extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param options optional parameters for the request
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.members.getMany
     */
    listProjectMembers(
        projectId: number,
        options?: UsersModel.ListProjectMembersOptions,
    ): Promise<ResponseList<UsersModel.ProjectMember | UsersModel.EnterpriseProjectMember>>;
    /**
     * @param projectId project identifier
     * @param search search users by firstName, lastName or username
     * @param role defines role type
     * @param languageId language identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @deprecated optional parameters should be passed through an object
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.members.getMany
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
        options?: string | UsersModel.ListProjectMembersOptions,
        deprecatedRole?: UsersModel.Role,
        deprecatedLanguageId?: string,
        deprecatedLimit?: number,
        deprecatedOffset?: number,
    ): Promise<ResponseList<UsersModel.ProjectMember | UsersModel.EnterpriseProjectMember>> {
        let url = `${this.url}/projects/${projectId}/members`;
        if (typeof options === 'string' || typeof options === 'undefined') {
            options = {
                search: options,
                role: deprecatedRole,
                languageId: deprecatedLanguageId,
                limit: deprecatedLimit,
                offset: deprecatedOffset,
            };
            this.emitDeprecationWarning();
        }
        url = this.addQueryParam(url, 'search', options.search);
        url = this.addQueryParam(url, 'role', options.role);
        url = this.addQueryParam(url, 'languageId', options.languageId);
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://support.crowdin.com/enterprise/api/#operation/api.projects.members.post
     */
    addProjectMember(
        projectId: number,
        request: UsersModel.AddProjectMemberRequest,
    ): Promise<UsersModel.AddProjectMemberResponse> {
        const url = `${this.url}/projects/${projectId}/members`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param memberId member identifier
     * @see https://support.crowdin.com/api/v2/#operation/api.projects.members.get
     */
    getProjectMemberPermissions(
        projectId: number,
        memberId: number,
    ): Promise<ResponseObject<UsersModel.ProjectMember>> {
        const url = `${this.url}/projects/${projectId}/members/${memberId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param memberId member identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.projects.members.put
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
     * @param projectId project identifier
     * @param memberId member identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.projects.members.delete
     */
    deleteMemberFromProject(projectId: number, memberId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/members/${memberId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param options optional parameters for the request
     * @see https://support.crowdin.com/enterprise/api/#operation/api.users.getMany
     */
    listUsers(options?: UsersModel.ListUsersRequest): Promise<ResponseList<UsersModel.User>>;
    /**
     * @param status filter users by status
     * @param search search users by firstName, lastName, username, email
     * @param twoFactor filter users by two-factor authentication status
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @deprecated optional parameters should be passed through an object
     * @see https://support.crowdin.com/enterprise/api/#operation/api.users.getMany
     */
    listUsers(
        status?: UsersModel.Status,
        search?: string,
        twoFactor?: UsersModel.TwoFactor,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<UsersModel.User>>;
    listUsers(
        options?: UsersModel.Status | UsersModel.ListUsersRequest,
        deprecatedSearch?: string,
        deprecatedTwoFactor?: UsersModel.TwoFactor,
        deprecatedLimit?: number,
        deprecatedOffset?: number,
    ): Promise<ResponseList<UsersModel.User>> {
        let url = `${this.url}/users`;
        if (typeof options === 'string' || typeof options === 'undefined') {
            options = {
                status: options,
                search: deprecatedSearch,
                twoFactor: deprecatedTwoFactor,
                limit: deprecatedLimit,
                offset: deprecatedOffset,
            };
            this.emitDeprecationWarning();
        }
        url = this.addQueryParam(url, 'status', options.status);
        url = this.addQueryParam(url, 'search', options.search);
        url = this.addQueryParam(url, 'twoFactor', options.twoFactor);
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param userId user identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.users.getById
     */
    getUserInfo(userId: number): Promise<ResponseObject<UsersModel.User>> {
        const url = `${this.url}/users/${userId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @see https://support.crowdin.com/api/v2/#operation/api.user.get
     */
    getAuthenticatedUser(): Promise<ResponseObject<UsersModel.User>> {
        const url = `${this.url}/user`;
        return this.get(url, this.defaultConfig());
    }
}

export namespace UsersModel {
    export interface ListProjectMembersOptions extends PaginationOptions {
        search?: string;
        role?: Role;
        languageId?: string;
    }

    export interface ListUsersRequest extends PaginationOptions {
        status?: Status;
        search?: string;
        twoFactor?: TwoFactor;
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
            [lang: string]: LanguageRole | string;
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
            [lang: string]: {
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
        //TODO improve this type by splitting it into API v2 and Enterprise API
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
        //TODO improve this type by splitting it into API v2 and Enterprise API
        permissions?: any;
    }
}
