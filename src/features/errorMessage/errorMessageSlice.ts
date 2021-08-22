import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getAllCompetitions } from '../competitions/competitionsSlice';
import { getMatchDetailsById } from '../matchDetails/matchDetailsSlice';
import { getAllMatchesByCompetition } from '../matches/matchesSlice';

export interface ErrorMessageState {
    value: string | undefined;
}

const initialState: ErrorMessageState = {
    value: undefined
};

export const errorMessageSlice = createSlice({
    name: 'errorMessage',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getAllCompetitions.rejected, (state, action) => {
                state.value = action.error.message;
            })
            .addCase(getAllMatchesByCompetition.rejected, (state, action) => {
                state.value = action.error.message;
            })
            .addCase(getMatchDetailsById.rejected, (state, action) => {
                state.value = action.error.message;
            })
    },
});

export const selectErrorMessage = (state: RootState) => state.errorMessage.value;
export default errorMessageSlice.reducer;