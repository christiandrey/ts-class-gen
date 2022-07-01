import {PaymentMode, Recurrence} from '../typings';
import {Currency} from './currency';
import {PaymentAccount} from './payment-account';
import {PaymentBeneficiary} from './payment-beneficiary';
import {ServiceCategory} from './service-category';
import {UserLite} from './user-lite';

export class RecurringPayment {
    id: string;
    createdAt: string;
    startDate: string;
    localAmount: number;
    description: string;
    notes: string;
    estateId?: string;
    beneficiaryId?: string;
    serviceCategoryId?: string;
    paymentAccountId?: string;
    recurrence: Recurrence;
    mode: PaymentMode;
    currency: Currency;
    recipient: UserLite;
    beneficiary: PaymentBeneficiary;
    serviceCategory: ServiceCategory;
    paymentAccount: PaymentAccount;

    constructor(dto: RecurringPayment) {
        this.id = dto.id;
        this.createdAt = dto.createdAt;
        this.startDate = dto.startDate;
        this.localAmount = dto.localAmount;
        this.description = dto.description;
        this.notes = dto.notes;
        this.estateId = dto.estateId;
        this.beneficiaryId = dto.beneficiaryId;
        this.serviceCategoryId = dto.serviceCategoryId;
        this.paymentAccountId = dto.paymentAccountId;
        this.recurrence = dto.recurrence;
        this.mode = dto.mode;
        this.currency = new Currency(dto.currency);
        this.recipient = new UserLite(dto.recipient);
        this.beneficiary = new PaymentBeneficiary(dto.beneficiary);
        this.serviceCategory = new ServiceCategory(dto.serviceCategory);
        this.paymentAccount = new PaymentAccount(dto.paymentAccount);
    }
}