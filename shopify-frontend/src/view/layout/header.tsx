import React, {useEffect} from 'react';
import {Stack} from 'react-bootstrap';
import {Badge, IconButton} from "@mui/material";
import {AddShoppingCart} from "@mui/icons-material";
import {useAppSelector} from "../../redux/hook";
import {authStorage} from "../../storage/auth-storage";
import {CartPreview} from "../../components/cart-preview";
import {Link} from "react-router-dom";
import ModalLoginOrRegister from "../../components/modal-login-or-register";
import {useNavigate} from "react-router-dom";
import {ModalAddOrEditItem} from "../../components/modal-add-or-edit-item";

export default function Header() {
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = React.useState(false)
    const [isCreateItem, setIsCreateItem] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const isAuth = !!authStorage.get()

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const quantityInCart = useAppSelector((state) => {
        let quantityCart = 0;
        for (const item of state.items) {
            quantityCart += item.quantity
        }
        return quantityCart
    });

    const handleLogoutOrLogin = () => {
        if (isAuth) {
            authStorage.reset();
            window.location.reload()
        } else {
            setIsLogin(true)
        }
    }

    const handleClickRouteOrderList = () => {
        if (!isAuth) {
            setIsLogin(true)
        } else {
            navigate("/order-history");
        }
    }

    const handleCreateItem = () => {
        setIsCreateItem(true)
    }

    return (
        <Stack direction="horizontal" gap={3} className="mb-5 flex flex-wrap">
            <Link to={"/"} className="text-black">
                <h2 className="p-2">Shopify</h2>
            </Link>
            {
                isAuth && (
                    <>
                        <div className="p-2 ms-auto">
                            <button className="border px-3 bg-blue-50 rounded" onClick={handleClickRouteOrderList}>
                                Order history
                            </button>
                        </div>
                        <div>
                            <button className="border px-3 bg-blue-50 rounded" onClick={handleCreateItem}>
                                Create item
                            </button>
                        </div>
                    </>
                )
            }
            <div className={!isAuth ? "p-2 ms-auto" : ''}>
                <button className="border px-3 bg-blue-50 rounded" onClick={handleLogoutOrLogin}>
                    {isAuth ? "Logout" : "Login"}
                </button>
            </div>
            <div className="p-2">
                <IconButton
                    onClick={handleClick}
                    color="primary"
                    aria-label="add to shopping cart"
                    aria-describedby={id}
                >
                    <Badge badgeContent={quantityInCart} color="primary" invisible={quantityInCart < 1}>
                        <AddShoppingCart color="action"/>
                    </Badge>
                </IconButton>
            </div>
            <CartPreview id={id} open={open} anchorEl={anchorEl} quantityInCart={quantityInCart}/>
            <ModalLoginOrRegister
                isOpen={isLogin}
                onClose={() => setIsLogin(false)}
            />
            {
                isCreateItem &&
                <ModalAddOrEditItem
                    onClose={() => setIsCreateItem(false)}
                    open={isCreateItem}
                    isEdit={false}
                />
            }
        </Stack>
    );
}


