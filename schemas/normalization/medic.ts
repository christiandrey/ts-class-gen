import {HospitalEntities, hospitalSchema} from './hospital';
import {ServiceCategoryEntities, serviceCategorySchema} from './service-category';
import {UserEntities, userSchema} from './user';

import {Medic} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const medicSchema = new schema.Entity('medics', {
    user: userSchema,
    hospital: hospitalSchema,
    services: [serviceCategorySchema],
});

export type MedicEntities = SchemaEntities<{
    medic: Medic;
}> & UserEntities & HospitalEntities & ServiceCategoryEntities;