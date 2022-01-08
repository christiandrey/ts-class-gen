import {LabTestType} from '../typings';
import {BaseEntity} from './base-entity';
import {NonMedic} from './non-medic';

export class LabTestResult extends BaseEntity {
    labTestId: string;
    type: LabTestType;
    description: string;
    data: string;
    nonMedic: NonMedic;

    constructor(dto: LabTestResult) {
        super(dto);

        this.labTestId = dto.labTestId;
        this.type = dto.type;
        this.description = dto.description;
        this.data = dto.data;
        this.nonMedic = new NonMedic(dto.nonMedic);
    }
}