import {EstateLite} from './estate-lite';
import {PaymentAccount} from './payment-account';
import {PaymentLite} from './payment-lite';

export class Payment extends PaymentLite {
    paymentAccount: PaymentAccount;
    estate: EstateLite;

    constructor(dto: Payment) {
        super(dto);

        this.paymentAccount = new PaymentAccount(dto.paymentAccount);
        this.estate = new EstateLite(dto.estate);
    }
}