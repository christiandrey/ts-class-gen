import {NonMedicEntities, nonMedicSchema} from './non-medic';

import {LabTestResult} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const labTestResultSchema = new schema.Entity('labTestResults', {
    nonMedic: nonMedicSchema,
});

export type LabTestResultEntities = SchemaEntities<{
    labTestResult: LabTestResult;
}> & NonMedicEntities;