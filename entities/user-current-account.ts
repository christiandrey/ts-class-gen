import {UserAccountType} from '../typings';

export class UserCurrentAccount {
    currentAccountId: string;
    currentAccountType: UserAccountType;

    constructor(dto: UserCurrentAccount) {
        this.currentAccountId = dto.currentAccountId;
        this.currentAccountType = dto.currentAccountType;
    }
}