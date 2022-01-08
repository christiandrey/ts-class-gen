import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Guest} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const guestsAdapter = createEntityAdapter<Normalized<Guest>>();

const selectors = guestsAdapter.getSelectors<GlobalState>((state) => state.guests);

export const {
    selectById: guestByIdSelector,
    selectAll: allGuestsSelector,
    selectEntities: guestEntitiesSelector,
} = selectors;

export default guestsAdapter;