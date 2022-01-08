import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Patient} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const patientsAdapter = createEntityAdapter<Normalized<Patient>>();

const selectors = patientsAdapter.getSelectors<GlobalState>((state) => state.patients);

export const {
    selectById: patientByIdSelector,
    selectAll: allPatientsSelector,
    selectEntities: patientEntitiesSelector,
} = selectors;

export default patientsAdapter;