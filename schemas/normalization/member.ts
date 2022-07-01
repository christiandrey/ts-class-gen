import {FacilityManagerEntities, facilityManagerSchema} from './facility-manager';

import {Member} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const memberSchema = new schema.Entity('members', {
    facilityManager: facilityManagerSchema,
});

export type MemberEntities = SchemaEntities<{
    member: Member;
}> & FacilityManagerEntities;