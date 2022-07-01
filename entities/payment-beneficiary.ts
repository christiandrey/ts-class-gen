export class PaymentBeneficiary {
    id: string;
    createdAt: string;
    accountName: string;
    accountNumber: string;
    bankName: string;
    bankCode: string;
    twoLetterISOCountryName: string;
    estatesCount: number;

    constructor(dto: PaymentBeneficiary) {
        this.id = dto.id;
        this.createdAt = dto.createdAt;
        this.accountName = dto.accountName;
        this.accountNumber = dto.accountNumber;
        this.bankName = dto.bankName;
        this.bankCode = dto.bankCode;
        this.twoLetterISOCountryName = dto.twoLetterISOCountryName;
        this.estatesCount = dto.estatesCount;
    }
}