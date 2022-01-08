import {CountryEntities, countrySchema} from './country';
import {PatientBiodataEntities, patientBiodataSchema} from './patient-biodata';
import {PatientSocialHistoryEntities, patientSocialHistorySchema} from './patient-social-history';
import {StateEntities, stateSchema} from './state';
import {UserEntities, userSchema} from './user';

import {Patient} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const patientSchema = new schema.Entity('patients', {
    biodata: patientBiodataSchema,
    socialHistory: patientSocialHistorySchema,
    state: stateSchema,
    country: countrySchema,
    user: userSchema,
});

export type PatientEntities = SchemaEntities<{
    patient: Patient;
}> & PatientBiodataEntities & PatientSocialHistoryEntities & StateEntities & CountryEntities & UserEntities;