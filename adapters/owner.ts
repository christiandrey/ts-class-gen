import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Owner} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const ownersAdapter = createEntityAdapter<Normalized<Owner>>();

const selectors = ownersAdapter.getSelectors<GlobalState>((state) => state.owners);

export const {
    selectById: ownerByIdSelector,
    selectAll: allOwnersSelector,
    selectEntities: ownerEntitiesSelector,
} = selectors;

export default ownersAdapter;