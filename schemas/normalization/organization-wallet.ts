import {OrganizationWallet} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const organizationWalletSchema = new schema.Entity('organizationWallets');

export type OrganizationWalletEntities = SchemaEntities<{
    organizationWallet: OrganizationWallet;
}>