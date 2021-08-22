import { Table } from "antd";
import Title from "antd/lib/typography/Title";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { LoadingStatus } from "../common/types";
import { setBreadcrumb } from "../features/breadcrumb/breadcrumbSlice";
import { getAllMatchesByCompetition, selectMatches, selectStatus } from "../features/matches/matchesSlice";
import { allStates, allStatuses } from "../common/matchStatuses";
import { AppBreadcrumb, PageContainer } from "./common";

const columns = [
    {
        title: "UTC beginning",
        dataIndex: "utcDate",
        key: "utcDate"
    },
    {
        title: "Local beginning",
        dataIndex: "localDate",
        key: "localDate"
    },
    {
        title: "Match day",
        dataIndex: "matchDay",
        key: "matchDay"
    },
    {
        title: "Home team",
        dataIndex: "homeTeam",
        key: "homeTeam"
    },
    {
        title: "Away team",
        dataIndex: "awayTeam",
        key: "awayTeam"
    },
    {
        title: "Status",
        dataIndex: "state",
        key: "state",
        filters: allStates.map(_ => ({
            text: _.toLowerCase(),
            value: _
        })),
        onFilter: (value: any, record: any) => record.state.indexOf(value) === 0
    },
    {
        title: "Detailed status",
        dataIndex: "status",
        key: "status",
        filters: allStatuses.map(_ => ({
            text: _.toLowerCase(),
            value: _
        })),
        onFilter: (value: any, record: any) => record.status.indexOf(value) === 0
    },
];

export function MatchListPage() {
    const { competition }: any = useParams();
    const matches = useAppSelector(selectMatches);
    const status = useAppSelector(selectStatus);
    const dispatch = useAppDispatch();
    const history = useHistory();

    const dataSource = matches.map(_ => ({
        key: _.id,
        utcDate: new Date(_.utcDate).toUTCString(),
        localDate: new Date(_.utcDate).toLocaleString(),
        matchDay: _.matchday,
        homeTeam: _.homeTeam,
        awayTeam: _.awayTeam,
        status: _.status,
        state: _.state !== null ? _.state : "UNKNOWN"
    }));

    useEffect(() => {
        dispatch(getAllMatchesByCompetition(competition));
        dispatch(setBreadcrumb([{ text: "Competitions", link: "/" }, { text: competition, link: `/${competition}` }]));
    }, [dispatch, competition]);

    const handleOnRowClick = (record: any, rowIndex: number | undefined) => {
        if (rowIndex !== undefined) {
            history.push(`/${competition}/${record.key}`)
        }
    }

    return (
        <>
            <AppBreadcrumb />
            <PageContainer>
                <Title style={{ textAlign: "center" }} level={2} >{`${competition} - matches`}</Title>
                <Table
                    className="pointer"
                    dataSource={dataSource}
                    columns={columns}
                    bordered={true}
                    loading={{
                        tip: "One moment...",
                        spinning: status === LoadingStatus.Loading
                    }}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: () => handleOnRowClick(record, rowIndex)
                        }
                    }}
                />
            </PageContainer>
        </>
    )
}