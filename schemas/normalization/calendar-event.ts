import {UserEntities, userSchema} from './user';

import {CalendarEvent} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const calendarEventSchema = new schema.Entity('calendarEvents', {
    participants: [userSchema],
});

export type CalendarEventEntities = SchemaEntities<{
    calendarEvent: CalendarEvent;
}> & UserEntities;