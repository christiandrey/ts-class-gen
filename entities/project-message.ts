import {MessageType} from '../typings';
import {BaseEntity} from './base-entity';

export class ProjectMessage extends BaseEntity {
    body: string;
    hash: string;
    type: MessageType;
    projectId: string;
    userId: string;

    constructor(dto: ProjectMessage) {
        super(dto);

        this.body = dto.body;
        this.hash = dto.hash;
        this.type = dto.type;
        this.projectId = dto.projectId;
        this.userId = dto.userId;
    }
}