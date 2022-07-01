import {Wallet} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const walletSchema = new schema.Entity('wallets');

export type WalletEntities = SchemaEntities<{
    wallet: Wallet;
}>