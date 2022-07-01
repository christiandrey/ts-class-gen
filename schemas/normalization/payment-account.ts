import {PaymentAccount} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const paymentAccountSchema = new schema.Entity('paymentAccounts');

export type PaymentAccountEntities = SchemaEntities<{
    paymentAccount: PaymentAccount;
}>