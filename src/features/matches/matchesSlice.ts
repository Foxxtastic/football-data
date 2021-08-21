import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCompetitions, getMatchesByCompetition } from '../../api';
import { RootState } from '../../app/store';
import { mapCompetition } from '../../common/mappings';
import { MatchStatus } from '../../common/types';

type MatchItem = {
    id: number,
    utcDate: Date,
    matchday: number,
    homeTeam: string,
    awayTeam: string,
    status: MatchStatus
}

export interface MatchesState {
    items: Array<MatchItem>;
    status: 'idle' | 'loading' | 'failed';
    errorMessage?: string;
}

const initialState: MatchesState = {
    items: [],
    status: 'idle',
    errorMessage: undefined
};

export const getAllMatchesByCompetition = createAsyncThunk(
    'matches/getAll',
    async (competitionName: string) => {
        const competitionResponse = await getCompetitions();
        const competition = competitionResponse.competitions.find(_ => mapCompetition(_).name === competitionName)

        if (competition === undefined) {
            throw new Error("Competition don't exists!");
        }
        const response = await getMatchesByCompetition(competition.id);
        return response;
    }
);

export const matchesSlice = createSlice({
    name: 'matches',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getAllMatchesByCompetition.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllMatchesByCompetition.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items = action.payload.matches.map(_ => ({
                    id: _.id,
                    utcDate: _.utcDate,
                    matchday: _.matchday,
                    homeTeam: _.homeTeam.name,
                    awayTeam: _.awayTeam.name,
                    status: _.status
                }))
            })
            .addCase(getAllMatchesByCompetition.rejected, (state, action) => {
                state.status = 'failed';
                state.items = [];
                state.errorMessage = `Technical error: ${action.error.message}`
            });
    },
});

export const selectMatches = (state: RootState) => state.matches.items;
export default matchesSlice.reducer;