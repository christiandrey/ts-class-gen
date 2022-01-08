import {InvoiceEntities, invoiceSchema} from '../../../schemas/normalization/invoice';
import {PaginatedQueryParams} from '../../../typings';
import {InvoiceCreationOptions, InvoiceSettleOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Invoice} from '../../../entities/invoice';
import {InvoiceLite} from '../../../entities/invoice-lite';
import {api} from '../../../api';

export const createInvoiceForClinicalVisit = createTypedAsyncThunk(
    'invoices/createInvoiceForClinicalVisit',
    async (params: {id: string; options: InvoiceCreationOptions}) => {
        const {id, options} = params;
        const response = await api.clinicalVisits().createInvoice(id, options);
        const responseData = new Invoice(response.data.data);
        const normalized = safeNormalize<Invoice, InvoiceEntities, string>(responseData, invoiceSchema);
        return normalized;
    },
);

export const fetchInvoicesByHospital = createTypedAsyncThunk(
    'invoices/fetchInvoicesByHospital',
    async (params: PaginatedQueryParams<{id: string}>) => {
        const {id, query, page, pageSize} = params;
        const response = await api.hospitals().readInvoices(id, query, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new InvoiceLite(o));
        const normalized = safeNormalize<Invoice, InvoiceEntities, Array<string>>(responseData, [invoiceSchema]);
        return {...normalized, meta};
    },
);

export const fetchInvoiceById = createTypedAsyncThunk(
    'invoices/fetchInvoiceById',
    async (id: string) => {
        const response = await api.invoices().readById(id);
        const responseData = new Invoice(response.data.data);
        const normalized = safeNormalize<Invoice, InvoiceEntities, string>(responseData, invoiceSchema);
        return normalized;
    },
);

export const settleInvoice = createTypedAsyncThunk(
    'invoices/settleInvoice',
    async (params: {id: string; options: InvoiceSettleOptions}) => {
        const {id, options} = params;
        const response = await api.invoices().settleInvoice(id, options);
        const responseData = new Invoice(response.data.data);
        const normalized = safeNormalize<Invoice, InvoiceEntities, string>(responseData, invoiceSchema);
        return normalized;
    },
);

export const deleteInvoiceItem = createTypedAsyncThunk(
    'invoices/deleteInvoiceItem',
    async (params: {id: string; itemId: string}) => {
        const {id, itemId} = params;
        const response = await api.invoices().deleteInvoiceItem(id, itemId);
        return response;
    },
);

export const fetchInvoicesForCurrentPatient = createTypedAsyncThunk(
    'invoices/fetchInvoicesForCurrentPatient',
    async (params: PaginatedQueryParams) => {
        const {page, pageSize, query} = params;
        const response = await api.patients().readInvoicesForCurrent(page, pageSize, query);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new InvoiceLite(o));
        const normalized = safeNormalize<Invoice, InvoiceEntities, Array<string>>(responseData, [invoiceSchema]);
        return {...normalized, meta};
    },
);

export const fetchInvoicesForPatient = createTypedAsyncThunk(
    'invoices/fetchInvoicesForPatient',
    async (params: PaginatedQueryParams<{id: string}>) => {
        const {id, page, pageSize, query} = params;
        const response = await api.patients().readInvoicesForPatient(id, page, pageSize, query);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new InvoiceLite(o));
        const normalized = safeNormalize<Invoice, InvoiceEntities, Array<string>>(responseData, [invoiceSchema]);
        return {...normalized, meta};
    },
);