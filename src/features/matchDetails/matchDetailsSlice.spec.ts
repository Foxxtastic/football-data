import { MatchDetailsResponse } from '../../api';
import { LoadingStatus } from '../../common/types';
import reducer, { getMatchDetailsById, MatchDetailsState } from './matchDetailsSlice'

describe('MatchDetails reducer', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      item: null,
      status: LoadingStatus.Idle
    });
  });

  it('should handle fulfilled request', () => {
    const response: MatchDetailsResponse = {
      match: {
        id: 100,
        utcDate: '2021-08-14T14:30:00Z',
        matchday: 1,
        homeTeam: {
          id: 1,
          name: 'Test_team_1'
        },
        awayTeam: {
          id: 2,
          name: 'Test_team_2'
        },
        status: 'FINISHED',
        competition: 'Test_Comp',
        venue: 'Test_loc',
        score: {
          winner: 'HOME_TEAM',
          duration: 'REGULAR',
          fullTime: {
            "homeTeam": 1,
            "awayTeam": 0
          },
          halfTime: {
            "homeTeam": 0,
            "awayTeam": 0
          },
          extraTime: {
            "homeTeam": null,
            "awayTeam": null
          },
          penalties: {
            "homeTeam": null,
            "awayTeam": null
          }
        }
      }
    }

    const initialState = {
      item: null,
      status: LoadingStatus.Loading
    }

    const expected: MatchDetailsState = {
      item:
      {
        id: 100,
        utcDate: '2021-08-14T14:30:00Z',
        matchday: 1,
        venue: 'Test_loc',
        homeTeam: 'Test_team_1',
        awayTeam: 'Test_team_2',
        homeTeamScore: 1,
        awayTeamScore: 0,
        hasPenalties: false,
        homeTeamPenalties: null,
        awayTeamPenalties: null,
        status: 'FINISHED',
        state: 'ENDED',
        winner: 'HOME_TEAM'
      },
      status: LoadingStatus.Idle
    }

    const actual = reducer(initialState, getMatchDetailsById.fulfilled(response, 'requestId', 100))
    expect(actual).toEqual(expected);
  });

  it('should handle failed request', () => {
    const initialState = {
      item: null,
      status: LoadingStatus.Loading
    }

    const expected: MatchDetailsState = {
      item: null,
      status: LoadingStatus.Failed
    }

    const actual = reducer(initialState, getMatchDetailsById.rejected(new Error('Test'), 'requestId', 100))
    expect(actual).toEqual(expected);
  });

  it('should handle pending request', () => {
    const initialState = {
      item: null,
      status: LoadingStatus.Idle
    }

    const expected: MatchDetailsState = {
      item: null,
      status: LoadingStatus.Loading
    }

    const actual = reducer(initialState, getMatchDetailsById.pending('requestId', 100))
    expect(actual).toEqual(expected);
  });
});
