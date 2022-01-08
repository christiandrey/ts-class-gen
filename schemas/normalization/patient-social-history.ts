import {PatientSocialHistory} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const patientSocialHistorySchema = new schema.Entity('patientSocialHistories');

export type PatientSocialHistoryEntities = SchemaEntities<{
    patientSocialHistory: PatientSocialHistory;
}>