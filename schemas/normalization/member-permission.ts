import {MemberPermission} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const memberPermissionSchema = new schema.Entity('memberPermissions');

export type MemberPermissionEntities = SchemaEntities<{
    memberPermission: MemberPermission;
}>