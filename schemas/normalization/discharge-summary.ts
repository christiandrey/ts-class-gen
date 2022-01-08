import {MedicEntities, medicSchema} from './medic';

import {DischargeSummary} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const dischargeSummarySchema = new schema.Entity('dischargeSummaries', {
    medic: medicSchema,
});

export type DischargeSummaryEntities = SchemaEntities<{
    dischargeSummary: DischargeSummary;
}> & MedicEntities;