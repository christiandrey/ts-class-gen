import {SettingEntities, settingSchema} from '../../../schemas/normalization/setting';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Setting} from '../../../entities/setting';
import {api} from '../../../api';

export const fetchAllSetting = createTypedAsyncThunk(
    'settings/fetchAllSetting',
    async () => {
        const response = await api.settings().readAll();
        const responseData = response.data.data.map((o) => new Setting(o));
        const normalized = safeNormalize<Setting, SettingEntities, Array<string>>(responseData, [settingSchema]);
        return normalized;
    },
);

export const fetchAppVersionSetting = createTypedAsyncThunk(
    'settings/fetchAppVersionSetting',
    async () => {
        const response = await api.settings().readAppVersion();
        return response;
    },
);

export const addOrUpdateSetting = createTypedAsyncThunk(
    'settings/addOrUpdateSetting',
    async (dto: Setting) => {
        const response = await api.settings().addOrUpdate(dto);
        const responseData = new Setting(response.data.data);
        const normalized = safeNormalize<Setting, SettingEntities, string>(responseData, settingSchema);
        return normalized;
    },
);