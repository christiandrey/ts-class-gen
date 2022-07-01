import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Apartment} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const apartmentsAdapter = createEntityAdapter<Normalized<Apartment>>();

const selectors = apartmentsAdapter.getSelectors<GlobalState>((state) => state.apartments);

export const {
    selectById: apartmentByIdSelector,
    selectAll: allApartmentsSelector,
    selectEntities: apartmentEntitiesSelector,
} = selectors;

export default apartmentsAdapter;