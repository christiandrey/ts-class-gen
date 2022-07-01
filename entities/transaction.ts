import {TransactionMode} from '../typings';
import {UserLite} from './user-lite';

export class Transaction {
    id: string;
    isCredit: boolean;
    amount: number;
    reference: string;
    estateId?: string;
    mode: TransactionMode;
    description: string;
    createdAt: string;
    user: UserLite;

    constructor(dto: Transaction) {
        this.id = dto.id;
        this.isCredit = dto.isCredit;
        this.amount = dto.amount;
        this.reference = dto.reference;
        this.estateId = dto.estateId;
        this.mode = dto.mode;
        this.description = dto.description;
        this.createdAt = dto.createdAt;
        this.user = new UserLite(dto.user);
    }
}