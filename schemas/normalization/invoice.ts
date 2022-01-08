import {InvoiceItemEntities, invoiceItemSchema} from './invoice-item';
import {NonMedicEntities, nonMedicSchema} from './non-medic';
import {TransactionEntities, transactionSchema} from './transaction';

import {Invoice} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const invoiceSchema = new schema.Entity('invoices', {
    items: [invoiceItemSchema],
    transaction: transactionSchema,
    nonMedic: nonMedicSchema,
});

export type InvoiceEntities = SchemaEntities<{
    invoice: Invoice;
}> & InvoiceItemEntities & TransactionEntities & NonMedicEntities;