import {UserEntities, userSchema} from './user';

import {ActivityLog} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const activityLogSchema = new schema.Entity('activityLogs', {
    user: userSchema,
});

export type ActivityLogEntities = SchemaEntities<{
    activityLog: ActivityLog;
}> & UserEntities;