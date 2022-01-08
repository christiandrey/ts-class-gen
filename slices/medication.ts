import {createMedicationForPatient, fetchMedicationsForCurrentPatient, fetchMedicationsForPatient} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import medicationsAdapter from '../adapters/medication';

export const medicationsSlice = createSlice({
    name: 'medications',
    initialState: medicationsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createMedicationForPatient.fulfilled, fetchMedicationsForCurrentPatient.fulfilled, fetchMedicationsForPatient.fulfilled), (state, action) => {
            medicationsAdapter.upsertMany(state, action.payload.entities.medications);
        });
    },
});

export const medicationsReducer = medicationsSlice.reducer;

export const medicationsActions = medicationsSlice.actions;