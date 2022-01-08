import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {FluidReading} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const fluidReadingsAdapter = createEntityAdapter<Normalized<FluidReading>>();

const selectors = fluidReadingsAdapter.getSelectors<GlobalState>((state) => state.fluidReadings);

export const {
    selectById: fluidReadingByIdSelector,
    selectAll: allFluidReadingsSelector,
    selectEntities: fluidReadingEntitiesSelector,
} = selectors;

export default fluidReadingsAdapter;