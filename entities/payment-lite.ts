import {PaymentMode} from '../typings';
import {BaseEntity} from './base-entity';
import {PaymentBeneficiary} from './payment-beneficiary';
import {ServiceCategory} from './service-category';
import {Transaction} from './transaction';
import {UserLite} from './user-lite';

export class PaymentLite extends BaseEntity {
    mode: PaymentMode;
    reference: string;
    evidenceUrl: string;
    notes: string;
    userId: string;
    recipientId: string;
    estateId?: string;
    serviceCategoryId?: string;
    beneficiaryId?: string;
    serviceCategory: ServiceCategory;
    beneficiary: PaymentBeneficiary;
    user: UserLite;
    recipient: UserLite;
    debitTransaction: Transaction;

    constructor(dto: PaymentLite) {
        super(dto);

        this.mode = dto.mode;
        this.reference = dto.reference;
        this.evidenceUrl = dto.evidenceUrl;
        this.notes = dto.notes;
        this.userId = dto.userId;
        this.recipientId = dto.recipientId;
        this.estateId = dto.estateId;
        this.serviceCategoryId = dto.serviceCategoryId;
        this.beneficiaryId = dto.beneficiaryId;
        this.serviceCategory = new ServiceCategory(dto.serviceCategory);
        this.beneficiary = new PaymentBeneficiary(dto.beneficiary);
        this.user = new UserLite(dto.user);
        this.recipient = new UserLite(dto.recipient);
        this.debitTransaction = new Transaction(dto.debitTransaction);
    }
}