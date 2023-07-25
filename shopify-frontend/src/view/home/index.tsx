import React, {useEffect, useState} from "react";
import CardItem from "../../components/card-item";
import {getProducts} from "../../service/item.service";
import {actions, Item} from "../../redux/slice";
import {getMe} from "../../service/user.service";
import {authStorage} from "../../storage/auth-storage";
import {getCart} from "../../service/cart.service";
import {useAppDispatch} from "../../redux/hook";

export default function Home() {
    const dispatch = useAppDispatch();

    const [items, setItems] = useState<Item[]>([]);


    useEffect(() => {
        getProducts()
            .then((res: any) => {
                if (!!res){
                    setItems(res?.data)
                }
            })
        if (!!authStorage.get()){
            getMe()
                .then(res => {
                    localStorage.setItem('userId', res?.id)
                    localStorage.setItem('email', res?.email)
                })
            getCart()
                .then(res => {
                    if (res?.result){
                        dispatch(actions.setCart(
                            {
                                items: res?.result?.cart_info?.items,
                                cartId: res?.result?.id
                            }
                        ))
                    }
                })
        }
    }, []);


    return (
        <div className="flex flex-wrap">
            {
                items.map(item => (
                    <CardItem key={item?.id} dataSource={item}/>
                ))
            }
        </div>
    )
}
