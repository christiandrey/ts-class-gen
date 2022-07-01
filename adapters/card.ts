import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Card} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const cardsAdapter = createEntityAdapter<Normalized<Card>>();

const selectors = cardsAdapter.getSelectors<GlobalState>((state) => state.cards);

export const {
    selectById: cardByIdSelector,
    selectAll: allCardsSelector,
    selectEntities: cardEntitiesSelector,
} = selectors;

export default cardsAdapter;