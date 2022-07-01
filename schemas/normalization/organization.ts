import {MemberEntities, memberSchema} from './member';

import {Organization} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const organizationSchema = new schema.Entity('organizations', {
    members: [memberSchema],
});

export type OrganizationEntities = SchemaEntities<{
    organization: Organization;
}> & MemberEntities;