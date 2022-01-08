import {LabScanEntities, labScanSchema} from '../../../schemas/normalization/lab-scan';
import {LabTestEntities, labTestSchema} from '../../../schemas/normalization/lab-test';
import {LabTestResultEntities, labTestResultSchema} from '../../../schemas/normalization/lab-test-result';
import {LabScanUpdateOptions, LabTestResultCreationOptions, LabTestResultUpdateOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {LabScan} from '../../../entities/lab-scan';
import {LabTest} from '../../../entities/lab-test';
import {LabTestResult} from '../../../entities/lab-test-result';
import {api} from '../../../api';

export const fetchLabTestByCode = createTypedAsyncThunk(
    'labs/fetchLabTestByCode',
    async (code: string) => {
        const response = await api.labs().readLabTestByCode(code);
        const responseData = new LabTest(response.data.data);
        const normalized = safeNormalize<LabTest, LabTestEntities, string>(responseData, labTestSchema);
        return normalized;
    },
);

export const createLabTestResult = createTypedAsyncThunk(
    'labs/createLabTestResult',
    async (params: {id: string; options: LabTestResultCreationOptions}) => {
        const {id, options} = params;
        const response = await api.labs().createLabTestResult(id, options);
        const responseData = new LabTestResult(response.data.data);
        const normalized = safeNormalize<LabTestResult, LabTestResultEntities, string>(responseData, labTestResultSchema);
        return normalized;
    },
);

export const shareLabTest = createTypedAsyncThunk(
    'labs/shareLabTest',
    async (id: string) => {
        const response = await api.labs().shareLabTest(id);
        const responseData = new LabTest(response.data.data);
        const normalized = safeNormalize<LabTest, LabTestEntities, string>(responseData, labTestSchema);
        return normalized;
    },
);

export const stopShareLabTest = createTypedAsyncThunk(
    'labs/stopShareLabTest',
    async (id: string) => {
        const response = await api.labs().stopShareLabTest(id);
        const responseData = new LabTest(response.data.data);
        const normalized = safeNormalize<LabTest, LabTestEntities, string>(responseData, labTestSchema);
        return normalized;
    },
);

export const updateLabScan = createTypedAsyncThunk(
    'labs/updateLabScan',
    async (params: {id: string; options: LabScanUpdateOptions}) => {
        const {id, options} = params;
        const response = await api.labs().updateLabScan(id, options);
        const responseData = new LabScan(response.data.data);
        const normalized = safeNormalize<LabScan, LabScanEntities, string>(responseData, labScanSchema);
        return normalized;
    },
);

export const updateLabTestResult = createTypedAsyncThunk(
    'labs/updateLabTestResult',
    async (params: {id: string; resultId: string; options: LabTestResultUpdateOptions}) => {
        const {id, resultId, options} = params;
        const response = await api.labs().updateLabTestResult(id, resultId, options);
        const responseData = new LabTestResult(response.data.data);
        const normalized = safeNormalize<LabTestResult, LabTestResultEntities, string>(responseData, labTestResultSchema);
        return normalized;
    },
);