import { useEffect, useMemo, useState } from "react";
import AdminMenuEditor from "./AdminMenuEditor.jsx";
import AdminPromosEditor from "./AdminPromosEditor.jsx";

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

const statusLabel = {
    pending: "In attesa",
    accepted: "Accettato",
    rejected: "Rifiutato",
    preparing: "In preparazione",
    ready: "Pronto",
};

export default function AdminDashboard() {
    const [orders, setOrders] = useState(() => loadOrders());
    const [q, setQ] = useState("");

    // auto refresh (demo)
    useEffect(() => {
        const t = setInterval(() => setOrders(loadOrders()), 1000);
        return () => clearInterval(t);
    }, []);

    const filtered = useMemo(() => {
        const query = q.trim().toLowerCase();
        if (!query) return orders;
        return orders.filter((o) => {
            const s = `${o.id} ${o.customer?.name} ${o.customer?.phone} ${o.customer?.email}`.toLowerCase();
            return s.includes(query);
        });
    }, [orders, q]);

    const customers = useMemo(() => {
        const map = new Map();
        for (const o of orders) {
            const key = (o.customer?.phone || o.customer?.email || o.customer?.name || "").trim();
            if (!key) continue;

            const prev = map.get(key);
            const next = {
                name: o.customer?.name || prev?.name || "",
                phone: o.customer?.phone || prev?.phone || "",
                email: o.customer?.email || prev?.email || "",
                lastOrderAt: o.createdAt,
                ordersCount: (prev?.ordersCount || 0) + 1,
                spent: (prev?.spent || 0) + (o.total || 0),
            };

            map.set(key, prev ? { ...prev, ...next } : next);
        }
        return Array.from(map.values()).sort((a, b) => b.ordersCount - a.ordersCount);
    }, [orders]);

    function updateOrder(id, patch) {
        const next = orders.map((o) => (o.id === id ? { ...o, ...patch } : o));
        setOrders(next);
        saveOrders(next);
    }

    function clearAllOrders() {
        if (!confirm("Vuoi cancellare TUTTI gli ordini? (demo)")) return;
        saveOrders([]);
        setOrders([]);
    }

    return (
        <div className="grid gap-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                    <h1 className="text-3xl font-black">Admin • La Paesana</h1>
                    <p className="mt-1 text-white/60">
                        Gestisci menù, promozioni e ordini (demo localStorage).
                    </p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={clearAllOrders}
                        className="rounded-2xl bg-white/5 px-4 py-3 text-sm font-semibold ring-1 ring-white/10 hover:bg-white/10"
                    >
                        Svuota ordini
                    </button>
                </div>
            </div>

            {/* EDITOR MENU + PROMO */}
            <AdminMenuEditor />
            <AdminPromosEditor />

            {/* ORDINI */}
            <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h2 className="text-xl font-black">Ordini ({filtered.length})</h2>
                        <div className="text-xs text-white/50">Auto refresh (demo)</div>
                    </div>

                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-neutral-950/40 px-4 py-3 outline-none focus:border-white/20 md:w-96"
                        placeholder="Cerca per nome, tel, ID..."
                    />
                </div>

                {filtered.length === 0 ? (
                    <p className="text-white/60">Nessun ordine trovato.</p>
                ) : (
                    <div className="grid gap-4">
                        {filtered.map((o) => (
                            <div key={o.id} className="rounded-3xl bg-neutral-950/40 p-5 ring-1 ring-white/10">
                                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                    <div>
                                        <div className="font-mono text-xs text-white/50">{o.id}</div>
                                        <div className="mt-1 text-lg font-black">{o.customer?.name}</div>
                                        <div className="mt-1 text-sm text-white/60">
                                            {o.customer?.phone} {o.customer?.email ? `• ${o.customer.email}` : ""}
                                        </div>

                                        <div className="mt-2 text-sm text-white/70">
                                            <span className="font-semibold">Arrivo:</span> {o.details?.arrivalTime}{" "}
                                            <span className="text-white/40">•</span>{" "}
                                            <span className="font-semibold">Modalità:</span>{" "}
                                            {o.details?.pickup === "asporto" ? "Consegna" : "In sede"}
                                        </div>

                                        {o.details?.pickup === "asporto" && o.details?.address && (
                                            <div className="mt-1 text-sm text-white/60">
                                                <span className="font-semibold">Indirizzo:</span> {o.details.address}
                                            </div>
                                        )}

                                        {o.details?.notes && (
                                            <div className="mt-2 text-sm text-white/60">
                                                <span className="font-semibold">Note cliente:</span> {o.details.notes}
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <div className="rounded-2xl bg-white/5 px-4 py-2 text-sm ring-1 ring-white/10">
                                            <span className="text-white/60">Stato:</span>{" "}
                                            <span className="font-black">{statusLabel[o.status] || o.status}</span>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                onClick={() => updateOrder(o.id, { status: "accepted" })}
                                                className="rounded-full bg-white/5 px-3 py-2 text-xs font-bold ring-1 ring-white/10 hover:bg-white/10"
                                            >
                                                Accetta
                                            </button>
                                            <button
                                                onClick={() => updateOrder(o.id, { status: "rejected" })}
                                                className="rounded-full bg-white/5 px-3 py-2 text-xs font-bold ring-1 ring-white/10 hover:bg-white/10"
                                            >
                                                Rifiuta
                                            </button>
                                            <button
                                                onClick={() => updateOrder(o.id, { status: "preparing" })}
                                                className="rounded-full bg-white/5 px-3 py-2 text-xs font-bold ring-1 ring-white/10 hover:bg-white/10"
                                            >
                                                In prep
                                            </button>
                                            <button
                                                onClick={() => updateOrder(o.id, { status: "ready" })}
                                                className="rounded-full bg-white/5 px-3 py-2 text-xs font-bold ring-1 ring-white/10 hover:bg-white/10"
                                            >
                                                Pronto
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 grid gap-3 md:grid-cols-2">
                                    <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                                        <div className="text-sm font-bold text-white/80">Items</div>
                                        <ul className="mt-2 grid gap-1 text-sm text-white/70">
                                            {o.items?.map((it) => (
                                                <li key={it.id} className="flex justify-between gap-3">
                                                    <span>
                                                        {it.qty}× {it.name}
                                                    </span>
                                                    <span>€ {(it.price * it.qty).toFixed(2)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-3 flex justify-between rounded-xl bg-neutral-950/40 px-3 py-2 text-sm ring-1 ring-white/10">
                                            <span className="text-white/60">Totale</span>
                                            <span className="font-black">€ {Number(o.total || 0).toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                                        <div className="text-sm font-bold text-white/80">Note cucina</div>
                                        <textarea
                                            value={o.kitchenNotes || ""}
                                            onChange={(e) => updateOrder(o.id, { kitchenNotes: e.target.value })}
                                            className="mt-2 min-h-28 w-full rounded-2xl border border-white/10 bg-neutral-950/40 px-4 py-3 text-sm outline-none focus:border-white/20"
                                            placeholder="Es. Impasto in forno, aggiungere basilico a fine cottura..."
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* CLIENTI */}
            <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <h2 className="text-xl font-black">Clienti (database demo)</h2>
                <p className="mt-1 text-sm text-white/60">
                    Deduciamo i clienti dagli ordini (telefono/email/nome).
                </p>

                {customers.length === 0 ? (
                    <p className="mt-4 text-white/60">Nessun cliente ancora.</p>
                ) : (
                    <div className="mt-4 overflow-x-auto rounded-2xl ring-1 ring-white/10">
                        <table className="min-w-full text-left text-sm">
                            <thead className="bg-neutral-950/40 text-white/70">
                                <tr>
                                    <th className="px-4 py-3">Nome</th>
                                    <th className="px-4 py-3">Telefono</th>
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3">Ordini</th>
                                    <th className="px-4 py-3">Spesa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((c, idx) => (
                                    <tr key={idx} className="border-t border-white/10">
                                        <td className="px-4 py-3 font-semibold">{c.name}</td>
                                        <td className="px-4 py-3 text-white/70">{c.phone}</td>
                                        <td className="px-4 py-3 text-white/70">{c.email}</td>
                                        <td className="px-4 py-3">{c.ordersCount}</td>
                                        <td className="px-4 py-3 font-black">€ {Number(c.spent || 0).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
}
