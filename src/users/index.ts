import { CrowdinApi, ResponseList, ResponseObject, Pagination } from '../core';

export class Users extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param request request body
     */
    addProjectTeamMember(
        projectId: number,
        request: UsersModel.AddProjectTeamMember,
    ): Promise<UsersModel.ProjectTeamMembersInfoResponse> {
        const url = `${this.url}/projects/${projectId}/members`;
        return this.post(url, request, this.defaultConfig());
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
    ): Promise<ResponseList<UsersModel.User>> {
        let url = `${this.url}/users`;
        url = this.addQueryParam(url, 'status', status);
        url = this.addQueryParam(url, 'search', search);
        url = this.addQueryParam(url, 'twoFactor', twoFactor);
        url = this.addQueryParam(url, 'limit', limit);
        url = this.addQueryParam(url, 'offset', offset);
        return this.get(url, this.defaultConfig());
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

    export interface AddProjectTeamMember {
        userIds: number[];
        accessToAllWorkflowSteps?: boolean;
        managerAccess?: boolean;
        permissions?: Permissions;
    }

    export interface Permissions {
        [key: string]: Permission;
    }

    export interface Permission {
        workflowStepIds: number[];
    }

    export interface ProjectTeamMembersInfoResponse {
        data: ProjectTeamMembersInfoTotal;
        pagination: Pagination;
    }

    export interface ProjectTeamMembersInfoTotal {
        skipped: ProjectTeamMembersInfo[];
        added: ProjectTeamMembersInfo[];
    }

    export interface ProjectTeamMembersInfo {
        id: number;
        username: string;
        firstName: string;
        lastName: string;
        isManager: boolean;
        managerOfGroup: ManagerOfGroup;
        accessToAllWorkflowSteps: boolean;
        permissions: Permission;
        lastSeen: string;
    }

    export interface ManagerOfGroup {
        id: number;
        name: string;
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
}
