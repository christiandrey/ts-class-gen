import {NonMedicEntities, nonMedicSchema} from '../../../schemas/normalization/non-medic';
import {NonMedicCreationOptions, NonMedicUpdateOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {NonMedic} from '../../../entities/non-medic';
import {api} from '../../../api';

export const fetchNonMedicsByHospital = createTypedAsyncThunk(
    'nonMedics/fetchNonMedicsByHospital',
    async (id: string) => {
        const response = await api.hospitals().readNonMedics(id);
        const responseData = response.data.data.map((o) => new NonMedic(o));
        const normalized = safeNormalize<NonMedic, NonMedicEntities, Array<string>>(responseData, [nonMedicSchema]);
        return normalized;
    },
);

export const createNonMedicForHospital = createTypedAsyncThunk(
    'nonMedics/createNonMedicForHospital',
    async (params: {id: string; options: NonMedicCreationOptions}) => {
        const {id, options} = params;
        const response = await api.hospitals().createNonMedic(id, options);
        const responseData = new NonMedic(response.data.data);
        const normalized = safeNormalize<NonMedic, NonMedicEntities, string>(responseData, nonMedicSchema);
        return normalized;
    },
);

export const fetchCurrentNonMedic = createTypedAsyncThunk(
    'nonMedics/fetchCurrentNonMedic',
    async () => {
        const response = await api.nonMedics().readCurrent();
        const responseData = new NonMedic(response.data.data);
        const normalized = safeNormalize<NonMedic, NonMedicEntities, string>(responseData, nonMedicSchema);
        return normalized;
    },
);

export const updateCurrentNonMedic = createTypedAsyncThunk(
    'nonMedics/updateCurrentNonMedic',
    async (options: NonMedicUpdateOptions) => {
        const response = await api.nonMedics().updateCurrent(options);
        const responseData = new NonMedic(response.data.data);
        const normalized = safeNormalize<NonMedic, NonMedicEntities, string>(responseData, nonMedicSchema);
        return normalized;
    },
);

export const deleteNonMedic = createTypedAsyncThunk(
    'nonMedics/deleteNonMedic',
    async (id: string) => {
        const response = await api.nonMedics().delete(id);
        return response;
    },
);