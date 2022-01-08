import {FaqCategoryEntities, faqCategorySchema} from './faq-category';

import {Faq} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const faqSchema = new schema.Entity('faqs', {
    faqCategory: faqCategorySchema,
});

export type FaqEntities = SchemaEntities<{
    faq: Faq;
}> & FaqCategoryEntities;