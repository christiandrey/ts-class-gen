import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {FacilityManager} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const facilityManagersAdapter = createEntityAdapter<Normalized<FacilityManager>>();

const selectors = facilityManagersAdapter.getSelectors<GlobalState>((state) => state.facilityManagers);

export const {
    selectById: facilityManagerByIdSelector,
    selectAll: allFacilityManagersSelector,
    selectEntities: facilityManagerEntitiesSelector,
} = selectors;

export default facilityManagersAdapter;