import {AppointmentStatus} from '../typings';
import {BaseEntity} from './base-entity';
import {CalendarEvent} from './calendar-event';
import {Medic} from './medic';
import {PatientLite} from './patient-lite';

export class Appointment extends BaseEntity {
    status: AppointmentStatus;
    calendarEvent: CalendarEvent;
    patient: PatientLite;
    medic: Medic;

    constructor(dto: Appointment) {
        super(dto);

        this.status = dto.status;
        this.calendarEvent = new CalendarEvent(dto.calendarEvent);
        this.patient = new PatientLite(dto.patient);
        this.medic = new Medic(dto.medic);
    }
}