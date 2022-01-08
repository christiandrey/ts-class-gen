import {RoleEntities, roleSchema} from './role';

import {User} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const userSchema = new schema.Entity('users', {
    roles: [roleSchema],
});

export type UserEntities = SchemaEntities<{
    user: User;
}> & RoleEntities;