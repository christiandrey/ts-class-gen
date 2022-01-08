import {HospitalEntities, hospitalSchema} from './hospital';
import {UserEntities, userSchema} from './user';

import {Manager} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const managerSchema = new schema.Entity('managers', {
    user: userSchema,
    hospital: hospitalSchema,
});

export type ManagerEntities = SchemaEntities<{
    manager: Manager;
}> & UserEntities & HospitalEntities;