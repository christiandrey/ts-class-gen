import {BankAccount} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const bankAccountSchema = new schema.Entity('bankAccounts');

export type BankAccountEntities = SchemaEntities<{
    bankAccount: BankAccount;
}>