import {UserEntities, userSchema} from './user';

import {Owner} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const ownerSchema = new schema.Entity('owners', {
    user: userSchema,
});

export type OwnerEntities = SchemaEntities<{
    owner: Owner;
}> & UserEntities;