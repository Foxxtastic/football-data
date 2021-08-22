import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import breadcrumbReducer from '../features/breadcrumb/breadcrumbSlice';
import competitionsReducer from '../features/competitions/competitionsSlice';
import matchesReducer from '../features/matches/matchesSlice';
import matchDetailsReducer from '../features/matchDetails/matchDetailsSlice';
import errorMessageReducer from '../features/errorMessage/errorMessageSlice';

export const store = configureStore({
  reducer: {
    breadcrumb: breadcrumbReducer,
    competitions: competitionsReducer,
    matches: matchesReducer,
    matchDetails: matchDetailsReducer,
    errorMessage: errorMessageReducer
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
