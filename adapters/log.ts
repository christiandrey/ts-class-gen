import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Log} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const logsAdapter = createEntityAdapter<Normalized<Log>>();

const selectors = logsAdapter.getSelectors<GlobalState>((state) => state.logs);

export const {
    selectById: logByIdSelector,
    selectAll: allLogsSelector,
    selectEntities: logEntitiesSelector,
} = selectors;

export default logsAdapter;