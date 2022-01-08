import {DataRange} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const dataRangeSchema = new schema.Entity('dataRanges');

export type DataRangeEntities = SchemaEntities<{
    dataRange: DataRange;
}>