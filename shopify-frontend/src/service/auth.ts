import {apiBaseURL} from "../config";
import axios from "axios";

type DataLogin = {
    password: string;
    email: string
}

export async function login(body: DataLogin) {
    try {
        const res = await axios.post(`${apiBaseURL}/auth/login`, {
            password: body.password,
            email: body.email
        })
        return res.data;
    } catch (err: any) {
        return err.response.data
    }
}

export async function register(body: DataLogin) {
    try {
        const res = await axios.post(`${apiBaseURL}/auth/register`, {
            password: body.password,
            email: body.email
        })
        return res.data;
    } catch (err:any) {
        return err.response.data    }
}
