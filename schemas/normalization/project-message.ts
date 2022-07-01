import {ProjectMessage} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const projectMessageSchema = new schema.Entity('projectMessages');

export type ProjectMessageEntities = SchemaEntities<{
    projectMessage: ProjectMessage;
}>