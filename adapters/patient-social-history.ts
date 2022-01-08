import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {PatientSocialHistory} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const patientSocialHistoriesAdapter = createEntityAdapter<Normalized<PatientSocialHistory>>();

const selectors = patientSocialHistoriesAdapter.getSelectors<GlobalState>((state) => state.patientSocialHistories);

export const {
    selectById: patientSocialHistoryByIdSelector,
    selectAll: allPatientSocialHistoriesSelector,
    selectEntities: patientSocialHistoryEntitiesSelector,
} = selectors;

export default patientSocialHistoriesAdapter;