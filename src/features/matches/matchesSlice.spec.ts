import { MatchesResponse } from '../../api';
import { LoadingStatus } from '../../common/types';
import reducer, { getAllMatchesByCompetition, MatchesState } from './matchesSlice';

describe('Matches reducer', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
      status: LoadingStatus.Idle
    });
  });

  it('should handle fulfilled request', () => {
    const response: MatchesResponse = {
      count: 3,
      matches: [
        {
          id: 1,
          utcDate: '2021-08-10T16:30:00Z',
          matchday: 2,
          homeTeam: {
            id: 1,
            name: 'Test_team_1'
          },
          awayTeam: {
            id: 2,
            name: 'Test_team_2'
          },
          status: 'FINISHED',
        },
        {
          id: 2,
          utcDate: '2021-08-08T16:30:00Z',
          matchday: 2,
          homeTeam: {
            id: 3,
            name: 'Test_team_3'
          },
          awayTeam: {
            id: 4,
            name: 'Test_team_4'
          },
          status: 'FINISHED',
        },
        {
          id: 20,
          utcDate: '2021-08-26T16:30:00Z',
          matchday: 3,
          homeTeam: {
            id: 5,
            name: 'Test_team_5'
          },
          awayTeam: {
            id: 6,
            name: 'Test_team_6'
          },
          status: 'SCHEDULED',
        },
      ]
    }

    const initialState = {
      items: [],
      status: LoadingStatus.Loading
    }

    const expected: MatchesState = {
      items: [
        {
          id: 1,
          utcDate: '2021-08-10T16:30:00Z',
          matchday: 2,
          homeTeam: 'Test_team_1',
          awayTeam: 'Test_team_2',
          status: 'FINISHED',
          state: 'ENDED'
        },
        {
          id: 2,
          utcDate: '2021-08-08T16:30:00Z',
          matchday: 2,
          homeTeam: 'Test_team_3',
          awayTeam: 'Test_team_4',
          status: 'FINISHED',
          state: 'ENDED'
        },
        {
          id: 20,
          utcDate: '2021-08-26T16:30:00Z',
          matchday: 3,
          homeTeam: 'Test_team_5',
          awayTeam: 'Test_team_6',
          status: 'SCHEDULED',
          state: 'UPCOMING'
        }
      ],
      status: LoadingStatus.Idle
    }

    const actual = reducer(initialState, getAllMatchesByCompetition.fulfilled(response, 'requestId', 'Premier League'))
    expect(actual).toEqual(expected);
  });

  it('should handle failed request', () => {
    const initialState = {
      items: [],
      status: LoadingStatus.Loading
    }

    const expected: MatchesState = {
      items: [],
      status: LoadingStatus.Failed
    }

    const actual = reducer(initialState, getAllMatchesByCompetition.rejected(new Error('Test'), 'requestId', 'Premier League'))
    expect(actual).toEqual(expected);
  });

  it('should handle pending request', () => {
    const initialState = {
      items: [],
      status: LoadingStatus.Idle
    }

    const expected: MatchesState = {
      items: [],
      status: LoadingStatus.Loading
    }

    const actual = reducer(initialState, getAllMatchesByCompetition.pending('requestId', 'Premier League'))
    expect(actual).toEqual(expected);
  });
});
