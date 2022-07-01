import {WithdrawalDestinationType, WithdrawalStatus} from '../typings';
import {BaseEntity} from './base-entity';

export class Withdrawal extends BaseEntity {
    amount: number;
    localAmount: number;
    reference: string;
    twoLetterISOCountryName: string;
    currencyISOSymbol: string;
    processedAt?: string;
    status: WithdrawalStatus;
    destinationType: WithdrawalDestinationType;

    constructor(dto: Withdrawal) {
        super(dto);

        this.amount = dto.amount;
        this.localAmount = dto.localAmount;
        this.reference = dto.reference;
        this.twoLetterISOCountryName = dto.twoLetterISOCountryName;
        this.currencyISOSymbol = dto.currencyISOSymbol;
        this.processedAt = dto.processedAt;
        this.status = dto.status;
        this.destinationType = dto.destinationType;
    }
}