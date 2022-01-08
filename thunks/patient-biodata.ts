import {PatientBiodataEntities, patientBiodataSchema} from '../../../schemas/normalization/patient-biodata';
import {PatientBiodataUpdateOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {PatientBiodata} from '../../../entities/patient-biodata';
import {api} from '../../../api';

export const updatePatientBiodataByPatient = createTypedAsyncThunk(
    'patientBiodatas/updatePatientBiodataByPatient',
    async (params: {id: string; options: PatientBiodataUpdateOptions}) => {
        const {id, options} = params;
        const response = await api.patients().updatePatientBiodata(id, options);
        const responseData = new PatientBiodata(response.data.data);
        const normalized = safeNormalize<PatientBiodata, PatientBiodataEntities, string>(responseData, patientBiodataSchema);
        return normalized;
    },
);