import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {toast} from "react-toastify";
import {updateCart} from "../../service/cart.service";

export type Item = {
    name: string;
    id: number;
    quantity: number;
    image?: string;
    price: number
}

export enum EAction {
    INCREMENT = "INCREMENT",
    DECREMENT = "DECREMENT"
}

export interface IssueInitialState {
    items: Item[];
    type?: EAction;
    cartId?: number
}

type Payload = {
    items: Item[];
    type?: EAction;
    cartId?: number
}

const initialState: IssueInitialState = {
    items: [],
    cartId: undefined
}

const slice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateCart: (state, action: PayloadAction<Payload>) => {
            const ind = state.items.findIndex((d: any) => d?.id === action.payload.items[0].id)
            if (ind !== -1) {
                if (action.payload.type === EAction.INCREMENT) {
                    state.items[ind].quantity += action.payload.items[0].quantity
                } else {
                    state.items[ind].quantity -= action.payload.items[0].quantity
                }
            } else {
                state.items.push(action.payload.items[0])
            }
            updateCart({
                id: state.cartId,
                user_id: +localStorage.getItem('userId')!,
                cart_info: {
                    items: state.items.map(item => ({
                        ...item,
                        product_id: item.id,
                        price: item?.price ?? 0
                    }))
                }
            })
            toast.success("Update cart success!")
        },
        deleteItem: (state, action: PayloadAction<Payload>) => {
            const index = state.items.findIndex((d: any) => d?.id === action.payload.items[0].id)
            state.items.splice(index, 1)
            updateCart({
                id: state.cartId,
                user_id: +localStorage.getItem('userId')!,
                cart_info: {
                    items: state.items.map(item => ({
                        ...item,
                        product_id: item.id,
                        price: item?.price ?? 0
                    }))
                }
            })
        },
        deleteCart: (state) => {
            state.items = []
            updateCart({
                id: state.cartId,
                user_id: +localStorage.getItem('userId')!,
                cart_info: {
                    items: []
                }
            })
        },
        setCart: (state, action: PayloadAction<Payload>) => {
            state.items = action.payload.items
            state.cartId = action.payload.cartId
        }
    },
});

export const {actions, reducer} = slice;
