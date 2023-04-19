import {Col, Row} from "antd";
import Everything from "./Everything/Everything";
import TopHeadlines from "./TopHeadlines/TopHeadlines";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";


const News = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (process.env.NODE_ENV === 'production') {
            navigate("/404", {replace: true});
        }
    }, [navigate]);

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