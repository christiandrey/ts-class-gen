import {BaseEntity} from './base-entity';
import {PaymentAccount} from './payment-account';

export class ApartmentBalance extends BaseEntity {
    paymentAccount: PaymentAccount;
    balance: number;

    constructor(dto: ApartmentBalance) {
        super(dto);

        this.paymentAccount = new PaymentAccount(dto.paymentAccount);
        this.balance = dto.balance;
    }
}