import {LabScanEntities, labScanSchema} from '../../../schemas/normalization/lab-scan';
import {LabScanCreationOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {LabScan} from '../../../entities/lab-scan';
import {api} from '../../../api';

export const createLabScanForEncounter = createTypedAsyncThunk(
    'labScans/createLabScanForEncounter',
    async (params: {id: string; options: LabScanCreationOptions}) => {
        const {id, options} = params;
        const response = await api.encounters().createLabScan(id, options);
        const responseData = new LabScan(response.data.data);
        const normalized = safeNormalize<LabScan, LabScanEntities, string>(responseData, labScanSchema);
        return normalized;
    },
);

export const fetchLabScansByEncounter = createTypedAsyncThunk(
    'labScans/fetchLabScansByEncounter',
    async (id: string) => {
        const response = await api.encounters().readLabScans(id);
        const responseData = response.data.data.map((o) => new LabScan(o));
        const normalized = safeNormalize<LabScan, LabScanEntities, Array<string>>(responseData, [labScanSchema]);
        return normalized;
    },
);

export const fetchLabScansForCurrentPatient = createTypedAsyncThunk(
    'labScans/fetchLabScansForCurrentPatient',
    async () => {
        const response = await api.patients().readLabScansForCurrent();
        const responseData = response.data.data.map((o) => new LabScan(o));
        const normalized = safeNormalize<LabScan, LabScanEntities, Array<string>>(responseData, [labScanSchema]);
        return normalized;
    },
);

export const fetchLabScansForPatient = createTypedAsyncThunk(
    'labScans/fetchLabScansForPatient',
    async (id: string) => {
        const response = await api.patients().readLabScansForPatient(id);
        const responseData = response.data.data.map((o) => new LabScan(o));
        const normalized = safeNormalize<LabScan, LabScanEntities, Array<string>>(responseData, [labScanSchema]);
        return normalized;
    },
);