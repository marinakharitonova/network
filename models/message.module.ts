export interface IMessage {
    id: number,
    author: {
        avatarSrc: string | null,
    },
    text: string
}