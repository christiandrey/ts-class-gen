import {ApartmentBalanceEntities, apartmentBalanceSchema} from '../../../schemas/normalization/apartment-balance';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {ApartmentBalance} from '../../../entities/apartment-balance';
import {api} from '../../../api';

export const fetchBalancesByApartment = createTypedAsyncThunk(
    'apartmentBalances/fetchBalancesByApartment',
    async (id: string) => {
        const response = await api.apartments().readBalances(id);
        const responseData = response.data.data.map((o) => new ApartmentBalance(o));
        const normalized = safeNormalize<ApartmentBalance, ApartmentBalanceEntities, Array<string>>(responseData, [apartmentBalanceSchema]);
        return normalized;
    },
);