export class PaymentAccount {
    id: string;
    createdAt: string;
    name: string;
    isActive: boolean;
    isDefault: boolean;
    estateId: string;
    balance: number;

    constructor(dto: PaymentAccount) {
        this.id = dto.id;
        this.createdAt = dto.createdAt;
        this.name = dto.name;
        this.isActive = dto.isActive;
        this.isDefault = dto.isDefault;
        this.estateId = dto.estateId;
        this.balance = dto.balance;
    }
}