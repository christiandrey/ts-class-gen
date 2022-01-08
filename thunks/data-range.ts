import {DataRangeEntities, dataRangeSchema} from '../../../schemas/normalization/data-range';
import {DataRangeCreationOptions, DataRangeUpdateOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {DataRange} from '../../../entities/data-range';
import {api} from '../../../api';

export const fetchDataRangeById = createTypedAsyncThunk(
    'dataRanges/fetchDataRangeById',
    async (id: string) => {
        const response = await api.dataRanges().readById(id);
        const responseData = new DataRange(response.data.data);
        const normalized = safeNormalize<DataRange, DataRangeEntities, string>(responseData, dataRangeSchema);
        return normalized;
    },
);

export const updateDataRange = createTypedAsyncThunk(
    'dataRanges/updateDataRange',
    async (params: {id: string; options: DataRangeUpdateOptions}) => {
        const {id, options} = params;
        const response = await api.dataRanges().update(id, options);
        const responseData = new DataRange(response.data.data);
        const normalized = safeNormalize<DataRange, DataRangeEntities, string>(responseData, dataRangeSchema);
        return normalized;
    },
);

export const deleteDataRange = createTypedAsyncThunk(
    'dataRanges/deleteDataRange',
    async (id: string) => {
        const response = await api.dataRanges().delete(id);
        return response;
    },
);

export const createDataRangeForHospital = createTypedAsyncThunk(
    'dataRanges/createDataRangeForHospital',
    async (params: {id: string; options: DataRangeCreationOptions}) => {
        const {id, options} = params;
        const response = await api.hospitals().createDataRange(id, options);
        const responseData = new DataRange(response.data.data);
        const normalized = safeNormalize<DataRange, DataRangeEntities, string>(responseData, dataRangeSchema);
        return normalized;
    },
);

export const fetchDataRangesByHospital = createTypedAsyncThunk(
    'dataRanges/fetchDataRangesByHospital',
    async (id: string) => {
        const response = await api.hospitals().readDataRanges(id);
        const responseData = response.data.data.map((o) => new DataRange(o));
        const normalized = safeNormalize<DataRange, DataRangeEntities, Array<string>>(responseData, [dataRangeSchema]);
        return normalized;
    },
);