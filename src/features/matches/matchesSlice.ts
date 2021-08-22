import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MatchStatus } from '../../api';
import { apiError, getCompetitions, getMatchesByCompetition } from '../../api/apiCalls';
import { RootState } from '../../app/store';
import { mapCompetition, mapMatchItem } from '../../common/mappings';
import { LoadingStatus, MatchState } from '../../common/types';

export type MatchItem = {
    id: number,
    utcDate: string, // https://github.com/reduxjs/redux-toolkit/issues/456 -- cann't store dates in redux store
    matchday: number,
    homeTeam: string,
    awayTeam: string,
    status: MatchStatus,
    state: MatchState | null
}

export interface MatchesState {
    items: Array<MatchItem>;
    status: LoadingStatus;
}

const initialState: MatchesState = {
    items: [],
    status: LoadingStatus.Idle
};

export const getAllMatchesByCompetition = createAsyncThunk(
    'matches/getAll',
    async (competitionName: string) => {
        const competitionResponse = await getCompetitions();
        if (competitionResponse === apiError) {
            throw new Error("Cannot fetch Competitions! You might have ran out of free calls limit for this minute.");
        }
        const competition = competitionResponse.competitions.find(_ => mapCompetition(_).name === competitionName)

        if (competition === undefined) {
            throw new Error("Competition doesn't exist!");
        }
        const response = await getMatchesByCompetition(competition.id);
        if (response === apiError) {
            throw new Error("Cannot fetch Matches! You might have ran out of free calls limit for this minute.");
        }
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
                state.status = LoadingStatus.Loading
            })
            .addCase(getAllMatchesByCompetition.fulfilled, (state, action) => {
                state.status = LoadingStatus.Idle
                state.items = action.payload.matches.map(mapMatchItem)
            })
            .addCase(getAllMatchesByCompetition.rejected, (state) => {
                state.status = LoadingStatus.Failed
                state.items = [];
            });
    },
});

export const selectMatches = (state: RootState) => state.matches.items;
export const selectStatus = (state: RootState) => state.matches.status;
export default matchesSlice.reducer;