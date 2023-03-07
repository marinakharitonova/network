import {apiSlice} from "../api/apiSlice";

const url = `wss://social-network.samuraijs.com/handlers/ChatHandler.ashx`;
let socket: WebSocket | null
let connected: Promise<void> | null
const getSocket = () => {
    if (!socket) {
        socket = new WebSocket(url)
        socket.addEventListener('close', handleSocketClose)
        socket.addEventListener('error', handleSocketError)
        connected = new Promise<void>((resolve) =>
            socket!.addEventListener("open", (event) => {
                resolve();
            })
        )
    }
    return socket;
}

let handleSocketMessage: (event: MessageEvent) => void
const handleSocketError = (event: Event) => {
    console.error(`Socket encountered error: `, event, 'Closing socket');
    socket?.close();

}
const handleSocketClose = (e: CloseEvent) => {
    console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
    setTimeout(function () {
        cleanUpSocket()
        getSocket()
    }, 1000);
}

const cleanUpSocket = () => {
    if (!socket) return
    socket.removeEventListener('error', handleSocketError)
    socket.removeEventListener('close', handleSocketClose)
    socket.removeEventListener('message', handleSocketMessage)
    connected = null
    socket = null
}

export const chatApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query<IMessage[], void>({
            queryFn: async () => ({data: []}),
            async onCacheEntryAdded(
                arg,
                {updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch}
            ) {
                const ws = getSocket()
                handleSocketMessage = (event: MessageEvent) => {
                    const data = JSON.parse(event.data)
                    if (!data) return

                    updateCachedData((draft) => {
                        draft.push(...data)
                    })
                }
                try {
                    await cacheDataLoaded
                    await connected
                    ws.addEventListener('message', handleSocketMessage)
                } catch {
                }
                await cacheEntryRemoved
                cleanUpSocket()
                ws.close()
            },
        }),
        sendMessage: builder.mutation<string, string>({
            queryFn: async (chatMessageContent: string) => {
                const ws = getSocket()
                await connected
                return new Promise(resolve => {
                    ws.send(chatMessageContent)
                    resolve({data: chatMessageContent})
                })
            },
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetMessagesQuery,
    useSendMessageMutation
} = chatApiSlice