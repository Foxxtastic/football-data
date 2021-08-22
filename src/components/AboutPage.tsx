import { Descriptions } from "antd";
import { PageContainer } from "./common"

export function AboutPage() {
    return (
        <PageContainer>
            <Descriptions title="About" bordered column={12}>
                <Descriptions.Item label="Api used" span={6}>
                    <a href='https://www.football-data.org/' target="_blank" rel="noreferrer">https://www.football-data.org/</a>
                </Descriptions.Item>
                <Descriptions.Item label="UI framework" span={6}>
                    <a href='https://ant.design/' target="_blank" rel="noreferrer">Ant design </a>
                </Descriptions.Item>
                <Descriptions.Item label="State management" span={6}>
                    <a href='https://redux.js.org//' target="_blank" rel="noreferrer">Redux</a>
                    {' '} and {' '}
                    <a href='https://redux-toolkit.js.org//' target="_blank" rel="noreferrer">Redux Toolkit</a>
                </Descriptions.Item>
                <Descriptions.Item label="Created by" span={6}>
                    Viktor Fórizs
                </Descriptions.Item>
                <Descriptions.Item label="Remarks" span={12}>
                    The api's free version only supports 13 competitions and 10 calls per minute. So if you click fast enough then you can run out of calls.
                </Descriptions.Item>
            </Descriptions>
        </PageContainer>
    )
}