import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setBreadcrumb } from "../features/breadcrumb/breadcrumbSlice";
import { getMatchDetailsById, selectMatch } from "../features/matchDetails/matchDetailsSlice";

export function MatchDetails() {
    const { competition, id }: any = useParams();
    const matchDetails = useAppSelector(selectMatch)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getMatchDetailsById(id))
        dispatch(setBreadcrumb([
            { text: "Competitions", link: "/" },
            { text: competition, link: `/${competition}` },
            { text: `Match_${id}`, link: `/${competition}/${id}` }
        ]));
    }, [dispatch, id])

    return (
        <div>
            <ul>
                {matchDetails !== null &&
                    <>
                        <li>{matchDetails.matchday}</li>
                        <li>{matchDetails.utcDate}</li>
                        <li>{matchDetails.venue !== null ? matchDetails.venue : "Unknown location"}</li>
                        <li>{matchDetails.homeTeam}</li>
                        <li>{matchDetails.awayTeam}</li>
                        <li>{matchDetails.homeTeamScore}</li>
                        <li>{matchDetails.awayTeamScore}</li>
                        <li>{matchDetails.status}</li>
                        <li>{matchDetails.winner}</li>
                    </>}
            </ul>
        </div >
    )
}