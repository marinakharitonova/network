import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

type ContentLoaderProps = {
    children: JSX.Element | JSX.Element[];
} & IRequest

const ContentLoader = ({status, error, children}: ContentLoaderProps): JSX.Element => {

    const currentError =  error ?? 'Big error'
    return (
        <>
            {status === 'loading' && <Loader/>}
            {status === 'failed' && <ErrorMessage text={currentError}/>}
            {status === 'succeeded' && children}
        </>
    )
}


export default ContentLoader