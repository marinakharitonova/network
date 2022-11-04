interface IUser {
    id: string,
    name: string,
    avatarSrc: string | null,
    status: string | null,
    location: {
        country: string,
        city: string
    } | null,
    isFriend: boolean
}