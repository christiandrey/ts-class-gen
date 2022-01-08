import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Currency} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const currenciesAdapter = createEntityAdapter<Normalized<Currency>>();

const selectors = currenciesAdapter.getSelectors<GlobalState>((state) => state.currencies);

export const {
    selectById: currencyByIdSelector,
    selectAll: allCurrenciesSelector,
    selectEntities: currencyEntitiesSelector,
} = selectors;

export default currenciesAdapter;