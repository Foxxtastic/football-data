import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiError, getCompetitions } from '../../api/apiCalls';
import { RootState } from '../../app/store';
import { mapCompetition } from '../../common/mappings';
import { LoadingStatus } from '../../common/types';

type CompetitionItem = {
  id: number,
  country: string,
  name: string
}

export interface CompetitionsState {
  items: Array<CompetitionItem>;
  status: LoadingStatus;
}

const initialState: CompetitionsState = {
  items: [],
  status: LoadingStatus.Idle
};

export const getAllCompetitions = createAsyncThunk(
  'competitions/getAll',
  async () => {
    const response = await getCompetitions();
    if (response === apiError) {
      throw new Error("Cannot fetch Competitions. You might have ran out of free calls limit for this minute.");
    }
    return response;
  }
);

export const competitionsSlice = createSlice({
  name: 'competitions',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllCompetitions.pending, (state) => {
        state.status = LoadingStatus.Loading
      })
      .addCase(getAllCompetitions.fulfilled, (state, action) => {
        state.status = LoadingStatus.Idle
        state.items = action.payload.competitions.map(mapCompetition);
      })
      .addCase(getAllCompetitions.rejected, (state) => {
        state.status = LoadingStatus.Failed
        state.items = [];
      });
  },
});

export const selectCompetitions = (state: RootState) => state.competitions.items;
export const selectStatus = (state: RootState) => state.competitions.status;
export default competitionsSlice.reducer;