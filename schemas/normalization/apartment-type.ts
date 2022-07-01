import {ServiceCategoryEntities, serviceCategorySchema} from './service-category';

import {ApartmentType} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const apartmentTypeSchema = new schema.Entity('apartmentTypes', {
    services: [serviceCategorySchema],
});

export type ApartmentTypeEntities = SchemaEntities<{
    apartmentType: ApartmentType;
}> & ServiceCategoryEntities;