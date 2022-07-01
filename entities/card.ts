import {PaymentGateway} from '../typings';
import {Currency} from './currency';

export class Card {
    id: string;
    createdAt: string;
    expiryMonth: number;
    expiryYear: number;
    number: string;
    brand: string;
    gateway: PaymentGateway;
    canWithdraw: boolean;
    currency: Currency;

    constructor(dto: Card) {
        this.id = dto.id;
        this.createdAt = dto.createdAt;
        this.expiryMonth = dto.expiryMonth;
        this.expiryYear = dto.expiryYear;
        this.number = dto.number;
        this.brand = dto.brand;
        this.gateway = dto.gateway;
        this.canWithdraw = dto.canWithdraw;
        this.currency = new Currency(dto.currency);
    }
}