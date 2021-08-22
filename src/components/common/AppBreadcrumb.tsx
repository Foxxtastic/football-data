import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectBreadcrumb } from "../../features/breadcrumb/breadcrumbSlice";

export function AppBreadcrumb() {

    const breadcrumb = useAppSelector(selectBreadcrumb);
    if (breadcrumb.length === 0) {
        return null;
    }
    return (
        <Breadcrumb style={{ paddingBottom: '20px' }}>
            {breadcrumb.map((_, idx) =>
                <Breadcrumb.Item key={idx}>
                    <Link to={_.link}>{_.text}</Link>
                </Breadcrumb.Item>
            )}
        </Breadcrumb>
    )
}