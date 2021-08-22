export type Team = {
    id: number,
    name: string
}

export type MatchStatus = 'POSTPONED' | 'SUSPENDED' | 'AWARDED' | 'SCHEDULED' | 'CANCELED' | 'FINISHED' | 'IN_PLAY' | 'PAUSED';

export type Match = {
    id: number,
    utcDate: string,
    matchday: number,
    homeTeam: Team,
    awayTeam: Team,
    status: MatchStatus
}

export type Result = {
    homeTeam: number | null,
    awayTeam: number | null
}

export type Score = {
    winner: string,
    duration: string,
    fullTime: Result,
    halfTime: Result,
    extraTime?: Result,
    penalties?: Result
}

export type MatchDetails = Match & {
    competition: string,
    venue: string,
    score: Score
}

export type Area = {
    id: number,
    name: string
}

export type Competition = {
    area: Area,
    id: number,
    name: string
    plan: string
}

export type CompetitionResponse = {
    count: number,
    competitions: Array<Competition>
}

export type MatchesResponse = {
    count: number,
    matches: Array<Match>
}

export type MatchDetailsResponse = {
    match: MatchDetails
}