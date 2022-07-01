import {EstateEntities, estateSchema} from './estate';
import {PaymentEntities, paymentSchema} from './payment';
import {ProjectResourceEntities, projectResourceSchema} from './project-resource';
import {ResidentEntities, residentSchema} from './resident';
import {ServiceCategoryEntities, serviceCategorySchema} from './service-category';
import {VendorEntities, vendorSchema} from './vendor';

import {Project} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const projectSchema = new schema.Entity('projects', {
    vendor: vendorSchema,
    resident: residentSchema,
    payment: paymentSchema,
    resources: [projectResourceSchema],
    category: serviceCategorySchema,
    estate: estateSchema,
});

export type ProjectEntities = SchemaEntities<{
    project: Project;
}> & VendorEntities & ResidentEntities & PaymentEntities & ProjectResourceEntities & ServiceCategoryEntities & EstateEntities;