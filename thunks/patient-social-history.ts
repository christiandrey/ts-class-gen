import {PatientSocialHistoryEntities, patientSocialHistorySchema} from '../../../schemas/normalization/patient-social-history';
import {PatientSocialHistoryUpdateOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {PatientSocialHistory} from '../../../entities/patient-social-history';
import {api} from '../../../api';

export const updatePatientSocialHistoryByPatient = createTypedAsyncThunk(
    'patientSocialHistories/updatePatientSocialHistoryByPatient',
    async (params: {id: string; options: PatientSocialHistoryUpdateOptions}) => {
        const {id, options} = params;
        const response = await api.patients().updatePatientSocialHistory(id, options);
        const responseData = new PatientSocialHistory(response.data.data);
        const normalized = safeNormalize<PatientSocialHistory, PatientSocialHistoryEntities, string>(responseData, patientSocialHistorySchema);
        return normalized;
    },
);