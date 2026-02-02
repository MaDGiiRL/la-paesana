import { useMemo, useState } from "react";

const LS_ORDERS = "lp_orders";

function loadOrders() {
    try { return JSON.parse(localStorage.getItem(LS_ORDERS) || "[]"); }
    catch { return []; }
}
function saveOrders(next) {
    localStorage.setItem(LS_ORDERS, JSON.stringify(next));
}

export default function OrderForm({ cart, setCart }) {
    const total = useMemo(
        () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
        [cart]
    );

    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        arrivalTime: "",
        address: "",
        notes: "",
        pickup: "in_sede",
    });

    const [done, setDone] = useState(false);
    const [orderId, setOrderId] = useState("");

    function update(key, value) {
        setForm((p) => ({ ...p, [key]: value }));
    }

    function changeQty(id, delta) {
        setCart((prev) =>
            prev.map((x) => (x.id === id ? { ...x, qty: Math.max(1, x.qty + delta) } : x))
        );
    }

    function removeItem(id) {
        setCart((prev) => prev.filter((x) => x.id !== id));
    }

    function validate() {
        if (!form.name.trim()) return "Inserisci il nome";
        if (!form.phone.trim()) return "Inserisci il telefono";
        if (!form.arrivalTime.trim()) return "Inserisci l’ora di arrivo";
        if (!cart.length) return "Il carrello è vuoto";
        if (form.pickup === "asporto" && !form.address.trim()) return "Inserisci l’indirizzo";
        return "";
    }

    function submit(e) {
        e.preventDefault();
        const err = validate();
        if (err) { alert(err); return; }

        const now = new Date();
        const id = `LP-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${now.getTime()}`;

        const order = {
            id,
            createdAt: now.toISOString(),
            status: "pending",
            kitchenNotes: "",
            customer: {
                name: form.name.trim(),
                phone: form.phone.trim(),
                email: form.email.trim(),
            },
            details: {
                pickup: form.pickup,
                arrivalTime: form.arrivalTime,
                address: form.pickup === "asporto" ? form.address.trim() : "",
                notes: form.notes.trim(),
            },
            items: cart,
            total,
        };

        const orders = loadOrders();
        saveOrders([order, ...orders]);

        setOrderId(id);
        setDone(true);
        setCart([]);
    }

    if (done) {
        return (
            <div className="ui-card p-5 md:p-7">
                <div className="text-2xl font-black">Ordine inviato ✅</div>
                <p className="mt-2 ui-muted">Grazie! Il tuo ordine è stato registrato con ID:</p>
                <div className="mt-3 rounded-xl border border-[rgba(20,20,20,0.12)] bg-[rgba(20,20,20,0.03)] px-4 py-3 font-mono text-sm">
                    {orderId}
                </div>
                <p className="mt-4 ui-muted text-sm">(Demo) Lo staff può vederlo nella dashboard admin.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
            {/* LEFT: Form */}
            <form onSubmit={submit} className="grid gap-4">
                {/* Step 1 */}
                <div className="ui-card p-5 md:p-7">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <div className="ui-chip">1 • Dati contatto</div>
                            <h2 className="mt-2 ui-h2">I tuoi dati</h2>
                            <p className="mt-1 ui-muted text-sm">Li usiamo solo per confermare l’ordine.</p>
                        </div>
                        <div className="ui-chip">Totale: <strong>€ {total.toFixed(2)}</strong></div>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <label className="grid gap-2">
                            <span className="text-sm font-semibold ui-muted">Nome e cognome</span>
                            <input
                                value={form.name}
                                onChange={(e) => update("name", e.target.value)}
                                className="ui-input"
                                placeholder="Mario Rossi"
                            />
                        </label>

                        <label className="grid gap-2">
                            <span className="text-sm font-semibold ui-muted">Telefono</span>
                            <input
                                value={form.phone}
                                onChange={(e) => update("phone", e.target.value)}
                                className="ui-input"
                                placeholder="+39 ..."
                            />
                        </label>

                        <label className="grid gap-2 md:col-span-2">
                            <span className="text-sm font-semibold ui-muted">Email (opzionale)</span>
                            <input
                                value={form.email}
                                onChange={(e) => update("email", e.target.value)}
                                className="ui-input"
                                placeholder="mario@email.it"
                            />
                        </label>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="ui-card p-5 md:p-7">
                    <div>
                        <div className="ui-chip">2 • Dettagli ordine</div>
                        <h2 className="mt-2 ui-h2">Consegna / Ritiro</h2>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <label className="grid gap-2">
                            <span className="text-sm font-semibold ui-muted">Modalità</span>
                            <select
                                value={form.pickup}
                                onChange={(e) => update("pickup", e.target.value)}
                                className="ui-input"
                            >
                                <option value="in_sede">Ritiro / Tavolo</option>
                                <option value="asporto">Consegna (demo)</option>
                            </select>
                        </label>

                        <label className="grid gap-2">
                            <span className="text-sm font-semibold ui-muted">Ora di arrivo</span>
                            <input
                                value={form.arrivalTime}
                                onChange={(e) => update("arrivalTime", e.target.value)}
                                className="ui-input"
                                placeholder="Es. 20:15"
                            />
                        </label>

                        {form.pickup === "asporto" && (
                            <label className="grid gap-2 md:col-span-2">
                                <span className="text-sm font-semibold ui-muted">Indirizzo</span>
                                <input
                                    value={form.address}
                                    onChange={(e) => update("address", e.target.value)}
                                    className="ui-input"
                                    placeholder="Via..."
                                />
                            </label>
                        )}

                        <label className="grid gap-2 md:col-span-2">
                            <span className="text-sm font-semibold ui-muted">Note</span>
                            <textarea
                                value={form.notes}
                                onChange={(e) => update("notes", e.target.value)}
                                className="ui-input"
                                style={{ minHeight: 110 }}
                                placeholder="Allergie, preferenze…"
                            />
                        </label>
                    </div>

                    <button type="submit" className="mt-5 w-full ui-btn-gold">
                        <span>Invia ordine • € {total.toFixed(2)}</span>
                    </button>

                    <p className="mt-3 ui-muted text-xs">
                        (Demo) Pagamento alla cassa / al ritiro. Conferma via telefono.
                    </p>
                </div>
            </form>

            {/* RIGHT: Summary */}
            <aside className="lg:sticky lg:top-24 h-fit">
                <div className="ui-card p-5 md:p-6">
                    <div className="flex items-end justify-between">
                        <div>
                            <div className="ui-chip">Riepilogo</div>
                            <h3 className="mt-2 font-black text-lg">Il tuo ordine</h3>
                        </div>
                        <div className="ui-chip">{cart.length} items</div>
                    </div>

                    {!cart.length ? (
                        <p className="mt-3 ui-muted">Carrello vuoto. Torna al menu e aggiungi dei piatti.</p>
                    ) : (
                        <div className="mt-4 grid gap-3">
                            {cart.map((it) => (
                                <div key={it.id} className="ui-soft p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <div className="font-bold truncate">{it.name}</div>
                                            <div className="ui-muted text-sm">€ {it.price.toFixed(2)}</div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => removeItem(it.id)}
                                            className="ui-btn"
                                        >
                                            <span>Rimuovi</span>
                                        </button>
                                    </div>

                                    <div className="mt-3 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <button type="button" onClick={() => changeQty(it.id, -1)} className="ui-btn">
                                                <span>−</span>
                                            </button>
                                            <div className="w-10 text-center font-black">{it.qty}</div>
                                            <button type="button" onClick={() => changeQty(it.id, +1)} className="ui-btn">
                                                <span>+</span>
                                            </button>
                                        </div>
                                        <div className="font-black">€ {(it.price * it.qty).toFixed(2)}</div>
                                    </div>
                                </div>
                            ))}

                            <div className="mt-1 flex items-center justify-between rounded-xl border border-[rgba(20,20,20,0.12)] bg-[rgba(12,74,110,0.04)] px-4 py-3">
                                <div className="ui-muted text-sm font-semibold">Totale</div>
                                <div className="text-lg font-black">€ {total.toFixed(2)}</div>
                            </div>
                        </div>
                    )}
                </div>
            </aside>
        </div>
    );
}
