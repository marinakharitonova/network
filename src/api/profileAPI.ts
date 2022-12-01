import {instance} from "./instance";

export const profileAPI = {
    async fetchProfile(profileId: number) {
        const response = await instance.get(`profile/${profileId}`)
        return response.data
    },

    async fetchStatus(profileId: number) {
        const response = await instance.get(`profile/status/${profileId}`)
        return response.data
    },

    async updateStatus(status: string) {
        const response = await instance.put(`profile/status`, {status})
        return response.data
    }
}