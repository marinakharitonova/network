import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

type ContentLoaderProps = {
    renderContent: JSX.Element
} & IRequest

const ContentLoader = ({status, error, renderContent}: ContentLoaderProps): JSX.Element => {
    console.log(status);
    return <>
        {status === 'loading' && <Loader/>}
        {status === 'succeeded' && renderContent}
        {status === 'failed' && <ErrorMessage text={error}/>}
    </>
}


export default ContentLoader