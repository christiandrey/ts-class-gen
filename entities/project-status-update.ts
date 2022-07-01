import {ProjectStatus} from '../typings';

export class ProjectStatusUpdate {
    status: ProjectStatus;

    constructor(dto: ProjectStatusUpdate) {
        this.status = dto.status;
    }
}