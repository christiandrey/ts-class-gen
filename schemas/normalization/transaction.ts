import {PatientEntities, patientSchema} from './patient';

import {Transaction} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const transactionSchema = new schema.Entity('transactions', {
    patient: patientSchema,
});

export type TransactionEntities = SchemaEntities<{
    transaction: Transaction;
}> & PatientEntities;