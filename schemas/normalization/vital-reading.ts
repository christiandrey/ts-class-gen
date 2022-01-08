import {VitalReading} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const vitalReadingSchema = new schema.Entity('vitalReadings');

export type VitalReadingEntities = SchemaEntities<{
    vitalReading: VitalReading;
}>