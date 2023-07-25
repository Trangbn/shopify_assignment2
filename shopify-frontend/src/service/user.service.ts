import {axiosConfig} from "./config.service";
import {apiBaseURL} from "../config";

export async function getMe() {
    try {
        const res = await axiosConfig.get(`${apiBaseURL}/users/me`)
        return res.data?.result;
    } catch (err) {
        return null
    }
}
