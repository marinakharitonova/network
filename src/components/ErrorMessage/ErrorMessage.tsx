import {Alert} from "antd";

type ErrorMessageProps = {
    text: IRequest["error"]
}

const ErrorMessage = ({text}: ErrorMessageProps): JSX.Element => {
    return <Alert message={text} type="error" />
}

export default ErrorMessage