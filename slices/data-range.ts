import {createDataRangeForHospital, fetchDataRangeById, fetchDataRangesByHospital, updateDataRange} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import dataRangesAdapter from '../adapters/data-range';

export const dataRangesSlice = createSlice({
    name: 'dataRanges',
    initialState: dataRangesAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createDataRangeForHospital.fulfilled, fetchDataRangeById.fulfilled, fetchDataRangesByHospital.fulfilled, updateDataRange.fulfilled), (state, action) => {
            dataRangesAdapter.upsertMany(state, action.payload.entities.dataRanges);
        });
    },
});

export const dataRangesReducer = dataRangesSlice.reducer;

export const dataRangesActions = dataRangesSlice.actions;