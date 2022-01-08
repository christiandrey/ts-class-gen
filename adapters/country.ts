import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Country} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const countriesAdapter = createEntityAdapter<Normalized<Country>>();

const selectors = countriesAdapter.getSelectors<GlobalState>((state) => state.countries);

export const {
    selectById: countryByIdSelector,
    selectAll: allCountriesSelector,
    selectEntities: countryEntitiesSelector,
} = selectors;

export default countriesAdapter;