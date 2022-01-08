import {UserEntities, userSchema} from './user';

import {Guest} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const guestSchema = new schema.Entity('guests', {
    user: userSchema,
});

export type GuestEntities = SchemaEntities<{
    guest: Guest;
}> & UserEntities;