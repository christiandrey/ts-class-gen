import {AppointmentEntities, appointmentSchema} from '../../../schemas/normalization/appointment';
import {AppointmentStatus} from '../../../typings';
import {AppointmentCreationOptions, AppointmentStatusUpdateOptions, CalendarEventUpdateOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Appointment} from '../../../entities/appointment';
import {api} from '../../../api';

export const fetchAppointmentById = createTypedAsyncThunk(
    'appointments/fetchAppointmentById',
    async (id: string) => {
        const response = await api.appointments().readById(id);
        const responseData = new Appointment(response.data.data);
        const normalized = safeNormalize<Appointment, AppointmentEntities, string>(responseData, appointmentSchema);
        return normalized;
    },
);

export const updateStatusAppointment = createTypedAsyncThunk(
    'appointments/updateStatusAppointment',
    async (params: {id: string; options: AppointmentStatusUpdateOptions}) => {
        const {id, options} = params;
        const response = await api.appointments().updateStatus(id, options);
        const responseData = new Appointment(response.data.data);
        const normalized = safeNormalize<Appointment, AppointmentEntities, string>(responseData, appointmentSchema);
        return normalized;
    },
);

export const rescheduleAppointment = createTypedAsyncThunk(
    'appointments/rescheduleAppointment',
    async (params: {id: string; options: CalendarEventUpdateOptions}) => {
        const {id, options} = params;
        const response = await api.appointments().reschedule(id, options);
        const responseData = new Appointment(response.data.data);
        const normalized = safeNormalize<Appointment, AppointmentEntities, string>(responseData, appointmentSchema);
        return normalized;
    },
);

export const fetchAppointmentByCalendarEvent = createTypedAsyncThunk(
    'appointments/fetchAppointmentByCalendarEvent',
    async (id: string) => {
        const response = await api.calendarEvents().readAppointment(id);
        const responseData = new Appointment(response.data.data);
        const normalized = safeNormalize<Appointment, AppointmentEntities, string>(responseData, appointmentSchema);
        return normalized;
    },
);

export const fetchAppointmentsForCurrentMedic = createTypedAsyncThunk(
    'appointments/fetchAppointmentsForCurrentMedic',
    async (status?: AppointmentStatus) => {
        const response = await api.medics().readAppointmentsForCurrent(status);
        const responseData = response.data.data.map((o) => new Appointment(o));
        const normalized = safeNormalize<Appointment, AppointmentEntities, Array<string>>(responseData, [appointmentSchema]);
        return normalized;
    },
);

export const fetchAppointmentsByMedic = createTypedAsyncThunk(
    'appointments/fetchAppointmentsByMedic',
    async (params: {id: string; status?: AppointmentStatus}) => {
        const {id, status} = params;
        const response = await api.medics().readAppointmentsByMedic(id, status);
        const responseData = response.data.data.map((o) => new Appointment(o));
        const normalized = safeNormalize<Appointment, AppointmentEntities, Array<string>>(responseData, [appointmentSchema]);
        return normalized;
    },
);

export const createAppointmentForPatient = createTypedAsyncThunk(
    'appointments/createAppointmentForPatient',
    async (options: AppointmentCreationOptions) => {
        const response = await api.patients().createAppointment(options);
        const responseData = new Appointment(response.data.data);
        const normalized = safeNormalize<Appointment, AppointmentEntities, string>(responseData, appointmentSchema);
        return normalized;
    },
);

export const fetchAppointmentsForCurrentPatient = createTypedAsyncThunk(
    'appointments/fetchAppointmentsForCurrentPatient',
    async (status?: AppointmentStatus) => {
        const response = await api.patients().readAppointmentsForCurrent(status);
        const responseData = response.data.data.map((o) => new Appointment(o));
        const normalized = safeNormalize<Appointment, AppointmentEntities, Array<string>>(responseData, [appointmentSchema]);
        return normalized;
    },
);

export const fetchAppointmentsForPatient = createTypedAsyncThunk(
    'appointments/fetchAppointmentsForPatient',
    async (params: {id: string; status?: AppointmentStatus}) => {
        const {id, status} = params;
        const response = await api.patients().readAppointmentsForPatient(id, status);
        const responseData = response.data.data.map((o) => new Appointment(o));
        const normalized = safeNormalize<Appointment, AppointmentEntities, Array<string>>(responseData, [appointmentSchema]);
        return normalized;
    },
);