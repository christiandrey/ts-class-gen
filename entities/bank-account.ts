import {BankAccountType} from '../typings';

export class BankAccount {
    id: string;
    createdAt: string;
    accountName: string;
    accountNumber: string;
    bankName: string;
    bankCode: string;
    twoLetterISOCountryName: string;
    type: BankAccountType;
    userId: string;

    constructor(dto: BankAccount) {
        this.id = dto.id;
        this.createdAt = dto.createdAt;
        this.accountName = dto.accountName;
        this.accountNumber = dto.accountNumber;
        this.bankName = dto.bankName;
        this.bankCode = dto.bankCode;
        this.twoLetterISOCountryName = dto.twoLetterISOCountryName;
        this.type = dto.type;
        this.userId = dto.userId;
    }
}