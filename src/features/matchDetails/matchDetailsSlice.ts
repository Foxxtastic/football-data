import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MatchStatus } from '../../api';
import { apiError, getMatchInformations } from '../../api/apiCalls';
import { RootState } from '../../app/store';
import { mapMatchDetails } from '../../common/mappings';
import { LoadingStatus, MatchState } from '../../common/types';

export type MatchData = {
    id: number,
    utcDate: string, // https://github.com/reduxjs/redux-toolkit/issues/456 -- cann't store dates in redux store
    matchday: number,
    venue: string,
    homeTeam: string,
    awayTeam: string,
    homeTeamScore: number | null,
    awayTeamScore: number | null,
    hasPenalties: boolean,
    homeTeamPenalties: number | null,
    awayTeamPenalties: number | null,
    status: MatchStatus,
    state: MatchState | null,
    winner: string | null
}

export interface MatchDetailsState {
    item: MatchData | null;
    status: LoadingStatus;
}

const initialState: MatchDetailsState = {
    item: null,
    status: LoadingStatus.Idle
};

export const getMatchDetailsById = createAsyncThunk(
    'matches/getData',
    async (matchId: number) => {
        const response = await getMatchInformations(matchId);
        if (response === apiError) {
            throw new Error("Cannot fetch Match details! You might have ran out of free calls limit for this minute.");
        }

        if (response === undefined) {
            throw new Error("Match doesn't exist!");
        }
        return response;
    }
);

export const matchDataSlice = createSlice({
    name: 'matchData',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getMatchDetailsById.pending, (state) => {
                state.status = LoadingStatus.Loading
            })
            .addCase(getMatchDetailsById.fulfilled, (state, action) => {
                state.status = LoadingStatus.Idle
                const match = action.payload.match
                state.item = mapMatchDetails(match)
            })
            .addCase(getMatchDetailsById.rejected, (state) => {
                state.status = LoadingStatus.Failed
                state.item = null;
            });
    },
});

export const selectMatch = (state: RootState) => state.matchDetails.item;
export const selectStatus = (state: RootState) => state.matchDetails.status;
export default matchDataSlice.reducer;