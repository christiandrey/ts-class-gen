import {LabTestEntities, labTestSchema} from '../../../schemas/normalization/lab-test';
import {PaginatedQueryParams} from '../../../typings';
import {LabTestCreationOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {LabTest} from '../../../entities/lab-test';
import {api} from '../../../api';

export const createLabTestForEncounter = createTypedAsyncThunk(
    'labTests/createLabTestForEncounter',
    async (params: {id: string; options: LabTestCreationOptions}) => {
        const {id, options} = params;
        const response = await api.encounters().createLabTest(id, options);
        const responseData = new LabTest(response.data.data);
        const normalized = safeNormalize<LabTest, LabTestEntities, string>(responseData, labTestSchema);
        return normalized;
    },
);

export const fetchLabTestsByHospital = createTypedAsyncThunk(
    'labTests/fetchLabTestsByHospital',
    async (params: PaginatedQueryParams<{id: string}>) => {
        const {id, query, page, pageSize} = params;
        const response = await api.hospitals().readLabTests(id, query, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new LabTest(o));
        const normalized = safeNormalize<LabTest, LabTestEntities, Array<string>>(responseData, [labTestSchema]);
        return {...normalized, meta};
    },
);

export const fetchLabTestsForCurrentPatient = createTypedAsyncThunk(
    'labTests/fetchLabTestsForCurrentPatient',
    async () => {
        const response = await api.patients().readLabTestsForCurrent();
        const responseData = response.data.data.map((o) => new LabTest(o));
        const normalized = safeNormalize<LabTest, LabTestEntities, Array<string>>(responseData, [labTestSchema]);
        return normalized;
    },
);

export const fetchLabTestsForPatient = createTypedAsyncThunk(
    'labTests/fetchLabTestsForPatient',
    async (id: string) => {
        const response = await api.patients().readLabTestsForPatient(id);
        const responseData = response.data.data.map((o) => new LabTest(o));
        const normalized = safeNormalize<LabTest, LabTestEntities, Array<string>>(responseData, [labTestSchema]);
        return normalized;
    },
);