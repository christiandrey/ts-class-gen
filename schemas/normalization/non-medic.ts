import {HospitalEntities, hospitalSchema} from './hospital';
import {UserEntities, userSchema} from './user';

import {NonMedic} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const nonMedicSchema = new schema.Entity('nonMedics', {
    user: userSchema,
    hospital: hospitalSchema,
});

export type NonMedicEntities = SchemaEntities<{
    nonMedic: NonMedic;
}> & UserEntities & HospitalEntities;