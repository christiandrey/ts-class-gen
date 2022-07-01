import {PaymentRequestStatus} from '../typings';
import {BaseEntity} from './base-entity';
import {MemberLite} from './member-lite';

export class PaymentRequestLite extends BaseEntity {
    status: PaymentRequestStatus;
    statusUpdatedAt?: string;
    amount: number;
    description: string;
    notes: string;
    member: MemberLite;

    constructor(dto: PaymentRequestLite) {
        super(dto);

        this.status = dto.status;
        this.statusUpdatedAt = dto.statusUpdatedAt;
        this.amount = dto.amount;
        this.description = dto.description;
        this.notes = dto.notes;
        this.member = new MemberLite(dto.member);
    }
}