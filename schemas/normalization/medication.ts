import {MedicEntities, medicSchema} from './medic';

import {Medication} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const medicationSchema = new schema.Entity('medications', {
    medic: medicSchema,
});

export type MedicationEntities = SchemaEntities<{
    medication: Medication;
}> & MedicEntities;