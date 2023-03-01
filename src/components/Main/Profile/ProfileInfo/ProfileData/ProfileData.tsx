import React, {useMemo, useState} from 'react';
import ProfileDescription from "../ProfileDescription/ProfileDescription";
import {Button} from "antd";
import ProfileInfoEditor from "../ProfileInfoEditor/ProfileInfoEditor";

type ProfileDataProps = {
    canUpdate: boolean,
    profile: IProfile
}
type OmittedProfile = Omit<IProfile, 'photos' | 'userId' | 'contacts'>
type ModeType = 'show' | 'edit'

function ProfileData({canUpdate, profile}: ProfileDataProps) {
    const [mode, setMode] = useState<ModeType>('show')
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
                            <Button type="primary" onClick={() => setMode('edit')}>Edit info</Button>}
                    </>
                    : <ProfileInfoEditor initialValues={formInitialValues}
                                         onFinishEdit={() => setMode('show')}/>
            }
        </>
    );
}

export default ProfileData;