import {CountryEntities, countrySchema} from '../../../schemas/normalization/country';
import {StateEntities, stateSchema} from '../../../schemas/normalization/state';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Country} from '../../../entities/country';
import {State} from '../../../entities/state';
import {api} from '../../../api';

export const fetchCountriesLocation = createTypedAsyncThunk(
    'locations/fetchCountriesLocation',
    async () => {
        const response = await api.locations().readCountries();
        const responseData = response.data.data.map((o) => new Country(o));
        const normalized = safeNormalize<Country, CountryEntities, Array<string>>(responseData, [countrySchema]);
        return normalized;
    },
);

export const fetchStatesLocationByCountry = createTypedAsyncThunk(
    'locations/fetchStatesLocationByCountry',
    async (id: string) => {
        const response = await api.locations().readStatesByCountry(id);
        const responseData = response.data.data.map((o) => new State(o));
        const normalized = safeNormalize<State, StateEntities, Array<string>>(responseData, [stateSchema]);
        return normalized;
    },
);