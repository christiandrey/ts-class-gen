import {BaseEntity} from './base-entity';

export class PlanSubscription extends BaseEntity {
    hospitalId: string;
    paymentPlanId: string;
    expiresAt: string;
    medics: number;
    nonMedics: number;
    extraMedics: number;
    extraNonMedics: number;

    constructor(dto: PlanSubscription) {
        super(dto);

        this.hospitalId = dto.hospitalId;
        this.paymentPlanId = dto.paymentPlanId;
        this.expiresAt = dto.expiresAt;
        this.medics = dto.medics;
        this.nonMedics = dto.nonMedics;
        this.extraMedics = dto.extraMedics;
        this.extraNonMedics = dto.extraNonMedics;
    }
}