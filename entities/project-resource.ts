import {ResourceType} from '../typings';
import {BaseEntity} from './base-entity';

export class ProjectResource extends BaseEntity {
    notes: string;
    url: string;
    type: ResourceType;
    projectId: string;

    constructor(dto: ProjectResource) {
        super(dto);

        this.notes = dto.notes;
        this.url = dto.url;
        this.type = dto.type;
        this.projectId = dto.projectId;
    }
}