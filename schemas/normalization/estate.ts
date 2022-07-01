import {ApartmentTypeEntities, apartmentTypeSchema} from './apartment-type';
import {FacilityManagerEntities, facilityManagerSchema} from './facility-manager';
import {LocationEntities, locationSchema} from './location';
import {OrganizationEntities, organizationSchema} from './organization';
import {ServiceCategoryEntities, serviceCategorySchema} from './service-category';

import {Estate} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const estateSchema = new schema.Entity('estates', {
    facilityManager: facilityManagerSchema,
    organization: organizationSchema,
    apartmentTypes: [apartmentTypeSchema],
    services: [serviceCategorySchema],
    address: locationSchema,
});

export type EstateEntities = SchemaEntities<{
    estate: Estate;
}> & FacilityManagerEntities & OrganizationEntities & ApartmentTypeEntities & ServiceCategoryEntities & LocationEntities;