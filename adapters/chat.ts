import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Chat} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const chatsAdapter = createEntityAdapter<Normalized<Chat>>();

const selectors = chatsAdapter.getSelectors<GlobalState>((state) => state.chats);

export const {
    selectById: chatByIdSelector,
    selectAll: allChatsSelector,
    selectEntities: chatEntitiesSelector,
} = selectors;

export default chatsAdapter;