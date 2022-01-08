import {ServiceCategory} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const serviceCategorySchema = new schema.Entity('serviceCategories');

export type ServiceCategoryEntities = SchemaEntities<{
    serviceCategory: ServiceCategory;
}>