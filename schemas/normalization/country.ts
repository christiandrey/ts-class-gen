import {Country} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const countrySchema = new schema.Entity('countries');

export type CountryEntities = SchemaEntities<{
    country: Country;
}>