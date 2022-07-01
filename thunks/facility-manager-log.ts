import {FacilityManagerLogEntities, facilityManagerLogSchema} from '../../../schemas/normalization/facility-manager-log';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {FacilityManagerLog} from '../../../entities/facility-manager-log';
import {api} from '../../../api';

export const fetchFacilityManagerLogsByEstate = createTypedAsyncThunk(
    'facilityManagerLogs/fetchFacilityManagerLogsByEstate',
    async (id: string) => {
        const response = await api.estates().readFacilityManagerLogs(id);
        const responseData = response.data.data.map((o) => new FacilityManagerLog(o));
        const normalized = safeNormalize<FacilityManagerLog, FacilityManagerLogEntities, Array<string>>(responseData, [facilityManagerLogSchema]);
        return normalized;
    },
);