import {MedicEntities, medicSchema} from './medic';
import {NonMedicEntities, nonMedicSchema} from './non-medic';

import {LabScan} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const labScanSchema = new schema.Entity('labScans', {
    medic: medicSchema,
    nonMedic: nonMedicSchema,
});

export type LabScanEntities = SchemaEntities<{
    labScan: LabScan;
}> & MedicEntities & NonMedicEntities;