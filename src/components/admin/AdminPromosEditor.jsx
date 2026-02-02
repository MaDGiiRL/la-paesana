// src/components/admin/AdminPromosEditor.jsx
import { useMemo, useState } from "react";
import { loadJSON, saveJSON, LS_PROMOS, defaultPromos } from "../../data/storage.js";

function uid() {
    return `promo-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function PromoPreview({ badge, title, subtitle }) {
    return (
        <div className="rounded-2xl border border-[rgba(20,20,20,0.10)] bg-[rgba(20,20,20,0.02)] p-4">
            <div className="ui-chip inline-flex items-center gap-2">{badge || "Promo"}</div>
            <div className="mt-2 font-black">{title || "Titolo promo"}</div>
            <div className="mt-1 ui-muted text-sm">{subtitle || "Descrizione promo"}</div>
        </div>
    );
}

export default function AdminPromosEditor() {
    const initial = useMemo(() => loadJSON(LS_PROMOS, defaultPromos()), []);
    const [promos, setPromos] = useState(initial);

    function save() {
        saveJSON(LS_PROMOS, promos);
        alert("Promozioni salvate ✅");
    }

    function addPromo() {
        setPromos((p) => [
            {
                id: uid(),
                title: "Nuova promozione",
                subtitle: "Descrizione...",
                badge: "Promo",
                active: true,
            },
            ...(p || []),
        ]);
    }

    function patch(id, patchObj) {
        setPromos((p) => (p || []).map((x) => (x.id === id ? { ...x, ...patchObj } : x)));
    }

    function removePromo(id) {
        if (!confirm("Rimuovere questa promozione?")) return;
        setPromos((p) => (p || []).filter((x) => x.id !== id));
    }

    const activeCount = (promos || []).filter((p) => p.active).length;

    return (
        <section className="ui-card p-5 md:p-7 grid gap-5">
            {/* Header */}
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="ui-chip">Home</div>
                        <div className="ui-chip">
                            Attive: <strong>{activeCount}</strong> / {(promos || []).length}
                        </div>
                    </div>

                    <h2 className="mt-3 text-2xl md:text-3xl font-black">Promozioni</h2>
                    <p className="mt-1 ui-muted text-sm">
                        Le promo <strong>attive</strong> vengono mostrate automaticamente in homepage.
                    </p>
                </div>

                <div className="flex gap-2">
                    <button onClick={addPromo} className="ui-btn" type="button">
                        <span>+ Nuova promo</span>
                    </button>
                    <button onClick={save} className="ui-btn-gold" type="button">
                        <span>Salva promo</span>
                    </button>
                </div>
            </div>

            {/* Lista */}
            <div className="grid gap-4">
                {(promos || []).length === 0 ? (
                    <div className="ui-soft p-5">
                        <div className="font-black">Nessuna promo</div>
                        <div className="ui-muted text-sm mt-1">Crea una promozione per mostrarla in Home.</div>
                        <button onClick={addPromo} className="ui-btn mt-4" type="button">
                            <span>+ Crea la prima promo</span>
                        </button>
                    </div>
                ) : (
                    promos.map((p) => {
                        const active = !!p.active;

                        return (
                            <div key={p.id} className="ui-soft p-5 md:p-6 grid gap-4">
                                {/* top row */}
                                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <button
                                                onClick={() => patch(p.id, { active: !p.active })}
                                                className={[
                                                    "ui-btn",
                                                    active
                                                        ? "bg-[rgba(255,200,64,0.14)] border border-[rgba(212,170,55,0.26)]"
                                                        : "opacity-80",
                                                ].join(" ")}
                                                type="button"
                                            >
                                                <span>{active ? "Attiva" : "Disattiva"}</span>
                                            </button>

                                            <div className="text-xs font-mono ui-muted truncate">{p.id}</div>
                                        </div>

                                        <div className="mt-2 text-sm ui-muted">
                                            Stato:{" "}
                                            <span className="font-bold">{active ? "Visibile in Home" : "Nascosta"}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button onClick={() => removePromo(p.id)} className="ui-btn" type="button">
                                            <span>Rimuovi</span>
                                        </button>
                                    </div>
                                </div>

                                {/* form + preview */}
                                <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
                                    <div className="grid gap-3">
                                        <div className="grid gap-3 md:grid-cols-3">
                                            <label className="grid gap-2">
                                                <span className="text-xs font-bold ui-muted">Badge</span>
                                                <input
                                                    value={p.badge || ""}
                                                    onChange={(e) => patch(p.id, { badge: e.target.value })}
                                                    className="ui-input"
                                                    placeholder="Es. Promo, Pranzo"
                                                />
                                            </label>

                                            <label className="grid gap-2 md:col-span-2">
                                                <span className="text-xs font-bold ui-muted">Titolo</span>
                                                <input
                                                    value={p.title || ""}
                                                    onChange={(e) => patch(p.id, { title: e.target.value })}
                                                    className="ui-input"
                                                    placeholder="Titolo promo"
                                                />
                                            </label>
                                        </div>

                                        <label className="grid gap-2">
                                            <span className="text-xs font-bold ui-muted">Descrizione</span>
                                            <textarea
                                                value={p.subtitle || ""}
                                                onChange={(e) => patch(p.id, { subtitle: e.target.value })}
                                                className="ui-input"
                                                style={{ minHeight: 120 }}
                                                placeholder="Testo breve visibile in homepage..."
                                            />
                                        </label>
                                    </div>

                                    <div className="grid gap-2">
                                        <div className="text-xs font-bold ui-muted">Anteprima (Home)</div>
                                        <PromoPreview badge={p.badge} title={p.title} subtitle={p.subtitle} />
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </section>
    );
}
