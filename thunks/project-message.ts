import {ProjectMessageEntities, projectMessageSchema} from '../../../schemas/normalization/project-message';
import {ProjectMessageCreationOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {ProjectMessage} from '../../../entities/project-message';
import {api} from '../../../api';

export const createMessageForProject = createTypedAsyncThunk(
    'projectMessages/createMessageForProject',
    async (params: {id: string; dto: ProjectMessageCreationOptions}) => {
        const {id, dto} = params;
        const response = await api.projects().createMessage(id, dto);
        const responseData = new ProjectMessage(response.data.data);
        const normalized = safeNormalize<ProjectMessage, ProjectMessageEntities, string>(responseData, projectMessageSchema);
        return normalized;
    },
);

export const fetchMessagesByProject = createTypedAsyncThunk(
    'projectMessages/fetchMessagesByProject',
    async (id: string) => {
        const response = await api.projects().readMessages(id);
        const responseData = response.data.data.map((o) => new ProjectMessage(o));
        const normalized = safeNormalize<ProjectMessage, ProjectMessageEntities, Array<string>>(responseData, [projectMessageSchema]);
        return normalized;
    },
);

export const fetchMessageProjectById = createTypedAsyncThunk(
    'projectMessages/fetchMessageProjectById',
    async (params: {id: string; projectMessageId: string}) => {
        const {id, projectMessageId} = params;
        const response = await api.projects().readMessageById(id, projectMessageId);
        const responseData = new ProjectMessage(response.data.data);
        const normalized = safeNormalize<ProjectMessage, ProjectMessageEntities, string>(responseData, projectMessageSchema);
        return normalized;
    },
);