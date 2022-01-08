import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Setting} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const settingsAdapter = createEntityAdapter<Normalized<Setting>>();

const selectors = settingsAdapter.getSelectors<GlobalState>((state) => state.settings);

export const {
    selectById: settingByIdSelector,
    selectAll: allSettingsSelector,
    selectEntities: settingEntitiesSelector,
} = selectors;

export default settingsAdapter;