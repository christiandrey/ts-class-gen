import {Location} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const locationSchema = new schema.Entity('locations');

export type LocationEntities = SchemaEntities<{
    location: Location;
}>