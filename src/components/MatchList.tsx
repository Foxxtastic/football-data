import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setBreadcrumb } from "../features/breadcrumb/breadcrumbSlice";
import { getAllMatchesByCompetition, selectMatches } from "../features/matches/matchesSlice";

export function MatchList() {
    const { competition }: any = useParams();
    const matches = useAppSelector(selectMatches);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllMatchesByCompetition(competition));
        dispatch(setBreadcrumb([{ text: "Competitions", link: "/" }, { text: competition, link: `/${competition}` }]))
    }, [dispatch, competition]);

    return (
        <div>
            <ul>
                {matches.map((_, idx) => <li key={idx}>{`${_.utcDate} ${_.matchday} ${_.homeTeam} ${_.awayTeam} ${_.status}`}</li>)}
            </ul>
        </div>
    )
}