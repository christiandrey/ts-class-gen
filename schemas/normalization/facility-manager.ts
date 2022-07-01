import {UserEntities, userSchema} from './user';

import {FacilityManager} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const facilityManagerSchema = new schema.Entity('facilityManagers', {
    user: userSchema,
});

export type FacilityManagerEntities = SchemaEntities<{
    facilityManager: FacilityManager;
}> & UserEntities;