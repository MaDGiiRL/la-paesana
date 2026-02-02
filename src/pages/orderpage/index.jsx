import { useEffect, useState } from "react";
import OrderForm from "../../components/OrderForm.jsx";

export default function OrderPage() {
    const [cart, setCart] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("lp_cart") || "[]");
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("lp_cart", JSON.stringify(cart));
    }, [cart]);

    return (
        <div className="grid gap-5">
            <div>
                <h1 className="ui-h1">Ordina</h1>
                <p className="ui-muted text-sm">
                    Nessuna registrazione. Arrivi e mangi.
                </p>
            </div>

            <OrderForm cart={cart} setCart={setCart} />
        </div>
    );
}
