import {ClinicalVisitType} from '../typings';
import {BaseEntity} from './base-entity';
import {DischargeSummary} from './discharge-summary';
import {InvoiceLite} from './invoice-lite';

export class ClinicalVisit extends BaseEntity {
    type: ClinicalVisitType;
    invoice: InvoiceLite;
    dischargeSummary: DischargeSummary;

    constructor(dto: ClinicalVisit) {
        super(dto);

        this.type = dto.type;
        this.invoice = new InvoiceLite(dto.invoice);
        this.dischargeSummary = new DischargeSummary(dto.dischargeSummary);
    }
}