import {instance} from "./instance";

export const profileAPI = {
    async fetchProfile(profileId: number){
        const response = await instance.get(`profile/${profileId}`)
        return response.data
    }
}