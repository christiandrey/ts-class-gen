import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {CalendarEvent} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const calendarEventsAdapter = createEntityAdapter<Normalized<CalendarEvent>>();

const selectors = calendarEventsAdapter.getSelectors<GlobalState>((state) => state.calendarEvents);

export const {
    selectById: calendarEventByIdSelector,
    selectAll: allCalendarEventsSelector,
    selectEntities: calendarEventEntitiesSelector,
} = selectors;

export default calendarEventsAdapter;