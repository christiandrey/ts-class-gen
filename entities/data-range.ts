import {BaseEntity} from './base-entity';

export class DataRange extends BaseEntity {
    name: string;
    lowerValue: number;
    upperValue: number;
    unit: string;

    constructor(dto: DataRange) {
        super(dto);

        this.name = dto.name;
        this.lowerValue = dto.lowerValue;
        this.upperValue = dto.upperValue;
        this.unit = dto.unit;
    }
}