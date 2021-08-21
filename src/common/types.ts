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

export type Score = {
    winner: string,
    duration: string
}

export type Breadcrumb = {
    text: string,
    link: string
}