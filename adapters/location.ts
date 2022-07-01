import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Location} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const locationsAdapter = createEntityAdapter<Normalized<Location>>();

const selectors = locationsAdapter.getSelectors<GlobalState>((state) => state.locations);

export const {
    selectById: locationByIdSelector,
    selectAll: allLocationsSelector,
    selectEntities: locationEntitiesSelector,
} = selectors;

export default locationsAdapter;