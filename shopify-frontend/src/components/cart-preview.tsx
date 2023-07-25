import {useAppDispatch, useAppSelector} from "../redux/hook";
import {actions, EAction, Item} from "../redux/slice";
import {Box, Button, IconButton, Popper} from "@mui/material";
import {AddOutlined, DeleteOutline, RemoveOutlined} from "@mui/icons-material";
import React, {useState} from "react";
import {placeOrder} from "../service/order.service";
import {toast} from "react-toastify";

type CartPreviewProps = {
    id?: string;
    open: boolean;
    anchorEl: null | HTMLElement;
    quantityInCart: number
}

export const CartPreview = ({id, open, anchorEl, quantityInCart}: CartPreviewProps) => {

    const items = useAppSelector((state) => state.items);
    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = useState(false)

    const handleUpdateItem = (item: Item, type: EAction) => {
        dispatch(actions.updateCart(
            {
                items: [{
                    ...item,
                    quantity: 1
                }],
                type
            }
        ))
    }

    const handleDeleteItem = (item: Item) => {
        dispatch(actions.deleteItem(
            {
                items: [item],
            }
        ))
    }

    const handlePlaceOrder = () => {
        setIsLoading(true)
        placeOrder({
            email: "trangbn580@gmail.com",
            total_amount: items.reduce((previousValue, currentValue) => {
                return  previousValue + currentValue.quantity * currentValue.price
            }, 0),
            order_items: items.map(item => ({quantity: item.quantity, product_id: item.id})),
            address: "demo"
        })
            .then(res => {
                if (res?.type === "success"){
                    dispatch(actions.deleteCart())
                    toast.success("Order success!")
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <Popper id={id} open={open} anchorEl={anchorEl} className="">
            <Box className="mr-5 border p-8 bg-blue-50 w-80">
                {
                    items.map(item => (
                        <div key={item.id} className="border rounded flex justify-between w-64 p-2 items-center mb-3">
                            <div>
                                <div>
                                    {item.name}
                                </div>
                                <div>
                                    quantity: {item.quantity}
                                </div>
                            </div>
                            <div>
                                <IconButton
                                    disabled={item.quantity === 1}
                                    onClick={() => handleUpdateItem(item, EAction.DECREMENT)}
                                >
                                    <RemoveOutlined/>
                                </IconButton>
                                <IconButton
                                    disabled={quantityInCart >= 6}
                                    onClick={() => handleUpdateItem(item, EAction.INCREMENT)}
                                >
                                    <AddOutlined/>
                                </IconButton>
                                <IconButton
                                    color="error"
                                    onClick={() => handleDeleteItem(item)}
                                >
                                    <DeleteOutline/>
                                </IconButton>
                            </div>
                        </div>

                    ))
                }
                {
                    items.length === 0 ? (
                        <div className="text-center">
                            Cart is empty
                        </div>
                    ) : (
                        <Button
                            className="mt-3 w-full"
                            variant="contained"
                            onClick={handlePlaceOrder}
                            disabled={isLoading}
                        >
                            Place order
                        </Button>
                    )
                }
            </Box>
        </Popper>
    )
}
