import {BaseEntity} from './base-entity';

export class Setting extends BaseEntity {
    key: string;
    value: string;
    description: string;

    constructor(dto: Setting) {
        super(dto);

        this.key = dto.key;
        this.value = dto.value;
        this.description = dto.description;
    }
}