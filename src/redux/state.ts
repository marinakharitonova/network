import {IDialog} from "../../models/dialog.module";
import {IMessage} from "../../models/message.module";
import {IPost} from "../../models/post.model";
import {IFriend} from "../../models/friend.module";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import friendsReducer from "./friendsReducer";

const dialogsData: IDialog[] = [
    {
        id: 1,
        name: 'Dima',
        avatarSrc: null,
    },
    {
        id: 2,
        name: 'Valera',
        avatarSrc: null,
    },
    {
        id: 3,
        name: 'Sveta',
        avatarSrc: 'https://catherineasquithgallery.com/uploads/posts/2021-03/1614856361_2-p-foto-devushek-na-fone-6.jpg',
    },
]
const messagesData: IMessage[] = [
    {
        id: 1,
        author: {
            avatarSrc: null,
        },
        text: 'blabla'
    },
    {
        id: 2,
        author: {
            avatarSrc: null,
        },
        text: 'Hello'
    },
]
const postsData: IPost[] = [
    {
        id: 1,
        avatarSrc: 'https://avatars.mds.yandex.net/i?id=efb47ec07435b74e8dcf00ba0dba0874-5236416-images-thumbs&n=13&exp=1',
        title: 'Ant Design Title 1',
        description: 'desc1',
        likesCount: 100
    },
    {
        id: 2,
        avatarSrc: null,
        title: 'Ant Design Title 2',
        description: 'desc2',
        likesCount: 3
    },
    {
        id: 3,
        avatarSrc: null,
        title: 'Title 3',
        description: 'Hello, Marina',
        likesCount: 7000
    }
];
const friendsList: IFriend[] = [
    {
        id: 1,
        name: 'Bobi',
        avatarSrc: null,
        status: 'hello!'
    },
    {
        id: 1,
        name: 'Kitty',
        avatarSrc: 'https://avatars.mds.yandex.net/i?id=8e6ab4f8369e986613acb7cc651e55a0-4352086-images-thumbs&n=13&exp=1',
        status: 'mr mr mr'
    }
]

export const store = {
    _emit(object: any) {
        console.log('store changed')
    },
    _state: {
        profilePage: {
            posts: postsData,
            newPostMessage: ''
        },
        dialogsPage: {
            messages: messagesData,
            dialogs: dialogsData,
            messageText: '',
        },
        friendsPage: {
            friends: friendsList
        }
    },
    getState() {
        return this._state;
    },
    subscribe(observer: any) {
        this._emit = observer
    },

    dispatch(action: any) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.friendsPage = friendsReducer(this._state.friendsPage, action);

        this._emit(this._state);
    },
}

function sleep(n: number = 500) {
    return new Promise((r) => setTimeout(r, n));
}

export async function profileLoader() {
    await sleep();
    return {
        state: store.getState().profilePage,
        addPost: store.dispatch.bind(store),
        updateNewPostMessage: store.dispatch.bind(store)
    }
}

export async function dialogsLoader() {
    await sleep();
    return {
        state: store.getState().dialogsPage,
        updateMessage: store.dispatch.bind(store),
        sendMessage: store.dispatch.bind(store),
    }
}

export async function friendsLoader() {
    await sleep();
    return store.getState().friendsPage
}