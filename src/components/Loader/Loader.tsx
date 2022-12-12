import {Spin} from "antd";

const Loader = (): JSX.Element => {

    return <div style={{textAlign: 'center', marginTop: '60px'}}><Spin size="large" tip="Loading..."/></div>

}

export default Loader