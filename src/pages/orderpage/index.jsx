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
        <div className="grid gap-6">
            <div>
                <h1 className="text-4xl font-black tracking-tight">Ordina</h1>
                <p className="mt-2 text-white/70">
                    Nessuna registrazione. Inserisci i dati, l’ora di arrivo e invia.
                </p>
            </div>

            <OrderForm cart={cart} setCart={setCart} />
        </div>
    );
}
