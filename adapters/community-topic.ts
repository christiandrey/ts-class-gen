import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {CommunityTopic} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const communityTopicsAdapter = createEntityAdapter<Normalized<CommunityTopic>>();

const selectors = communityTopicsAdapter.getSelectors<GlobalState>((state) => state.communityTopics);

export const {
    selectById: communityTopicByIdSelector,
    selectAll: allCommunityTopicsSelector,
    selectEntities: communityTopicEntitiesSelector,
} = selectors;

export default communityTopicsAdapter;