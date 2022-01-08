import {State} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const stateSchema = new schema.Entity('states');

export type StateEntities = SchemaEntities<{
    state: State;
}>