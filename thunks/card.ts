import {CardEntities, cardSchema} from '../../../schemas/normalization/card';
import {CardCreationOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Card} from '../../../entities/card';
import {api} from '../../../api';

export const fetchCards = createTypedAsyncThunk(
    'cards/fetchCards',
    async () => {
        const response = await api.cards().readCards();
        const responseData = response.data.data.map((o) => new Card(o));
        const normalized = safeNormalize<Card, CardEntities, Array<string>>(responseData, [cardSchema]);
        return normalized;
    },
);

export const createCard = createTypedAsyncThunk(
    'cards/createCard',
    async (dto: CardCreationOptions) => {
        const response = await api.cards().createCard(dto);
        const responseData = new Card(response.data.data);
        const normalized = safeNormalize<Card, CardEntities, string>(responseData, cardSchema);
        return normalized;
    },
);

export const deleteCard = createTypedAsyncThunk(
    'cards/deleteCard',
    async (cardId: string) => {
        const response = await api.cards().deleteCard(cardId);
        return response;
    },
);