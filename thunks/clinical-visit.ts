import {ClinicalVisitEntities, clinicalVisitSchema} from '../../../schemas/normalization/clinical-visit';
import {ClinicalVisitType} from '../../../typings';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {ClinicalVisit} from '../../../entities/clinical-visit';
import {api} from '../../../api';

export const fetchClinicalVisitById = createTypedAsyncThunk(
    'clinicalVisits/fetchClinicalVisitById',
    async (id: string) => {
        const response = await api.clinicalVisits().readById(id);
        const responseData = new ClinicalVisit(response.data.data);
        const normalized = safeNormalize<ClinicalVisit, ClinicalVisitEntities, string>(responseData, clinicalVisitSchema);
        return normalized;
    },
);

export const createClinicalVisitForPatient = createTypedAsyncThunk(
    'clinicalVisits/createClinicalVisitForPatient',
    async (params: {id: string; type?: ClinicalVisitType}) => {
        const {id, type} = params;
        const response = await api.patients().createClinicalVisit(id, type);
        const responseData = new ClinicalVisit(response.data.data);
        const normalized = safeNormalize<ClinicalVisit, ClinicalVisitEntities, string>(responseData, clinicalVisitSchema);
        return normalized;
    },
);

export const fetchClinicalVisitsForCurrentPatient = createTypedAsyncThunk(
    'clinicalVisits/fetchClinicalVisitsForCurrentPatient',
    async () => {
        const response = await api.patients().readClinicalVisitsForCurrent();
        const responseData = response.data.data.map((o) => new ClinicalVisit(o));
        const normalized = safeNormalize<ClinicalVisit, ClinicalVisitEntities, Array<string>>(responseData, [clinicalVisitSchema]);
        return normalized;
    },
);

export const fetchClinicalVisitsForPatient = createTypedAsyncThunk(
    'clinicalVisits/fetchClinicalVisitsForPatient',
    async (id: string) => {
        const response = await api.patients().readClinicalVisitsForPatient(id);
        const responseData = response.data.data.map((o) => new ClinicalVisit(o));
        const normalized = safeNormalize<ClinicalVisit, ClinicalVisitEntities, Array<string>>(responseData, [clinicalVisitSchema]);
        return normalized;
    },
);