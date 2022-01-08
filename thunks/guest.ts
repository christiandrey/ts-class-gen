import {GuestEntities, guestSchema} from '../../../schemas/normalization/guest';
import {GuestCreationOptions, GuestUpdateOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Guest} from '../../../entities/guest';
import {api} from '../../../api';

export const fetchCurrentGuest = createTypedAsyncThunk(
    'guests/fetchCurrentGuest',
    async () => {
        const response = await api.guests().readCurrent();
        const responseData = new Guest(response.data.data);
        const normalized = safeNormalize<Guest, GuestEntities, string>(responseData, guestSchema);
        return normalized;
    },
);

export const updateGuest = createTypedAsyncThunk(
    'guests/updateGuest',
    async (params: {id: string; options: GuestUpdateOptions}) => {
        const {id, options} = params;
        const response = await api.guests().update(id, options);
        const responseData = new Guest(response.data.data);
        const normalized = safeNormalize<Guest, GuestEntities, string>(responseData, guestSchema);
        return normalized;
    },
);

export const deleteGuest = createTypedAsyncThunk(
    'guests/deleteGuest',
    async (id: string) => {
        const response = await api.guests().delete(id);
        return response;
    },
);

export const fetchGuestsForCurrentPatient = createTypedAsyncThunk(
    'guests/fetchGuestsForCurrentPatient',
    async () => {
        const response = await api.patients().readGuestsForCurrent();
        const responseData = response.data.data.map((o) => new Guest(o));
        const normalized = safeNormalize<Guest, GuestEntities, Array<string>>(responseData, [guestSchema]);
        return normalized;
    },
);

export const createGuestForPatient = createTypedAsyncThunk(
    'guests/createGuestForPatient',
    async (options: GuestCreationOptions) => {
        const response = await api.patients().createGuest(options);
        const responseData = new Guest(response.data.data);
        const normalized = safeNormalize<Guest, GuestEntities, string>(responseData, guestSchema);
        return normalized;
    },
);