import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "../view/home";
import Header from "../view/layout/header";
import OrderHistory from "../view/order-history";


export function RouterManager() {

    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/order-history" element={<OrderHistory />} />
            </Routes>
        </BrowserRouter>
    );
}
