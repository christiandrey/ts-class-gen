import {Dictionary<string, number>} from '../typings';

export class WithdrawalSummary {
    stripeBalance: Dictionary<string, number>;
    paystackBalance: Dictionary<string, number>;
    totalPendingAmount: number;

    constructor(dto: WithdrawalSummary) {
        this.stripeBalance = dto.stripeBalance;
        this.paystackBalance = dto.paystackBalance;
        this.totalPendingAmount = dto.totalPendingAmount;
    }
}