import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '41b53631-d409-42fd-9c23-c463cd4b426b'
    },
    withCredentials: true
})