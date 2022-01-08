import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Notification} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const notificationsAdapter = createEntityAdapter<Normalized<Notification>>();

const selectors = notificationsAdapter.getSelectors<GlobalState>((state) => state.notifications);

export const {
    selectById: notificationByIdSelector,
    selectAll: allNotificationsSelector,
    selectEntities: notificationEntitiesSelector,
} = selectors;

export default notificationsAdapter;