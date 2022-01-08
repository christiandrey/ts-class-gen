import {FluidReading} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const fluidReadingSchema = new schema.Entity('fluidReadings');

export type FluidReadingEntities = SchemaEntities<{
    fluidReading: FluidReading;
}>