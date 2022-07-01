import {ResidentInvitationEntities, residentInvitationSchema} from '../../../schemas/normalization/resident-invitation';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {ResidentInvitation} from '../../../entities/resident-invitation';
import {api} from '../../../api';

export const fetchResidentInvitationsByFacilityManager = createTypedAsyncThunk(
    'residentInvitations/fetchResidentInvitationsByFacilityManager',
    async () => {
        const response = await api.facilityManagers().readResidentInvitations();
        const responseData = response.data.data.map((o) => new ResidentInvitation(o));
        const normalized = safeNormalize<ResidentInvitation, ResidentInvitationEntities, Array<string>>(responseData, [residentInvitationSchema]);
        return normalized;
    },
);