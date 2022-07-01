import {ServiceChargeLog} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const serviceChargeLogSchema = new schema.Entity('serviceChargeLogs');

export type ServiceChargeLogEntities = SchemaEntities<{
    serviceChargeLog: ServiceChargeLog;
}>