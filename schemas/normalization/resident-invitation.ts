import {ResidentInvitation} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const residentInvitationSchema = new schema.Entity('residentInvitations');

export type ResidentInvitationEntities = SchemaEntities<{
    residentInvitation: ResidentInvitation;
}>