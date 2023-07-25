import {apiBaseURL} from "../config";
import {axiosConfig} from "./config.service";
import axios from "axios";


export async function uploadFile(file: File) {
    const data = new FormData();
    data.append('file', file)
    try {
        const res = await axiosConfig.post(`${apiBaseURL}/media-storage/upload`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return res.data;
    } catch (err) {
        return null
    }
}

export async function getProducts() {
    try {
        const res = await axios.get(`${apiBaseURL}/products`)
        return res.data?.result;
    } catch (err) {
        return null
    }
}

export async function deleteProducts(id?: number) {
    try {
        const res = await axiosConfig.delete(`${apiBaseURL}/products/${id}`)
        return res.data?.result;
    } catch (err) {
        return null
    }
}

export type DataAdd = {
    name: string;
    image?: string;
    price?: number;
    id?: number
}

export async function createProduct(data: DataAdd) {
    try {
        const res = await axiosConfig.post(`${apiBaseURL}/products`, data)
        return res.data;
    } catch (err) {
        return null
    }
}

export async function editProduct(data: DataAdd) {
    try {
        const res = await axiosConfig.put(`${apiBaseURL}/products`, data)
        return res.data;
    } catch (err) {
        return null
    }
}
