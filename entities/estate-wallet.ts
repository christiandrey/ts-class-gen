export class EstateWallet {
    id: string;
    balance: number;
    lockedBalance: number;
    actualBalance: number;

    constructor(dto: EstateWallet) {
        this.id = dto.id;
        this.balance = dto.balance;
        this.lockedBalance = dto.lockedBalance;
        this.actualBalance = dto.actualBalance;
    }
}