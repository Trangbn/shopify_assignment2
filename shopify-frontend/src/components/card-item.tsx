import {Card} from 'react-bootstrap';
import {useAppDispatch, useAppSelector} from "../redux/hook";
import {actions, EAction, Item} from "../redux/slice";
import {Button, TextField} from "@mui/material";
import {useState} from "react";
import {ModalAddOrEditItem} from "./modal-add-or-edit-item";
import {authStorage} from "../storage/auth-storage";
import {convertImage} from "../utils/convert";
import {deleteProducts} from "../service/item.service";

type ItemDetailProps = {
    dataSource?: Item
}


export default function CardItem({dataSource}: ItemDetailProps) {

    const dispatch = useAppDispatch();
    const quantityInCart = useAppSelector((state) => {
        let quantityCart = 0;
        for(const item of state.items){
            quantityCart += item.quantity
        }
        return quantityCart
    });
    const [quantity, setQuantity] = useState<number>(1)
    const [isEdit, setIsEdit] = useState(false)

    const handleAddToCard = () => {
        dispatch(actions.updateCart(
            {
                items: [{
                    id: dataSource?.id ?? 0,
                    name: dataSource?.name ?? "",
                    quantity: quantity ?? 0,
                    image: dataSource?.image,
                    price: dataSource?.price ?? 0
                }],
                type: EAction.INCREMENT
            }
        ))
        setQuantity(1)
    }

    const handleDeleteItem = () => {
        deleteProducts(dataSource?.id)
            .then(() => {
                window.location.reload();
            })
    }

    const isAuth = !!authStorage.get()

    const isDisableAddToCart = !quantity || quantity + quantityInCart > 6 || !isAuth

    return (
        <Card className="!w-60 mr-3 mb-3">
            <Card.Img variant="top" className="!w-full !h-40 object-fit-cover" src={convertImage(dataSource?.image ?? "")} />
            <Card.Body>
                <Card.Title>{dataSource?.name}</Card.Title>
                <Card.Text>
                    Price: {dataSource?.price}
                </Card.Text>
                <div className="flex items-center w-full justify-between h-20">
                    <TextField
                        id="outlined-basic"
                        label="Quantity"
                        variant="outlined"
                        type="number"
                        className="w-50"
                        onChange={(e) => {
                            setQuantity(+e.target.value)
                        }}
                        value={quantity}
                        InputProps={{
                            inputProps: {
                                max: 6, min: 1
                            }
                        }}
                        size="small"
                    />
                    <Button
                        onClick={handleAddToCard}
                        variant="outlined"
                        disabled={isDisableAddToCart}
                    >
                        Add
                    </Button>
                </div>
                <Button
                    onClick={() => setIsEdit(true)}
                    variant="outlined"
                    className="w-full"
                    disabled={!isAuth}
                >
                    EDIT
                </Button>
                <Button
                    onClick={handleDeleteItem}
                    variant="contained"
                    className="w-full mt-2"
                    disabled={!isAuth}
                    color="error"
                >
                    Delete
                </Button>
            </Card.Body>
            {
                isEdit && (
                    <ModalAddOrEditItem
                        open={isEdit}
                        onClose={() => setIsEdit(false)}
                        isEdit={true}
                        dataSource={dataSource}
                    />
                )
            }
        </Card>
    )
}
