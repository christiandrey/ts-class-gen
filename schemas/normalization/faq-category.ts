import {FaqCategory} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const faqCategorySchema = new schema.Entity('faqCategories');

export type FaqCategoryEntities = SchemaEntities<{
    faqCategory: FaqCategory;
}>