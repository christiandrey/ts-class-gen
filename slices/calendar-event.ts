import {createAppointmentForPatient, createCalendarEvent, fetchAppointmentByCalendarEvent, fetchAppointmentById, fetchAppointmentsByMedic, fetchAppointmentsForCurrentMedic, fetchAppointmentsForCurrentPatient, fetchAppointmentsForPatient, fetchCalendarEventById, fetchCalendarEventsByUser, fetchCurrentUserCalendarEvents, fetchMedicsCalendarEventsByHospital, rescheduleAppointment, updateCalendarEvent, updateStatusAppointment} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import calendarEventsAdapter from '../adapters/calendar-event';

export const calendarEventsSlice = createSlice({
    name: 'calendarEvents',
    initialState: calendarEventsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createAppointmentForPatient.fulfilled, createCalendarEvent.fulfilled, fetchAppointmentByCalendarEvent.fulfilled, fetchAppointmentById.fulfilled, fetchAppointmentsByMedic.fulfilled, fetchAppointmentsForCurrentMedic.fulfilled, fetchAppointmentsForCurrentPatient.fulfilled, fetchAppointmentsForPatient.fulfilled, fetchCalendarEventById.fulfilled, fetchCalendarEventsByUser.fulfilled, fetchCurrentUserCalendarEvents.fulfilled, fetchMedicsCalendarEventsByHospital.fulfilled, rescheduleAppointment.fulfilled, updateCalendarEvent.fulfilled, updateStatusAppointment.fulfilled), (state, action) => {
            calendarEventsAdapter.upsertMany(state, action.payload.entities.calendarEvents);
        });
    },
});

export const calendarEventsReducer = calendarEventsSlice.reducer;

export const calendarEventsActions = calendarEventsSlice.actions;