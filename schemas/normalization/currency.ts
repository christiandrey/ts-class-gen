import {Currency} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const currencySchema = new schema.Entity('currencies');

export type CurrencyEntities = SchemaEntities<{
    currency: Currency;
}>