import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {CommunityCategory} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const communityCategoriesAdapter = createEntityAdapter<Normalized<CommunityCategory>>();

const selectors = communityCategoriesAdapter.getSelectors<GlobalState>((state) => state.communityCategories);

export const {
    selectById: communityCategoryByIdSelector,
    selectAll: allCommunityCategoriesSelector,
    selectEntities: communityCategoryEntitiesSelector,
} = selectors;

export default communityCategoriesAdapter;