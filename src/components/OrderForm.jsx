import { useMemo, useState } from "react";

const LS_ORDERS = "lp_orders";

function loadOrders() {
    try {
        return JSON.parse(localStorage.getItem(LS_ORDERS) || "[]");
    } catch {
        return [];
    }
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
        pickup: "in_sede", // in_sede | asporto
    });

    const [done, setDone] = useState(false);
    const [orderId, setOrderId] = useState("");

    function update(key, value) {
        setForm((p) => ({ ...p, [key]: value }));
    }

    function changeQty(id, delta) {
        setCart((prev) =>
            prev
                .map((x) => (x.id === id ? { ...x, qty: Math.max(1, x.qty + delta) } : x))
                .filter(Boolean)
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
        return "";
    }

    function submit(e) {
        e.preventDefault();
        const err = validate();
        if (err) {
            alert(err);
            return;
        }

        const now = new Date();
        const id = `LP-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${now.getTime()}`;

        const order = {
            id,
            createdAt: now.toISOString(),
            status: "pending", // pending | accepted | rejected | preparing | ready
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
        const next = [order, ...orders];
        saveOrders(next);

        setOrderId(id);
        setDone(true);
        setCart([]);
    }

    if (done) {
        return (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="text-2xl font-black">Ordine inviato ✅</div>
                <p className="mt-2 text-white/70">
                    Grazie! Il tuo ordine è stato registrato con ID:
                </p>
                <div className="mt-3 rounded-2xl bg-white/10 px-4 py-3 font-mono text-sm ring-1 ring-white/10">
                    {orderId}
                </div>
                <p className="mt-4 text-sm text-white/60">
                    (Demo) Lo staff può vederlo nella dashboard admin.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 lg:grid-cols-5">
            <form onSubmit={submit} className="lg:col-span-3">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <h2 className="text-2xl font-black">I tuoi dati</h2>

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                        <label className="grid gap-2">
                            <span className="text-sm font-semibold text-white/80">Nome e cognome</span>
                            <input
                                value={form.name}
                                onChange={(e) => update("name", e.target.value)}
                                className="rounded-2xl border border-white/10 bg-neutral-950/40 px-4 py-3 outline-none ring-0 focus:border-white/20"
                                placeholder="Mario Rossi"
                            />
                        </label>

                        <label className="grid gap-2">
                            <span className="text-sm font-semibold text-white/80">Telefono</span>
                            <input
                                value={form.phone}
                                onChange={(e) => update("phone", e.target.value)}
                                className="rounded-2xl border border-white/10 bg-neutral-950/40 px-4 py-3 outline-none focus:border-white/20"
                                placeholder="+39 ..."
                            />
                        </label>

                        <label className="grid gap-2 md:col-span-2">
                            <span className="text-sm font-semibold text-white/80">Email (opzionale)</span>
                            <input
                                value={form.email}
                                onChange={(e) => update("email", e.target.value)}
                                className="rounded-2xl border border-white/10 bg-neutral-950/40 px-4 py-3 outline-none focus:border-white/20"
                                placeholder="mario@email.it"
                            />
                        </label>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        <label className="grid gap-2">
                            <span className="text-sm font-semibold text-white/80">Modalità</span>
                            <select
                                value={form.pickup}
                                onChange={(e) => update("pickup", e.target.value)}
                                className="rounded-2xl border border-white/10 bg-neutral-950/40 px-4 py-3 outline-none focus:border-white/20"
                            >
                                <option value="in_sede">Ritiro / Tavolo</option>
                                <option value="asporto">Consegna (demo)</option>
                            </select>
                        </label>

                        <label className="grid gap-2">
                            <span className="text-sm font-semibold text-white/80">Ora di arrivo</span>
                            <input
                                value={form.arrivalTime}
                                onChange={(e) => update("arrivalTime", e.target.value)}
                                className="rounded-2xl border border-white/10 bg-neutral-950/40 px-4 py-3 outline-none focus:border-white/20"
                                placeholder="Es. 20:15"
                            />
                        </label>

                        {form.pickup === "asporto" && (
                            <label className="grid gap-2 md:col-span-2">
                                <span className="text-sm font-semibold text-white/80">Indirizzo</span>
                                <input
                                    value={form.address}
                                    onChange={(e) => update("address", e.target.value)}
                                    className="rounded-2xl border border-white/10 bg-neutral-950/40 px-4 py-3 outline-none focus:border-white/20"
                                    placeholder="Via..."
                                />
                            </label>
                        )}

                        <label className="grid gap-2 md:col-span-2">
                            <span className="text-sm font-semibold text-white/80">Note (allergie, preferenze...)</span>
                            <textarea
                                value={form.notes}
                                onChange={(e) => update("notes", e.target.value)}
                                className="min-h-28 rounded-2xl border border-white/10 bg-neutral-950/40 px-4 py-3 outline-none focus:border-white/20"
                                placeholder="Es. senza lattosio, ben cotta..."
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="mt-6 w-full rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-600 px-5 py-4 text-base font-black text-neutral-950 shadow-lg shadow-fuchsia-600/15 transition hover:brightness-110"
                    >
                        Invia ordine • € {total.toFixed(2)}
                    </button>
                </div>
            </form>

            <aside className="lg:col-span-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <h3 className="text-xl font-black">Il tuo ordine</h3>

                    {!cart.length ? (
                        <p className="mt-3 text-white/60">Carrello vuoto. Vai su Menu e aggiungi dei piatti.</p>
                    ) : (
                        <div className="mt-4 grid gap-3">
                            {cart.map((it) => (
                                <div key={it.id} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <div className="font-bold">{it.name}</div>
                                            <div className="text-sm text-white/60">€ {it.price.toFixed(2)}</div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeItem(it.id)}
                                            className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold ring-1 ring-white/10 hover:bg-white/10"
                                        >
                                            Rimuovi
                                        </button>
                                    </div>

                                    <div className="mt-3 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => changeQty(it.id, -1)}
                                                className="h-9 w-9 rounded-2xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10"
                                            >
                                                −
                                            </button>
                                            <div className="w-10 text-center font-black">{it.qty}</div>
                                            <button
                                                type="button"
                                                onClick={() => changeQty(it.id, +1)}
                                                className="h-9 w-9 rounded-2xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div className="font-black">
                                            € {(it.price * it.qty).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="mt-2 flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">
                                <div className="text-sm font-semibold text-white/70">Totale</div>
                                <div className="text-lg font-black">€ {total.toFixed(2)}</div>
                            </div>
                        </div>
                    )}
                </div>
            </aside>
        </div>
    );
}
