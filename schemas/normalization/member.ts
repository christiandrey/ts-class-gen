import {FacilityManagerEntities, facilityManagerSchema} from './facility-manager';
import {MemberPermissionEntities, memberPermissionSchema} from './member-permission';

import {Member} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const memberSchema = new schema.Entity('members', {
    permissions: memberPermissionSchema,
    facilityManager: facilityManagerSchema,
});

export type MemberEntities = SchemaEntities<{
    member: Member;
}> & MemberPermissionEntities & FacilityManagerEntities;