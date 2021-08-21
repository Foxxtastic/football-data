import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setBreadcrumb } from "../features/breadcrumb/breadcrumbSlice";
import { getAllCompetitions, selectCompetitions } from "../features/competitions/competitionsSlice";

export function CompetitionList() {
    const competitions = useAppSelector(selectCompetitions);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllCompetitions());
        dispatch(setBreadcrumb([{ text: "Competitions", link: "/" }]))
    }, [dispatch]);

    return (
        <div>
            <ul>
                {competitions.map((_, idx) => <li key={idx}><Link to={`/${_.name}`}>{_.name}</Link></li>)}
            </ul>
        </div>
    )
}