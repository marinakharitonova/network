interface IUser {
    id: number,
    name: string,
    uniqueUrlName: string | null,
    photos: {
        small: string | null,
        large: string | null
    }
    status: string | null,
    followed: boolean,
}