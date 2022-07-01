import {UserEntities, userSchema} from './user';

import {Transaction} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const transactionSchema = new schema.Entity('transactions', {
    user: userSchema,
});

export type TransactionEntities = SchemaEntities<{
    transaction: Transaction;
}> & UserEntities;