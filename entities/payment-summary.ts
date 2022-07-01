export class PaymentSummary {
    walletFunding: number;
    maintenance: number;
    repairs: number;
    serviceCharge: number;
    withdrawals: number;

    constructor(dto: PaymentSummary) {
        this.walletFunding = dto.walletFunding;
        this.maintenance = dto.maintenance;
        this.repairs = dto.repairs;
        this.serviceCharge = dto.serviceCharge;
        this.withdrawals = dto.withdrawals;
    }
}