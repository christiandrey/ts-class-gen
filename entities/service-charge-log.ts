import {BaseEntity} from './base-entity';

export class ServiceChargeLog extends BaseEntity {
    residentId: string;
    apartmentId?: string;
    isCredit: boolean;
    isOpeningBalance: boolean;
    amount: number;
    description: string;

    constructor(dto: ServiceChargeLog) {
        super(dto);

        this.residentId = dto.residentId;
        this.apartmentId = dto.apartmentId;
        this.isCredit = dto.isCredit;
        this.isOpeningBalance = dto.isOpeningBalance;
        this.amount = dto.amount;
        this.description = dto.description;
    }
}