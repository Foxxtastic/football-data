import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import competitionsReducer from '../features/competitions/competitionsSlice';
import matchesReducer from '../features/matches/matchesSlice';
import breadcrumbReducer from '../features/breadcrumb/breadcrumbSlice';

export const store = configureStore({
  reducer: {
    competitions: competitionsReducer,
    matches: matchesReducer,
    breadcrumb: breadcrumbReducer
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
