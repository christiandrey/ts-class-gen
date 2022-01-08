import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {ClinicalVisit} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const clinicalVisitsAdapter = createEntityAdapter<Normalized<ClinicalVisit>>();

const selectors = clinicalVisitsAdapter.getSelectors<GlobalState>((state) => state.clinicalVisits);

export const {
    selectById: clinicalVisitByIdSelector,
    selectAll: allClinicalVisitsSelector,
    selectEntities: clinicalVisitEntitiesSelector,
} = selectors;

export default clinicalVisitsAdapter;