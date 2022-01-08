import {BaseEntity} from './base-entity';
import {Medic} from './medic';
import {NonMedic} from './non-medic';

export class LabScan extends BaseEntity {
    url: string;
    previewUrl: string;
    notes: string;
    medic: Medic;
    nonMedic: NonMedic;

    constructor(dto: LabScan) {
        super(dto);

        this.url = dto.url;
        this.previewUrl = dto.previewUrl;
        this.notes = dto.notes;
        this.medic = new Medic(dto.medic);
        this.nonMedic = new NonMedic(dto.nonMedic);
    }
}