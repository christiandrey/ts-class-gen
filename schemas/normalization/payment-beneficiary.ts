import {PaymentBeneficiary} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const paymentBeneficiarySchema = new schema.Entity('paymentBeneficiaries');

export type PaymentBeneficiaryEntities = SchemaEntities<{
    paymentBeneficiary: PaymentBeneficiary;
}>