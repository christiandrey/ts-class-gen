import {NotificationEntities, notificationSchema} from '../../../schemas/normalization/notification';
import {PaginatedQueryParams} from '../../../typings';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Notification} from '../../../entities/notification';
import {api} from '../../../api';

export const fetchNotifications = createTypedAsyncThunk(
    'notifications/fetchNotifications',
    async (params: PaginatedQueryParams) => {
        const {page, pageSize} = params;
        const response = await api.notifications().readNotifications(page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new Notification(o));
        const normalized = safeNormalize<Notification, NotificationEntities, Array<string>>(responseData, [notificationSchema]);
        return {...normalized, meta};
    },
);