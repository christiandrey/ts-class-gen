import {MedicEntities, medicSchema} from '../../../schemas/normalization/medic';
import {MedicCreationOptions, MedicUpdateOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Medic} from '../../../entities/medic';
import {api} from '../../../api';

export const fetchMedicsByHospital = createTypedAsyncThunk(
    'medics/fetchMedicsByHospital',
    async (id: string) => {
        const response = await api.hospitals().readMedics(id);
        const responseData = response.data.data.map((o) => new Medic(o));
        const normalized = safeNormalize<Medic, MedicEntities, Array<string>>(responseData, [medicSchema]);
        return normalized;
    },
);

export const createMedicForHospital = createTypedAsyncThunk(
    'medics/createMedicForHospital',
    async (params: {id: string; options: MedicCreationOptions}) => {
        const {id, options} = params;
        const response = await api.hospitals().createMedic(id, options);
        const responseData = new Medic(response.data.data);
        const normalized = safeNormalize<Medic, MedicEntities, string>(responseData, medicSchema);
        return normalized;
    },
);

export const fetchCurrentMedic = createTypedAsyncThunk(
    'medics/fetchCurrentMedic',
    async () => {
        const response = await api.medics().readCurrent();
        const responseData = new Medic(response.data.data);
        const normalized = safeNormalize<Medic, MedicEntities, string>(responseData, medicSchema);
        return normalized;
    },
);

export const updateCurrentMedic = createTypedAsyncThunk(
    'medics/updateCurrentMedic',
    async (options: MedicUpdateOptions) => {
        const response = await api.medics().updateCurrent(options);
        const responseData = new Medic(response.data.data);
        const normalized = safeNormalize<Medic, MedicEntities, string>(responseData, medicSchema);
        return normalized;
    },
);

export const updateServicesMedic = createTypedAsyncThunk(
    'medics/updateServicesMedic',
    async (params: {id: string; servicesIds: Array<string>}) => {
        const {id, servicesIds} = params;
        const response = await api.medics().updateServices(id, servicesIds);
        const responseData = new Medic(response.data.data);
        const normalized = safeNormalize<Medic, MedicEntities, string>(responseData, medicSchema);
        return normalized;
    },
);

export const deleteMedic = createTypedAsyncThunk(
    'medics/deleteMedic',
    async (id: string) => {
        const response = await api.medics().delete(id);
        return response;
    },
);