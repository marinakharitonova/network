import React, {useMemo} from 'react';
import ProfileDescription from "../ProfileDescription/ProfileDescription";
import {Button} from "antd";
import ProfileInfoEditor from "../ProfileInfoEditor/ProfileInfoEditor";
import {useMode} from "../../../../../hooks/useMode";

type ProfileDataProps = {
    canUpdate: boolean,
    profile: IProfile
}
type OmittedProfile = Omit<IProfile, 'photos' | 'userId' | 'contacts'>

function ProfileData({canUpdate, profile}: ProfileDataProps) {
    const [mode, switchMode] = useMode()
    const formInitialValues = useMemo(() => {
        const initValues = {} as OmittedProfile

        for (let key in profile) {
            if (key === 'userId' || key === 'photos' || key === 'contacts') continue
            (initValues as any)[key] = profile[key as keyof OmittedProfile]
        }

        return Object.assign(initValues, profile.contacts)

    }, [profile])

    return (
        <>
            {
                mode === 'show'
                    ? <>
                        <ProfileDescription profile={profile}/>
                        {canUpdate &&
                            <Button type="primary" onClick={switchMode}>Edit info</Button>}
                    </>
                    : <ProfileInfoEditor initialValues={formInitialValues}
                                         onFinishEdit={switchMode}/>
            }
        </>
    );
}

export default ProfileData;