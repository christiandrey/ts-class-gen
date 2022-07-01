import {OrganizationClaim} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const organizationClaimSchema = new schema.Entity('organizationClaims');

export type OrganizationClaimEntities = SchemaEntities<{
    organizationClaim: OrganizationClaim;
}>