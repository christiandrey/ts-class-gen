import {PaymentGateway} from '../typings';

export class ResolvedCard {
    bin: string;
    last4: string;
    expMonth: number;
    expYear: number;
    twoLetterISOCountryName: string;
    cardType: string;
    brand: string;
    gateway: PaymentGateway;

    constructor(dto: ResolvedCard) {
        this.bin = dto.bin;
        this.last4 = dto.last4;
        this.expMonth = dto.expMonth;
        this.expYear = dto.expYear;
        this.twoLetterISOCountryName = dto.twoLetterISOCountryName;
        this.cardType = dto.cardType;
        this.brand = dto.brand;
        this.gateway = dto.gateway;
    }
}