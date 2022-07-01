import {EstateManagerEntities, estateManagerSchema} from '../../../schemas/normalization/estate-manager';
import {EstateManagerCreationOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {EstateManager} from '../../../entities/estate-manager';
import {api} from '../../../api';

export const fetchEstateManagersByEstate = createTypedAsyncThunk(
    'estateManagers/fetchEstateManagersByEstate',
    async (id: string) => {
        const response = await api.estates().readEstateManagers(id);
        const responseData = response.data.data.map((o) => new EstateManager(o));
        const normalized = safeNormalize<EstateManager, EstateManagerEntities, Array<string>>(responseData, [estateManagerSchema]);
        return normalized;
    },
);

export const createEstateManagerForEstate = createTypedAsyncThunk(
    'estateManagers/createEstateManagerForEstate',
    async (params: {id: string; dto: EstateManagerCreationOptions}) => {
        const {id, dto} = params;
        const response = await api.estates().createEstateManager(id, dto);
        const responseData = new EstateManager(response.data.data);
        const normalized = safeNormalize<EstateManager, EstateManagerEntities, string>(responseData, estateManagerSchema);
        return normalized;
    },
);

export const updateEstateManagerClaimByEstate = createTypedAsyncThunk(
    'estateManagers/updateEstateManagerClaimByEstate',
    async (params: {id: string; estateManagerId: string; claimId: string}) => {
        const {id, estateManagerId, claimId} = params;
        const response = await api.estates().updateEstateManagerClaim(id, estateManagerId, claimId);
        const responseData = new EstateManager(response.data.data);
        const normalized = safeNormalize<EstateManager, EstateManagerEntities, string>(responseData, estateManagerSchema);
        return normalized;
    },
);

export const updateEstateManagerPaymentLimitByEstate = createTypedAsyncThunk(
    'estateManagers/updateEstateManagerPaymentLimitByEstate',
    async (params: {id: string; estateManagerId: string; localAmount: number}) => {
        const {id, estateManagerId, localAmount} = params;
        const response = await api.estates().updateEstateManagerPaymentLimit(id, estateManagerId, localAmount);
        const responseData = new EstateManager(response.data.data);
        const normalized = safeNormalize<EstateManager, EstateManagerEntities, string>(responseData, estateManagerSchema);
        return normalized;
    },
);

export const activateEstateManagerByEstate = createTypedAsyncThunk(
    'estateManagers/activateEstateManagerByEstate',
    async (params: {id: string; estateManagerId: string}) => {
        const {id, estateManagerId} = params;
        const response = await api.estates().activateEstateManager(id, estateManagerId);
        const responseData = new EstateManager(response.data.data);
        const normalized = safeNormalize<EstateManager, EstateManagerEntities, string>(responseData, estateManagerSchema);
        return normalized;
    },
);

export const deactivateEstateManagerByEstate = createTypedAsyncThunk(
    'estateManagers/deactivateEstateManagerByEstate',
    async (params: {id: string; estateManagerId: string}) => {
        const {id, estateManagerId} = params;
        const response = await api.estates().deactivateEstateManager(id, estateManagerId);
        const responseData = new EstateManager(response.data.data);
        const normalized = safeNormalize<EstateManager, EstateManagerEntities, string>(responseData, estateManagerSchema);
        return normalized;
    },
);

export const fetchEstateManagersByMember = createTypedAsyncThunk(
    'estateManagers/fetchEstateManagersByMember',
    async (id: string) => {
        const response = await api.members().readEstateManagers(id);
        const responseData = response.data.data.map((o) => new EstateManager(o));
        const normalized = safeNormalize<EstateManager, EstateManagerEntities, Array<string>>(responseData, [estateManagerSchema]);
        return normalized;
    },
);