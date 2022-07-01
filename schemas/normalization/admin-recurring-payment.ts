import {CurrencyEntities, currencySchema} from './currency';
import {EstateEntities, estateSchema} from './estate';
import {PaymentAccountEntities, paymentAccountSchema} from './payment-account';
import {PaymentBeneficiaryEntities, paymentBeneficiarySchema} from './payment-beneficiary';
import {ServiceCategoryEntities, serviceCategorySchema} from './service-category';
import {UserEntities, userSchema} from './user';

import {AdminRecurringPayment} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const adminRecurringPaymentSchema = new schema.Entity('adminRecurringPayments', {
    estate: estateSchema,
    user: userSchema,
    currency: currencySchema,
    recipient: userSchema,
    beneficiary: paymentBeneficiarySchema,
    serviceCategory: serviceCategorySchema,
    paymentAccount: paymentAccountSchema,
});

export type AdminRecurringPaymentEntities = SchemaEntities<{
    adminRecurringPayment: AdminRecurringPayment;
}> & EstateEntities & UserEntities & CurrencyEntities & UserEntities & PaymentBeneficiaryEntities & ServiceCategoryEntities & PaymentAccountEntities;