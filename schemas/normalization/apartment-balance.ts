import {PaymentAccountEntities, paymentAccountSchema} from './payment-account';

import {ApartmentBalance} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const apartmentBalanceSchema = new schema.Entity('apartmentBalances', {
    paymentAccount: paymentAccountSchema,
});

export type ApartmentBalanceEntities = SchemaEntities<{
    apartmentBalance: ApartmentBalance;
}> & PaymentAccountEntities;