import {Log} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const logSchema = new schema.Entity('logs');

export type LogEntities = SchemaEntities<{
    log: Log;
}>