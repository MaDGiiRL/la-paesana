import { useMemo, useState } from "react";
import { loadJSON, saveJSON, LS_PROMOS, defaultPromos } from "../data/storage.js";

function uid() {
    return `promo-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
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
            ...p,
        ]);
    }

    function patch(id, patch) {
        setPromos((p) => p.map((x) => (x.id === id ? { ...x, ...patch } : x)));
    }

    function remove(id) {
        setPromos((p) => p.filter((x) => x.id !== id));
    }

    return (
        <section className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                    <h2 className="text-2xl font-black">Promozioni Home</h2>
                    <p className="text-sm text-white/60">Pubblica/archivia promo visibili in homepage.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={addPromo}
                        className="rounded-2xl bg-white/5 px-4 py-3 text-sm font-bold ring-1 ring-white/10 hover:bg-white/10"
                    >
                        + Nuova
                    </button>
                    <button
                        onClick={save}
                        className="rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-600 px-5 py-3 text-sm font-black text-neutral-950 shadow-lg shadow-fuchsia-600/15 hover:brightness-110"
                    >
                        Salva promo
                    </button>
                </div>
            </div>

            <div className="grid gap-3">
                {promos.map((p) => (
                    <div key={p.id} className="rounded-3xl bg-neutral-950/40 p-5 ring-1 ring-white/10">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => patch(p.id, { active: !p.active })}
                                    className={[
                                        "rounded-full px-4 py-2 text-xs font-bold ring-1 transition",
                                        p.active ? "bg-white/10 ring-white/15" : "bg-white/5 ring-white/10 hover:bg-white/10",
                                    ].join(" ")}
                                >
                                    {p.active ? "Attiva" : "Disattiva"}
                                </button>
                                <div className="text-xs font-mono text-white/40">{p.id}</div>
                            </div>

                            <button
                                onClick={() => remove(p.id)}
                                className="rounded-full bg-white/5 px-4 py-2 text-xs font-bold ring-1 ring-white/10 hover:bg-white/10"
                            >
                                Rimuovi
                            </button>
                        </div>

                        <div className="mt-4 grid gap-3">
                            <div className="grid gap-3 md:grid-cols-3">
                                <input
                                    value={p.badge || ""}
                                    onChange={(e) => patch(p.id, { badge: e.target.value })}
                                    className="rounded-2xl border border-white/10 bg-neutral-950/40 px-4 py-3 text-sm outline-none focus:border-white/20"
                                    placeholder="Badge (es. Promo, Pranzo)"
                                />
                                <input
                                    value={p.title}
                                    onChange={(e) => patch(p.id, { title: e.target.value })}
                                    className="rounded-2xl border border-white/10 bg-neutral-950/40 px-4 py-3 text-sm outline-none focus:border-white/20 md:col-span-2"
                                    placeholder="Titolo"
                                />
                            </div>

                            <textarea
                                value={p.subtitle}
                                onChange={(e) => patch(p.id, { subtitle: e.target.value })}
                                className="min-h-20 rounded-2xl border border-white/10 bg-neutral-950/40 px-4 py-3 text-sm outline-none focus:border-white/20"
                                placeholder="Descrizione"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
