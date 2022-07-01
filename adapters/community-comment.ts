import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {CommunityComment} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const communityCommentsAdapter = createEntityAdapter<Normalized<CommunityComment>>();

const selectors = communityCommentsAdapter.getSelectors<GlobalState>((state) => state.communityComments);

export const {
    selectById: communityCommentByIdSelector,
    selectAll: allCommunityCommentsSelector,
    selectEntities: communityCommentEntitiesSelector,
} = selectors;

export default communityCommentsAdapter;