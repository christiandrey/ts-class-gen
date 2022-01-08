import {BaseEntity} from './base-entity';

export class PatientBiodata extends BaseEntity {
    bloodGroup: string;
    rhesusFactor: string;
    genotype: string;
    allergies: string;
    alerts: string;
    disabilities: string;
    underlyingMedicalConditions: string;

    constructor(dto: PatientBiodata) {
        super(dto);

        this.bloodGroup = dto.bloodGroup;
        this.rhesusFactor = dto.rhesusFactor;
        this.genotype = dto.genotype;
        this.allergies = dto.allergies;
        this.alerts = dto.alerts;
        this.disabilities = dto.disabilities;
        this.underlyingMedicalConditions = dto.underlyingMedicalConditions;
    }
}