import {InvoiceStatus} from '../typings';
import {BaseEntity} from './base-entity';
import {NonMedic} from './non-medic';
import {Transaction} from './transaction';

export class InvoiceLite extends BaseEntity {
    status: InvoiceStatus;
    clinicalVisitId: string;
    transaction: Transaction;
    nonMedic: NonMedic;

    constructor(dto: InvoiceLite) {
        super(dto);

        this.status = dto.status;
        this.clinicalVisitId = dto.clinicalVisitId;
        this.transaction = new Transaction(dto.transaction);
        this.nonMedic = new NonMedic(dto.nonMedic);
    }
}