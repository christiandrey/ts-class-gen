import {MedicEntities, medicSchema} from './medic';

import {InvoiceItem} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const invoiceItemSchema = new schema.Entity('invoiceItems', {
    medic: medicSchema,
});

export type InvoiceItemEntities = SchemaEntities<{
    invoiceItem: InvoiceItem;
}> & MedicEntities;