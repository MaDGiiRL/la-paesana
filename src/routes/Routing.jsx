import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout.jsx";

import HomePage from "../pages/homepage/index.jsx";
import MenuPage from "../pages/menupage/index.jsx";
import OrderPage from "../pages/orderpage/index.jsx";
import ContactsPage from "../pages/contactspage/index.jsx";
import AdminPage from "../pages/adminpage/index.jsx";
import ErrorPage from "../pages/error/index.jsx";

export default function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/ordina" element={<OrderPage />} />
                    <Route path="/contatti" element={<ContactsPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
