import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMatchInformations } from '../../api';
import { RootState } from '../../app/store';
import { MatchStatus } from '../../common/types';

type MatchData = {
    id: number,
    utcDate: Date,
    matchday: number,
    venue: string,
    homeTeam: string,
    awayTeam: string,
    homeTeamScore: number | null,
    awayTeamScore: number | null,
    status: MatchStatus,
    winner: string | null
}

export interface MatchesState {
    items: MatchData | null;
    status: 'idle' | 'loading' | 'failed';
    errorMessage?: string;
}

const initialState: MatchesState = {
    items: null,
    status: 'idle',
    errorMessage: undefined
};

export const getMatchDetailsById = createAsyncThunk(
    'matches/getData',
    async (matchId: number) => {
        const response = await getMatchInformations(matchId);

        if (response === undefined) {
            throw new Error("Match doesn't exists!");
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
                state.status = 'loading';
            })
            .addCase(getMatchDetailsById.fulfilled, (state, action) => {
                state.status = 'idle';
                const match = action.payload.match;
                state.items = {
                    id: match.id,
                    utcDate: match.utcDate,
                    matchday: match.matchday,
                    venue: match.venue,
                    homeTeam: match.homeTeam.name,
                    awayTeam: match.awayTeam.name,
                    homeTeamScore: match.score.fullTime.homeTeam,
                    awayTeamScore: match.score.fullTime.awayTeam,
                    status: match.status,
                    winner: match.score.winner
                }
            })
            .addCase(getMatchDetailsById.rejected, (state, action) => {
                state.status = 'failed';
                state.items = null;
                state.errorMessage = `Technical error: ${action.error.message}`
            });
    },
});

export const selectMatch = (state: RootState) => state.matchDetails.items;
export default matchDataSlice.reducer;