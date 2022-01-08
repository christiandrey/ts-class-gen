import {Setting} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const settingSchema = new schema.Entity('settings');

export type SettingEntities = SchemaEntities<{
    setting: Setting;
}>