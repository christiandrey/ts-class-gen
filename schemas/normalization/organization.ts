import {MemberEntities, memberSchema} from './member';
import {OrganizationClaimEntities, organizationClaimSchema} from './organization-claim';

import {Organization} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const organizationSchema = new schema.Entity('organizations', {
    members: [memberSchema],
    claims: [organizationClaimSchema],
});

export type OrganizationEntities = SchemaEntities<{
    organization: Organization;
}> & MemberEntities & OrganizationClaimEntities;