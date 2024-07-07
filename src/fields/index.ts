import { CrowdinApi, PaginationOptions, PatchRequest, ResponseList, ResponseObject } from '../core';

export class Fields extends CrowdinApi {
    /**
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.fields.getMany
     */
    listFields(options?: FieldsModel.ListFieldsParams): Promise<ResponseList<FieldsModel.Field>> {
        let url = `${this.url}/fields`;
        url = this.addQueryParam(url, 'search', options?.search);
        url = this.addQueryParam(url, 'entity', options?.entity);
        url = this.addQueryParam(url, 'type', options?.type);
        return this.getList(url, options?.limit, options?.offset);
    }

    /**
     * @param request request body
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.fields.post
     */
    addField(request: FieldsModel.AddFieldRequest): Promise<ResponseObject<FieldsModel.Field>> {
        const url = `${this.url}/fields`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param fieldId field identifier
     * @see https://developer.crowdin.com/enterprise/api/v2/#operation/api.fields.get
     */
    getField(fieldId: number): Promise<ResponseObject<FieldsModel.Field>> {
        const url = `${this.url}/fields/${fieldId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param fieldId field identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.fields.delete
     */
    deleteField(fieldId: number): Promise<void> {
        const url = `${this.url}/fields/${fieldId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param fieldId field identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.fields.patch
     */
    editField(fieldId: number, request: PatchRequest[]): Promise<ResponseObject<FieldsModel.Field>> {
        const url = `${this.url}/fields/${fieldId}`;
        return this.patch(url, request, this.defaultConfig());
    }
}

export namespace FieldsModel {
    export type Entity = 'project' | 'user' | 'task' | 'file' | 'translation' | 'string';

    export type Type =
        | 'checkbox'
        | 'radiobuttons'
        | 'date'
        | 'datetime'
        | 'number'
        | 'labels'
        | 'select'
        | 'multiselect'
        | 'text'
        | 'textarea'
        | 'url';

    export type Place =
        | 'projectCreateModal'
        | 'projectHeader'
        | 'projectDetails'
        | 'projectCrowdsourceDetails'
        | 'projectSettings'
        | 'projectTaskEditCreate'
        | 'projectTaskDetails'
        | 'fileDetails'
        | 'fileSettings'
        | 'userEditModal'
        | 'userDetails'
        | 'userPopover'
        | 'stringEditModal'
        | 'stringDetails'
        | 'translationUnderContent';

    export interface Location {
        place: Place;
    }

    export interface Option {
        label: string;
        value: string;
    }

    export interface OtherFieldConfig {
        locations: Location[];
    }

    export interface ListFieldConfig extends OtherFieldConfig {
        options: Option[];
    }

    export interface NumberFieldConfig extends OtherFieldConfig {
        min: number;
        max: number;
        units: string;
    }

    export type Config = ListFieldConfig | NumberFieldConfig | OtherFieldConfig;

    export interface ListFieldsParams extends PaginationOptions {
        search?: string;
        entity?: Entity;
        type?: Type;
    }

    export interface Field {
        id: number;
        name: string;
        slug: string;
        type: Type;
        description: string;
        entities: Entity[];
        config: Config;
        createdAt: string;
        updatedAt: string;
    }

    export interface AddFieldRequest {
        name: string;
        slug: string;
        type: Type;
        description?: string;
        entities: Entity[];
        config?: Config;
    }
}
