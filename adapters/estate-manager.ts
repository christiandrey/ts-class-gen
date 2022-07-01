import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {EstateManager} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const estateManagersAdapter = createEntityAdapter<Normalized<EstateManager>>();

const selectors = estateManagersAdapter.getSelectors<GlobalState>((state) => state.estateManagers);

export const {
    selectById: estateManagerByIdSelector,
    selectAll: allEstateManagersSelector,
    selectEntities: estateManagerEntitiesSelector,
} = selectors;

export default estateManagersAdapter;