import {instance} from "./instance";

export const usersAPI = {
    async fetchUsers(count: number, page: number){
        const response = await instance.get(`users?count=${count}&page=${page}`)
        return response.data
    },

    async follow(userId: number){
        const response = await instance.post(`follow/${userId}`, {})
        return response.data
    },

    async unFollow(userId: number){
        const response = await instance.delete(`follow/${userId}`)
        return response.data
    }
}