import {CountryEntities, countrySchema} from '../../../schemas/normalization/country';
import {LocationEntities, locationSchema} from '../../../schemas/normalization/location';
import {StateEntities, stateSchema} from '../../../schemas/normalization/state';
import {PaginatedQueryParams} from '../../../typings';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Country} from '../../../entities/country';
import {Location} from '../../../entities/location';
import {State} from '../../../entities/state';
import {UpdatedCountry} from '../../../entities/updated-country';
import {UpdatedState} from '../../../entities/updated-state';
import {api} from '../../../api';

export const fetchCountriesLocation = createTypedAsyncThunk(
    'locations/fetchCountriesLocation',
    async (params: PaginatedQueryParams) => {
        const {page, pageSize, query} = params;
        const response = await api.locations().readCountries(page, pageSize, query);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new Country(o));
        const normalized = safeNormalize<Country, CountryEntities, Array<string>>(responseData, [countrySchema]);
        return {...normalized, meta};
    },
);

export const fetchActiveCountriesLocation = createTypedAsyncThunk(
    'locations/fetchActiveCountriesLocation',
    async () => {
        const response = await api.locations().readActiveCountries();
        const responseData = response.data.data.map((o) => new Country(o));
        const normalized = safeNormalize<Country, CountryEntities, Array<string>>(responseData, [countrySchema]);
        return normalized;
    },
);

export const updateCountryLocation = createTypedAsyncThunk(
    'locations/updateCountryLocation',
    async (params: {id: string; updatedCountryDto: UpdatedCountry}) => {
        const {id, updatedCountryDto} = params;
        const response = await api.locations().updateCountry(id, updatedCountryDto);
        const responseData = new Country(response.data.data);
        const normalized = safeNormalize<Country, CountryEntities, string>(responseData, countrySchema);
        return normalized;
    },
);

export const fetchCountryLocation = createTypedAsyncThunk(
    'locations/fetchCountryLocation',
    async (id: string) => {
        const response = await api.locations().readCountry(id);
        const responseData = new Country(response.data.data);
        const normalized = safeNormalize<Country, CountryEntities, string>(responseData, countrySchema);
        return normalized;
    },
);

export const activateCountryLocation = createTypedAsyncThunk(
    'locations/activateCountryLocation',
    async (id: string) => {
        const response = await api.locations().activateCountry(id);
        const responseData = new Country(response.data.data);
        const normalized = safeNormalize<Country, CountryEntities, string>(responseData, countrySchema);
        return normalized;
    },
);

export const deactivateCountryLocation = createTypedAsyncThunk(
    'locations/deactivateCountryLocation',
    async (id: string) => {
        const response = await api.locations().deactivateCountry(id);
        const responseData = new Country(response.data.data);
        const normalized = safeNormalize<Country, CountryEntities, string>(responseData, countrySchema);
        return normalized;
    },
);

export const fetchStatesLocationByCountry = createTypedAsyncThunk(
    'locations/fetchStatesLocationByCountry',
    async (params: PaginatedQueryParams<{id: string}>) => {
        const {id, page, pageSize, query} = params;
        const response = await api.locations().readStatesByCountry(id, page, pageSize, query);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new State(o));
        const normalized = safeNormalize<State, StateEntities, Array<string>>(responseData, [stateSchema]);
        return {...normalized, meta};
    },
);

export const fetchStatesLocation = createTypedAsyncThunk(
    'locations/fetchStatesLocation',
    async (params: PaginatedQueryParams) => {
        const {page, pageSize, query} = params;
        const response = await api.locations().readStates(page, pageSize, query);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new State(o));
        const normalized = safeNormalize<State, StateEntities, Array<string>>(responseData, [stateSchema]);
        return {...normalized, meta};
    },
);

export const updateStateLocation = createTypedAsyncThunk(
    'locations/updateStateLocation',
    async (params: {id: string; updatedStateDto: UpdatedState}) => {
        const {id, updatedStateDto} = params;
        const response = await api.locations().updateState(id, updatedStateDto);
        const responseData = new State(response.data.data);
        const normalized = safeNormalize<State, StateEntities, string>(responseData, stateSchema);
        return normalized;
    },
);

export const activateStateLocation = createTypedAsyncThunk(
    'locations/activateStateLocation',
    async (id: string) => {
        const response = await api.locations().activateState(id);
        const responseData = new State(response.data.data);
        const normalized = safeNormalize<State, StateEntities, string>(responseData, stateSchema);
        return normalized;
    },
);

export const deactivateStateLocation = createTypedAsyncThunk(
    'locations/deactivateStateLocation',
    async (id: string) => {
        const response = await api.locations().deactivateState(id);
        const responseData = new State(response.data.data);
        const normalized = safeNormalize<State, StateEntities, string>(responseData, stateSchema);
        return normalized;
    },
);

export const geocodeAddressLocationByPlaceId = createTypedAsyncThunk(
    'locations/geocodeAddressLocationByPlaceId',
    async (placeId: string) => {
        const response = await api.locations().geocodeAddressByPlaceId(placeId);
        const responseData = new Location(response.data.data);
        const normalized = safeNormalize<Location, LocationEntities, string>(responseData, locationSchema);
        return normalized;
    },
);

export const geocodeAddressByLocation = createTypedAsyncThunk(
    'locations/geocodeAddressByLocation',
    async (params: {latitude: number; longitude: number}) => {
        const {latitude, longitude} = params;
        const response = await api.locations().geocodeAddressByLocation(latitude, longitude);
        const responseData = new Location(response.data.data);
        const normalized = safeNormalize<Location, LocationEntities, string>(responseData, locationSchema);
        return normalized;
    },
);

export const geolocateLocation = createTypedAsyncThunk(
    'locations/geolocateLocation',
    async () => {
        const response = await api.locations().geolocate();
        const responseData = new Location(response.data.data);
        const normalized = safeNormalize<Location, LocationEntities, string>(responseData, locationSchema);
        return normalized;
    },
);