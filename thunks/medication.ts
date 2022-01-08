import {MedicationEntities, medicationSchema} from '../../../schemas/normalization/medication';
import {MedicationCreationOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Medication} from '../../../entities/medication';
import {api} from '../../../api';

export const deleteMedication = createTypedAsyncThunk(
    'medications/deleteMedication',
    async (id: string) => {
        const response = await api.medications().delete(id);
        return response;
    },
);

export const createMedicationForPatient = createTypedAsyncThunk(
    'medications/createMedicationForPatient',
    async (params: {id: string; options: MedicationCreationOptions}) => {
        const {id, options} = params;
        const response = await api.patients().createMedication(id, options);
        const responseData = new Medication(response.data.data);
        const normalized = safeNormalize<Medication, MedicationEntities, string>(responseData, medicationSchema);
        return normalized;
    },
);

export const fetchMedicationsForCurrentPatient = createTypedAsyncThunk(
    'medications/fetchMedicationsForCurrentPatient',
    async () => {
        const response = await api.patients().readMedicationsForCurrent();
        const responseData = response.data.data.map((o) => new Medication(o));
        const normalized = safeNormalize<Medication, MedicationEntities, Array<string>>(responseData, [medicationSchema]);
        return normalized;
    },
);

export const fetchMedicationsForPatient = createTypedAsyncThunk(
    'medications/fetchMedicationsForPatient',
    async (id: string) => {
        const response = await api.patients().readMedicationsForPatient(id);
        const responseData = response.data.data.map((o) => new Medication(o));
        const normalized = safeNormalize<Medication, MedicationEntities, Array<string>>(responseData, [medicationSchema]);
        return normalized;
    },
);