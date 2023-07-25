import {axiosConfig} from "./config.service";
import {apiBaseURL} from "../config";


export interface ICartItem {
    product_id: number;
    name: string;
    image?: string;
    price: number;
    quantity: number;
}

export interface ICartInfo {
    items: ICartItem[];
}

export type cartUpdate = {
    id?: number,
    user_id: number,
    cart_info: ICartInfo
}

export async function updateCart(data: cartUpdate) {
    try {
        const res = await axiosConfig.post(`${apiBaseURL}/carts`, data)
        return res.data;
    } catch (err) {
        return null
    }
}

export async function getCart() {
    try {
        const res = await axiosConfig.get(`${apiBaseURL}/carts`)
        return res.data;
    } catch (err) {
        return null
    }
}
