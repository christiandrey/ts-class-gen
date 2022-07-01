import {ServiceChargeLogEntities, serviceChargeLogSchema} from './service-charge-log';
import {UserEntities, userSchema} from './user';

import {Resident} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const residentSchema = new schema.Entity('residents', {
    serviceChargeLogs: [serviceChargeLogSchema],
    user: userSchema,
});

export type ResidentEntities = SchemaEntities<{
    resident: Resident;
}> & ServiceChargeLogEntities & UserEntities;