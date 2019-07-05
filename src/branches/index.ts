import { CrowdinApi, ResponseList, ResponseObject } from '../core';

export namespace Branches {

    export class Api extends CrowdinApi {

        listProjectBranches(projectId: number, name?: string, limit?: number, offset?: number): ResponseList<Model.Branch> {
            //TODO implement
            return {
                data: [{
                    data: {
                        id: 1,
                        projectId: 2,
                        name: 'test',
                        title: 'test',
                        exportPattern: '',
                        status: 0,
                        priority: 0,
                        createdAt: '',
                        updatedAt: ''
                    }
                }],
                pagination: []
            };
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