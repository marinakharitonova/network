import React from 'react';
import ImageUploader from "../../../../ImageUploader/ImageUploader";
import AvatarApp from "../../../../AvatarApp/AvatarApp";
import {useUpdateAvatarMutation} from "../../../../../features/api/apiSlice";
import useMutationResponseHandler from "../../../../../hooks/useMutationResponseHandler";

type ProfileAvatarProps = {
    canUpdate: boolean,
    avatar: string | null,
    userId: number
}

function ProfileAvatar({canUpdate, avatar, userId}: ProfileAvatarProps) {
    const [updateAvatar, {isLoading}] = useUpdateAvatarMutation()
    const handleResponse = useMutationResponseHandler()

    const uploadAvatarCb = (formData: FormData) => {
        handleResponse(updateAvatar({data: formData, userId: userId}))
    }

    const simpleAvatar = <AvatarApp src={avatar} shape="square" size={128}/>

    return (
        canUpdate
            ? <ImageUploader imageUrl={avatar} size={128} isLoading={isLoading} uploadCb={uploadAvatarCb}>
                {simpleAvatar}
            </ImageUploader>
            : simpleAvatar
    );
}

export default ProfileAvatar;