import {CurrencyEntities, currencySchema} from './currency';

import {Card} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const cardSchema = new schema.Entity('cards', {
    currency: currencySchema,
});

export type CardEntities = SchemaEntities<{
    card: Card;
}> & CurrencyEntities;