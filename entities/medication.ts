import {MedicationFrequency} from '../typings';
import {BaseEntity} from './base-entity';
import {Medic} from './medic';

export class Medication extends BaseEntity {
    name: string;
    instructions: string;
    dosage: string;
    frequency: MedicationFrequency;
    frequencyCount: number;
    otherFrequency: string;
    firstDoseAt: string;
    lastDoseAt?: string;
    medic: Medic;

    constructor(dto: Medication) {
        super(dto);

        this.name = dto.name;
        this.instructions = dto.instructions;
        this.dosage = dto.dosage;
        this.frequency = dto.frequency;
        this.frequencyCount = dto.frequencyCount;
        this.otherFrequency = dto.otherFrequency;
        this.firstDoseAt = dto.firstDoseAt;
        this.lastDoseAt = dto.lastDoseAt;
        this.medic = new Medic(dto.medic);
    }
}