import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {OnboardedUser} from '../../../entities/onboarded-user';
import {api} from '../../../api';

export const onboardFromCsvForApartmentType = createTypedAsyncThunk(
    'onboardedUsers/onboardFromCsvForApartmentType',
    async (params: {id: string; resource: IFormFile}) => {
        const {id, resource} = params;
        const response = await api.apartmentTypes().onboardFromCsv(id, resource);
        const responseData = response.data.data.map((o) => new OnboardedUser(o));
        return responseData;
    },
);