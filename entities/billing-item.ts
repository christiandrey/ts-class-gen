import {BaseEntity} from './base-entity';

export class BillingItem extends BaseEntity {
    name: string;
    description: string;
    unitPrice: number;

    constructor(dto: BillingItem) {
        super(dto);

        this.name = dto.name;
        this.description = dto.description;
        this.unitPrice = dto.unitPrice;
    }
}