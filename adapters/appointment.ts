import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Appointment} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const appointmentsAdapter = createEntityAdapter<Normalized<Appointment>>();

const selectors = appointmentsAdapter.getSelectors<GlobalState>((state) => state.appointments);

export const {
    selectById: appointmentByIdSelector,
    selectAll: allAppointmentsSelector,
    selectEntities: appointmentEntitiesSelector,
} = selectors;

export default appointmentsAdapter;