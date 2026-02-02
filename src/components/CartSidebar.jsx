// src/components/CartSidebar.jsx
import { Link } from "react-router-dom";
import { ShoppingBag, Trash2, Plus, Minus } from "lucide-react";

export default function CartSidebar({ cart = [], onInc, onDec, onRemove }) {
    const totalItems = cart.reduce((s, x) => s + x.qty, 0);
    const total = cart.reduce((s, x) => s + x.price * x.qty, 0);

    return (
        <aside className="hidden lg:block">
            <div className="ui-card p-5 sticky top-24">
                <div className="flex items-end justify-between gap-3">
                    <div>
                        <div className="ui-chip inline-flex items-center gap-2">
                            <ShoppingBag size={14} />
                            Carrello
                        </div>
                        <div className="mt-2 text-lg font-black">Il tuo ordine</div>
                        <div className="ui-muted text-sm">
                            {totalItems} articoli • € {total.toFixed(2)}
                        </div>
                    </div>

                    <Link to="/ordina" className="ui-btn-gold">
                        <span>Checkout</span>
                    </Link>
                </div>

                <div className="mt-4 grid gap-3">
                    {!cart.length ? (
                        <div className="rounded-xl border border-[rgba(20,20,20,0.10)] bg-[rgba(20,20,20,0.02)] p-4">
                            <div className="font-bold">Carrello vuoto</div>
                            <div className="ui-muted text-sm mt-1">Aggiungi piatti dal menu.</div>
                        </div>
                    ) : (
                        cart.map((it) => (
                            <div key={it.lineId || it.id} className="ui-soft p-4">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <div className="font-bold truncate">{it.name}</div>
                                        <div className="ui-muted text-xs">
                                            € {it.price.toFixed(2)} • x{it.qty}
                                        </div>

                                        {it.notes ? (
                                            <div className="mt-2 text-xs ui-muted">“{it.notes}”</div>
                                        ) : null}
                                    </div>

                                    <button
                                        className="ui-btn"
                                        type="button"
                                        onClick={() => onRemove?.(it.lineId || it.id)}
                                        aria-label="Rimuovi"
                                        title="Rimuovi"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <div className="mt-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="ui-btn"
                                            type="button"
                                            onClick={() => onDec?.(it.lineId || it.id)}
                                            aria-label="Diminuisci quantità"
                                            title="Diminuisci"
                                        >
                                            <Minus size={16} />
                                        </button>

                                        <div className="w-10 text-center font-black">{it.qty}</div>

                                        <button
                                            className="ui-btn"
                                            type="button"
                                            onClick={() => onInc?.(it.lineId || it.id)}
                                            aria-label="Aumenta quantità"
                                            title="Aumenta"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <div className="font-black">€ {(it.price * it.qty).toFixed(2)}</div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length ? (
                    <div className="mt-4 rounded-xl border border-[rgba(212,170,55,0.22)] bg-[rgba(255,200,64,0.12)] p-4">
                        <div className="flex items-center justify-between">
                            <div className="ui-muted text-sm font-semibold">Totale</div>
                            <div className="text-lg font-black">€ {total.toFixed(2)}</div>
                        </div>

                        <Link to="/ordina" className="ui-btn-gold mt-3 w-full justify-center">
                            <span>Vai al checkout</span>
                        </Link>

                        <div className="mt-2 ui-muted text-xs">Pagamento alla cassa (demo).</div>
                    </div>
                ) : null}
            </div>
        </aside>
    );
}
