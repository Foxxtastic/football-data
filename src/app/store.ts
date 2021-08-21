import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import breadcrumbReducer from '../features/breadcrumb/breadcrumbSlice';
import competitionsReducer from '../features/competitions/competitionsSlice';
import matchesReducer from '../features/matches/matchesSlice';
import matchDetailsReducer from '../features/matchDetails/matcDetailsSlice';

export const store = configureStore({
  reducer: {
    breadcrumb: breadcrumbReducer,
    competitions: competitionsReducer,
    matches: matchesReducer,
    matchDetails: matchDetailsReducer
  },
  devTools: true
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
