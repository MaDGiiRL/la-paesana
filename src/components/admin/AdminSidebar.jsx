const SECTIONS = [
    { key: "overview", label: "Overview" },
    { key: "orders", label: "Ordini" },
    { key: "menu", label: "Menù" },
    { key: "promos", label: "Promozioni" },
    { key: "customers", label: "Clienti" },
];

export default function AdminSidebar({
    section,
    setSection,
    ordersCount,
    weekly,
    onClear,
    onLogout,
}) {
    return (
        <aside className="hidden lg:block">
            {/* ✅ sticky + altezza viewport + scroll interno */}
            <div className="ui-card p-4 sticky top-6 h-[calc(100vh-48px)] overflow-hidden">
                <div className="h-full flex flex-col min-h-0">
                    {/* Header card */}
                    <div
                        className="rounded-2xl p-4 border border-[rgba(212,170,55,0.22)]"
                        style={{
                            background:
                                "radial-gradient(460px 240px at 20% 0%, rgba(255,200,64,0.20), transparent 55%)," +
                                "radial-gradient(360px 220px at 100% 30%, rgba(12,74,110,0.10), transparent 60%)," +
                                "linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.86))",
                        }}
                    >
                        {/* ✅ Staff + Esci sulla stessa riga */}
                        <div className="flex items-center justify-between gap-2">
                            <div className="ui-chip">Staff</div>

                            <button onClick={onLogout} className="ui-btn" type="button">
                                <span>Esci</span>
                            </button>
                        </div>

                        <div className="mt-2 text-lg font-black">Dashboard</div>                    </div>

                    {/* ✅ area scrollabile */}
                    <div className="mt-2 flex-1 min-h-0 overflow-auto pr-1">
                        <div className="grid gap-2">
                            {SECTIONS.map((s) => {
                                const active = section === s.key;
                                return (
                                    <button
                                        key={s.key}
                                        onClick={() => setSection(s.key)}
                                        className={[
                                            "w-full text-left ui-btn",
                                            active
                                                ? "bg-[rgba(255,200,64,0.14)] border border-[rgba(212,170,55,0.26)]"
                                                : "",
                                        ].join(" ")}
                                        type="button"
                                    >
                                        <span className="flex items-center justify-between">
                                            <span>{s.label}</span>
                                            {s.key === "orders" ? (
                                                <span className="ui-muted text-xs">{ordersCount}</span>
                                            ) : null}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-4 ui-soft p-4">
                            <div className="text-sm font-black">Settimana</div>
                            <div className="mt-2 grid gap-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="ui-muted">Ordini</span>
                                    <span className="font-black">{weekly.weekCount}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="ui-muted">Incasso</span>
                                    <span className="font-black">€ {weekly.weekRevenue.toFixed(2)}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="ui-muted">Scontrino medio</span>
                                    <span className="font-black">€ {weekly.avgTicket.toFixed(2)}</span>
                                </div>
                            </div>

                            <button onClick={onClear} className="ui-btn mt-3 w-full" type="button">
                                <span>Svuota ordini</span>
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-3 pt-3 border-t border-[rgba(20,20,20,0.08)]">
                        <div className="ui-muted text-xs">Demo localStorage • aggiorna ogni 1.5s</div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
