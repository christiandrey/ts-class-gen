import {EstateEntities, estateSchema} from './estate';
import {PaymentBeneficiaryEntities, paymentBeneficiarySchema} from './payment-beneficiary';
import {ServiceCategoryEntities, serviceCategorySchema} from './service-category';
import {TransactionEntities, transactionSchema} from './transaction';
import {UserEntities, userSchema} from './user';

import {Payment} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const paymentSchema = new schema.Entity('payments', {
    estate: estateSchema,
    serviceCategory: serviceCategorySchema,
    beneficiary: paymentBeneficiarySchema,
    user: userSchema,
    recipient: userSchema,
    debitTransaction: transactionSchema,
});

export type PaymentEntities = SchemaEntities<{
    payment: Payment;
}> & EstateEntities & ServiceCategoryEntities & PaymentBeneficiaryEntities & UserEntities & UserEntities & TransactionEntities;