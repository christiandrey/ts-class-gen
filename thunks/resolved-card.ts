import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {ResolvedCard} from '../../../entities/resolved-card';
import {api} from '../../../api';

export const resolveCardByCard = createTypedAsyncThunk(
    'resolvedCards/resolveCardByCard',
    async (bin: string) => {
        const response = await api.cards().resolveCard(bin);
        const responseData = new ResolvedCard(response.data.data);
        return responseData;
    },
);