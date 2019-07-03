export namespace Branches {

    export namespace Api {
        export function listProjectBranches(projectId: number, name?: string, limit?: number, offset?: number): Model.Branch[] {
            return [{
                id: 1,
                projectId: 2,
                name: 'test',
                title: 'test',
                exportPattern: '',
                status: 0,
                priority: 0,
                createdAt: '',
                updatedAt: ''
            }];
        }
    }

    export namespace Model {
        export interface Branch {
            id: number;
            projectId: number;
            name: string;
            title: string;
            exportPattern: string;
            status: number;
            priority: number;
            createdAt: string;
            updatedAt: string;
        }
    }
}