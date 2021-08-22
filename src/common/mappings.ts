import { Competition, Match, MatchDetails, MatchStatus } from "../api";
import { MatchData } from "../features/matchDetails/matchDetailsSlice";
import { MatchItem } from "../features/matches/matchesSlice";
import { endStatus, liveStatus, upcomingStatus } from "./matchStatuses";

export const mapCompetition = (source: Competition) => ({
    id: source.id,
    name: source.name,
    country: source.area.name
});

const mapMatchStatus = (source: MatchStatus) => (
    endStatus.includes(source) ?
        "ENDED" :
        liveStatus.includes(source) ?
            "LIVE" :
            upcomingStatus.includes(source) ?
                "UPCOMING" :
                null
);

export const mapMatchDetails = (source: MatchDetails) => {

    const homeTeamPenalties = source.score.penalties?.homeTeam
    const awayTeamPenalties = source.score.penalties?.awayTeam

    const isNotEmpty = (value: number | null | undefined) => value !== null && value !== undefined;

    return ({
        id: source.id,
        utcDate: source.utcDate,
        matchday: source.matchday,
        venue: source.venue,
        homeTeam: source.homeTeam.name,
        awayTeam: source.awayTeam.name,
        homeTeamScore: source.score.fullTime.homeTeam,
        awayTeamScore: source.score.fullTime.awayTeam,
        hasPenalties: isNotEmpty(homeTeamPenalties) || isNotEmpty(awayTeamPenalties),
        homeTeamPenalties: source.score.penalties?.homeTeam,
        awayTeamPenalties: source.score.penalties?.awayTeam,
        status: source.status,
        state: mapMatchStatus(source.status),
        winner: source.score.winner
    }) as MatchData
}

export const mapMatchItem = (source: Match) => ({
    id: source.id,
    utcDate: source.utcDate,
    matchday: source.matchday,
    homeTeam: source.homeTeam.name,
    awayTeam: source.awayTeam.name,
    status: source.status,
    state: mapMatchStatus(source.status)
}) as MatchItem;
