import {axiosConfig} from "./config.service";
import {apiBaseURL} from "../config";

export async function getOrder() {
    try {
        const res = await axiosConfig.get(`${apiBaseURL}/orders`)
        return res.data;
    } catch (err) {
        return null
    }
}

type OrderItem = {
    product_id: number;
    quantity: number
}

export type OrderData = {
    email?: string,
    address: string,
    total_amount: number,
    order_items: OrderItem[];
}

export async function placeOrder(data: OrderData) {
    try {
        const res = await axiosConfig.post(`${apiBaseURL}/orders`, data)
        return res.data;
    } catch (err) {
        return null
    }
}
