import { Match, MatchDetails } from "../common/types";

type Area = {
    id: number,
    name: string,
    countryCode: string
}

export type Competition = {
    area: Area,
    id: number,
    name: string
    plan: string
}

type CompetitionResponse = {
    count: number,
    competitions: Array<Competition>
}

type MatchesResponse = {
    count: number,
    matches: Array<Match>
}

type MatchDetailsResponse = {
    match: MatchDetails
}

const baseUrl = "http://api.football-data.org/v2";

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
            competitions: res.competitions.filter(_ => _.plan === "TIER_ONE")
        }));
}

export const getMatchesByCompetition = (id: number) => {
    return fetch(`${baseUrl}/competitions/${id}/matches`, {
        method: 'GET',
        headers: {
            'X-Auth-Token': process.env.REACT_APP_X_AUTH_TOKEN!
        }
    }).then(res => res.json() as Promise<MatchesResponse>)
}

export const getMatchInformations = (id: number) => {
    return fetch(`${baseUrl}/matches/${id}`, {
        method: 'GET',
        headers: {
            'X-Auth-Token': process.env.REACT_APP_X_AUTH_TOKEN!
        }
    }).then(res => res.json() as Promise<MatchDetailsResponse>)
}