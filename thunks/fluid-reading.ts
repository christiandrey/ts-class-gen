import {FluidReadingEntities, fluidReadingSchema} from '../../../schemas/normalization/fluid-reading';
import {FluidReadingCreationOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {FluidReading} from '../../../entities/fluid-reading';
import {api} from '../../../api';

export const fetchFluidReadingsByClinicalVisit = createTypedAsyncThunk(
    'fluidReadings/fetchFluidReadingsByClinicalVisit',
    async (id: string) => {
        const response = await api.clinicalVisits().readFluidReadings(id);
        const responseData = response.data.data.map((o) => new FluidReading(o));
        const normalized = safeNormalize<FluidReading, FluidReadingEntities, Array<string>>(responseData, [fluidReadingSchema]);
        return normalized;
    },
);

export const createFluidReadingForEncounter = createTypedAsyncThunk(
    'fluidReadings/createFluidReadingForEncounter',
    async (params: {id: string; options: FluidReadingCreationOptions}) => {
        const {id, options} = params;
        const response = await api.encounters().createFluidReading(id, options);
        const responseData = new FluidReading(response.data.data);
        const normalized = safeNormalize<FluidReading, FluidReadingEntities, string>(responseData, fluidReadingSchema);
        return normalized;
    },
);

export const fetchFluidReadingsByEncounter = createTypedAsyncThunk(
    'fluidReadings/fetchFluidReadingsByEncounter',
    async (id: string) => {
        const response = await api.encounters().readFluidReadings(id);
        const responseData = response.data.data.map((o) => new FluidReading(o));
        const normalized = safeNormalize<FluidReading, FluidReadingEntities, Array<string>>(responseData, [fluidReadingSchema]);
        return normalized;
    },
);