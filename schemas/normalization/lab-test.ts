import {LabTestResultEntities, labTestResultSchema} from './lab-test-result';

import {LabTest} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const labTestSchema = new schema.Entity('labTests', {
    results: [labTestResultSchema],
});

export type LabTestEntities = SchemaEntities<{
    labTest: LabTest;
}> & LabTestResultEntities;