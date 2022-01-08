import {Role} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const roleSchema = new schema.Entity('roles');

export type RoleEntities = SchemaEntities<{
    role: Role;
}>