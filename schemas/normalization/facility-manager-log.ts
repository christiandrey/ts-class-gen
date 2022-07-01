import {FacilityManagerLog} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const facilityManagerLogSchema = new schema.Entity('facilityManagerLogs');

export type FacilityManagerLogEntities = SchemaEntities<{
    facilityManagerLog: FacilityManagerLog;
}>