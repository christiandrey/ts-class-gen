import {VitalReadingEntities, vitalReadingSchema} from '../../../schemas/normalization/vital-reading';
import {VitalReadingCreationOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {VitalReading} from '../../../entities/vital-reading';
import {api} from '../../../api';

export const createVitalReadingForEncounter = createTypedAsyncThunk(
    'vitalReadings/createVitalReadingForEncounter',
    async (params: {id: string; options: VitalReadingCreationOptions}) => {
        const {id, options} = params;
        const response = await api.encounters().createVitalReading(id, options);
        const responseData = new VitalReading(response.data.data);
        const normalized = safeNormalize<VitalReading, VitalReadingEntities, string>(responseData, vitalReadingSchema);
        return normalized;
    },
);

export const fetchLatestVitalReadingForCurrentPatient = createTypedAsyncThunk(
    'vitalReadings/fetchLatestVitalReadingForCurrentPatient',
    async () => {
        const response = await api.patients().readLatestVitalReadingForCurrent();
        const responseData = new VitalReading(response.data.data);
        const normalized = safeNormalize<VitalReading, VitalReadingEntities, string>(responseData, vitalReadingSchema);
        return normalized;
    },
);

export const fetchLatestVitalReadingForPatient = createTypedAsyncThunk(
    'vitalReadings/fetchLatestVitalReadingForPatient',
    async (id: string) => {
        const response = await api.patients().readLatestVitalReadingForPatient(id);
        const responseData = new VitalReading(response.data.data);
        const normalized = safeNormalize<VitalReading, VitalReadingEntities, string>(responseData, vitalReadingSchema);
        return normalized;
    },
);