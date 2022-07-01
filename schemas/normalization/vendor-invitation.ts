import {VendorInvitation} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const vendorInvitationSchema = new schema.Entity('vendorInvitations');

export type VendorInvitationEntities = SchemaEntities<{
    vendorInvitation: VendorInvitation;
}>