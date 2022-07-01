import {EstateWallet} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const estateWalletSchema = new schema.Entity('estateWallets');

export type EstateWalletEntities = SchemaEntities<{
    estateWallet: EstateWallet;
}>