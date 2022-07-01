import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {UserSummary} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const userSummariesAdapter = createEntityAdapter<Normalized<UserSummary>>();

const selectors = userSummariesAdapter.getSelectors<GlobalState>((state) => state.userSummaries);

export const {
    selectById: userSummaryByIdSelector,
    selectAll: allUserSummariesSelector,
    selectEntities: userSummaryEntitiesSelector,
} = selectors;

export default userSummariesAdapter;