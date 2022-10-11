import {IPost} from "../../models/post.model";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_MESSAGE = 'UPDATE-NEW-POST-MESSAGE';

const profileReducer = (state: any, action: any) => {
    switch (action.type) {
        case ADD_POST:
            const newPost: IPost = {
                id: 5,
                avatarSrc: null,
                title: 'Title new',
                description: state.newPostMessage,
                likesCount: 0
            }

            state.posts.push(newPost);
            state.newPostMessage = '';

            return state
        case UPDATE_NEW_POST_MESSAGE:
            state.newPostMessage = action.message;
            return state
        default:
            return state
    }
}

export const addPostActionCreator = () => ({type: ADD_POST});
export const updateNewPostMessageActionCreator = (value: string) =>
    ({type: UPDATE_NEW_POST_MESSAGE, message: value});


export default profileReducer