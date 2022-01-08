import {DischargeSummaryEntities, dischargeSummarySchema} from '../../../schemas/normalization/discharge-summary';
import {DischargeSummaryCreationOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {DischargeSummary} from '../../../entities/discharge-summary';
import {api} from '../../../api';

export const createDischargeSummaryForClinicalVisit = createTypedAsyncThunk(
    'dischargeSummaries/createDischargeSummaryForClinicalVisit',
    async (params: {id: string; options: DischargeSummaryCreationOptions}) => {
        const {id, options} = params;
        const response = await api.clinicalVisits().createDischargeSummary(id, options);
        const responseData = new DischargeSummary(response.data.data);
        const normalized = safeNormalize<DischargeSummary, DischargeSummaryEntities, string>(responseData, dischargeSummarySchema);
        return normalized;
    },
);