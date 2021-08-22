import { Descriptions, Spin } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setBreadcrumb } from "../features/breadcrumb/breadcrumbSlice";
import { getMatchDetailsById, selectMatch, selectStatus } from "../features/matchDetails/matchDetailsSlice";
import { endStatus, upcomingStatus } from "../common/matchStatuses";
import { LoadingStatus } from "../common/types";
import Title from "antd/lib/typography/Title";
import { AppBreadcrumb, PageContainer } from "./common";

export function MatchDetailsPage() {
    const { competition, id }: any = useParams();
    const matchDetails = useAppSelector(selectMatch);
    const status = useAppSelector(selectStatus);
    const dispatch = useAppDispatch();

    const score = `${matchDetails?.homeTeam}-${matchDetails?.awayTeam}`;

    useEffect(() => {
        dispatch(getMatchDetailsById(id))
    }, [dispatch, id])

    useEffect(() => {
        dispatch(setBreadcrumb([
            { text: "Competitions", link: "/" },
            { text: competition, link: `/${competition}` },
            {
                text: score,
                link: `/${competition}/${id}`
            }
        ]));
    }, [dispatch, competition, score, id])

    const matchIsEnded = () => {
        if (matchDetails !== null) {
            return endStatus.includes(matchDetails.status) ? true : false
        }
        return null
    }

    const matchIsUpcoming = () => {
        if (matchDetails !== null) {
            return upcomingStatus.includes(matchDetails.status) ? true : false
        }
        return null
    }

    return (
        <>
            <AppBreadcrumb />
            <PageContainer>
                <Spin tip="One moment..." spinning={status === LoadingStatus.Loading}>
                    <Title style={{ textAlign: "center" }} level={2}>
                        {matchDetails?.homeTeam} - {matchDetails?.awayTeam} {' '}
                        {!matchIsUpcoming() && `/ ${matchDetails?.homeTeamScore} - ${matchDetails?.awayTeamScore}`}
                    </Title>
                    <Descriptions title="Match details" bordered>
                        {matchDetails !== null &&
                            <>
                                <Descriptions.Item label="Home team">
                                    <strong>
                                        {matchDetails.homeTeam}
                                    </strong>
                                </Descriptions.Item>
                                <Descriptions.Item label="Away team">
                                    <strong>
                                        {matchDetails.awayTeam}
                                    </strong>
                                </Descriptions.Item>
                                {matchIsEnded() === true &&
                                    <Descriptions.Item label="Winner">
                                        <strong>
                                            {matchDetails.winner === "HOME_TEAM" && matchDetails.homeTeam}
                                            {matchDetails.winner === "AWAY_TEAM" && matchDetails.awayTeam}
                                            {matchDetails.winner === "DRAW" && "Draw"}
                                        </strong>
                                    </Descriptions.Item>
                                }
                                {matchIsUpcoming() === false &&
                                    <Descriptions.Item label={matchIsEnded() ? "Result" : "Score"}>
                                        <strong>
                                            {`${matchDetails.homeTeamScore} - ${matchDetails.awayTeamScore}`}
                                            {matchDetails.hasPenalties &&
                                                ` (penalties: ${matchDetails.homeTeamPenalties} - ${matchDetails.awayTeamPenalties})`}
                                        </strong>
                                    </Descriptions.Item>}
                                <Descriptions.Item label="State">
                                    {matchDetails.state}
                                </Descriptions.Item>
                                <Descriptions.Item label="Detailed state">
                                    {matchDetails.status}
                                </Descriptions.Item>
                                <Descriptions.Item label="UTC start">
                                    {new Date(matchDetails.utcDate).toUTCString()}
                                </Descriptions.Item>
                                <Descriptions.Item label="Local start">
                                    {new Date(matchDetails.utcDate).toLocaleString()}
                                </Descriptions.Item>
                                <Descriptions.Item label="Venue">
                                    {matchDetails.venue ?? "Unknown location"}
                                </Descriptions.Item>
                            </>
                        }
                    </Descriptions>
                </Spin>
            </PageContainer>
        </>
    )
}