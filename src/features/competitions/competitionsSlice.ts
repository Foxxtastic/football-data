import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCompetitions } from '../../api';
import { RootState } from '../../app/store';
import { mapCompetition } from '../../common/mappings';

type CompetitionItem = {
  id: number,
  name: string
}

export interface CompetitionsState {
  items: Array<CompetitionItem>;
  status: 'idle' | 'loading' | 'failed';
  errorMessage?: string;
}

const initialState: CompetitionsState = {
  items: [],
  status: 'idle',
  errorMessage: undefined
};

export const getAllCompetitions = createAsyncThunk(
  'competitions/getAll',
  async () => {
    const response = await getCompetitions();
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
        state.status = 'loading';
      })
      .addCase(getAllCompetitions.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload.competitions.map(mapCompetition);
      })
      .addCase(getAllCompetitions.rejected, (state, action) => {
        state.status = 'failed';
        state.items = [];
        state.errorMessage = `Technical error: ${action.error.message}`
      });
  },
});

export const selectCompetitions = (state: RootState) => state.competitions.items;
export default competitionsSlice.reducer;