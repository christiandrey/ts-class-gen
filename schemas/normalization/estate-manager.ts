import {MemberEntities, memberSchema} from './member';

import {EstateManager} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const estateManagerSchema = new schema.Entity('estateManagers', {
    member: memberSchema,
});

export type EstateManagerEntities = SchemaEntities<{
    estateManager: EstateManager;
}> & MemberEntities;