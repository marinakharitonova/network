interface IProfile {
    userId: number,
    aboutMe: string | null,
    lookingForAJob: boolean,
    lookingForAJobDescription: string | null,
    fullName: string,
    contacts: {
        github: string | null,
        vk: string | null,
        facebook: string | null,
        instagram: string | null,
        twitter: string | null,
        website: string | null,
        youtube: string | null,
        mainLink: string | null
    }
    photos: {
        small: string | null,
        large: string | null
    }
}