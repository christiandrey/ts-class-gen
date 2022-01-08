import {PaymentRecurrence} from '../typings';
import {BaseEntity} from './base-entity';

export class PaymentPlan extends BaseEntity {
    name: string;
    recurrence: PaymentRecurrence;
    medics: number;
    nonMedics: number;
    price: number;
    pricePerMedic: number;
    pricePerNonMedic: number;

    constructor(dto: PaymentPlan) {
        super(dto);

        this.name = dto.name;
        this.recurrence = dto.recurrence;
        this.medics = dto.medics;
        this.nonMedics = dto.nonMedics;
        this.price = dto.price;
        this.pricePerMedic = dto.pricePerMedic;
        this.pricePerNonMedic = dto.pricePerNonMedic;
    }
}