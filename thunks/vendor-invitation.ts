import {VendorInvitationEntities, vendorInvitationSchema} from '../../../schemas/normalization/vendor-invitation';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {VendorInvitation} from '../../../entities/vendor-invitation';
import {api} from '../../../api';

export const fetchVendorInvitationsByFacilityManager = createTypedAsyncThunk(
    'vendorInvitations/fetchVendorInvitationsByFacilityManager',
    async () => {
        const response = await api.facilityManagers().readVendorInvitations();
        const responseData = response.data.data.map((o) => new VendorInvitation(o));
        const normalized = safeNormalize<VendorInvitation, VendorInvitationEntities, Array<string>>(responseData, [vendorInvitationSchema]);
        return normalized;
    },
);