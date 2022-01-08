import {CalendarEventEntities, calendarEventSchema} from '../../../schemas/normalization/calendar-event';
import {CalendarEventCreationOptions, CalendarEventUpdateOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {CalendarEvent} from '../../../entities/calendar-event';
import {api} from '../../../api';

export const createCalendarEvent = createTypedAsyncThunk(
    'calendarEvents/createCalendarEvent',
    async (options: CalendarEventCreationOptions) => {
        const response = await api.calendarEvents().create(options);
        const responseData = new CalendarEvent(response.data.data);
        const normalized = safeNormalize<CalendarEvent, CalendarEventEntities, string>(responseData, calendarEventSchema);
        return normalized;
    },
);

export const fetchCalendarEventById = createTypedAsyncThunk(
    'calendarEvents/fetchCalendarEventById',
    async (id: string) => {
        const response = await api.calendarEvents().readById(id);
        const responseData = new CalendarEvent(response.data.data);
        const normalized = safeNormalize<CalendarEvent, CalendarEventEntities, string>(responseData, calendarEventSchema);
        return normalized;
    },
);

export const updateCalendarEvent = createTypedAsyncThunk(
    'calendarEvents/updateCalendarEvent',
    async (params: {id: string; options: CalendarEventUpdateOptions}) => {
        const {id, options} = params;
        const response = await api.calendarEvents().update(id, options);
        const responseData = new CalendarEvent(response.data.data);
        const normalized = safeNormalize<CalendarEvent, CalendarEventEntities, string>(responseData, calendarEventSchema);
        return normalized;
    },
);

export const deleteCalendarEvent = createTypedAsyncThunk(
    'calendarEvents/deleteCalendarEvent',
    async (id: string) => {
        const response = await api.calendarEvents().delete(id);
        return response;
    },
);

export const fetchMedicsCalendarEventsByHospital = createTypedAsyncThunk(
    'calendarEvents/fetchMedicsCalendarEventsByHospital',
    async (params: {id: string; startDate: string; endDate: string}) => {
        const {id, startDate, endDate} = params;
        const response = await api.hospitals().readMedicsCalendarEvents(id, startDate, endDate);
        const responseData = response.data.data.map((o) => new CalendarEvent(o));
        const normalized = safeNormalize<CalendarEvent, CalendarEventEntities, Array<string>>(responseData, [calendarEventSchema]);
        return normalized;
    },
);

export const fetchCurrentUserCalendarEvents = createTypedAsyncThunk(
    'calendarEvents/fetchCurrentUserCalendarEvents',
    async (params: {startDate: string; endDate: string}) => {
        const {startDate, endDate} = params;
        const response = await api.users().readCurrentUserCalendarEvents(startDate, endDate);
        const responseData = response.data.data.map((o) => new CalendarEvent(o));
        const normalized = safeNormalize<CalendarEvent, CalendarEventEntities, Array<string>>(responseData, [calendarEventSchema]);
        return normalized;
    },
);

export const fetchCalendarEventsByUser = createTypedAsyncThunk(
    'calendarEvents/fetchCalendarEventsByUser',
    async (params: {id: string; startDate: string; endDate: string}) => {
        const {id, startDate, endDate} = params;
        const response = await api.users().readCalendarEventsByUser(id, startDate, endDate);
        const responseData = response.data.data.map((o) => new CalendarEvent(o));
        const normalized = safeNormalize<CalendarEvent, CalendarEventEntities, Array<string>>(responseData, [calendarEventSchema]);
        return normalized;
    },
);