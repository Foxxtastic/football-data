export type Breadcrumb = {
    text: string,
    link: string
}

export type Team = {
    id: number,
    name: string
}

export type MatchStatus = 'POSTPONED' | 'SUSPENDED' | 'AWARDED' | 'SCHEDULED' | 'CANCELED' | 'FINISHED' | 'IN_PLAY' | 'PAUSED';

export type Match = {
    id: number,
    utcDate: Date,
    matchday: number,
    homeTeam: Team,
    awayTeam: Team,
    status: MatchStatus
}

type Result = {
    homeTeam: number | null,
    awayTeam: number | null
}

export type Score = {
    winner: string,
    duration: string,
    fullTime: Result,
    halfTime: Result,
    extraTime?: Result,
    penalities?: Result
}

export type MatchDetails = Match & {
    competition: string,
    venue: string,
    score: Score
}