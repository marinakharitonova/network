import {instance} from "./instance";

export const authAPI = {
    async fetchAuthorization(){
        const response = await instance.get(`auth/me`)
        return response.data
    }
}