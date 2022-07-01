import {EstateEntities, estateSchema} from './estate';
import {MemberEntities, memberSchema} from './member';
import {PaymentBeneficiaryEntities, paymentBeneficiarySchema} from './payment-beneficiary';
import {ServiceCategoryEntities, serviceCategorySchema} from './service-category';
import {UserEntities, userSchema} from './user';

import {PaymentRequest} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const paymentRequestSchema = new schema.Entity('paymentRequests', {
    estate: estateSchema,
    recipient: userSchema,
    serviceCategory: serviceCategorySchema,
    beneficiary: paymentBeneficiarySchema,
    member: memberSchema,
});

export type PaymentRequestEntities = SchemaEntities<{
    paymentRequest: PaymentRequest;
}> & EstateEntities & UserEntities & ServiceCategoryEntities & PaymentBeneficiaryEntities & MemberEntities;