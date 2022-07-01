import {EstateLite} from './estate-lite';
import {UserLite} from './user-lite';
import {Withdrawal} from './withdrawal';

export class AdminWithdrawal extends Withdrawal {
    estate: EstateLite;
    user: UserLite;

    constructor(dto: AdminWithdrawal) {
        super(dto);

        this.estate = new EstateLite(dto.estate);
        this.user = new UserLite(dto.user);
    }
}