import {CalendarEventEntities, calendarEventSchema} from './calendar-event';
import {MedicEntities, medicSchema} from './medic';
import {PatientEntities, patientSchema} from './patient';

import {Appointment} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const appointmentSchema = new schema.Entity('appointments', {
    calendarEvent: calendarEventSchema,
    patient: patientSchema,
    medic: medicSchema,
});

export type AppointmentEntities = SchemaEntities<{
    appointment: Appointment;
}> & CalendarEventEntities & PatientEntities & MedicEntities;