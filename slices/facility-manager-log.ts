import {fetchFacilityManagerLogsByEstate} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import facilityManagerLogsAdapter from '../adapters/facility-manager-log';

export const facilityManagerLogsSlice = createSlice({
    name: 'facilityManagerLogs',
    initialState: facilityManagerLogsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(fetchFacilityManagerLogsByEstate.fulfilled), (state, action) => {
            facilityManagerLogsAdapter.upsertMany(state, action.payload.entities.facilityManagerLogs);
        });
    },
});

export const facilityManagerLogsReducer = facilityManagerLogsSlice.reducer;

export const facilityManagerLogsActions = facilityManagerLogsSlice.actions;