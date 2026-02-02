import { eur, statusChipClass, statusLabel } from "../../utils/admin.js";

function MiniPill({ label, value, cls }) {
    return (
        <div className={["rounded-2xl border p-4", cls].join(" ")}>
            <div className="text-xs ui-muted">{label}</div>
            <div className="mt-1 text-xl font-black">{value}</div>
        </div>
    );
}

export default function OrdersSection({
    filteredOrders,
    q,
    setQ,
    weekly,
    onClear,
    onUpdateOrder,
}) {
    return (
        <div className="grid gap-4">
            {/* DISTRIBUZIONE (anche qui) */}
            <div className="ui-card p-5 md:p-6">
                <div className="ui-chip">Distribuzione</div>
                <div className="mt-2 text-lg font-black">Stati ordini (7 giorni)</div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <MiniPill label="In attesa" value={weekly.statusCounts.pending} cls={statusChipClass("pending")} />
                    <MiniPill label="Accettati" value={weekly.statusCounts.accepted} cls={statusChipClass("accepted")} />
                    <MiniPill label="Rifiutati" value={weekly.statusCounts.rejected} cls={statusChipClass("rejected")} />
                    <MiniPill label="In prep" value={weekly.statusCounts.preparing} cls={statusChipClass("preparing")} />
                    <MiniPill label="Pronti" value={weekly.statusCounts.ready} cls={statusChipClass("ready")} />
                </div>
            </div>

            {/* LISTA ORDINI */}
            <div className="ui-card p-5 md:p-6">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                        <div className="ui-chip">Ordini</div>
                        <h2 className="mt-2 text-xl font-black">Gestione ordini</h2>
                        <div className="ui-muted text-xs">Auto refresh (demo)</div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-2 md:items-center">
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            className="ui-input md:w-96"
                            placeholder="Cerca per nome, tel, ID..."
                        />
                        <button onClick={onClear} className="ui-btn" type="button">
                            <span>Svuota</span>
                        </button>
                    </div>
                </div>

                <div className="mt-4 grid gap-4">
                    {filteredOrders.length === 0 ? (
                        <div className="ui-soft p-4">
                            <div className="font-bold">Nessun ordine</div>
                            <div className="ui-muted text-sm mt-1">Quando arriveranno, li vedrai qui.</div>
                        </div>
                    ) : (
                        filteredOrders.map((o) => (
                            <div key={o.id} className="ui-soft p-5 md:p-6">
                                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                    <div className="min-w-0">
                                        <div className="font-mono text-xs ui-muted">{o.id}</div>
                                        <div className="mt-1 text-lg font-black">{o.customer?.name}</div>
                                        <div className="mt-1 text-sm ui-muted">
                                            {o.customer?.phone} {o.customer?.email ? `• ${o.customer.email}` : ""}
                                        </div>

                                        <div className="mt-3 text-sm">
                                            <span className="font-semibold">Arrivo:</span> {o.details?.arrivalTime || "-"}{" "}
                                            <span className="ui-muted">•</span>{" "}
                                            <span className="font-semibold">Modalità:</span>{" "}
                                            {o.details?.pickup === "asporto" ? "Consegna" : "In sede"}
                                        </div>

                                        {o.details?.notes && (
                                            <div className="mt-3 text-sm ui-muted">
                                                <span className="font-semibold">Note cliente:</span> {o.details.notes}
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <div className={["rounded-2xl border px-4 py-2 text-sm", statusChipClass(o.status)].join(" ")}>
                                            <span className="ui-muted">Stato:</span>{" "}
                                            <span className="font-black">{statusLabel[o.status] || o.status}</span>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            <button onClick={() => onUpdateOrder(o.id, { status: "accepted" })} className="ui-btn" type="button">
                                                <span>Accetta</span>
                                            </button>
                                            <button onClick={() => onUpdateOrder(o.id, { status: "rejected" })} className="ui-btn" type="button">
                                                <span>Rifiuta</span>
                                            </button>
                                            <button onClick={() => onUpdateOrder(o.id, { status: "preparing" })} className="ui-btn" type="button">
                                                <span>In prep</span>
                                            </button>
                                            <button onClick={() => onUpdateOrder(o.id, { status: "ready" })} className="ui-btn-gold" type="button">
                                                <span>Pronto</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 grid gap-4 md:grid-cols-1">
                                    <div className="ui-card p-4">
                                        <div className="text-sm font-black">Items</div>
                                        <ul className="mt-3 grid gap-1 text-sm ui-muted">
                                            {o.items?.map((it) => (
                                                <li key={`${it.id}-${it.name}`} className="flex justify-between gap-3">
                                                    <span className="min-w-0 truncate">
                                                        {it.qty}× {it.name}
                                                        {it.notes ? <span className="ml-2 ui-muted text-xs">“{it.notes}”</span> : null}
                                                    </span>
                                                    <span>{eur(it.price * it.qty)}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-4 flex justify-between rounded-xl border border-[rgba(20,20,20,0.10)] bg-[rgba(20,20,20,0.02)] px-3 py-2 text-sm">
                                            <span className="ui-muted">Totale</span>
                                            <span className="font-black">{eur(o.total)}</span>
                                        </div>
                                    </div>

                                    <div className="ui-card p-4">
                                        <div className="text-sm font-black">Note cucina</div>
                                        <textarea
                                            value={o.kitchenNotes || ""}
                                            onChange={(e) => onUpdateOrder(o.id, { kitchenNotes: e.target.value })}
                                            className="ui-input mt-3"
                                            style={{ minHeight: 120 }}
                                            placeholder="Es. aggiungere basilico a fine cottura..."
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
