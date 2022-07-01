import {EstateLite} from './estate-lite';
import {RecurringPayment} from './recurring-payment';
import {UserLite} from './user-lite';

export class AdminRecurringPayment extends RecurringPayment {
    estate: EstateLite;
    user: UserLite;

    constructor(dto: AdminRecurringPayment) {
        super(dto);

        this.estate = new EstateLite(dto.estate);
        this.user = new UserLite(dto.user);
    }
}