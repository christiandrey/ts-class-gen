import {MemberEntities, memberSchema} from '../../../schemas/normalization/member';
import {MemberCreationOptions, MemberInvitationOptions, MemberPermissionUpdateOptions, MemberRoleTypeUpdateOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Member} from '../../../entities/member';
import {api} from '../../../api';

export const fetchCurrentMember = createTypedAsyncThunk(
    'members/fetchCurrentMember',
    async () => {
        const response = await api.members().readCurrent();
        const responseData = new Member(response.data.data);
        const normalized = safeNormalize<Member, MemberEntities, string>(responseData, memberSchema);
        return normalized;
    },
);

export const fetchMemberById = createTypedAsyncThunk(
    'members/fetchMemberById',
    async (id: string) => {
        const response = await api.members().readById(id);
        const responseData = new Member(response.data.data);
        const normalized = safeNormalize<Member, MemberEntities, string>(responseData, memberSchema);
        return normalized;
    },
);

export const updateRoleMember = createTypedAsyncThunk(
    'members/updateRoleMember',
    async (params: {id: string; dto: MemberRoleTypeUpdateOptions}) => {
        const {id, dto} = params;
        const response = await api.members().updateRole(id, dto);
        const responseData = new Member(response.data.data);
        const normalized = safeNormalize<Member, MemberEntities, string>(responseData, memberSchema);
        return normalized;
    },
);

export const updatePaymentLimitMember = createTypedAsyncThunk(
    'members/updatePaymentLimitMember',
    async (params: {id: string; paymentLimit: number}) => {
        const {id, paymentLimit} = params;
        const response = await api.members().updatePaymentLimit(id, paymentLimit);
        const responseData = new Member(response.data.data);
        const normalized = safeNormalize<Member, MemberEntities, string>(responseData, memberSchema);
        return normalized;
    },
);

export const updatePermissionsMember = createTypedAsyncThunk(
    'members/updatePermissionsMember',
    async (params: {id: string; dto: MemberPermissionUpdateOptions}) => {
        const {id, dto} = params;
        const response = await api.members().updatePermissions(id, dto);
        const responseData = new Member(response.data.data);
        const normalized = safeNormalize<Member, MemberEntities, string>(responseData, memberSchema);
        return normalized;
    },
);

export const deleteMember = createTypedAsyncThunk(
    'members/deleteMember',
    async (id: string) => {
        const response = await api.members().delete(id);
        return response;
    },
);

export const createMemberForOrganization = createTypedAsyncThunk(
    'members/createMemberForOrganization',
    async (params: {id: string; dto: MemberCreationOptions}) => {
        const {id, dto} = params;
        const response = await api.organizations().createMember(id, dto);
        const responseData = new Member(response.data.data);
        const normalized = safeNormalize<Member, MemberEntities, string>(responseData, memberSchema);
        return normalized;
    },
);

export const inviteMemberForOrganization = createTypedAsyncThunk(
    'members/inviteMemberForOrganization',
    async (params: {id: string; dto: MemberInvitationOptions}) => {
        const {id, dto} = params;
        const response = await api.organizations().inviteMember(id, dto);
        const responseData = new Member(response.data.data);
        const normalized = safeNormalize<Member, MemberEntities, string>(responseData, memberSchema);
        return normalized;
    },
);