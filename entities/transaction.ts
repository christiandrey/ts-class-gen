import {TransactionMode} from '../typings';
import {BaseEntity} from './base-entity';
import {PatientLite} from './patient-lite';

export class Transaction extends BaseEntity {
    isCredit: boolean;
    amount: number;
    reference: string;
    mode: TransactionMode;
    description: string;
    patient: PatientLite;

    constructor(dto: Transaction) {
        super(dto);

        this.isCredit = dto.isCredit;
        this.amount = dto.amount;
        this.reference = dto.reference;
        this.mode = dto.mode;
        this.description = dto.description;
        this.patient = new PatientLite(dto.patient);
    }
}