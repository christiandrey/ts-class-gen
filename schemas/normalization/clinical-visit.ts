import {DischargeSummaryEntities, dischargeSummarySchema} from './discharge-summary';
import {InvoiceEntities, invoiceSchema} from './invoice';

import {ClinicalVisit} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const clinicalVisitSchema = new schema.Entity('clinicalVisits', {
    invoice: invoiceSchema,
    dischargeSummary: dischargeSummarySchema,
});

export type ClinicalVisitEntities = SchemaEntities<{
    clinicalVisit: ClinicalVisit;
}> & InvoiceEntities & DischargeSummaryEntities;