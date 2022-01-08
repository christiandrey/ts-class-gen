import {BillingItem} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const billingItemSchema = new schema.Entity('billingItems');

export type BillingItemEntities = SchemaEntities<{
    billingItem: BillingItem;
}>