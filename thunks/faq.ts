import {FaqEntities, faqSchema} from '../../../schemas/normalization/faq';
import {PaginatedQueryParams} from '../../../typings';
import {FaqCreationOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Faq} from '../../../entities/faq';
import {api} from '../../../api';

export const fetchAllFaqs = createTypedAsyncThunk(
    'faqs/fetchAllFaqs',
    async (params: PaginatedQueryParams<{categoryId?: string}>) => {
        const {query, page, pageSize, categoryId} = params;
        const response = await api.faqs().readAllFaqs(query, page, pageSize, categoryId);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new Faq(o));
        const normalized = safeNormalize<Faq, FaqEntities, Array<string>>(responseData, [faqSchema]);
        return {...normalized, meta};
    },
);

export const fetchFaqById = createTypedAsyncThunk(
    'faqs/fetchFaqById',
    async (faqId: string) => {
        const response = await api.faqs().readFaqById(faqId);
        const responseData = new Faq(response.data.data);
        const normalized = safeNormalize<Faq, FaqEntities, string>(responseData, faqSchema);
        return normalized;
    },
);

export const createFaq = createTypedAsyncThunk(
    'faqs/createFaq',
    async (creationOptions: FaqCreationOptions) => {
        const response = await api.faqs().createFaq(creationOptions);
        const responseData = new Faq(response.data.data);
        const normalized = safeNormalize<Faq, FaqEntities, string>(responseData, faqSchema);
        return normalized;
    },
);

export const updateFaq = createTypedAsyncThunk(
    'faqs/updateFaq',
    async (params: {faqId: string; creationOptions: FaqCreationOptions}) => {
        const {faqId, creationOptions} = params;
        const response = await api.faqs().updateFaq(faqId, creationOptions);
        const responseData = new Faq(response.data.data);
        const normalized = safeNormalize<Faq, FaqEntities, string>(responseData, faqSchema);
        return normalized;
    },
);

export const deleteFaq = createTypedAsyncThunk(
    'faqs/deleteFaq',
    async (faqId: string) => {
        const response = await api.faqs().deleteFaq(faqId);
        return response;
    },
);