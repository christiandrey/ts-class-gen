import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {ServiceChargeLog} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const serviceChargeLogsAdapter = createEntityAdapter<Normalized<ServiceChargeLog>>();

const selectors = serviceChargeLogsAdapter.getSelectors<GlobalState>((state) => state.serviceChargeLogs);

export const {
    selectById: serviceChargeLogByIdSelector,
    selectAll: allServiceChargeLogsSelector,
    selectEntities: serviceChargeLogEntitiesSelector,
} = selectors;

export default serviceChargeLogsAdapter;