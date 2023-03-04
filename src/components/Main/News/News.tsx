import {Col, Row} from "antd";
import Everything from "./Everything/Everything";
import TopHeadlines from "./TopHeadlines/TopHeadlines";


const News = (): JSX.Element => {
    return (
        <Row gutter={16}>
            <Col span={6}>
                <TopHeadlines/>
            </Col>
            <Col span={18}>
                <Everything/>
            </Col>
        </Row>
    )
}

export default News