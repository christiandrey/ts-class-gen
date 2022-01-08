import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {User} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const usersAdapter = createEntityAdapter<Normalized<User>>();

const selectors = usersAdapter.getSelectors<GlobalState>((state) => state.users);

export const {
    selectById: userByIdSelector,
    selectAll: allUsersSelector,
    selectEntities: userEntitiesSelector,
} = selectors;

export default usersAdapter;