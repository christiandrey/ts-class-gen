import {EstateEntities, estateSchema} from './estate';
import {ServiceCategoryEntities, serviceCategorySchema} from './service-category';
import {UserEntities, userSchema} from './user';

import {Vendor} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const vendorSchema = new schema.Entity('vendors', {
    estates: [estateSchema],
    user: userSchema,
    services: [serviceCategorySchema],
});

export type VendorEntities = SchemaEntities<{
    vendor: Vendor;
}> & EstateEntities & UserEntities & ServiceCategoryEntities;