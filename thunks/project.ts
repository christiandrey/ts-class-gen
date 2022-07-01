import {ProjectEntities, projectSchema} from '../../../schemas/normalization/project';
import {PaginatedQueryParams} from '../../../typings';
import {ProjectCreationOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Project} from '../../../entities/project';
import {ProjectLite} from '../../../entities/project-lite';
import {ProjectStatusUpdate} from '../../../entities/project-status-update';
import {api} from '../../../api';

export const fetchProjectsByEstate = createTypedAsyncThunk(
    'projects/fetchProjectsByEstate',
    async (params: PaginatedQueryParams<{id: string; projectQuery: ProjectQuery}>) => {
        const {id, projectQuery, page, pageSize} = params;
        const response = await api.estates().readProjects(id, projectQuery, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new ProjectLite(o));
        const normalized = safeNormalize<Project, ProjectEntities, Array<string>>(responseData, [projectSchema]);
        return {...normalized, meta};
    },
);

export const fetchPublicProjectsByEstate = createTypedAsyncThunk(
    'projects/fetchPublicProjectsByEstate',
    async (params: PaginatedQueryParams<{id: string; projectQuery: ProjectQuery}>) => {
        const {id, projectQuery, page, pageSize} = params;
        const response = await api.estates().readPublicProjects(id, projectQuery, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new ProjectLite(o));
        const normalized = safeNormalize<Project, ProjectEntities, Array<string>>(responseData, [projectSchema]);
        return {...normalized, meta};
    },
);

export const fetchProjectsByFacilityManager = createTypedAsyncThunk(
    'projects/fetchProjectsByFacilityManager',
    async (params: PaginatedQueryParams<{projectQuery: ProjectQuery}>) => {
        const {projectQuery, page, pageSize} = params;
        const response = await api.facilityManagers().readProjects(projectQuery, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new ProjectLite(o));
        const normalized = safeNormalize<Project, ProjectEntities, Array<string>>(responseData, [projectSchema]);
        return {...normalized, meta};
    },
);

export const createProject = createTypedAsyncThunk(
    'projects/createProject',
    async (dto: ProjectCreationOptions) => {
        const response = await api.projects().create(dto);
        const responseData = new Project(response.data.data);
        const normalized = safeNormalize<Project, ProjectEntities, string>(responseData, projectSchema);
        return normalized;
    },
);

export const fetchProjectById = createTypedAsyncThunk(
    'projects/fetchProjectById',
    async (id: string) => {
        const response = await api.projects().readById(id);
        const responseData = new Project(response.data.data);
        const normalized = safeNormalize<Project, ProjectEntities, string>(responseData, projectSchema);
        return normalized;
    },
);

export const fetchAllProject = createTypedAsyncThunk(
    'projects/fetchAllProject',
    async (params: PaginatedQueryParams<{projectQuery: ProjectQuery}>) => {
        const {projectQuery, page, pageSize} = params;
        const response = await api.projects().readAll(projectQuery, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new ProjectLite(o));
        const normalized = safeNormalize<Project, ProjectEntities, Array<string>>(responseData, [projectSchema]);
        return {...normalized, meta};
    },
);

export const assignVendorProject = createTypedAsyncThunk(
    'projects/assignVendorProject',
    async (params: {id: string; vendorId: string}) => {
        const {id, vendorId} = params;
        const response = await api.projects().assignVendor(id, vendorId);
        const responseData = new Project(response.data.data);
        const normalized = safeNormalize<Project, ProjectEntities, string>(responseData, projectSchema);
        return normalized;
    },
);

export const updateStatusProject = createTypedAsyncThunk(
    'projects/updateStatusProject',
    async (params: {id: string; dto: ProjectStatusUpdate}) => {
        const {id, dto} = params;
        const response = await api.projects().updateStatus(id, dto);
        const responseData = new Project(response.data.data);
        const normalized = safeNormalize<Project, ProjectEntities, string>(responseData, projectSchema);
        return normalized;
    },
);

export const makePaymentProject = createTypedAsyncThunk(
    'projects/makePaymentProject',
    async (params: {id: string; localAmount: number}) => {
        const {id, localAmount} = params;
        const response = await api.projects().makePayment(id, localAmount);
        const responseData = new Project(response.data.data);
        const normalized = safeNormalize<Project, ProjectEntities, string>(responseData, projectSchema);
        return normalized;
    },
);

export const deleteProject = createTypedAsyncThunk(
    'projects/deleteProject',
    async (id: string) => {
        const response = await api.projects().delete(id);
        return response;
    },
);

export const fetchProjectsByResident = createTypedAsyncThunk(
    'projects/fetchProjectsByResident',
    async (params: PaginatedQueryParams<{projectQuery: ProjectQuery}>) => {
        const {projectQuery, page, pageSize} = params;
        const response = await api.residents().readProjects(projectQuery, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new ProjectLite(o));
        const normalized = safeNormalize<Project, ProjectEntities, Array<string>>(responseData, [projectSchema]);
        return {...normalized, meta};
    },
);

export const fetchProjectsByResident = createTypedAsyncThunk(
    'projects/fetchProjectsByResident',
    async (params: PaginatedQueryParams<{projectQuery: ProjectQuery; id: string}>) => {
        const {projectQuery, id, page, pageSize} = params;
        const response = await api.residents().readProjectsByResident(projectQuery, id, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new ProjectLite(o));
        const normalized = safeNormalize<Project, ProjectEntities, Array<string>>(responseData, [projectSchema]);
        return {...normalized, meta};
    },
);

export const fetchProjectsByVendor = createTypedAsyncThunk(
    'projects/fetchProjectsByVendor',
    async (params: PaginatedQueryParams<{projectQuery: ProjectQuery}>) => {
        const {projectQuery, page, pageSize} = params;
        const response = await api.vendors().readProjects(projectQuery, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new ProjectLite(o));
        const normalized = safeNormalize<Project, ProjectEntities, Array<string>>(responseData, [projectSchema]);
        return {...normalized, meta};
    },
);

export const fetchProjectsByVendor = createTypedAsyncThunk(
    'projects/fetchProjectsByVendor',
    async (params: PaginatedQueryParams<{id: string; projectQuery: ProjectQuery}>) => {
        const {id, projectQuery, page, pageSize} = params;
        const response = await api.vendors().readProjectsByVendor(id, projectQuery, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new ProjectLite(o));
        const normalized = safeNormalize<Project, ProjectEntities, Array<string>>(responseData, [projectSchema]);
        return {...normalized, meta};
    },
);