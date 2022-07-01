import {UserEntities, userSchema} from './user';

import {Ghost} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const ghostSchema = new schema.Entity('ghosts', {
    user: userSchema,
});

export type GhostEntities = SchemaEntities<{
    ghost: Ghost;
}> & UserEntities;