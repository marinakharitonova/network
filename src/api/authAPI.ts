import {instance} from "./instance";

export const authAPI = {
    async fetchAuthorization(){
        const response = await instance.get(`auth/me`)
        return response.data
    },

    async login(data: ILogin){
        const response = await instance.post(`/auth/login`, data)
        return response.data
    },

    async logout(){
        const response = await instance.delete(`/auth/login`)
        return response.data
    }
}