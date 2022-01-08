import {InvoiceItemEntities, invoiceItemSchema} from '../../../schemas/normalization/invoice-item';
import {InvoiceItemCreationOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {InvoiceItem} from '../../../entities/invoice-item';
import {api} from '../../../api';

export const createForInvoice = createTypedAsyncThunk(
    'invoiceItems/createForInvoice',
    async (params: {id: string; items: Array<InvoiceItemCreationOptions>}) => {
        const {id, items} = params;
        const response = await api.invoices().create(id, items);
        const responseData = response.data.data.map((o) => new InvoiceItem(o));
        const normalized = safeNormalize<InvoiceItem, InvoiceItemEntities, Array<string>>(responseData, [invoiceItemSchema]);
        return normalized;
    },
);