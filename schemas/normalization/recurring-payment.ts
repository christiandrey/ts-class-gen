import {CurrencyEntities, currencySchema} from './currency';
import {PaymentAccountEntities, paymentAccountSchema} from './payment-account';
import {PaymentBeneficiaryEntities, paymentBeneficiarySchema} from './payment-beneficiary';
import {ServiceCategoryEntities, serviceCategorySchema} from './service-category';
import {UserEntities, userSchema} from './user';

import {RecurringPayment} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const recurringPaymentSchema = new schema.Entity('recurringPayments', {
    currency: currencySchema,
    recipient: userSchema,
    beneficiary: paymentBeneficiarySchema,
    serviceCategory: serviceCategorySchema,
    paymentAccount: paymentAccountSchema,
});

export type RecurringPaymentEntities = SchemaEntities<{
    recurringPayment: RecurringPayment;
}> & CurrencyEntities & UserEntities & PaymentBeneficiaryEntities & ServiceCategoryEntities & PaymentAccountEntities;