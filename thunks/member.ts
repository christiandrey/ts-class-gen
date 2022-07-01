import {MemberEntities, memberSchema} from '../../../schemas/normalization/member';
import {MemberCreationOptions, MemberInvitationOptions, MemberRoleTypeUpdateOptions} from '../../../typings/dtos';
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