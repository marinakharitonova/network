import {useAppSelector} from "../redux/hooks";
import {Navigate} from "react-router-dom";
import React from "react";
import {selectCurrentUser} from "../redux/features/auth/authSlice";

export const withAuth = <T extends object>(WrappedComponent: React.ComponentType<T>) => {

    const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

    const WithAuthComponent = (props: T) => {
        const currentUser = useAppSelector(selectCurrentUser)
        if (!currentUser) return <Navigate replace to="/login"/>
        return <WrappedComponent {...props}/>
    }

    WithAuthComponent.displayName = `withAuth(${displayName})`;

    return WithAuthComponent
}
