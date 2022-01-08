import {BaseEntity} from './base-entity';
import {Medic} from './medic';

export class InvoiceItem extends BaseEntity {
    name: string;
    description: string;
    unitPrice: number;
    localUnitPrice: number;
    quantity: number;
    medic: Medic;

    constructor(dto: InvoiceItem) {
        super(dto);

        this.name = dto.name;
        this.description = dto.description;
        this.unitPrice = dto.unitPrice;
        this.localUnitPrice = dto.localUnitPrice;
        this.quantity = dto.quantity;
        this.medic = new Medic(dto.medic);
    }
}