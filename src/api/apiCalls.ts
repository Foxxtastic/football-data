import { CompetitionResponse, MatchDetailsResponse, MatchesResponse } from "./types";

const baseUrl = "https://api.football-data.org/v2";
export const apiError = "error";

const handleError = () => {
    return apiError as typeof apiError;
}

export const freeTier = "TIER_ONE"

export const getCompetitions = () => {
    return fetch(`${baseUrl}/competitions`, {
        method: 'GET',
        headers: {
            'X-Auth-Token': process.env.REACT_APP_X_AUTH_TOKEN!
        }
    })
        .then(res => res.json() as Promise<CompetitionResponse>)
        .then(res => ({
            count: res.count,
            competitions: res.competitions.filter(_ => _.plan === freeTier)
        }) as CompetitionResponse)
        .catch(handleError);
}

export const getMatchesByCompetition = (id: number) => {
    return fetch(`${baseUrl}/competitions/${id}/matches`, {
        method: 'GET',
        headers: {
            'X-Auth-Token': process.env.REACT_APP_X_AUTH_TOKEN!
        }
    }).then(res => res.json() as Promise<MatchesResponse>)
        .catch(handleError)
}

export const getMatchInformations = (id: number) => {
    return fetch(`${baseUrl}/matches/${id}`, {
        method: 'GET',
        headers: {
            'X-Auth-Token': process.env.REACT_APP_X_AUTH_TOKEN!
        }
    }).then(res => res.json() as Promise<MatchDetailsResponse>)
        .catch(handleError)
}