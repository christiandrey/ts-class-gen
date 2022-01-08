import {PatientEntities, patientSchema} from '../../../schemas/normalization/patient';
import {PaginatedQueryParams} from '../../../typings';
import {PatientCreationOptions, PatientUpdateOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Patient} from '../../../entities/patient';
import {PatientLite} from '../../../entities/patient-lite';
import {api} from '../../../api';

export const fetchPatientsByHospital = createTypedAsyncThunk(
    'patients/fetchPatientsByHospital',
    async (params: PaginatedQueryParams<{id: string}>) => {
        const {id, query, page, pageSize} = params;
        const response = await api.hospitals().readPatients(id, query, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new PatientLite(o));
        const normalized = safeNormalize<Patient, PatientEntities, Array<string>>(responseData, [patientSchema]);
        return {...normalized, meta};
    },
);

export const createPatientForHospital = createTypedAsyncThunk(
    'patients/createPatientForHospital',
    async (params: {id: string; options: PatientCreationOptions}) => {
        const {id, options} = params;
        const response = await api.hospitals().createPatient(id, options);
        const responseData = new Patient(response.data.data);
        const normalized = safeNormalize<Patient, PatientEntities, string>(responseData, patientSchema);
        return normalized;
    },
);

export const fetchCurrentPatient = createTypedAsyncThunk(
    'patients/fetchCurrentPatient',
    async () => {
        const response = await api.patients().readCurrent();
        const responseData = new Patient(response.data.data);
        const normalized = safeNormalize<Patient, PatientEntities, string>(responseData, patientSchema);
        return normalized;
    },
);

export const fetchPatientById = createTypedAsyncThunk(
    'patients/fetchPatientById',
    async (id: string) => {
        const response = await api.patients().readById(id);
        const responseData = new Patient(response.data.data);
        const normalized = safeNormalize<Patient, PatientEntities, string>(responseData, patientSchema);
        return normalized;
    },
);

export const updatePatient = createTypedAsyncThunk(
    'patients/updatePatient',
    async (params: {id: string; options: PatientUpdateOptions}) => {
        const {id, options} = params;
        const response = await api.patients().updatePatient(id, options);
        const responseData = new Patient(response.data.data);
        const normalized = safeNormalize<Patient, PatientEntities, string>(responseData, patientSchema);
        return normalized;
    },
);

export const deletePatient = createTypedAsyncThunk(
    'patients/deletePatient',
    async (id: string) => {
        const response = await api.patients().delete(id);
        return response;
    },
);