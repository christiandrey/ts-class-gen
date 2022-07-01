import {EstateLite} from './estate-lite';
import {PaymentLite} from './payment-lite';

export class Payment extends PaymentLite {
    estate: EstateLite;

    constructor(dto: Payment) {
        super(dto);

        this.estate = new EstateLite(dto.estate);
    }
}