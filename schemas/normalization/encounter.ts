import {LabScanEntities, labScanSchema} from './lab-scan';
import {LabTestEntities, labTestSchema} from './lab-test';
import {MedicEntities, medicSchema} from './medic';
import {VitalReadingEntities, vitalReadingSchema} from './vital-reading';

import {Encounter} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const encounterSchema = new schema.Entity('encounters', {
    vitalReading: vitalReadingSchema,
    labTest: labTestSchema,
    labScans: [labScanSchema],
    medic: medicSchema,
});

export type EncounterEntities = SchemaEntities<{
    encounter: Encounter;
}> & VitalReadingEntities & LabTestEntities & LabScanEntities & MedicEntities;