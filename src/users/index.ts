import {
    CrowdinApi,
    isOptionalString,
    Pagination,
    PaginationOptions,
    PatchRequest,
    ProjectRole,
    ResponseList,
    ResponseObject,
} from '../core';
import { ProjectsGroupsModel } from '../projectsGroups';
import { TeamsModel } from '../teams';

/**
 * Users API gives you the possibility to get profile information about the currently authenticated user.
 *
 * In Crowdin Enterprise users are the members of your organization with the defined access levels.
 * Use API to get the list of organization users and to check the information on a specific user.
 */
export class Users extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.members.getMany
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
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.members.getMany
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
        if (isOptionalString(options, '1' in arguments)) {
            options = {
                search: options,
                role: deprecatedRole,
                languageId: deprecatedLanguageId,
                limit: deprecatedLimit,
                offset: deprecatedOffset,
            };
        }
        url = this.addQueryParam(url, 'search', options.search);
        url = this.addQueryParam(url, 'role', options.role);
        url = this.addQueryParam(url, 'languageId', options.languageId);
        url = this.addQueryParam(url, 'workflowStepId', options.workflowStepId);
        url = this.addQueryParam(url, 'orderBy', options.orderBy);
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
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.members.get
     */
    getProjectMemberPermissions(
        projectId: number,
        memberId: number,
    ): Promise<ResponseObject<UsersModel.ProjectMember | UsersModel.EnterpriseProjectMember>> {
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
        request: UsersModel.ReplaceProjectMemberRequest = {},
    ): Promise<ResponseObject<UsersModel.ProjectMember | UsersModel.EnterpriseProjectMember>> {
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
    listUsers(options?: UsersModel.ListUsersOptions): Promise<ResponseList<UsersModel.User>>;
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
        options?: UsersModel.Status | UsersModel.ListUsersOptions,
        deprecatedSearch?: string,
        deprecatedTwoFactor?: UsersModel.TwoFactor,
        deprecatedLimit?: number,
        deprecatedOffset?: number,
    ): Promise<ResponseList<UsersModel.User>> {
        let url = `${this.url}/users`;
        if (isOptionalString(options, '0' in arguments)) {
            options = {
                status: options,
                search: deprecatedSearch,
                twoFactor: deprecatedTwoFactor,
                limit: deprecatedLimit,
                offset: deprecatedOffset,
            };
        }
        url = this.addQueryParam(url, 'status', options.status);
        url = this.addQueryParam(url, 'search', options.search);
        url = this.addQueryParam(url, 'twoFactor', options.twoFactor);
        url = this.addQueryParam(url, 'orderBy', options.orderBy);
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param request request body
     * @see https://support.crowdin.com/enterprise/api/#operation/api.users.post
     */
    inviteUser(request: UsersModel.InviteUserRequest): Promise<ResponseObject<UsersModel.User>> {
        const url = `${this.url}/users`;
        return this.post(url, request, this.defaultConfig());
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
     * @param userId user identifier
     * @see https://support.crowdin.com/enterprise/api/#operation/api.users.delete
     */
    deleteUser(userId: number): Promise<void> {
        const url = `${this.url}/users/${userId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param request request body
     * @see https://support.crowdin.com/enterprise/api/#operation/api.users.patch
     */
    editUser(userId: number, request: PatchRequest[]): Promise<ResponseObject<UsersModel.User>> {
        const url = `${this.url}/users/${userId}`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @see https://developer.crowdin.com/api/v2/#operation/api.user.get
     */
    getAuthenticatedUser(): Promise<ResponseObject<UsersModel.User>> {
        const url = `${this.url}/user`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.user.patch
     */
    editAuthenticatedUser(request: PatchRequest[]): Promise<ResponseObject<UsersModel.User>> {
        const url = `${this.url}/user`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param options request options
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.users.projects.permissions.getMany
     */
    listUserProjectPermissions(
        userId: number,
        options?: PaginationOptions,
    ): Promise<ResponseList<UsersModel.ProjectPermissions>> {
        const url = `${this.url}/users/${userId}/projects/permissions`;
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param userId user identifier
     * @param request request body
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.users.projects.permissions.patch
     */
    editUserProjectPermissions(
        userId: number,
        request: PatchRequest[],
    ): Promise<ResponseList<UsersModel.ProjectPermissions>> {
        const url = `${this.url}/users/${userId}/projects/permissions`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param userId user identifier
     * @param options request options
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.users.projects.contributions.getMany
     */
    listUserProjectContributions(
        userId: number,
        options?: PaginationOptions,
    ): Promise<ResponseList<UsersModel.ProjectPermissions>> {
        const url = `${this.url}/users/${userId}/projects/contributions`;
        return this.getList(url, options?.limit, options?.offset);
    }
}

export namespace UsersModel {
    export interface ListProjectMembersOptions extends PaginationOptions {
        search?: string;
        role?: Role;
        languageId?: string;
        workflowStepId?: number;
        orderBy?: string;
    }

    export interface ListUsersOptions extends PaginationOptions {
        status?: Status;
        search?: string;
        twoFactor?: TwoFactor;
        orderBy?: string;
    }

    export interface InviteUserRequest {
        email: string;
        firstName?: string;
        lastName?: string;
        timezone?: string;
        adminAccess?: boolean;
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

    export type Status = 'active' | 'pending' | 'blocked';

    export type TwoFactor = 'enabled' | 'disabled';

    export interface ProjectMember {
        id: number;
        username: string;
        fullName: string;
        role: Role;
        /**
         * @deprecated
         */
        permissions: Permissions;
        avatarUrl: string;
        joinedAt: string;
        timezone: string;
        roles: ProjectRole[];
    }

    export interface EnterpriseProjectMember {
        id: number;
        username: string;
        firstName: string;
        lastName: string;
        isManager: boolean;
        isDeveloperr: boolean;
        managerOfGroup: Group;
        /**
         * @deprecated
         */
        accessToAllWorkflowSteps: boolean;
        /**
         * @deprecated
         */
        permissions: Permissions;
        givenAccessAt: string;
        roles: ProjectRole[];
    }

    export interface Group {
        id: number;
        name: string;
    }

    export type Role = 'all' | 'owner' | 'manager' | 'proofreader' | 'translator' | 'blocked';

    export type LanguageRole = 'proofreader' | 'translator' | 'denied';

    export interface AddProjectMemberRequest {
        userIds: number[];
        usernames: string[];
        emails: string[];
        managerAccess?: boolean;
        roles?: ProjectRole[];
        developerAccess?: boolean;
        /**
         * @deprecated
         */
        accessToAllWorkflowSteps?: boolean;
        /**
         * @deprecated
         */
        permissions?: Permissions;
    }

    export interface AddProjectMemberResponse {
        skipped: ResponseObject<ProjectMember | EnterpriseProjectMember>[];
        added: ResponseObject<ProjectMember | EnterpriseProjectMember>[];
        pagination: Pagination;
    }

    export interface ReplaceProjectMemberRequest {
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

    export interface ProjectPermissions {
        id: number;
        roles: ProjectRole[];
        project: ProjectsGroupsModel.Project | ProjectsGroupsModel.ProjectSettings;
        teams: TeamsModel.Team[];
    }

    export interface Contributions {
        id: number;
        translated: Contribution;
        approved: Contribution;
        voted: Contribution;
        commented: Contribution;
        project: ProjectsGroupsModel.Project | ProjectsGroupsModel.ProjectSettings;
    }

    export interface Contribution {
        strings: number;
        words?: number;
    }

    export interface Permissions {
        [lang: string]: string | { workflowStepIds: number[] | 'all' };
    }
}
