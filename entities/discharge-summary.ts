import {BaseEntity} from './base-entity';
import {Medic} from './medic';

export class DischargeSummary extends BaseEntity {
    dischargedAt: string;
    presentingComplaints: string;
    complaintHistory: string;
    investigations: string;
    diagnoses: string;
    management: string;
    complications: string;
    operations: string;
    futureManagement: string;
    medic: Medic;

    constructor(dto: DischargeSummary) {
        super(dto);

        this.dischargedAt = dto.dischargedAt;
        this.presentingComplaints = dto.presentingComplaints;
        this.complaintHistory = dto.complaintHistory;
        this.investigations = dto.investigations;
        this.diagnoses = dto.diagnoses;
        this.management = dto.management;
        this.complications = dto.complications;
        this.operations = dto.operations;
        this.futureManagement = dto.futureManagement;
        this.medic = new Medic(dto.medic);
    }
}