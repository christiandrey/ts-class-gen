import {UserSummary} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const userSummarySchema = new schema.Entity('userSummaries');

export type UserSummaryEntities = SchemaEntities<{
    userSummary: UserSummary;
}>