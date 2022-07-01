import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {ApartmentBalance} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const apartmentBalancesAdapter = createEntityAdapter<Normalized<ApartmentBalance>>();

const selectors = apartmentBalancesAdapter.getSelectors<GlobalState>((state) => state.apartmentBalances);

export const {
    selectById: apartmentBalanceByIdSelector,
    selectAll: allApartmentBalancesSelector,
    selectEntities: apartmentBalanceEntitiesSelector,
} = selectors;

export default apartmentBalancesAdapter;