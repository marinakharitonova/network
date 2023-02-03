import {useAppSelector} from "../redux/hooks";
import {Navigate} from "react-router-dom";
import React from "react";

export const withAuth = <T extends object>(WrappedComponent: React.ComponentType<T>) => {

    const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

    const WithAuthComponent = (props: T) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const isUserAuthorized = useAppSelector(state => state.auth.isUserAuthorized)
        if (!isUserAuthorized) return <Navigate replace to="/login" />
        return <WrappedComponent {...props}/>
    }

    WithAuthComponent.displayName = `withAuth(${displayName})`;

    return WithAuthComponent
}
