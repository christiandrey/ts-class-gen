import {PaymentRequestStatus} from '../typings';
import {BaseEntity} from './base-entity';
import {EstateManager} from './estate-manager';

export class PaymentRequestLite extends BaseEntity {
    status: PaymentRequestStatus;
    statusUpdatedAt?: string;
    amount: number;
    description: string;
    notes: string;
    paymentAccountId?: string;
    estateManager: EstateManager;

    constructor(dto: PaymentRequestLite) {
        super(dto);

        this.status = dto.status;
        this.statusUpdatedAt = dto.statusUpdatedAt;
        this.amount = dto.amount;
        this.description = dto.description;
        this.notes = dto.notes;
        this.paymentAccountId = dto.paymentAccountId;
        this.estateManager = new EstateManager(dto.estateManager);
    }
}