import {Withdrawal} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const withdrawalSchema = new schema.Entity('withdrawals');

export type WithdrawalEntities = SchemaEntities<{
    withdrawal: Withdrawal;
}>