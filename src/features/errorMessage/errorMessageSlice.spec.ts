import { getAllCompetitions } from '../competitions/competitionsSlice';
import { getMatchDetailsById } from '../matchDetails/matchDetailsSlice';
import { getAllMatchesByCompetition } from '../matches/matchesSlice';
import reducer, { ErrorMessageState } from './errorMessageSlice';

describe('ErrorMessage reducer', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      value: undefined
    });
  });

  it('should store competition error', () => {
    const initialState = {
      value: undefined,
    }

    const expected: ErrorMessageState = {
      value: 'Test_error_1'
    }

    const actual = reducer(initialState, getAllCompetitions.rejected(new Error('Test_error_1'), 'requestId'))
    expect(actual).toEqual(expected);
  });

  it('should store matchList error', () => {
    const initialState = {
      value: undefined,
    }

    const expected: ErrorMessageState = {
      value: 'Test_error_2'
    }

    const actual = reducer(initialState, getAllMatchesByCompetition.rejected(new Error('Test_error_2'), 'requestId', 'NB1'))
    expect(actual).toEqual(expected);
  });

  it('should store matchDetails error', () => {
    const initialState = {
      value: undefined,
    }

    const expected: ErrorMessageState = {
      value: 'Test_error_3'
    }

    const actual = reducer(initialState, getMatchDetailsById.rejected(new Error('Test_error_3'), 'requestId', 10))
    expect(actual).toEqual(expected);
  });
});
