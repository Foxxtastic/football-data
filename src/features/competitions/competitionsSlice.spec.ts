import { CompetitionResponse, freeTier } from '../../api';
import { LoadingStatus } from '../../common/types';
import reducer, { CompetitionsState, getAllCompetitions } from './competitionsSlice'

describe('Competitions reducer', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
      status: LoadingStatus.Idle
    });
  });

  it('should handle fulfilled request', () => {
    const response: CompetitionResponse = {
      count: 2,
      competitions: [
        {
          area: {
            id: 1,
            name: 'Hungary',
          },
          id: 999,
          name: 'NB1',
          plan: freeTier
        },
        {
          area: {
            id: 2,
            name: 'Hungary',
          },
          id: 998,
          name: 'Megye1',
          plan: freeTier
        }
      ]
    }

    const initialState = {
      items: [],
      status: LoadingStatus.Loading
    }

    const expected: CompetitionsState = {
      items: [
        {
          id: 999,
          name: 'NB1',
          country: 'Hungary'
        },
        {
          id: 998,
          name: 'Megye1',
          country: 'Hungary'
        }
      ],
      status: LoadingStatus.Idle
    }

    const actual = reducer(initialState, getAllCompetitions.fulfilled(response, 'requestId'))
    expect(actual).toEqual(expected);
  });

  it('should handle failed request', () => {
    const initialState = {
      items: [],
      status: LoadingStatus.Loading
    }

    const expected: CompetitionsState = {
      items: [],
      status: LoadingStatus.Failed
    }

    const actual = reducer(initialState, getAllCompetitions.rejected(new Error('Test'), 'requestId'))
    expect(actual).toEqual(expected);
  });

  it('should handle pending request', () => {
    const initialState = {
      items: [],
      status: LoadingStatus.Idle
    }

    const expected: CompetitionsState = {
      items: [],
      status: LoadingStatus.Loading
    }

    const actual = reducer(initialState, getAllCompetitions.pending('requestId'))
    expect(actual).toEqual(expected);
  });
});
