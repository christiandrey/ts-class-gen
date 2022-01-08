import {BaseEntity} from './base-entity';
import {Medic} from './medic';

export class EncounterLite extends BaseEntity {
    presentingComplaint: string;
    complaintHistory: string;
    weightInKg: number;
    heightInCm: number;
    cardiovascularSystem: string;
    respiratorySystem: string;
    gastrointestinalSystem: string;
    genitounirarySystem: string;
    neurologicalSystem: string;
    diagnosis: string;
    management: string;
    notes: string;
    clinicalVisitId: string;
    medic: Medic;

    constructor(dto: EncounterLite) {
        super(dto);

        this.presentingComplaint = dto.presentingComplaint;
        this.complaintHistory = dto.complaintHistory;
        this.weightInKg = dto.weightInKg;
        this.heightInCm = dto.heightInCm;
        this.cardiovascularSystem = dto.cardiovascularSystem;
        this.respiratorySystem = dto.respiratorySystem;
        this.gastrointestinalSystem = dto.gastrointestinalSystem;
        this.genitounirarySystem = dto.genitounirarySystem;
        this.neurologicalSystem = dto.neurologicalSystem;
        this.diagnosis = dto.diagnosis;
        this.management = dto.management;
        this.notes = dto.notes;
        this.clinicalVisitId = dto.clinicalVisitId;
        this.medic = new Medic(dto.medic);
    }
}