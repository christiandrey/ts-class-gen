import {Notification} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const notificationSchema = new schema.Entity('notifications');

export type NotificationEntities = SchemaEntities<{
    notification: Notification;
}>