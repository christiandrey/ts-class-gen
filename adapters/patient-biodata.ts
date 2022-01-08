import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {PatientBiodata} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const patientBiodatasAdapter = createEntityAdapter<Normalized<PatientBiodata>>();

const selectors = patientBiodatasAdapter.getSelectors<GlobalState>((state) => state.patientBiodatas);

export const {
    selectById: patientBiodataByIdSelector,
    selectAll: allPatientBiodatasSelector,
    selectEntities: patientBiodataEntitiesSelector,
} = selectors;

export default patientBiodatasAdapter;