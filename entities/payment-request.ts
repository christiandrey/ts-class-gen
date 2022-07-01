import {PaymentMode, Recurrence} from '../typings';
import {EstateLite} from './estate-lite';
import {PaymentBeneficiary} from './payment-beneficiary';
import {PaymentRequestLite} from './payment-request-lite';
import {ServiceCategory} from './service-category';
import {UserLite} from './user-lite';

export class PaymentRequest extends PaymentRequestLite {
    mode: PaymentMode;
    recurrence: Recurrence;
    recurrenceStartAt?: string;
    estate: EstateLite;
    recipient: UserLite;
    serviceCategory: ServiceCategory;
    beneficiary: PaymentBeneficiary;

    constructor(dto: PaymentRequest) {
        super(dto);

        this.mode = dto.mode;
        this.recurrence = dto.recurrence;
        this.recurrenceStartAt = dto.recurrenceStartAt;
        this.estate = new EstateLite(dto.estate);
        this.recipient = new UserLite(dto.recipient);
        this.serviceCategory = new ServiceCategory(dto.serviceCategory);
        this.beneficiary = new PaymentBeneficiary(dto.beneficiary);
    }
}