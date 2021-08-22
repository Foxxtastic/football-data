export type MatchState = 'ENDED' | 'LIVE' | 'UPCOMING' | 'UNKNOWN'; // Calculated type for easier categorization of matches.

export enum LoadingStatus {
    Idle,
    Loading,
    Failed
}