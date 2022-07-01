import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {ApartmentType} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const apartmentTypesAdapter = createEntityAdapter<Normalized<ApartmentType>>();

const selectors = apartmentTypesAdapter.getSelectors<GlobalState>((state) => state.apartmentTypes);

export const {
    selectById: apartmentTypeByIdSelector,
    selectAll: allApartmentTypesSelector,
    selectEntities: apartmentTypeEntitiesSelector,
} = selectors;

export default apartmentTypesAdapter;