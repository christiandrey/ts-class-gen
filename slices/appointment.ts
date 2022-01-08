import {createAppointmentForPatient, fetchAppointmentByCalendarEvent, fetchAppointmentById, fetchAppointmentsByMedic, fetchAppointmentsForCurrentMedic, fetchAppointmentsForCurrentPatient, fetchAppointmentsForPatient, rescheduleAppointment, updateStatusAppointment} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import appointmentsAdapter from '../adapters/appointment';

export const appointmentsSlice = createSlice({
    name: 'appointments',
    initialState: appointmentsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createAppointmentForPatient.fulfilled, fetchAppointmentByCalendarEvent.fulfilled, fetchAppointmentById.fulfilled, fetchAppointmentsByMedic.fulfilled, fetchAppointmentsForCurrentMedic.fulfilled, fetchAppointmentsForCurrentPatient.fulfilled, fetchAppointmentsForPatient.fulfilled, rescheduleAppointment.fulfilled, updateStatusAppointment.fulfilled), (state, action) => {
            appointmentsAdapter.upsertMany(state, action.payload.entities.appointments);
        });
    },
});

export const appointmentsReducer = appointmentsSlice.reducer;

export const appointmentsActions = appointmentsSlice.actions;