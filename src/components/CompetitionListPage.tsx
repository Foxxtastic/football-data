import { Table } from "antd";
import Title from "antd/lib/typography/Title";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { LoadingStatus } from "../common/types";
import { setBreadcrumb } from "../features/breadcrumb/breadcrumbSlice";
import { getAllCompetitions, selectCompetitions, selectStatus } from "../features/competitions/competitionsSlice";
import { AppBreadcrumb, PageContainer } from "./common";

const columns = [
    {
        title: "Country / Location",
        dataIndex: "country",
        key: "country"
    },
    {
        title: "Competition name",
        dataIndex: "name",
        key: "name"
    },
];

export function CompetitionListPage() {
    const competitions = useAppSelector(selectCompetitions);
    const status = useAppSelector(selectStatus);
    const dispatch = useAppDispatch();

    const dataSource = competitions.map((_, idx) => ({
        key: idx,
        country: _.country,
        name: <Link to={`/${_.name}`}>{_.name}</Link>
    }));

    useEffect(() => {
        dispatch(getAllCompetitions());
        dispatch(setBreadcrumb([{ text: "Competitions", link: "/" }]))
    }, [dispatch]);

    return (
        <>
            <AppBreadcrumb />
            <PageContainer>
                <Title style={{ textAlign: "center" }} level={2} >Available competitions</Title>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    bordered={true}
                    loading={{
                        tip: "One moment...",
                        spinning: status === LoadingStatus.Loading
                    }}
                />
            </PageContainer>
        </>
    )
}