import {useContext, useMemo} from "react";
import {useAppSelector} from "../features/hooks";
import {selectCurrentUser} from "../features/auth/authSlice";
import {ColorsContext, defaultColor} from "../context/ColorsContext";

export const useAppColor = () => {
    const {colors} = useContext(ColorsContext)
    const currentUser = useAppSelector(selectCurrentUser)
    return useMemo(() =>
        currentUser
            ? colors.filter(color => color.userId === currentUser.id)[0]?.color ?? defaultColor
            : defaultColor, [colors, currentUser])
}