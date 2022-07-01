import {EstateEntities, estateSchema} from './estate';
import {EstateManagerEntities, estateManagerSchema} from './estate-manager';
import {PaymentAccountEntities, paymentAccountSchema} from './payment-account';
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
    paymentAccount: paymentAccountSchema,
    estateManager: estateManagerSchema,
});

export type PaymentRequestEntities = SchemaEntities<{
    paymentRequest: PaymentRequest;
}> & EstateEntities & UserEntities & ServiceCategoryEntities & PaymentBeneficiaryEntities & PaymentAccountEntities & EstateManagerEntities;