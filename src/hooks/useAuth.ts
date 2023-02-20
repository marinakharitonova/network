import {useMemo} from 'react'
import {selectCurrentUser} from "../redux/features/auth/authSlice";
import {useAppSelector} from "../redux/hooks";

export const useAuth = () => {
    const user = useAppSelector(selectCurrentUser)

    return useMemo(() => ({user}), [user])
}
