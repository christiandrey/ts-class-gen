import {CountryEntities, countrySchema} from './country';
import {StateEntities, stateSchema} from './state';

import {Hospital} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const hospitalSchema = new schema.Entity('hospitals', {
    state: stateSchema,
    country: countrySchema,
});

export type HospitalEntities = SchemaEntities<{
    hospital: Hospital;
}> & StateEntities & CountryEntities;